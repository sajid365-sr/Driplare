import { motion } from "framer-motion";
import { HeroSection } from "@/components/services/web-development/HeroSection";
import { TechAdvantageRow } from "@/components/services/web-development/TechAdvantageRow";
import { SolutionCards } from "@/components/services/web-development/SolutionCards";
import { SynergyGraphic } from "@/components/services/web-development/SynergyGraphic";
import { VerticalTimeline } from "@/components/services/web-development/VerticalTimeline";
import { AccordionFAQ } from "@/components/services/web-development/AccordionFAQ";
import { HighImpactCTA } from "@/components/services/web-development/HighImpactCTA";

export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-background">
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
