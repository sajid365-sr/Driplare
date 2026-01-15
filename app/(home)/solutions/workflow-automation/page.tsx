import type { Metadata } from "next";
import { HeroSection } from "@/components/services/workflow-automation/HeroSection";
import { WorkflowVisualization } from "@/components/services/workflow-automation/WorkflowVisualization";
import { ProblemGrid } from "@/components/services/workflow-automation/ProblemGrid";
import { ServiceIconGrid } from "@/components/services/workflow-automation/ServiceIconGrid";
import { TechLogosSection } from "@/components/services/workflow-automation/TechLogosSection";
import { ProcessSteps } from "@/components/services/workflow-automation/ProcessSteps";
import { AccordionFAQ } from "@/components/services/workflow-automation/AccordionFAQ";
import { FinalCTASection } from "@/components/services/workflow-automation/FinalCTASection";

export const metadata: Metadata = {
  title: "Workflow Automation Services - Streamline Business Operations",
  description:
    "Automate repetitive tasks and streamline your business processes with custom workflow automation solutions powered by n8n and modern technologies.",
};

export default function WorkflowAutomation() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
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
