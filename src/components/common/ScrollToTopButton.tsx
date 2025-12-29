import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ScrollToTopButton() {
  // Initialize with false to avoid initial rendering
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Check if window is defined to ensure we're in a browser environment
    if (typeof window !== "undefined") {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    // Check if window is defined to ensure we're in a browser environment
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Check if window is defined to ensure we're in a browser environment
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-1/2 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={scrollToTop}
            className="rounded-full  animate-pulse h-10 w-10 bg-primary/30 hover:bg-primary/90 shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>Back to top</div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
