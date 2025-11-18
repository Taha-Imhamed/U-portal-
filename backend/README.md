# U-Portal Backend - Quick Start Guide

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js (v18 or higher) installed
- ✅ PostgreSQL (v14 or higher) installed and running
- ✅ A PostgreSQL database named `school` with password `0000`

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

Open a terminal in the `backend` folder and run:

```bash
cd backend
npm install
```

This will install:
- express (web server)
- pg (PostgreSQL client)
- cors (cross-origin support)
- bcrypt (password hashing)
- jsonwebtoken (authentication)
- dotenv (environment variables)

### Step 2: Create Database Tables

1. Open PostgreSQL command line:
   ```bash
   psql -U postgres -d school
   ```

2. Copy and paste the entire contents of `database-schema.sql` file

3. Verify tables were created:
   ```sql
   \dt
   ```

You should see: users, user_roles, departments, courses, enrollments, grades, attendance, financial_records, announcements

### Step 3: Start the Backend Server

```bash
npm start
```

Or for auto-restart during development:
```bash
npm run dev
```

You should see:
```
🚀 U-Portal backend running on http://localhost:3001
📊 Database: school
🔐 CORS enabled for: http://localhost:8080
```

### Step 4: Test the Connection

Open your browser and visit:
```
http://localhost:3001/api/health
```

You should see:
```json
{"status":"ok","message":"U-Portal backend is running"}
```

## 🎯 That's It!

Your backend is now running and ready to connect with the frontend!

The frontend (running on http://localhost:8080) will automatically connect to your backend.

## 📁 Project Structure

```
backend/
├── server.js           # Main server file with all API endpoints
├── package.json        # Dependencies and scripts
├── .env               # Configuration (database credentials)
├── database-schema.sql # Database schema and sample data
└── README.md          # This file
```

## 🔐 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Student Endpoints
- `GET /api/student/dashboard` - Get courses and announcements
- `GET /api/student/grades` - Get all grades
- `GET /api/student/attendance` - Get attendance records
- `GET /api/student/financial` - Get financial records

### Professor Endpoints
- `GET /api/professor/courses` - Get professor's courses
- `GET /api/professor/courses/:courseId/students` - Get course students
- `POST /api/professor/grades` - Upload grades
- `POST /api/professor/attendance` - Mark attendance

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get statistics
- `POST /api/admin/announcements` - Create announcements

### AI Chat
- `POST /api/chat` - Chat with AI assistant

## 🔧 Troubleshooting

### Database Connection Failed
- Check if PostgreSQL is running: `pg_ctl status`
- Verify database exists: `psql -U postgres -l`
- Check credentials in `.env` file

### Port Already in Use
- Change PORT in `.env` file to another port (e.g., 3002)
- Update VITE_API_URL in frontend accordingly

### Tables Not Found
- Make sure you ran the `database-schema.sql` file
- Connect to database: `psql -U postgres -d school`
- List tables: `\dt`

## 🔒 Security Notes

⚠️ **IMPORTANT for Production:**
1. Change `JWT_SECRET` in `.env` to a strong random string
2. Update `FRONTEND_URL` to your production domain
3. Enable HTTPS
4. Never commit `.env` file to git
5. Use environment variables on your hosting platform

## 🌐 Connecting Frontend

The frontend is already configured to connect to `http://localhost:3001/api`

Just make sure:
1. Backend is running on port 3001
2. Frontend is running on port 8080
3. Both servers are running simultaneously

## 📞 Testing with Sample Data

Create a test user via API:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@school.com",
    "password": "password123",
    "fullName": "Test Student",
    "role": "student"
  }'
```

## 🤖 AI Chat Integration (Optional)

To enable AI chat with OpenAI:

1. Get an API key from https://platform.openai.com/
2. Add to `.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Install OpenAI package:
   ```bash
   npm install openai
   ```
4. Update the chat endpoint in `server.js` (example provided in comments)

## 📚 Next Steps

- Add sample courses and enrollments for testing
- Configure email notifications
- Set up file upload for documents
- Add rate limiting for security
- Implement refresh tokens
- Add API documentation with Swagger

## 💡 Tips

- Use `npm run dev` during development for auto-restart
- Check server logs for detailed error messages
- Use PostgreSQL GUI tools like pgAdmin for easier database management
- Test all endpoints with Postman or Thunder Client

---

**Need Help?** Check the main BACKEND_SETUP.md file for detailed documentation.
