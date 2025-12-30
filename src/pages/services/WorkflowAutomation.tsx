import { HeroSection } from "@/components/services/workflow-automation/HeroSection";
import { WorkflowVisualization } from "@/components/services/workflow-automation/WorkflowVisualization";
import { ProblemGrid } from "@/components/services/workflow-automation/ProblemGrid";
import { ServiceIconGrid } from "@/components/services/workflow-automation/ServiceIconGrid";
import { TechLogosSection } from "@/components/services/workflow-automation/TechLogosSection";
import { ProcessSteps } from "@/components/services/workflow-automation/ProcessSteps";
import { AccordionFAQ } from "@/components/services/workflow-automation/AccordionFAQ";
import { FinalCTASection } from "@/components/services/workflow-automation/FinalCTASection";

export default function WorkflowAutomation() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <WorkflowVisualization />
      <ProblemGrid />
      <ServiceIconGrid />
      <TechLogosSection />
      <ProcessSteps />
      <AccordionFAQ />
      <FinalCTASection />
    </div>
  );
}
