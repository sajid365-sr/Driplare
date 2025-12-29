import { motion } from "framer-motion";
import { Workflow, Zap, Settings, Clock, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/services/workflow-automation/HeroSection";
import { WorkflowVisualization } from "@/components/services/workflow-automation/WorkflowVisualization";
import { ProblemGrid } from "@/components/services/workflow-automation/ProblemGrid";
import { ServiceIconGrid } from "@/components/services/workflow-automation/ServiceIconGrid";
import { TechLogosSection } from "@/components/services/workflow-automation/TechLogosSection";
import { ProcessSteps } from "@/components/services/workflow-automation/ProcessSteps";
import { AccordionFAQ } from "@/components/services/workflow-automation/AccordionFAQ";
import { StickyCTA } from "@/components/services/workflow-automation/StickyCTA";




export default function WorkflowAutomation() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <WorkflowVisualization />

      <ProblemGrid />

      <ServiceIconGrid />

      <TechLogosSection />

      <ProcessSteps />

      <AccordionFAQ />

      <StickyCTA />
    </div>
  );
}
