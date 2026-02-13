'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  Bot,
  Workflow,
  Code2,
  Briefcase,
  LayoutGrid,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  DollarSign,
  Brain,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full hover:bg-primary/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] md:hidden sm:w-[400px] p-0 border-l border-border/40"
      >
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="p-6 text-left border-b border-border/40">
            <SheetTitle>
              <img src="/logo.png" alt="Driplare" width={110} className="" />
            </SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all font-medium text-lg"
            >
              <TrendingUp className="h-5 w-5 text-primary" /> Home
            </Link>

            <Accordion type="single" collapsible>
              <AccordionItem value="solutions" className="border-none">
                <AccordionTrigger className="hover:no-underline p-3 rounded-xl hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-4 font-medium text-lg">
                    <LayoutGrid className="h-5 w-5 text-primary" /> Solutions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2 ml-4 border-l-2 border-primary/10">
                  <div className="flex flex-col space-y-1 pl-4">
                    <MobileNavLink
                      href="/ai-agents"
                      icon={Bot}
                      label="Custom AI Agents"
                      onClick={closeMenu}
                    />
                    <MobileNavLink
                      href="/workflow-automation"
                      icon={Workflow}
                      label="Workflow Automation"
                      onClick={closeMenu}
                    />
                    <MobileNavLink
                      href="/web-development"
                      icon={Code2}
                      label="Web Development"
                      onClick={closeMenu}
                    />
                    <MobileNavLink
                      href="/b2b-consulting"
                      icon={Briefcase}
                      label="B2B Consulting"
                      onClick={closeMenu}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/case-studies"
              onClick={closeMenu}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all font-medium text-lg"
            >
              <ArrowRight className="h-5 w-5 text-primary" /> Case Studies
            </Link>

            <Link
              href="/agent-marketplace"
              onClick={closeMenu}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all font-medium text-lg"
            >
              <ShoppingBag className="h-5 w-5 text-primary" /> Agent Marketplace
            </Link>

            <Link
              href="/pricing"
              onClick={closeMenu}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all font-medium text-lg"
            >
              <DollarSign className="h-5 w-5 text-primary" /> Pricing
            </Link>
            <Link
              href="/insights"
              onClick={closeMenu}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all font-medium text-lg"
            >
              <Brain className="h-5 w-5 text-primary" /> Insights
            </Link>
          </nav>

          <div className="p-6 border-t border-border/40">
            <Button
              asChild
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
            >
              <Link href="/contact" onClick={closeMenu}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Small helper component for mobile nav links
function MobileNavLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 p-3 text-muted-foreground hover:text-primary transition-colors"
    >
      <Icon className="h-5 w-5" /> {label}
    </Link>
  );
}
