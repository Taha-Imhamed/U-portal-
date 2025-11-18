// API configuration and helper functions
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'professor' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Request failed' };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(
    email: string,
    password: string,
    fullName: string,
    role: 'student' | 'professor' | 'admin'
  ): Promise<ApiResponse<{ message: string; userId: string }>> {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName, role }),
    });
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiRequest('/auth/me');
  },
};

// Student API
export const studentApi = {
  async getDashboard() {
    return apiRequest('/student/dashboard');
  },

  async getGrades() {
    return apiRequest('/student/grades');
  },

  async getAttendance() {
    return apiRequest('/student/attendance');
  },

  async getFinancial() {
    return apiRequest('/student/financial');
  },
};

// Professor API
export const professorApi = {
  async getCourses() {
    return apiRequest('/professor/courses');
  },

  async getCourseStudents(courseId: string) {
    return apiRequest(`/professor/courses/${courseId}/students`);
  },

  async uploadGrade(data: {
    enrollmentId: string;
    gradeType: string;
    score: number;
    maxScore: number;
    comments?: string;
  }) {
    return apiRequest('/professor/grades', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async markAttendance(enrollmentId: string, status: string) {
    return apiRequest('/professor/attendance', {
      method: 'POST',
      body: JSON.stringify({ enrollmentId, status }),
    });
  },
};

// Admin API
export const adminApi = {
  async getUsers() {
    return apiRequest('/admin/users');
  },

  async getStats() {
    return apiRequest('/admin/stats');
  },

  async createAnnouncement(data: {
    title: string;
    content: string;
    targetRole?: 'student' | 'professor' | 'admin';
  }) {
    return apiRequest('/admin/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
