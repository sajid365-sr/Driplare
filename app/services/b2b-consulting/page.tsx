import type { Metadata } from 'next'
import { ConsultingHero } from "@/components/services/b2b-consulting/ConsultingHero";
import { AdvisoryGrid } from "@/components/services/b2b-consulting/AdvisoryGrid";
import { ConsultingRoadmap } from "@/components/services/b2b-consulting/ConsultingRoadmap";
import { ValueSplit } from "@/components/services/b2b-consulting/ValueSplit";
import { ExpertiseMarquee } from "@/components/services/b2b-consulting/ExpertiseMarquee";
import { ConsultingCTA } from "@/components/services/b2b-consulting/ConsultingCTA";
import { motion, useScroll, useSpring } from "framer-motion";

export const metadata: Metadata = {
  title: 'B2B Consulting Services - Strategic Business Solutions',
  description: 'Expert B2B consulting services for business strategy, digital transformation, and technology implementation. Strategic advisory for enterprise-level challenges.',
}

export default function B2BConsulting() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#FF6B00] selection:text-white">
      <ConsultingHero />
      <AdvisoryGrid />
      <ConsultingRoadmap />
      <ValueSplit />
      <ExpertiseMarquee />
      <ConsultingCTA />
    </div>
  );
}
