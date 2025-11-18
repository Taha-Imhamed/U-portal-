# U-Portal Project Structure

## Overview
U-Portal is a comprehensive university management system with separate dashboards for Students, Professors, and Administrators. The project is built with React, TypeScript, and Tailwind CSS on the frontend, with a Node.js backend.

## Project Architecture

```
u-portal/
├── public/                 # Static assets
│   ├── robots.txt         # SEO robots configuration
│   └── favicon.ico        # Website icon
│
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── ChatBot.tsx   # AI support chat widget
│   │   ├── Navbar.tsx    # Navigation bar
│   │   └── Footer.tsx    # Footer component
│   │
│   ├── pages/            # Page components
│   │   ├── Index.tsx           # Landing page
│   │   ├── Auth.tsx            # Login/Register page
│   │   ├── StudentDashboard.tsx    # Student interface
│   │   ├── ProfessorDashboard.tsx  # Professor interface
│   │   ├── AdminDashboard.tsx      # Admin interface
│   │   └── NotFound.tsx            # 404 page
│   │
│   ├── lib/              # Utility functions and API
│   │   ├── api.ts       # API client for backend communication
│   │   └── utils.ts     # Helper functions
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and design system
│
├── BACKEND_SETUP.md      # Backend installation guide
├── PROJECT_STRUCTURE.md  # This file
├── README.md            # Project overview
└── package.json         # Dependencies and scripts
```

## Key Technologies

### Frontend Stack
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **React Router**: Client-side routing
- **TanStack Query**: Data fetching and caching
- **Lucide React**: Icon library

### Backend Stack (separate setup)
- **Node.js**: Runtime environment
- **Express**: Web framework
- **PostgreSQL**: Database
- **JWT**: Authentication
- **bcrypt**: Password hashing

## Core Features

### 1. Authentication System
- **Location**: `src/pages/Auth.tsx`
- **Features**:
  - Login and registration forms
  - JWT token management
  - Role-based access control
  - Secure password handling

### 2. Role-Based Dashboards

#### Student Dashboard (`src/pages/StudentDashboard.tsx`)
- View enrolled courses
- Check grades and GPA
- Track attendance
- View financial records
- Receive announcements

#### Professor Dashboard (`src/pages/ProfessorDashboard.tsx`)
- Manage courses
- View enrolled students
- Upload grades
- Mark attendance
- Create assignments

#### Admin Dashboard (`src/pages/AdminDashboard.tsx`)
- Manage all users
- View system statistics
- Create announcements
- Oversee departments
- Monitor system activity

### 3. AI Chat Support
- **Location**: `src/components/ChatBot.tsx`
- **Features**:
  - Floating chat widget
  - Real-time messaging interface
  - Backend integration ready
  - Mobile-responsive design

### 4. Navigation System
- **Navbar** (`src/components/Navbar.tsx`):
  - Responsive design
  - Mobile menu with sheet component
  - Quick access to all sections
  
- **Footer** (`src/components/Footer.tsx`):
  - Site information
  - Quick links
  - Contact details

## Design System

### Colors (src/index.css)
The project uses a professional blue theme with semantic tokens:

- **Primary**: Blue (`217 91% 42%`) - University brand color
- **Secondary**: Light blue/gray for secondary actions
- **Accent**: Brighter blue for highlights
- **Background**: Light gray for comfortable reading
- **Card**: White for content containers
- **Destructive**: Red for warnings and errors

All colors use HSL format for easy theming and are accessible via CSS variables like `--primary`, `--secondary`, etc.

### Animations
Custom animations defined in `src/index.css`:
- `animate-fade-in`: Smooth fade in effect
- `animate-slide-up`: Slide up with fade
- `animate-slide-in-right`: Slide in from right

### Responsive Design
- **Mobile-first approach**: Designed for mobile, enhanced for desktop
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

## API Integration

### API Client (`src/lib/api.ts`)
Centralized API communication with the backend:

```typescript
// Base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Authentication
authApi.login(email, password)
authApi.register(name, email, password, role)
authApi.getCurrentUser()

// Student endpoints
studentApi.getDashboard()
studentApi.getGrades()
studentApi.getAttendance()
studentApi.getFinancial()

// Professor endpoints
professorApi.getCourses()
professorApi.getCourseStudents(courseId)
professorApi.uploadGrade(gradeData)
professorApi.markAttendance(attendanceData)

// Admin endpoints
adminApi.getUsers()
adminApi.getStats()
adminApi.createAnnouncement(announcement)
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

For production, update this to your deployed backend URL.

## Development Workflow

### Running the Frontend
```bash
npm install      # Install dependencies
npm run dev      # Start development server (http://localhost:8080)
```

### Running the Backend
See `BACKEND_SETUP.md` for detailed backend setup instructions.

### Building for Production
```bash
npm run build    # Create production build
npm run preview  # Preview production build
```

## Security Features

### Frontend Security
- JWT token stored in localStorage
- Token sent with each authenticated request
- Protected routes for different user roles
- Input validation on forms
- XSS protection via React

### Backend Security (when implemented)
- Password hashing with bcrypt
- JWT authentication
- Parameterized SQL queries (prevents SQL injection)
- CORS configuration
- Rate limiting (recommended)
- Input validation (recommended)

## Mobile Responsiveness

All components are mobile-friendly:
- **Navbar**: Hamburger menu on mobile
- **Dashboards**: Single column layout on mobile, grid on desktop
- **Cards**: Stack vertically on small screens
- **Chat Bot**: Responsive width and positioning
- **Forms**: Touch-friendly input sizes

## Folder Conventions

### Components
- Place reusable components in `src/components/`
- Use PascalCase for component names
- One component per file
- Co-locate component-specific styles if needed

### Pages
- Each page in `src/pages/` corresponds to a route
- Use PascalCase for page names
- Keep pages focused on layout and composition
- Extract complex logic to custom hooks

### API Functions
- Group by feature in `src/lib/api.ts`
- Use consistent naming: `<action><Resource>()`
- Handle errors uniformly
- Return typed responses

## Best Practices

### Code Organization
1. Import order: React, external libs, internal components, styles
2. Use TypeScript interfaces for all props and data
3. Extract complex logic into custom hooks
4. Keep components under 300 lines

### Styling
1. Use Tailwind utility classes
2. Reference design tokens from `index.css`
3. Avoid inline styles
4. Use responsive classes (`md:`, `lg:`, etc.)

### State Management
1. Use React Query for server state
2. Use React hooks for local state
3. Lift state only when necessary
4. Consider Context for global UI state

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`

### Adding a New API Endpoint
1. Add function to `src/lib/api.ts`
2. Define TypeScript interface for response
3. Handle errors appropriately
4. Update backend route handler

### Adding a New UI Component
1. Create component in `src/components/YourComponent.tsx`
2. Export from component file
3. Import and use where needed
4. Ensure mobile responsiveness

## Troubleshooting

### Frontend Issues
- **Build errors**: Check TypeScript types and imports
- **API errors**: Verify backend is running and URL is correct
- **Styling issues**: Check Tailwind classes and design tokens

### Backend Issues
See `BACKEND_SETUP.md` for backend-specific troubleshooting.

## Next Steps

1. Set up the backend (see `BACKEND_SETUP.md`)
2. Connect AI chat to a language model API
3. Add email notifications
4. Implement file upload functionality
5. Add real-time features with WebSockets
6. Set up automated testing
7. Configure CI/CD pipeline

## Support

For issues or questions:
1. Check the documentation files
2. Review the codebase comments
3. Consult the BACKEND_SETUP.md for backend issues
4. Check browser console for frontend errors
5. Check server logs for backend errors
