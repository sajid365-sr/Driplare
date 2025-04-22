
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          <span className="text-primary">Drip</span>lare
        </a>
        
        <div className="flex items-center space-x-1">
          <nav className="hidden md:flex items-center space-x-8 mr-8">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a>
            <a href="#stats" className="hover:text-primary transition-colors">Stats</a>
            <a href="#newsletter" className="hover:text-primary transition-colors">Newsletter</a>
          </nav>
          <ThemeToggle />
          <Button className="ml-4 bg-primary hover:bg-primary/90 hidden md:inline-flex" size="sm">
            Get Started
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
