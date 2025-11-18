import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Users, Award, Calendar, FileText, BarChart, Shield, Landmark } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock university image component (replace with an actual image in a real project)
const UniversityImage = () => (
  <div className="w-full h-96 bg-gray-200 rounded-lg shadow-xl overflow-hidden relative">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://cdncloudcart.com/40816/files/image/main-campus.jpg')" }} />
    <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75"></div>
    <div className="absolute inset-0 flex items-center justify-center">
    </div>
    <p className="absolute bottom-4 left-4 text-white text-sm font-light">Image placeholder: University Campus</p>
  </div>
);


const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-24 bg-gradient-to-br from-gray-50/50 via-background to-primary/10 animate-fade-in flex-grow">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text Content */}
            <div className="animate-slide-up space-y-6">
              <h1 className="text-6xl lg:text-7xl font-extrabold mb-4 text-gray-900 leading-tight">
                <span className="text-primary">Elevate</span> Your Education.
              </h1>
              <h2 className="text-2xl font-semibold text-primary flex items-center">
                <GraduationCap className="h-8 w-8 mr-3" /> U-Portal: University Management System
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                The comprehensive digital hub connecting students, faculty, and administration. Seamlessly manage courses, grades, finances, and communication on one secure, powerful platform.
              </p>
              
              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="text-lg px-10 py-6 font-semibold shadow-xl bg-primary hover:bg-primary/90 transition-all"
                >
                  Student / Faculty Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-lg px-10 py-6 text-primary border-primary hover:bg-primary/5"
                >
                  Explore Features
                </Button>
              </div>
            </div>

            {/* Hero Image / Placeholder */}
            <div className="hidden md:block animate-slide-up-delay">
                <UniversityImage />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50 border-t">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Core Platform Modules</h2>
            <p className="text-xl text-gray-500">A suite of integrated tools designed to enhance efficiency and academic success.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard title="Course Management" description="Comprehensive course catalog with real-time enrollment and content delivery." icon={BookOpen} />
            <FeatureCard title="Grade & Analytics" description="Monitor academic performance with detailed analytics and secure grade submission." icon={BarChart} />
            <FeatureCard title="Real-Time Calendar" description="Integrated scheduling and automated attendance tracking for all classes and events." icon={Calendar} />
            <FeatureCard title="Financial Records" description="Secure tracking of tuition, fees, and payment history for students and parents." icon={FileText} />
            <FeatureCard title="Role-Based Access" description="Customized dashboards and secure permissions for students, faculty, and administrators." icon={Users} />
            <FeatureCard title="Secure Authentication" description="Enterprise-grade JWT-based security and comprehensive role management." icon={Shield} />
            <FeatureCard title="Academic Progress" description="Detailed academic progress reports, achievement tracking, and graduation audit." icon={Award} />
            <FeatureCard title="AI Assistant" description="24/7 AI-powered academic and administrative support for instant answers." icon={GraduationCap} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
             <h3 className="text-3xl font-bold">U-Portal Impact At A Glance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-extrabold mb-2">10K+</div>
              <div className="text-xl font-medium opacity-90">Registered Students</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold mb-2">500+</div>
              <div className="text-xl font-medium opacity-90">Faculty Members</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold mb-2">200+</div>
              <div className="text-xl font-medium opacity-90">Active Courses</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold mb-2">50+</div>
              <div className="text-xl font-medium opacity-90">Academic Departments</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto text-center p-12 lg:p-16 shadow-2xl border-t-4 border-primary/70">
            <CardHeader>
              <CardTitle className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Ready to Transform Your University Experience?</CardTitle>
              <CardDescription className="text-xl text-gray-600 mt-4">
                Access your personalized dashboard today and connect with your academic community.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Button size="lg" onClick={() => navigate("/auth")} className="text-xl px-16 py-8 shadow-lg hover:shadow-xl transition-all font-semibold">
                Securely Access Portal
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

// Helper component for cleaner feature section
const FeatureCard = ({ title, description, icon: Icon }) => (
    <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:border-primary/50 border border-gray-200">
        <CardHeader className="flex-grow">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Icon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
            <CardDescription className="pt-2 text-gray-500">
                {description}
            </CardDescription>
        </CardHeader>
    </Card>
);

export default Index;
