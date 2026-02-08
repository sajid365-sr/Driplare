import type { Metadata } from "next";
import { AIAgentHero } from "@/components/services/custom-AI-Agent/AIAgentHero";
import { WhatIsAIAgent } from "@/components/services/custom-AI-Agent/WhatIsAIAgent";
import { BenefitsDeepDive } from "@/components/services/custom-AI-Agent/BenefitsDeepDive";
import { LiveDemoSection } from "@/components/services/custom-AI-Agent/LiveDemoSection";
import { HowItWorksSection } from "@/components/services/custom-AI-Agent/HowItWorksSection";
import { FeaturesShowcaseSection } from "@/components/services/custom-AI-Agent/FeaturesShowcaseSection";
import { ROICalculatorSection } from "@/components/services/custom-AI-Agent/ROICalculatorSection";
import { AIAgentFinalCTA } from "@/components/services/custom-AI-Agent/AIAgentFinalCTA";
import { AIAgentFAQSection } from "@/components/services/custom-AI-Agent/AIAgentFAQSection";

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
      <BenefitsDeepDive />
      <LiveDemoSection />
      <HowItWorksSection />
      <FeaturesShowcaseSection />
      <ROICalculatorSection />
      <AIAgentFAQSection />
      <AIAgentFinalCTA />
    </div>
  );
}
