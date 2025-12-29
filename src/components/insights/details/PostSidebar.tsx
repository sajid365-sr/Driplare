import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PostSidebarProps {
  tocItems?: string[];
  relatedPosts?: Array<{ id: string; title: string; cover_image?: string }>;
}

export function PostSidebar({ tocItems = [], relatedPosts = [] }: PostSidebarProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-8 space-y-8">
        {/* Table of Contents */}
        <div className="bg-white border border-[#0A0A0A] p-6 rounded-none">
          <h3 className="font-montserrat font-bold text-lg text-[#0A0A0A] mb-4 uppercase tracking-wide">
            Table of Contents
          </h3>

          <nav className="space-y-2">
            {tocItems.length > 0 ? (
              tocItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full text-left font-mono text-sm text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-colors py-1"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item}
                </motion.button>
              ))
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('introduction')}
                  className="w-full text-left font-mono text-sm text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-colors py-1"
                >
                  The Problem
                </button>
                <button
                  onClick={() => scrollToSection('architecture')}
                  className="w-full text-left font-mono text-sm text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-colors py-1"
                >
                  The Architecture
                </button>
                <button
                  onClick={() => scrollToSection('implementation')}
                  className="w-full text-left font-mono text-sm text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-colors py-1"
                >
                  Implementation
                </button>
                <button
                  onClick={() => scrollToSection('results')}
                  className="w-full text-left font-mono text-sm text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-colors py-1"
                >
                  The Results
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Related Schematics */}
        {relatedPosts.length > 0 && (
          <div className="bg-white border border-[#0A0A0A] p-6 rounded-none">
            <h3 className="font-montserrat font-bold text-lg text-[#0A0A0A] mb-4 uppercase tracking-wide">
              Related Schematics
            </h3>

            <div className="space-y-4">
              {relatedPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post.id}
                  className="border border-[#E5E5E5] rounded-none overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="aspect-video bg-[#F9F9F9] flex items-center justify-center">
                    <div className="text-center text-[#0A0A0A]/40 font-mono text-xs">
                      [SCHEMATIC_{index + 1}]
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-montserrat font-bold text-sm text-[#0A0A0A] line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Widget */}
        <div className="bg-[#0A0A0A] border border-[#0A0A0A] p-6 rounded-none">
          <h3 className="font-montserrat font-bold text-lg text-white mb-4 uppercase tracking-wide">
            Join the Logic
          </h3>

          <p className="text-white/70 font-inter text-sm mb-6 leading-relaxed">
            Subscribe to receive advanced technical insights and implementation guides.
          </p>

          <div className="space-y-3">
            <Input
              placeholder="> Enter_Email_Address..."
              className="bg-white text-[#0A0A0A] border border-[#0A0A0A] rounded-none font-mono placeholder:text-[#0A0A0A]/50"
            />
            <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-none font-bold">
              <ArrowRight className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </div>

          <div className="mt-4 font-mono text-xs text-white/50">
            [ UPDATES: WEEKLY | FORMAT: TECHNICAL_BRIEFS ]
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white border border-[#0A0A0A] p-4 rounded-none">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-[#0A0A0A]/60">SIDEBAR_ACTIVE | NAVIGATION_READY</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
