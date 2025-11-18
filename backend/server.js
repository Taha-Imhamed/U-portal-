const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection details are read from environment variables or use safe defaults
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'school', // Ensure this matches your PostgreSQL database name
  password: process.env.DB_PASSWORD || '0000', // Ensure this matches your PostgreSQL password
  port: process.env.DB_PORT || 5432,
});

// JWT Secret - CRITICAL: Change this in a real application!
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// ===================================
// MIDDLEWARE
// ===================================

const corsOptions = {
    // Allow frontend on 8080 (assuming that's your React dev server)
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
// Use express.json() to parse incoming JSON payloads
app.use(express.json()); 

// ===================================
// UTILITY ROUTES
// ===================================

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'U-Portal Backend is running!' });
});

// Auth middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
        console.error("JWT Verification failed:", err.message);
        return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

// ===== AUTH ROUTES =====

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    
    if (!email || !password || !fullName || !role) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    // Start transaction to ensure both user and role are created
    await pool.query('BEGIN');
    
    const userResult = await pool.query(
      'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
      [email, passwordHash, fullName]
    );
    
    const user = userResult.rows[0];
    
    await pool.query(
      'INSERT INTO user_roles (user_id, role) VALUES ($1, $2)',
      [user.id, role]
    );
    
    await pool.query('COMMIT');
    
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Registration error:', error);
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Get user
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = userResult.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Get user role
    const roleResult = await pool.query(
      'SELECT role FROM user_roles WHERE user_id = $1',
      [user.id]
    );
    
    const role = roleResult.rows[0]?.role;
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user details
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const userResult = await pool.query(
      'SELECT id, email, full_name FROM users WHERE id = $1',
      [req.user.userId]
    );
    
    const roleResult = await pool.query(
      'SELECT role FROM user_roles WHERE user_id = $1',
      [req.user.userId]
    );
    
    res.json({
      ...userResult.rows[0],
      role: roleResult.rows[0]?.role
    });
  } catch (error) {
    console.error('Auth/me error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ===== STUDENT ROUTES =====
// NOTE: These routes are for context, and are assumed to be working based on prior interactions.

// Get student dashboard data
app.get('/api/student/dashboard', authenticateToken, async (req, res) => {
  try {
    // Get enrollments with course info
    const enrollments = await pool.query(`
SELECT c.id, c.name, c.code, c.credits, 
             u.full_name as professor_name,
             e.status
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN users u ON c.professor_id = u.id
      WHERE e.student_id = $1 AND e.status = 'active'
    `, [req.user.userId]);
    
    // Get recent announcements
    const announcements = await pool.query(`
SELECT a.*, u.full_name as author_name
      FROM announcements a
      JOIN users u ON a.author_id = u.id
      WHERE a.target_role IN ('student', NULL)
      ORDER BY a.created_at DESC
      LIMIT 5
    `);
    
    res.json({
      courses: enrollments.rows,
      announcements: announcements.rows
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get student grades
app.get('/api/student/grades', authenticateToken, async (req, res) => {
  try {
    const grades = await pool.query(`
SELECT c.name as course_name, c.code as course_code,
             g.grade_type, g.score, g.max_score, g.date, g.comments
      FROM grades g
      JOIN enrollments e ON g.enrollment_id = e.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = $1
      ORDER BY g.date DESC
    `, [req.user.userId]);
    
    res.json(grades.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
});

// Get student attendance
app.get('/api/student/attendance', authenticateToken, async (req, res) => {
  try {
    const attendance = await pool.query(`
SELECT c.name as course_name, c.code as course_code,
             a.date, a.status
      FROM attendance a
      JOIN enrollments e ON a.enrollment_id = e.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = $1
      ORDER BY a.date DESC
    `, [req.user.userId]);
    
    res.json(attendance.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Get financial status
app.get('/api/student/financial', authenticateToken, async (req, res) => {
  try {
    const records = await pool.query(`
SELECT * FROM financial_records
      WHERE student_id = $1
      ORDER BY date DESC
    `, [req.user.userId]);
    
    res.json(records.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial records' });
  }
});

// ===== PROFESSOR ROUTES =====
// NOTE: These routes are for context, and are assumed to be working based on prior interactions.

// Get professor courses
app.get('/api/professor/courses', authenticateToken, async (req, res) => {
  try {
    const courses = await pool.query(`
SELECT c.*, COUNT(e.id)::integer as student_count
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id AND e.status = 'active'
      WHERE c.professor_id = $1
      GROUP BY c.id
    `, [req.user.userId]);
    
    res.json(courses.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course students
app.get('/api/professor/courses/:courseId/students', authenticateToken, async (req, res) => {
  try {
    const students = await pool.query(`
SELECT u.id, u.full_name, u.email, e.id as enrollment_id
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      WHERE e.course_id = $1 AND e.status = 'active'
    `, [req.params.courseId]);
    
    res.json(students.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Upload grades
app.post('/api/professor/grades', authenticateToken, async (req, res) => {
  try {
    const { enrollmentId, gradeType, score, maxScore, comments } = req.body;
    
    const result = await pool.query(`
INSERT INTO grades (enrollment_id, grade_type, score, max_score, date, comments)
      VALUES ($1, $2, $3, $4, CURRENT_DATE, $5)
      RETURNING *
    `, [enrollmentId, gradeType, score, maxScore, comments]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload grade' });
  }
});

// Mark attendance
app.post('/api/professor/attendance', authenticateToken, async (req, res) => {
  try {
    const { enrollmentId, status } = req.body;
    
    const result = await pool.query(`
INSERT INTO attendance (enrollment_id, date, status)
      VALUES ($1, CURRENT_DATE, $2)
      ON CONFLICT (enrollment_id, date) 
      DO UPDATE SET status = $2
      RETURNING *
    `, [enrollmentId, status]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// ===== ADMIN ROUTES =====

// Get all users (LIST)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    // Security check: Only admins should access this route
    if (req.user.role !== 'admin') {
      return res.sendStatus(403); // Forbidden
    }

    const users = await pool.query(`
SELECT u.id, u.email, u.full_name, u.created_at,
             ur.role
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      ORDER BY u.created_at DESC
    `);
    
    res.json(users.rows);
  } catch (error) {
    console.error("Admin user list fetch failed:", error); 
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user by ID
app.get('/api/admin/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        // Security check: Only admins should access this route
        if (req.user.role !== 'admin') {
          return res.sendStatus(403); // Forbidden
        }

        const userResult = await pool.query(`
SELECT u.id, u.email, u.full_name, u.created_at,
                   ur.role
            FROM users u
            LEFT JOIN user_roles ur ON u.id = ur.user_id
            WHERE u.id = $1
        `, [id]);
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(userResult.rows[0]);
    } catch (error) {
        console.error(`Admin user (ID: ${id}) fetch failed:`, error); 
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get statistics (Global)
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    // Security check: Only admins should access this route
    if (req.user.role !== 'admin') {
      return res.sendStatus(403); // Forbidden
    }

    // 1. Get role counts in one efficient query
    // FIX: Removed leading newline/whitespace that caused Syntax Error (42601)
    const roleCounts = await pool.query(`SELECT role, COUNT(*)::integer as count 
      FROM user_roles 
      GROUP BY role
    `);

    // 2. Get course count
    const courseCountResult = await pool.query(`SELECT COUNT(*)::integer as count FROM courses`);

    // Map counts to an object for easy access
    const counts = roleCounts.rows.reduce((acc, row) => {
        acc[row.role] = row.count;
        return acc;
    }, {});
    
    res.json({
      students: counts.student || 0,
      professors: counts.professor || 0,
      courses: courseCountResult.rows[0].count || 0
    });
  } catch (error) {
    console.error("Admin stats fetch failed:", error); 
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Create announcement
app.post('/api/admin/announcements', authenticateToken, async (req, res) => {
  try {
    // Security check: Only admins should create announcements
    if (req.user.role !== 'admin') {
      return res.sendStatus(403); // Forbidden
    }
    
    const { title, content, targetRole } = req.body;
    
    const result = await pool.query(`
INSERT INTO announcements (title, content, author_id, target_role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [title, content, req.user.userId, targetRole]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

// Update user (PUT route)
app.put('/api/admin/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { full_name, email, role } = req.body;
    
    // Security check: Only admins should update users
    if (req.user.role !== 'admin') {
        return res.sendStatus(403); // Forbidden
    }
    
    if (!full_name || !email || !role) {
        return res.status(400).json({ message: 'Missing required fields: full_name, email, and role.' });
    }

    try {
        await pool.query('BEGIN'); // Start transaction
        
        // 1. Update the user's core details (full_name, email)
        const userUpdateResult = await pool.query(
            'UPDATE users SET full_name = $1, email = $2 WHERE id = $3 RETURNING id',
            [full_name, email, id]
        );

        if (userUpdateResult.rowCount === 0) {
             await pool.query('ROLLBACK');
             return res.status(404).json({ message: 'User not found.' });
        }
        
        // 2. Update the user's role
        await pool.query(
            'UPDATE user_roles SET role = $1 WHERE user_id = $2',
            [role, id]
        );

        await pool.query('COMMIT'); // Commit transaction
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback on error
        console.error('User update error:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});


app.listen(port, () => {
  console.log(`U-Portal backend running on http://localhost:${port}`);
});