
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "../ThemeToggle";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Web Design", path: "/web-design" },
    { name: "Digital Marketing", path: "/digital-marketing" },
    { name: "AI Services", path: "/ai-services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Driplare Logo"
            className="h-8 hidden dark:hidden"
          />
          <img
            src="/logo-white.png"
            alt="Driplare Logo"
            className="h-8 hidden dark:block"
          />
          <img
            src="/logo.png"
            alt="Driplare Logo"
            className="h-8 dark:hidden"
          />
        </Link>

        {!isMobile ? (
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admin">
                <Button variant="ghost" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium">
                  <Settings className="h-4 w-4" />
                  Admin Area
                </Button>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex items-center">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <MobileMenu />
          </div>
        )}
      </nav>
    </header>
  );
};
