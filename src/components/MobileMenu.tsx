
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent, 
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
      <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
        <nav className="flex flex-col space-y-6 mt-12">
          <a 
            href="#features" 
            className="text-lg font-medium hover:text-primary transition-colors" 
            onClick={handleLinkClick}
          >
            Features
          </a>
          <a 
            href="#case-studies" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Case Studies
          </a>
          <a 
            href="#stats" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Stats
          </a>
          <a 
            href="#newsletter" 
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Newsletter
          </a>
          <Button className="mt-4 bg-primary hover:bg-primary/90 w-full">
            Get Started
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
