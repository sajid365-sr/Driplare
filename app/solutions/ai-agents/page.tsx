import type { Metadata } from 'next'
import { HeroSection } from "@/components/services/custom-AI-Agent/HeroSection";
import { ProblemSolutionSection } from "@/components/services/custom-AI-Agent/ProblemSolutionSection";
import { CoreCapabilitiesSection } from "@/components/services/custom-AI-Agent/CoreCapabilitiesSection";
import { TechnicalEdgeSection } from "@/components/services/custom-AI-Agent/TechnicalEdgeSection";
import { RoadmapSection } from "@/components/services/custom-AI-Agent/RoadmapSection";
import { FAQSection } from "@/components/services/custom-AI-Agent/FAQSection";
import { FinalCTASection } from "@/components/services/custom-AI-Agent/FinalCTASection";

export const metadata: Metadata = {
  title: 'Custom AI Agents Development - Intelligent Automation Solutions',
  description: 'Build autonomous AI agents that handle complex tasks 24/7. Custom AI agent development with advanced machine learning and natural language processing capabilities.',
}

export default function AIAgents() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemSolutionSection />
      <CoreCapabilitiesSection />
      <TechnicalEdgeSection />
      <RoadmapSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
