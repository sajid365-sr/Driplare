import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { TermsSidebar } from "@/components/terms-of-service/TermsSidebar";
import { TermsContent } from "@/components/terms-of-service/TermsContent";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("overview");

  // Handle scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'scope', 'ownership', 'responsibilities', 'liability', 'termination'];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for any fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Status Indicator */}
      <section className="py-8 bg-[#F9F9F9] border-b border-[#E5E5E5]">
        <div className="container">
          <div className="flex items-center justify-center gap-8">
            <div className="bg-white px-6 py-3 rounded-lg border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
                <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                  VERSION: 1.0.4
                </span>
              </div>
            </div>

            <div className="bg-white px-6 py-3 rounded-lg border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
                <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                  DOCUMENT_INTEGRITY: VERIFIED
                </span>
              </div>
            </div>

            <div className="bg-white px-6 py-3 rounded-lg border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#FF6B00]" />
                <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                  COMPLIANCE: ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <TermsSidebar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <TermsContent activeSection={activeSection} />
            </div>
          </div>
        </div>
      </section>

      {/* Section Anchors for Scroll Detection */}
      <div id="overview" className="absolute top-0" />
      <div id="scope" className="absolute top-0" />
      <div id="ownership" className="absolute top-0" />
      <div id="responsibilities" className="absolute top-0" />
      <div id="liability" className="absolute top-0" />
      <div id="termination" className="absolute top-0" />
    </div>
  );
}
