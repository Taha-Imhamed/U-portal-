import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "#about" },
    { label: "Features", path: "#features" },
    { label: "Contact", path: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">U-Portal</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <Button onClick={() => navigate("/auth")}>Login</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.path}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button onClick={() => { navigate("/auth"); setIsOpen(false); }}>
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
