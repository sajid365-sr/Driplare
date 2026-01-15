import type { Metadata } from 'next'
import { AboutHero } from "@/components/AboutUs/AboutHero";
import { StorySection } from "@/components/AboutUs/StorySection";
import { FounderProfile } from "@/components/AboutUs/FounderProfile";
import { ValuesGrid } from "@/components/AboutUs/ValuesGrid";
import { StatsBanner } from "@/components/AboutUs/StatsBanner";
import { AboutCTA } from "@/components/AboutUs/AboutCTA";

export const metadata: Metadata = {
  title: 'About Driplare - AI Solutions & Software Development',
  description: 'Learn about Driplare\'s mission to democratize enterprise-grade AI solutions and automation tools for businesses of all sizes.',
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section: The Mission Statement */}
      <AboutHero />

      {/* The Pivot Story: "From Code to Intelligence" */}
      <StorySection />

      {/* Meet the Architect (Founder Spotlight) */}
      <FounderProfile />

      {/* The Driplare Philosophy (Core Values) */}
      <ValuesGrid />

      {/* Our Global Footprint (Social Proof) */}
      <StatsBanner />

      {/* Final Call to Action */}
      <AboutCTA />
    </div>
  );
}