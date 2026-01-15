"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
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
  ShieldCheck,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

// Clerk Imports
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper for active link styling
  const isActive = (path: string) => pathname === path;

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
          href="/"
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
                  href="/"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10 transition-colors",
                    isActive("/") && "text-primary font-semibold"
                  )}
                >
                  {t("navigation.home")}
                </Link>
              </NavigationMenuItem>

              {/* Preserved Solutions Layout */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-primary/10",
                    pathname.includes("solution") && "text-primary"
                  )}
                >
                  {t("navigation.solutions")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[550px] md:grid-cols-2 lg:w-[650px] bg-popover">
                    {/* Featured Item: Custom AI Agents */}
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/solutions/ai-agents"
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-[url(/ai-solution.png)] bg-cover bg-center p-6 no-underline outline-none relative overflow-hidden group border border-border/50"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-primary/80 transition-all duration-500" />
                          <div className="relative z-10">
                            <Bot className="h-7 w-7 text-white mb-2" />
                            <div className="text-xl font-bold text-white mb-2">
                              {t("navigation.customAIAgents")}
                            </div>
                            <p className="text-sm leading-snug text-white/80">
                              {t("navigation.customAIAgentsDesc")}
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {/* Standard Links */}
                    <li>
                      <Link
                        href="/solutions/workflow-automation"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/10 hover:translate-x-1 group"
                      >
                        <div className="flex items-center gap-2">
                          <Workflow className="h-5 w-5 text-primary" />
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {t("navigation.workflowAutomation")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {t("navigation.workflowAutomationDesc")}
                        </p>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/solutions/web-development"
                        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/10 hover:translate-x-1 group"
                      >
                        <div className="flex items-center gap-2">
                          <Code2 className="h-5 w-5 text-primary" />
                          <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {t("navigation.fullStackDevelopment")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {t("navigation.fullStackDevelopmentDesc")}
                        </p>
                      </Link>
                    </li>

                    {/* Footer Section of Menu */}
                    <li className="mt-2 border-t border-border pt-4 px-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-3">
                        {t("navigation.enterpriseCapabilities")}
                      </span>
                      <div className="flex flex-col gap-3">
                        <Link
                          href="/solutions/data-scraping"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Database className="h-4 w-4" />{" "}
                          {t("navigation.dataScraping")}
                        </Link>
                        <Link
                          href="/solutions/b2b-consulting"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Briefcase className="h-4 w-4" />{" "}
                          {t("navigation.technicalConsulting")}
                        </Link>
                      </div>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/case-studies"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/case-studies") && "text-primary"
                  )}
                >
                  {t("navigation.caseStudies")}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/agent-marketplace"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/agent-marketplace") && "text-primary font-bold"
                  )}
                >
                  {t("navigation.marketplace")}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/pricing"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/pricing") && "text-primary"
                  )}
                >
                  {t("navigation.pricing")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/insights"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-primary/10",
                    isActive("/insights") && "text-primary"
                  )}
                >
                  {t("navigation.insights")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/20 transition-all"
                  >
                    <ShieldCheck size={14} />
                    Admin Panel
                  </Link>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Area: Notifications, Auth, etc */}
          <div className="flex items-center gap-3 ml-4 border-l border-border/50 pl-4">
            {/* Clerk Logic */}
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-sm font-medium">
                    {t("navigation.login")}
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-primary text-white rounded-full px-5 text-sm font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                    {t("navigation.getStarted")}
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* <div className="relative">
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
            </div> */}

            <LanguageSwitcher />
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
