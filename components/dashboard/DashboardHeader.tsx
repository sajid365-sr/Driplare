"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/header-logo-black.png" alt="Driplare" width={140} className="dark:hidden block" />
          <img src="/header-logo-white.png" alt="Driplare" width={140} className="hidden dark:block" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Client Portal
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
