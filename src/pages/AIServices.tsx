import { Navbar } from "@/components/common/navigation/Navbar";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";
import { HeroSection } from "@/components/ai-services/HeroSection";
import { WhyAISection } from "@/components/ai-services/WhyAISection";
import { ChatbotIntegrationSection } from "@/components/ai-services/ChatbotIntegrationSection";
import { CustomAgentsSection } from "@/components/ai-services/CustomAgentsSection";
import { AIAutomationSection } from "@/components/ai-services/AIAutomationSection";
import { SuccessStoriesSection } from "@/components/ai-services/SuccessStoriesSection";
import { DemoFormSection } from "@/components/ai-services/DemoFormSection";

const AIServices = () => {
  return (
    <div className="relative min-h-screen bg-[#1A1F2C] flex flex-col text-white overflow-x-hidden">
      <AnimatedGridBg />
      <Navbar />
      <main className="flex-1 pt-0">
        <HeroSection />
        <WhyAISection />
        <ChatbotIntegrationSection />
        <CustomAgentsSection />
        <AIAutomationSection />
        <SuccessStoriesSection />
        <DemoFormSection />
      </main>
    </div>
  );
};

export default AIServices;
