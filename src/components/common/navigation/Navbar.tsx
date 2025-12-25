import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import {
  Bot,
  Workflow,
  Code2,
  Database,
  Briefcase,
  Bell,
  Brain,
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { NotificationsDropdown } from "../notifications/NotificationsDropdown";
import AdminLoginModal from "@/components/admin/AdminLoginModal";
import { getNotifications } from "@/utils/notification-utils";
import { Notification as NotificationType } from "@/utils/notification-utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const unreadCount = notifications?.filter((n) => !n.read).length;

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

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/50 backdrop-blur-sm shadow-sm pt-3"
          : "bg-transparent pt-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <img src="/logo-white.png" alt="Driplare Logo" width={120} />
        </Link>

        <div className="flex relative items-center space-x-1">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {/* Featured Service */}
                    <li className="row-span-3 bg-[url(/ai-solution.png)] bg-cover">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/ai-agents"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-black/40 to-black/60 p-6 no-underline hover:bg-primary/25 outline-none focus:shadow-md"
                        >
                          <Bot className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white hover:text-primary">
                            Custom AI Agents
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Autonomous digital workers that handle complex tasks
                            24/7 with human-like intelligence.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {/* Workflow Automation */}
                    <li>
                      <Link
                        to="/workflow-automation"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/25 focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center space-x-2">
                          <Workflow className="h-5 w-5 text-primary" />
                          <div className="text-sm font-medium leading-none hover:text-primary">
                            Workflow Automation
                          </div>
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          End-to-end process streamlining to eliminate manual
                          tasks and boost efficiency.
                        </p>
                      </Link>
                    </li>

                    {/* Web Development */}
                    <li>
                      <Link
                        to="/web-development"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/25 focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center space-x-2">
                          <Code2 className="h-5 w-5 text-primary" />
                          <div className="text-sm font-medium leading-none hover:text-primary">
                            Full-Stack Web Development
                          </div>
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          MERN stack specialization for scalable, modern web
                          applications.
                        </p>
                      </Link>
                    </li>

                    {/* More Services */}
                    <li>
                      <NavigationMenuLink asChild>
                        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                          <div className="text-sm font-medium mb-2 text-muted-foreground">
                            More Services
                          </div>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                to="/data-scraping"
                                className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
                              >
                                <Database className="h-4 w-4" />
                                <span>Data Scraping & Monitoring</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/b2b-consulting"
                                className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
                              >
                                <Briefcase className="h-4 w-4" />
                                <span>B2B Technical Consulting</span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/portfolio">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Portfolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/insights">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Insights
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link onClick={() => setShowLoginModal(true)} to="#">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Admin Area
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              className="p-1.5 rounded-md hover:bg-accent/50 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount ? (
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              ) : null}
            </button>
            {showNotifications && (
              <NotificationsDropdown
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          <AdminLoginModal
            open={showLoginModal}
            setClose={setShowLoginModal}
            onSuccess={handleLoginSuccess}
          />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
