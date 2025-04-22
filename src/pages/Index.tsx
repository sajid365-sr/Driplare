
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { StatsSection } from "@/components/StatsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  // Handle the scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in, .slide-up");
      
      elements.forEach(element => {
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
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CaseStudiesSection />
        <StatsSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
