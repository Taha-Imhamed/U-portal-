import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Users, LogOut, GraduationCap } from 'lucide-react';
import { professorApi, type User } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function ProfessorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    const userData = JSON.parse(userStr);
    if (userData.role !== 'professor') {
      navigate('/auth');
      return;
    }
    setUser(userData);
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await professorApi.getCourses();
    if (data) setCourses(data as any[]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({ title: 'Logged out successfully' });
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">U-Portal</h1>
              <p className="text-sm text-muted-foreground">Professor Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-foreground">{user.fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, Prof. {user.fullName.split(' ')[1] || user.fullName}</h2>
          <p className="text-muted-foreground">Manage your courses and students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{courses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {courses.reduce((sum, course) => sum + (course.student_count || 0), 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                Pending Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Courses - Fall 2025</CardTitle>
                <CardDescription>Courses you're currently teaching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.length > 0 ? (
                    courses.map((course: any) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.code} • {course.credits} Credits • {course.semester}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              {course.student_count} students
                            </p>
                            <p className="text-xs text-muted-foreground">{course.department?.name}</p>
                          </div>
                          <Button size="sm">Manage</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No courses assigned. Connect your backend to see your courses.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gradebook" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gradebook Management</CardTitle>
                <CardDescription>Upload and manage student grades</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Select a course to manage grades. Connect your backend to upload grades.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>Mark student attendance for your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Select a course to mark attendance. Connect your backend to track attendance.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
