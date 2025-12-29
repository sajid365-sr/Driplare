import { ConsultingHero } from "@/components/b2b-consulting/ConsultingHero";
import { AdvisoryGrid } from "@/components/b2b-consulting/AdvisoryGrid";
import { ConsultingRoadmap } from "@/components/b2b-consulting/ConsultingRoadmap";
import { ValueSplit } from "@/components/b2b-consulting/ValueSplit";
import { ExpertiseMarquee } from "@/components/b2b-consulting/ExpertiseMarquee";
import { ConsultingCTA } from "@/components/b2b-consulting/ConsultingCTA";

export default function B2BConsulting() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The Advisor Hook */}
      <ConsultingHero />

      {/* 2. The Consulting Pillars */}
      <AdvisoryGrid />

      {/* 3. The Roadmap Visual */}
      <ConsultingRoadmap />

      {/* 4. Why an "Outside Architect"? */}
      <ValueSplit />

      {/* 5. Technical Stack Advisory */}
      <ExpertiseMarquee />

      {/* 6. Final Call to Action */}
      <ConsultingCTA />
    </div>
  );
}
