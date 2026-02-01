import type { Metadata } from "next";
import { PricingPageHero } from "@/components/pricing/PricingHero";
import { TabbedPricingSection } from "@/components/pricing/TabbedPricingSection";
import { AdditionalServicesSection } from "@/components/pricing/AdditionalServicesSection";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PricingFinalCTA } from "@/components/pricing/PricingCTA";


// export const metadata: Metadata = {
//   title: 'Pricing - AI Solutions & Development Services',
//   description: 'Transparent pricing for AI agents, workflow automation, and MERN stack development. No hidden fees, clear ROI calculations.',
// }

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PricingPageHero />
      <TabbedPricingSection />
      <AdditionalServicesSection />
      <PricingFAQ />
      <PricingFinalCTA />

    </div>
  );
}
