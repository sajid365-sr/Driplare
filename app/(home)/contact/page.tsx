import type { Metadata } from 'next'
import { ContactHero } from "@/components/contact/ContactHero";
import { AIAgentInteractive } from "@/components/contact/AIAgentInteractive";
import { StepByStepForm } from "@/components/contact/StepByStepForm";
import { CalendarEmbed } from "@/components/contact/CalendarEmbed";
import { ContactSidebar } from "@/components/contact/ContactSidebar";

export const metadata: Metadata = {
  title: 'Contact Us - Get Started with AI Solutions',
  description: 'Ready to transform your business with AI agents and automation? Contact Driplare for a consultation and discover how we can help you build the future.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The Executive Greeting */}
      <ContactHero />

      {/* 2. The AI Concierge (The Innovation Zone) */}
      <AIAgentInteractive />

      {/* 3. The Discovery Form (Dynamic Multi-Step) */}
      {/* <StepByStepForm /> */}

      {/* 4. Direct Scheduling (The Shortcut) */}
      <CalendarEmbed />

      {/* 5. Alternative Channels (Social Proof & Contact) */}
      {/* <ContactSidebar /> */}
    </div>
  );
}