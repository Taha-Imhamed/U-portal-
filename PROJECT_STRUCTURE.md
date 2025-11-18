# U-Portal Project Structure

## Overview

## Project Architecture u need to know it to be cool 

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

