import { ContactHero } from "@/components/contact/ContactHero";
import { AIAgentInteractive } from "@/components/contact/AIAgentInteractive";
import { StepByStepForm } from "@/components/contact/StepByStepForm";
import { CalendarEmbed } from "@/components/contact/CalendarEmbed";
import { ContactSidebar } from "@/components/contact/ContactSidebar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The Executive Greeting */}
      <ContactHero />

      {/* 2. The AI Concierge (The Innovation Zone) */}
      <AIAgentInteractive />

      {/* 3. The Discovery Form (Dynamic Multi-Step) */}
      <StepByStepForm />

      {/* 4. Direct Scheduling (The Shortcut) */}
      <CalendarEmbed />

      {/* 5. Alternative Channels (Social Proof & Contact) */}
      <ContactSidebar />
    </div>
  );
};

export default Contact;
