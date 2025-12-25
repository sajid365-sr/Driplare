import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Bot,
  Workflow,
  Code2,
  Database,
  Briefcase,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] sm:w-[350px] overflow-y-auto"
      >
        <nav className="flex flex-col space-y-5 mt-12">
          <Link
            to="/"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Home
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="solutions" className="border-b-0">
              <AccordionTrigger className="text-lg font-medium py-0">
                Solutions
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-4 mt-3 ml-4">
                  <Link
                    to="/ai-agents"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <Bot className="h-5 w-5" />
                    <span>Custom AI Agents</span>
                  </Link>

                  <Link
                    to="/workflow-automation"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <Workflow className="h-5 w-5" />
                    <span>Workflow Automation</span>
                  </Link>

                  <Link
                    to="/web-development"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <Code2 className="h-5 w-5" />
                    <span>Full-Stack Web Development</span>
                  </Link>

                  <Link
                    to="/data-scraping"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <Database className="h-5 w-5" />
                    <span>Data Scraping & Monitoring</span>
                  </Link>

                  <Link
                    to="/b2b-consulting"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>B2B Technical Consulting</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            to="/portfolio"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Portfolio
          </Link>

          <Link
            to="/insights"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Insights
          </Link>

          <Link
            to="/contact"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Contact
          </Link>

          <Button className="mt-4 bg-primary hover:bg-primary/90 w-full" asChild>
            <Link to="/contact" onClick={handleLinkClick}>
              Get Started
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
