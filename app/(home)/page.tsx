"use client";

import { useEffect, useState } from "react";
import { InfrastructureGapSection } from "@/components/home/InfrastructureGapSection";
import { CorePillarsSection } from "@/components/home/CorePillarsSection";
import { FeaturedProjectSection } from "@/components/home/FeaturedProjectSection";
import { HowWeEngineerSection } from "@/components/home/HowWeEngineerSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { Hero } from "@/components/home/HeroSection";

export default function HomePage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle the scroll animations
  useEffect(() => {
    if (typeof window === "undefined" || !document) return;

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
      'button, a, [role="button"], input, textarea, select'
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
        className={`fixed pointer-events-none z-50 transition-all duration-200 ${
          isHovering ? "scale-150" : "scale-100"
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
        {/* 1. Hero Section: The Executive Hook */}
        <Hero />

        {/* 2. The Infrastructure Gap */}
        <InfrastructureGapSection />

        {/* 3. The Core Pillars */}
        <CorePillarsSection />

        {/* 4. Featured Project */}
        <FeaturedProjectSection />

        {/* 5. How We Engineer */}
        <HowWeEngineerSection />

        {/* 6. Social Proof */}
        <SocialProofSection />

        {/* 7. The Tech Stack */}
        <TechStackSection />

        {/* 8. Final CTA */}
        <FinalCTASection />
      </main>
    </div>
  );
}
