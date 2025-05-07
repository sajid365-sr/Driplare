import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Code,
  BarChart2,
  Brain,
  MessageSquareCode,
  UserRound,
  SlidersHorizontal,
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
                <div className="flex flex-col space-y-5 mt-2 ml-4">
                  <Link
                    to="/web-design"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <Code className="h-5 w-5" />
                    <span>Web Design & Development</span>
                  </Link>

                  <Link
                    to="/digital-marketing"
                    className="flex items-center space-x-2 hover:text-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    <BarChart2 className="h-5 w-5" />
                    <span>Digital Marketing</span>
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="ai-solutions" className="border-0">
                      <AccordionTrigger className="py-0">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-5 w-5" />
                          <span>AI Solutions</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-4 mt-2 ml-4">
                          <Link
                            to="/ai-services#chatbot"
                            className="flex items-center space-x-2 hover:text-primary transition-colors"
                            onClick={handleLinkClick}
                          >
                            <MessageSquareCode className="h-4 w-4" />
                            <span>Chatbot Integration</span>
                          </Link>

                          <Link
                            to="/ai-services#agents"
                            className="flex items-center space-x-2 hover:text-primary transition-colors"
                            onClick={handleLinkClick}
                          >
                            <UserRound className="h-4 w-4" />
                            <span>Custom AI Agents</span>
                          </Link>

                          <Link
                            to="/ai-services#automation"
                            className="flex items-center space-x-2 hover:text-primary transition-colors"
                            onClick={handleLinkClick}
                          >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span>AI Automation</span>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
            to="/admin"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Admin Area
          </Link>

          <Button className="mt-4 bg-primary hover:bg-primary/90 w-full">
            Get Started
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
