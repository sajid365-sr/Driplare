
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
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
import { cn } from "@/lib/utils";
import { Code, BarChart2, Brain, MessageSquareCode, UserRound, SlidersHorizontal, ArrowRight } from "lucide-react";

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
        <Link to="/" className="text-2xl font-bold">
          <span className="text-primary">Drip</span>lare
        </Link>
        
        <div className="flex items-center space-x-1">
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
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/ai-services"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        >
                          <Brain className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            AI Solutions
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Leverage cutting-edge AI technology to transform your business capabilities.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/web-design" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center space-x-2">
                          <Code className="h-5 w-5 text-primary" />
                          <div className="text-sm font-medium leading-none">Web Design & Development</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Beautiful, responsive websites that convert visitors to customers.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/digital-marketing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center space-x-2">
                          <BarChart2 className="h-5 w-5 text-primary" />
                          <div className="text-sm font-medium leading-none">Digital Marketing</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Strategic campaigns that drive growth and increase visibility.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                          <div className="text-sm font-medium mb-2 text-muted-foreground">AI Services</div>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/ai-services#chatbot" className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
                                <MessageSquareCode className="h-4 w-4" />
                                <span>Chatbot Integration</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/ai-services#agents" className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
                                <UserRound className="h-4 w-4" />
                                <span>Custom AI Agents</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/ai-services#automation" className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span>AI Automation</span>
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
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
