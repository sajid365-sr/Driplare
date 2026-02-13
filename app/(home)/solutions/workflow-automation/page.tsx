import type { Metadata } from "next";
import { AutomationHero } from "@/components/services/workflow-automation/AutomationHero";
import { WhatIsAutomationSection } from "@/components/services/workflow-automation/WhatIsAutomationSection";
import { WhoIsThisForSection } from "@/components/services/workflow-automation/WhoIsThisForSection";
import { WhatWeAutomateSection } from "@/components/services/workflow-automation/WhatWeAutomateSection";
import { AutomationRecipesSection } from "@/components/services/workflow-automation/AutomationRecipesSection";
import { ToolsIntegrationsSection } from "@/components/services/workflow-automation/ToolsIntegrationsSection";
import { HowItWorksSection } from "@/components/services/workflow-automation/HowItWorksSection";
import { PricingSection } from "@/components/services/workflow-automation/PricingSection";
import { FAQSection } from "@/components/services/workflow-automation/FAQSection";
import { SimpleCTA } from "@/components/services/workflow-automation/SimpleCTA";

export const metadata: Metadata = {
  title: "Workflow Automation Services - Streamline Business Operations",
  description:
    "Automate repetitive tasks and streamline your business processes with custom workflow automation solutions powered by n8n and modern technologies.",
};

export default function WorkflowAutomation() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <AutomationHero />
      <WhatIsAutomationSection />
      <WhoIsThisForSection />
      <WhatWeAutomateSection />
      <AutomationRecipesSection />
      <ToolsIntegrationsSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <SimpleCTA />
    </div>
  );
}
