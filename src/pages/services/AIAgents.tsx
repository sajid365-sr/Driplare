import { HeroSection } from "@/components/services/custom-AI-Agent/HeroSection";
import { ProblemSolutionSection } from "@/components/services/custom-AI-Agent/ProblemSolutionSection";
import { CoreCapabilitiesSection } from "@/components/services/custom-AI-Agent/CoreCapabilitiesSection";
import { TechnicalEdgeSection } from "@/components/services/custom-AI-Agent/TechnicalEdgeSection";
import { RoadmapSection } from "@/components/services/custom-AI-Agent/RoadmapSection";
import { FAQSection } from "@/components/services/custom-AI-Agent/FAQSection";
import { FinalCTASection } from "@/components/services/custom-AI-Agent/FinalCTASection";

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
