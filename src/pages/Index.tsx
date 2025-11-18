import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Calendar,
  FileText,
  BarChart,
  Shield,
  Landmark,
  MessageSquare,
  Globe,
  Star,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// **New Primary Color Concept:** Using a soft, professional light blue/teal (#007bff for primary, using utility classes for the implementation)

// Mock university image component (replace with an actual image in a real project)
const UniversityImage = ({ imageUrl, altText = "University Campus" }) => (
  <div className="w-full h-96 bg-gray-100 rounded-xl shadow-2xl overflow-hidden relative border border-gray-200">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    />
    <div className="absolute inset-0 bg-blue-600/10 backdrop-brightness-90"></div>
    <p className="absolute bottom-4 right-4 text-white text-xs font-light bg-black/50 px-2 py-1 rounded-sm">
      Image: {altText}
    </p>
  </div>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section - Lighter Background */}
      <div className="pt-24 pb-24 bg-white animate-fade-in flex-grow">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Hero Text Content */}
            <div className="animate-slide-up space-y-7">
              <h1 className="text-6xl lg:text-7xl font-black mb-4 text-gray-900 leading-tight">
                <span className="text-blue-600">Future-Proof</span> Your
                Education.
              </h1>
              <h2 className="text-2xl font-semibold text-blue-600 flex items-center">
                <Landmark className="h-8 w-8 mr-3 text-teal-500" /> U-Portal:
                The Next-Gen University Ecosystem
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Experience a centralized, intelligent platform designed to
                streamline all aspects of academic life—from course registration
                to financial management and personalized progress tracking.
              </p>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="text-lg px-10 py-6 font-bold shadow-lg bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  <Users className="w-5 h-5 mr-2" /> Secure Portal Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-lg px-10 py-6 text-blue-600 border-blue-600 hover:bg-blue-50/50 hover:text-blue-700 font-semibold"
                >
                  Discover Solutions
                </Button>
              </div>
            </div>

            {/* Hero Image / Placeholder */}
            <div className="hidden md:block animate-slide-up-delay">
              <UniversityImage imageUrl="https://cdncloudcart.com/40816/files/image/main-campus.jpg" altText="Main University Campus" />
            </div>
          </div>
        </div>
      </div>

      {/* --- */}

      {/* About Us / Mission Section - New Addition */}
      <div id="mission" className="py-24 bg-blue-50/50 border-t border-b border-blue-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-slow">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">
                Our Foundation
              </h3>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Empowering the Next Generation of Leaders
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At U-Portal, our mission is to provide an accessible, intuitive,
                and secure platform that eliminates administrative hurdles and
                fosters a community of learning and growth. We believe that
                technology should serve education, not complicate it.
              </p>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 mr-3 text-teal-500 flex-shrink-0" />{" "}
                  Seamless, Efficient Digital Workflows
                </li>
                <li className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-teal-500 flex-shrink-0" />{" "}
                  Global Standards for Data Security
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-3 text-teal-500 flex-shrink-0" />{" "}
                  Enhanced Communication & Collaboration
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              {/* Using the second provided image here for illustration */}
              <div className="h-80 w-full rounded-xl shadow-lg overflow-hidden flex items-center justify-center border border-blue-300">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlR_-mxSit6GDGSmdHkfRRjsjvMwJqfOt1w&s" alt="Modern University Building" className="object-cover w-full h-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- */}

      {/* Features Section - Cleaner and brighter */}
      <div id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">
              Integrated Technology
            </h3>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Core Platform Modules
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive suite of integrated tools designed to enhance
              efficiency and academic success for every user.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Course Management"
              description="Comprehensive course catalog with real-time enrollment and content delivery."
              icon={BookOpen}
            />
            <FeatureCard
              title="Grade & Analytics"
              description="Monitor academic performance with detailed analytics and secure grade submission."
              icon={BarChart}
            />
            <FeatureCard
              title="Real-Time Calendar"
              description="Integrated scheduling and automated attendance tracking for all classes and events."
              icon={Calendar}
            />
            <FeatureCard
              title="Financial Records"
              description="Secure tracking of tuition, fees, and payment history for students and parents."
              icon={FileText}
            />
            <FeatureCard
              title="Role-Based Access"
              description="Customized dashboards and secure permissions for students, faculty, and administrators."
              icon={Users}
            />
            <FeatureCard
              title="Secure Authentication"
              description="Enterprise-grade JWT-based security and comprehensive role management."
              icon={Shield}
            />
            <FeatureCard
              title="Academic Progress"
              description="Detailed academic progress reports, achievement tracking, and graduation audit."
              icon={Award}
            />
            <FeatureCard
              title="AI Assistant"
              description="24/7 AI-powered academic and administrative support for instant answers and help."
              icon={GraduationCap}
            />
          </div>
        </div>
      </div>

      {/* --- */}

      {/* Testimonials Section - New Addition, Emojis Removed */}
      <div id="testimonials" className="py-24 bg-gray-50/50 border-t">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2">
              Community Voices
            </h3>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="U-Portal has revolutionized how I manage my studies. The grade analytics are a game-changer for staying on track. Highly recommend!"
              name="Sarah J."
              title="Senior Student, Computer Science"
            />
            <TestimonialCard
              quote="The platform’s centralized communication and automated reporting save my team countless hours. It’s incredibly intuitive and reliable."
              name="Dr. Alan K."
              title="Head of Faculty, Business Administration"
            />
            <TestimonialCard
              quote="Paying tuition and viewing my son's financial history has never been easier. The security features also give me great peace of mind."
              name="Maria P."
              title="Parent and Account Guardian"
            />
          </div>
        </div>
      </div>

      {/* --- */}

      {/* Stats Section - Re-colored for the new theme */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold">U-Portal Impact At A Glance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-extrabold mb-2 text-white">
                10K+
              </div>
              <div className="text-xl font-medium opacity-90 text-blue-50">
                Registered Students
              </div>
            </div>
            <div>
              <div className="text-6xl font-extrabold mb-2 text-white">
                500+
              </div>
              <div className="text-xl font-medium opacity-90 text-blue-50">
                Faculty Members
              </div>
            </div>
            <div>
              <div className="text-6xl font-extrabold mb-2 text-white">
                200+
              </div>
              <div className="text-xl font-medium opacity-90 text-blue-50">
                Active Courses
              </div>
            </div>
            <div>
              <div className="text-6xl font-extrabold mb-2 text-white">
                50+
              </div>
              <div className="text-xl font-medium opacity-90 text-blue-50">
                Academic Departments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- */}

      {/* CTA Section - Re-colored for the new theme */}
      <div id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto text-center p-12 lg:p-16 shadow-2xl border-t-4 border-blue-600/70">
            <CardHeader>
              <CardTitle className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                Ready to Transform Your University Experience?
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 mt-4">
                Access your personalized dashboard today and connect with your
                academic community.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-xl px-16 py-8 shadow-lg hover:shadow-xl transition-all font-semibold bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="w-6 h-6 mr-3" /> Securely Access Portal
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

// Helper component for cleaner feature section (Re-themed)
const FeatureCard = ({ title, description, icon: Icon }) => (
  <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:border-blue-600 border border-gray-200">
    <CardHeader className="flex-grow">
      <div className="p-3 bg-blue-50 rounded-xl w-fit mb-4 border border-blue-100">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
      <CardDescription className="pt-2 text-gray-600">
        {description}
      </CardDescription>
    </CardHeader>
  </Card>
);

// Helper component for testimonials (New Addition)
const TestimonialCard = ({ quote, name, title }) => (
  <Card className="h-full p-6 shadow-lg border-l-4 border-teal-500 bg-white">
    <Star className="h-5 w-5 text-yellow-500 mb-4 fill-yellow-500" />
    <blockquote className="text-lg italic text-gray-700 mb-6 leading-relaxed">
      "{quote}"
    </blockquote>
    <div>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-blue-600">{title}</p>
    </div>
  </Card>
);

export default Index;
