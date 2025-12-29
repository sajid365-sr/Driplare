import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Bot, Workflow, Code2, Database, Briefcase, Bell } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";

// Clerk Imports
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for active link styling
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="relative z-10 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Driplare" width={150} className="" />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-2">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10 transition-colors",
                    isActive("/") && "text-primary font-semibold"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuItem>

              {/* Preserved Solutions Layout */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-primary/10",
                    location.pathname.includes("solution") && "text-primary"
                  )}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[550px] md:grid-cols-2 lg:w-[650px] bg-popover">
                    {/* Featured Item: Custom AI Agents */}
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/ai-agents"
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-[url(/ai-solution.png)] bg-cover bg-center p-6 no-underline outline-none relative overflow-hidden group border border-border/50"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-primary/80 transition-all duration-500" />
                          <div className="relative z-10">
                            <Bot className="h-7 w-7 text-white mb-2" />
                            <div className="text-xl font-bold text-white mb-2">
                              Custom AI Agents
                            </div>
                            <p className="text-sm leading-snug text-white/80">
                              Autonomous digital workers that handle complex
                              tasks 24/7 with human-like logic.
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {/* Standard Links */}
                    <li>
                      <Link
                        to="/workflow-automation"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/10 hover:translate-x-1 group"
                      >
                        <div className="flex items-center gap-2">
                          <Workflow className="h-5 w-5 text-primary" />
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                            Workflow Automation
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          End-to-end process streamlining to boost efficiency.
                        </p>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/web-development"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/10 hover:translate-x-1 group"
                      >
                        <div className="flex items-center gap-2">
                          <Code2 className="h-5 w-5 text-primary" />
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                            Full-Stack Development
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Scalable MERN stack applications for modern business.
                        </p>
                      </Link>
                    </li>

                    {/* Footer Section of Menu */}
                    <li className="mt-2 border-t border-border pt-4 px-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-3">
                        Enterprise Capabilities
                      </span>
                      <div className="flex flex-col gap-3">
                        <Link
                          to="/data-scraping"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Database className="h-4 w-4" /> Data Scraping &
                          Monitoring
                        </Link>
                        <Link
                          to="/b2b-consulting"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Briefcase className="h-4 w-4" /> Technical Consulting
                        </Link>
                      </div>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/case-studies"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/case-studies") && "text-primary"
                  )}
                >
                  Case Studies
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/agent-marketplace"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/agent-marketplace") && "text-primary font-bold"
                  )}
                >
                  Marketplace
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/pricing"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/pricing") && "text-primary"
                  )}
                >
                  Pricing
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Area: Notifications, Auth, etc */}
          <div className="flex items-center gap-3 ml-4 border-l border-border/50 pl-4">
            {/* Clerk Logic */}
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <Link to="/sign-in">
                  <Button variant="ghost" className="text-sm font-medium">
                    Login
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-primary text-white rounded-full px-5 text-sm font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                    Get Started
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-primary/10 relative"
                aria-label="Toggle notifications"
              >
                <Bell size={20} />
              </button>
              {showNotifications && (
                <NotificationsDropdown
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
