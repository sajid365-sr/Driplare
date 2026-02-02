import type { Metadata } from "next";
import { HeroSection } from "@/components/services/custom-AI-Agent/HeroSection";
import { ProblemSolutionSection } from "@/components/services/custom-AI-Agent/ProblemSolutionSection";
import { CoreCapabilitiesSection } from "@/components/services/custom-AI-Agent/CoreCapabilitiesSection";
import { TechnicalEdgeSection } from "@/components/services/custom-AI-Agent/TechnicalEdgeSection";
import { RoadmapSection } from "@/components/services/custom-AI-Agent/RoadmapSection";
import { FAQSection } from "@/components/services/custom-AI-Agent/FAQSection";
import { FinalCTASection } from "@/components/services/custom-AI-Agent/FinalCTASection";
import { AIAgentHero } from "@/components/services/custom-AI-Agent/AIAgentHero";
import { WhatIsAIAgent } from "@/components/services/custom-AI-Agent/WhatIsAIAgent";

export const metadata: Metadata = {
  title: "Custom AI Agents Development - Intelligent Automation Solutions",
  description:
    "Build autonomous AI agents that handle complex tasks 24/7. Custom AI agent development with advanced machine learning and natural language processing capabilities.",
};

export default function AIAgents() {
  return (
    // Updated: Added dark:bg-[#0A0A0A] for main background
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">

      <AIAgentHero />
      <WhatIsAIAgent />

      {/* <HeroSection />
      <ProblemSolutionSection />
      <CoreCapabilitiesSection />
      <TechnicalEdgeSection />
      <RoadmapSection />
      <FAQSection />
      <FinalCTASection /> */}
    </div>
  );
}
