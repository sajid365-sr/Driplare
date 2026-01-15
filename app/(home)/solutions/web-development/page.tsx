import type { Metadata } from "next";
import { HeroSection } from "@/components/services/web-development/HeroSection";
import { TechAdvantageRow } from "@/components/services/web-development/TechAdvantageRow";
import { SolutionCards } from "@/components/services/web-development/SolutionCards";
import { SynergyGraphic } from "@/components/services/web-development/SynergyGraphic";
import { VerticalTimeline } from "@/components/services/web-development/VerticalTimeline";
import { AccordionFAQ } from "@/components/services/web-development/AccordionFAQ";
import { HighImpactCTA } from "@/components/services/web-development/HighImpactCTA";

export const metadata: Metadata = {
  title: "Full-Stack Web Development Services - MERN Stack Solutions",
  description:
    "Custom full-stack web development using MERN stack (MongoDB, Express.js, React, Node.js). Build scalable, performant web applications with modern technologies.",
};

export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0A0A] transition-colors duration-300">
      <HeroSection />
      <TechAdvantageRow />
      <SolutionCards />
      <SynergyGraphic />
      <VerticalTimeline />
      <AccordionFAQ />
      <HighImpactCTA />
    </div>
  );
}
