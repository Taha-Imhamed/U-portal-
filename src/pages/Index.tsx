import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Users, Award, Calendar, FileText, BarChart, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-fade-in">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 animate-slide-up">
              <GraduationCap className="h-24 w-24 text-primary" />
            </div>
            <h1 className="text-6xl font-bold mb-6 text-foreground animate-slide-up">
              Welcome to U-Portal
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 animate-slide-up">
              Your comprehensive university management system connecting students, professors, and administrators in one powerful platform.
            </p>
            <div className="flex gap-4 justify-center animate-slide-up">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for modern university management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Course Management</CardTitle>
                <CardDescription>
                  Comprehensive course catalog with real-time enrollment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <BarChart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Grade Tracking</CardTitle>
                <CardDescription>
                  Monitor academic performance with detailed analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Attendance System</CardTitle>
                <CardDescription>
                  Automated attendance tracking and reporting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Financial Records</CardTitle>
                <CardDescription>
                  Track tuition, fees, and payment history
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Customized dashboards for students, professors, and admins
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  JWT-based security with role management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>
                  Detailed academic progress and achievement tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  24/7 AI-powered support for all your questions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Professors</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-lg opacity-90">Courses</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Departments</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto text-center p-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-4xl mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of students and educators using U-Portal to streamline their academic journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-12">
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
