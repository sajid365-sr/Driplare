import { ScrapingHero } from "@/components/data-scraping/ScrapingHero";
import { ExtractionFlow } from "@/components/data-scraping/ExtractionFlow";
import { CapabilityGrid } from "@/components/data-scraping/CapabilityGrid";
import { DashboardPreview } from "@/components/data-scraping/DashboardPreview";
import { TechStackTicker } from "@/components/data-scraping/TechStackTicker";
import { ScrapingCTA } from "@/components/data-scraping/ScrapingCTA";

export default function DataScraping() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The Intelligence Hook */}
      <ScrapingHero />

      {/* 2. The Extraction Lifecycle */}
      <ExtractionFlow />

      {/* 3. Specialized Solutions */}
      <CapabilityGrid />

      {/* 4. The Monitoring Dashboard */}
      <DashboardPreview />

      {/* 5. Technical Resilience */}
      <TechStackTicker />

      {/* 6. Final Call to Action */}
      <ScrapingCTA />
    </div>
  );
}
