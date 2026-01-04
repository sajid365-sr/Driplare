import type { Metadata } from 'next'
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingTable } from "@/components/pricing/PricingTable";
import { ServicePriceGrid } from "@/components/pricing/ServicePriceGrid";
import { ROICalculator } from "@/components/pricing/ROICalculator";
import { TransparencyNote } from "@/components/pricing/TransparencyNote";
import { AccordionFAQ } from "@/components/pricing/AccordionFAQ";
import { PricingCTA } from "@/components/pricing/PricingCTA";

export const metadata: Metadata = {
  title: 'Pricing - AI Solutions & Development Services',
  description: 'Transparent pricing for AI agents, workflow automation, and MERN stack development. No hidden fees, clear ROI calculations.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The ROI Header */}
      <PricingHero />

      {/* 2. The Core AI Agent Tiers */}
      <PricingTable />

      {/* 3. Specialist Services */}
      <ServicePriceGrid />

      {/* 4. The "Cost of Manual Work" Calculator */}
      <ROICalculator />

      {/* 5. Transparency & Running Costs */}
      <TransparencyNote />

      {/* 6. FAQ: The Decision Closer */}
      <AccordionFAQ />

      {/* 7. Final Call to Action */}
      <PricingCTA />
    </div>
  );
}
