import { useEffect } from "react";
import { Navbar } from "@/components/common/navigation/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { CoreSolutionsSection } from "@/components/home/CoreSolutionsSection";
import { AISpotlightSection } from "@/components/home/AISpotlightSection";
import { PortfolioTeaserSection } from "@/components/home/PortfolioTeaserSection";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InsightsPreviewSection } from "@/components/home/InsightsPreviewSection";
import { ContactNewsletterSection } from "@/components/home/ContactNewsletterSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";

const Index = () => {
  // Handle the scroll animations
  useEffect(() => {
    if (typeof window === "undefined" || !document) return;

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
      <AnimatedGridBg />
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <CoreSolutionsSection />
        <AISpotlightSection />
        <PortfolioTeaserSection />
        <HowWeWorkSection />
        <TestimonialsSection />
        <InsightsPreviewSection />
{/*         <ContactNewsletterSection /> */}
      </main>
    </div>
  );
};

export default Index;
