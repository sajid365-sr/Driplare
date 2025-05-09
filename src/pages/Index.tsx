
import { useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CoreSolutionsSection } from "@/components/home/CoreSolutionsSection";
import { AISpotlightSection } from "@/components/home/AISpotlightSection";
import { PortfolioTeaserSection } from "@/components/home/featured project/PortfolioTeaserSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { InsightsPreviewSection } from "@/components/home/InsightsPreviewSection";
import IndustryWeServe from "@/components/home/IndustryWeServe";
import CTA from "@/components/common/CTA";
import Hero from "@/components/home/HeroSection2";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import ClientReviewSection from "@/components/home/ClientReviewSection";
import { initializeNotificationsFromSupabase } from "@/utils/notification-utils";

const Index = () => {
  // Handle the scroll animations
  useEffect(() => {
    if (typeof window === "undefined" || !document) return;

    // Initialize notifications from Supabase
    initializeNotificationsFromSupabase();

    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;

        if (elementPosition < screenPosition) {
          element.classList.add("appear");
        }
      });
    };

    // Initial check on load
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* <HeroSection /> */}
        <Hero />
        <CoreSolutionsSection />
        <AISpotlightSection />
        <CTA />
        <PortfolioTeaserSection />
        <ClientReviewSection />
        <WhyChooseSection />
        <CaseStudiesSection />
        <HowWeWorkSection />
        <IndustryWeServe />
        <InsightsPreviewSection />
      </main>
    </div>
  );
};

export default Index;
