-- U-Portal Database Schema
-- Run this SQL script in your PostgreSQL database named 'school'

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('student', 'professor', 'admin');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles table (separate for security)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    UNIQUE(user_id, role)
);

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id),
    professor_id UUID REFERENCES users(id),
    credits INTEGER,
    semester VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student enrollments
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active',
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- Grades
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    grade_type VARCHAR(50), -- 'midterm', 'final', 'assignment', 'quiz', etc.
    score DECIMAL(5,2),
    max_score DECIMAL(5,2),
    date DATE,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20), -- 'present', 'absent', 'late', 'excused'
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(enrollment_id, date)
);

-- Financial records
CREATE TABLE financial_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- 'tuition', 'payment', 'scholarship', 'fee'
    amount DECIMAL(10,2),
    description TEXT,
    date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id),
    target_role app_role, -- NULL means all users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample departments
INSERT INTO departments (name, code) VALUES 
('Computer Science', 'CS'),
('Mathematics', 'MATH'),
('Engineering', 'ENG'),
('Business Administration', 'BA'),
('Natural Sciences', 'NS');

-- Create indexes for better performance
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_grades_enrollment_id ON grades(enrollment_id);
CREATE INDEX idx_attendance_enrollment_id ON attendance(enrollment_id);
CREATE INDEX idx_financial_records_student_id ON financial_records(student_id);
CREATE INDEX idx_announcements_target_role ON announcements(target_role);
CREATE INDEX idx_courses_professor_id ON courses(professor_id);
