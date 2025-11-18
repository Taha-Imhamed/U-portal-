import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Book, LogOut, GraduationCap, DollarSign, Bell, PlusCircle } from 'lucide-react';
import { adminApi, type User } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label'; // Assuming these exist
import { Input } from '@/components/ui/input'; // Assuming these exist
import { Textarea } from '@/components/ui/textarea'; // Assuming these exist
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming these exist

// Define the shape for a new announcement
interface NewAnnouncement {
  title: string;
  content: string;
  targetRole: 'student' | 'professor' | 'admin' | null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  // NEW STATE: For announcement form
  const [newAnnouncement, setNewAnnouncement] = useState<NewAnnouncement>({
    title: '',
    content: '',
    targetRole: null,
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    const userData = JSON.parse(userStr);
    if (userData.role !== 'admin') {
      navigate('/auth');
      return;
    }
    setUser(userData);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // NOTE: It's good practice to wrap API calls in a try/catch block
      const { data: usersData } = await adminApi.getUsers();
      const { data: statsData } = await adminApi.getStats();

      if (usersData) setUsers(usersData as any[]);
      if (statsData) setStats(statsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load system statistics or user data. Check backend connection.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({ title: 'Logged out successfully' });
    navigate('/auth');
  };

  // --- NEW CRUD ACTION PLACEHOLDERS ---

  const handleEditUser = (userId: string) => {
    // In a full application, this would open a modal/drawer to edit user details
    console.log(`Editing user with ID: ${userId}`);
    toast({ title: 'Action Needed', description: `API call to UPDATE user ${userId} is missing.` });
    // TODO: Implement actual API call (e.g., adminApi.updateUser(userId, updatedData))
  };

  const handleAddCourse = () => {
    // In a full application, this would open a form/modal for new course details
    console.log('Adding new course');
    toast({ title: 'Action Needed', description: 'API call to POST new course data is missing.' });
    // TODO: Implement actual API call (e.g., adminApi.createCourse(courseData))
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content || !newAnnouncement.targetRole) {
      toast({ title: 'Validation Failed', description: 'Please fill in all announcement fields.', variant: 'destructive' });
      return;
    }

    try {
      await adminApi.createAnnouncement(newAnnouncement);
      toast({ title: 'Success', description: 'Announcement created successfully.' });
      // Reset form
      setNewAnnouncement({ title: '', content: '', targetRole: null });
      // Optional: reload announcements list if you implemented one
    } catch (error) {
      console.error('Failed to create announcement:', error);
      toast({ title: 'Error', description: 'Failed to create announcement.', variant: 'destructive' });
    }
  };

  // ------------------------------------

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header (No changes here) */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">U-Portal</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
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
          <h2 className="text-3xl font-bold text-foreground mb-2">System Administration</h2>
          <p className="text-muted-foreground">Manage users, courses, and university data</p>
        </div>

        {/* Quick Stats (No changes here) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.students || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Total Professors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.professors || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stats?.courses || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">$45,600</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all system users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length > 0 ? (
                    users.map((u: any) => (
                      <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{u.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                            {u.role}
                          </Badge>
                          {/* UPDATED: Added onClick handler */}
                          <Button size="sm" variant="outline" onClick={() => handleEditUser(u.id)}>Edit</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No users found. Connect your backend to manage users.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Management */}
          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage university courses and departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  {/* UPDATED: Added onClick handler */}
                  <Button onClick={handleAddCourse}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Course
                  </Button>
                </div>
                <p className="text-center text-muted-foreground py-4">
                  Connect your backend to manage courses.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements - NEW FORM ADDED */}
          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  System Announcements
                </CardTitle>
                <CardDescription>Create and manage announcements for all users</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="announcementTitle">Title</Label>
                      <Input
                        id="announcementTitle"
                        placeholder="e.g., Spring Semester Registration Opens"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetRole">Target Role</Label>
                      <Select onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, targetRole: value as NewAnnouncement['targetRole'] })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target audience (All if empty)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Students</SelectItem>
                          <SelectItem value="professor">Professors</SelectItem>
                          <SelectItem value="admin">Admins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="announcementContent">Content</Label>
                    <Textarea
                      id="announcementContent"
                      placeholder="Write your detailed announcement here..."
                      rows={5}
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    />
                  </div>
                  <Button type="submit">
                    <Bell className="w-4 h-4 mr-2" /> Publish Announcement
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports (No changes here) */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>View system analytics and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Reports and analytics will be available once backend is connected.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}