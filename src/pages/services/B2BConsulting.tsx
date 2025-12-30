import { ConsultingHero } from "@/components/b2b-consulting/ConsultingHero";
import { AdvisoryGrid } from "@/components/b2b-consulting/AdvisoryGrid";
import { ConsultingRoadmap } from "@/components/b2b-consulting/ConsultingRoadmap";
import { ValueSplit } from "@/components/b2b-consulting/ValueSplit";
import { ExpertiseMarquee } from "@/components/b2b-consulting/ExpertiseMarquee";
import { ConsultingCTA } from "@/components/b2b-consulting/ConsultingCTA";
import { motion, useScroll, useSpring } from "framer-motion";

export default function B2BConsulting() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-white selection:bg-[#FF6B00] selection:text-white">
      {/* The Global Architect's Ruler (Progress Bar) */}
      <motion.div
        className="fixed left-4 md:left-12 top-0 w-[1px] bg-gradient-to-b from-[#FF6B00] via-[#0A0A0B] to-[#FF6B00] z-50 origin-top h-screen"
        style={{ scaleY }}
      />

      <div className="relative">
        <ConsultingHero />
        <AdvisoryGrid />
        <ConsultingRoadmap />
        <ValueSplit />
        <ExpertiseMarquee />
        <ConsultingCTA />
      </div>
    </div>
  );
}
