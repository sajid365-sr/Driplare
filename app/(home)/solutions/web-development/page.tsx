import type { Metadata } from "next";
import { WebDevHero } from "@/components/services/web-development/WebDevHero";
import { WebsiteTypesShowcase } from "@/components/services/web-development/WebsiteTypesShowcase";
import { CustomVsTemplate } from "@/components/services/web-development/CustomVsTemplate";
import { TechStackSection } from "@/components/services/web-development/TechStackSection";
import { WhatsIncludedSection } from "@/components/services/web-development/WhatsIncludedSection";
import { DevelopmentProcessSection } from "@/components/services/web-development/DevelopmentProcessSection";
import { PricingCalculatorSection } from "@/components/services/web-development/PricingCalculatorSection";
import { WebDevFAQSection } from "@/components/services/web-development/WebDevFAQSection";
import { WebDevSimpleCTA } from "@/components/services/web-development/WebDevSimpleCTA";
import { WebsiteTypesShowcase2 } from "@/components/services/web-development/WebsiteTypesShowcase2";
import { WebDevMarketplaceBanner1, WebDevMarketplaceBanner2 } from "@/components/services/web-development/webdev-marketplace-banners";

export const metadata: Metadata = {
  title: "Full-Stack Web Development Services - MERN Stack Solutions",
  description:
    "Custom full-stack web development using MERN stack (MongoDB, Express.js, React, Node.js). Build scalable, performant web applications with modern technologies.",
};

export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0A0A] transition-colors duration-300">

      <WebDevHero />
      {/* <WebsiteTypesShowcase /> */}
      <WebsiteTypesShowcase2 />
      <CustomVsTemplate />
      <TechStackSection />
      <WhatsIncludedSection />
      <DevelopmentProcessSection />
      <WebDevMarketplaceBanner1 />
      <PricingCalculatorSection />
      <WebDevMarketplaceBanner2 />
      <WebDevFAQSection />
      <WebDevSimpleCTA />
    </div>
  );
}
