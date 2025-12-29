import { MethodologyHero } from "@/components/our-methodology/MethodologyHero";
import { LifecycleSteps } from "@/components/our-methodology/LifecycleSteps";
import { PhilosophySection } from "@/components/our-methodology/PhilosophySection";
import { StandardsGrid } from "@/components/our-methodology/StandardsGrid";
import { MethodologyCTA } from "@/components/our-methodology/MethodologyCTA";

export default function OurMethodology() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The Framework Intro */}
      <MethodologyHero />

      {/* Graph paper divider */}
      <div className="h-px bg-[#E5E5E5]"></div>

      {/* 2. The 4-Phase Lifecycle */}
      <LifecycleSteps />

      {/* Graph paper divider */}
      <div className="h-px bg-[#E5E5E5]"></div>

      {/* 3. The "No-Black-Box" Philosophy */}
      <PhilosophySection />

      {/* Graph paper divider */}
      <div className="h-px bg-[#E5E5E5]"></div>

      {/* 4. Technical Rigor (The Standards) */}
      <StandardsGrid />

      {/* Graph paper divider */}
      <div className="h-px bg-[#E5E5E5]"></div>

      {/* 5. Final Call to Action */}
      <MethodologyCTA />
    </div>
  );
}
