import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Calendar, DollarSign, LogOut, Bell, GraduationCap } from 'lucide-react';
import { studentApi, type User } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [grades, setGrades] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [financial, setFinancial] = useState<any[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(userStr));
    loadData();
  }, []);

  const loadData = async () => {
    const { data: dashData } = await studentApi.getDashboard();
    const { data: gradesData } = await studentApi.getGrades();
    const { data: attendanceData } = await studentApi.getAttendance();
    const { data: financialData } = await studentApi.getFinancial();

    if (dashData) setDashboardData(dashData);
    if (gradesData) setGrades(gradesData as any[]);
    if (attendanceData) setAttendance(attendanceData as any[]);
    if (financialData) setFinancial(financialData as any[]);
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
              <p className="text-sm text-muted-foreground">Student Dashboard</p>
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.fullName.split(' ')[0]}!</h2>
          <p className="text-muted-foreground">Here's what's happening with your academics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {dashboardData?.courses?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Attendance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">92%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                Current GPA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3.67</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Balance Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">$1,200</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Courses - Fall 2025</CardTitle>
                <CardDescription>Your current course load</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.courses?.map((course: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.code} • {course.professor_name} • {course.credits} Credits
                        </p>
                      </div>
                      <Badge variant="secondary">{course.status}</Badge>
                    </div>
                  )) || (
                    <p className="text-center text-muted-foreground py-8">
                      No courses enrolled yet. Connect your backend to see your courses.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Grade Report</CardTitle>
                <CardDescription>Your academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grades.length > 0 ? (
                    grades.map((grade: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{grade.course_name}</h3>
                          <p className="text-sm text-muted-foreground">{grade.grade_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {grade.score}/{grade.max_score}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {((grade.score / grade.max_score) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No grades available. Connect your backend to see your grades.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Record</CardTitle>
                <CardDescription>Your class attendance history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendance.length > 0 ? (
                    attendance.map((record: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-foreground">{record.course_name}</h3>
                          <p className="text-sm text-muted-foreground">{record.date}</p>
                        </div>
                        <Badge
                          variant={record.status === 'present' ? 'default' : 'destructive'}
                        >
                          {record.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No attendance records. Connect your backend to see your attendance.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Status</CardTitle>
                <CardDescription>Your payment history and balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financial.length > 0 ? (
                    financial.map((record: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-foreground">{record.description}</h3>
                          <p className="text-sm text-muted-foreground">
                            {record.date} • {record.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            ${record.amount}
                          </p>
                          <Badge variant={record.status === 'paid' ? 'default' : 'destructive'}>
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No financial records. Connect your backend to see your financial status.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Announcements
                </CardTitle>
                <CardDescription>Important updates from your university</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.announcements?.map((announcement: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground">
                        By {announcement.author_name} • {new Date(announcement.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  )) || (
                    <p className="text-center text-muted-foreground py-8">
                      No announcements available. Connect your backend to see announcements.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
