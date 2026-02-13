"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { WhatYouGetSection } from "@/components/home/WhatYouGetSection";
import { MoreThanAISection } from "@/components/home/MoreThanAISection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTASection";

export default function HomePage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle the scroll animations
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;

        if (elementPosition < screenPosition) {
          element.classList.add("appear");
        }
      });
    };

    // Initial check on load
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Custom cursor functionality
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], input, textarea, select',
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-200 ${isHovering ? "scale-150" : "scale-100"
          }`}
        style={{
          left: `${cursorPosition.x - 8}px`,
          top: `${cursorPosition.y - 8}px`,
        }}
      >
        <div className="relative">
          <div className="w-4 h-4 bg-[#FF6B00] rounded-full opacity-80"></div>
          <div className="absolute inset-0 w-4 h-4 bg-[#FF6B00] rounded-full animate-ping opacity-30"></div>
        </div>
      </div>

      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <WhatYouGetSection />
        <SuccessStoriesSection />
        <MoreThanAISection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
}
