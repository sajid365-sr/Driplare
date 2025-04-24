
import AnimatedGridBg from "@/components/common/AnimatedGridBg";
import { HeroSection } from "@/components/contact/HeroSection";
import { ContactFormWithDetails } from "@/components/contact/ContactFormWithDetails";
import { TeamGalleryCarousel } from "@/components/contact/TeamGalleryCarousel";
import { InteractiveMapSection } from "@/components/contact/InteractiveMapSection";
import { NewsletterFooter } from "@/components/contact/NewsletterFooter";

const Contact = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#1A1F2C] text-white overflow-x-hidden">
      <AnimatedGridBg />
      <main className="flex-1 pt-0 relative z-10">
        <HeroSection />
        <div className="container my-20 max-w-6xl mx-auto">
          <ContactFormWithDetails />
        </div>
        <div className="container my-24">
          <TeamGalleryCarousel />
        </div>
        <div className="container my-24">
          <InteractiveMapSection />
        </div>
      </main>
      <NewsletterFooter />
    </div>
  );
};

export default Contact;
