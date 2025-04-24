import { useEffect } from "react";
import { Navbar } from "@/components/common/navigation/Navbar";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";
import { HeroShowcase } from "@/components/portfolio/HeroShowcase";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { FeaturedCaseStudy } from "@/components/portfolio/FeaturedCaseStudy";
import { InsightsChart } from "@/components/portfolio/InsightsChart";
import { ClientLogosCarousel } from "@/components/portfolio/ClientLogosCarousel";
import { CollaborateBanner } from "@/components/portfolio/CollaborateBanner";

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C] text-white relative overflow-x-hidden">
      <AnimatedGridBg />
      <Navbar />
      <main className="flex-1 z-10">
        <HeroShowcase />
        <section className="container py-16">
          <ProjectGrid />
        </section>
        <section className="container py-24">
          <FeaturedCaseStudy />
        </section>
        <section className="container py-24">
          <InsightsChart />
        </section>
        <section className="container py-24">
          <ClientLogosCarousel />
        </section>
        <CollaborateBanner />
      </main>
    </div>
  );
};

export default Portfolio;
