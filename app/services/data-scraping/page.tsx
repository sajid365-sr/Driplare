import type { Metadata } from 'next'
import { ScrapingHero } from "@/components/services/data-scraping/ScrapingHero";
import { ExtractionFlow } from "@/components/services/data-scraping/ExtractionFlow";
import { CapabilityGrid } from "@/components/services/data-scraping/CapabilityGrid";
import { DashboardPreview } from "@/components/services/data-scraping/DashboardPreview";
import { TechStackTicker } from "@/components/services/data-scraping/TechStackTicker";
import { ScrapingCTA } from "@/components/services/data-scraping/ScrapingCTA";

export const metadata: Metadata = {
  title: 'Data Scraping & Monitoring Services - Intelligent Web Scraping',
  description: 'Advanced web scraping and data monitoring solutions. Extract, process, and analyze data from websites with intelligent automation and monitoring capabilities.',
}

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
