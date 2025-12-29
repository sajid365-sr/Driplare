import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface InsightsHeroProps {
  featuredTitle?: string;
}

export function InsightsHero({ featuredTitle }: InsightsHeroProps) {
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  // Typewriter effect for featured title
  useEffect(() => {
    if (!featuredTitle) return;

    if (typingIndex < featuredTitle.length) {
      const timeout = setTimeout(() => {
        setTypingText((prev) => prev + featuredTitle[typingIndex]);
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [typingIndex, featuredTitle]);

  return (
    <section className="relative min-h-screen bg-[#F9F9F9] flex items-center justify-center overflow-hidden">
      {/* Terminal-style background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-[#0A0A0A]/5 to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 rounded-none font-mono text-sm">
              <span>Driplare_Intelligence_v2.0</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A0A0A] mb-8 leading-tight font-montserrat"
          >
            Our internal research on{" "}
            <span className="text-[#FF6B00]">AI Agents</span>, MERN Architecture, and{" "}
            <span className="text-[#FF6B00]">Automated Market Intelligence.</span>
          </motion.h1>

          {/* Featured Title Typewriter */}
          {featuredTitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-12"
            >
              <div className="bg-[#0A0A0A] text-white p-8 rounded-none max-w-2xl mx-auto">
                <div className="font-mono text-lg text-[#FF6B00] mb-2">[ FEATURED_POST ]</div>
                <div className="text-2xl md:text-3xl font-montserrat font-bold text-white min-h-[80px] flex items-center justify-center">
                  {typingText}
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white p-6 border border-[#0A0A0A] rounded-none">
              <div className="font-mono text-sm text-[#0A0A0A]/60 mb-2">[ DATABASE_STATUS ]</div>
              <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">47_ARTICLES</div>
              <div className="text-sm text-[#0A0A0A]/60 font-inter">Indexed and ready</div>
            </div>

            <div className="bg-white p-6 border border-[#0A0A0A] rounded-none">
              <div className="font-mono text-sm text-[#0A0A0A]/60 mb-2">[ SCAN_FREQUENCY ]</div>
              <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">DAILY</div>
              <div className="text-sm text-[#0A0A0A]/60 font-inter">Market intelligence</div>
            </div>

            <div className="bg-white p-6 border border-[#0A0A0A] rounded-none">
              <div className="font-mono text-sm text-[#0A0A0A]/60 mb-2">[ ACCESS_LEVEL ]</div>
              <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">PUBLIC</div>
              <div className="text-sm text-[#0A0A0A]/60 font-inter">Technical insights</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#0A0A0A]/60 text-sm font-mono">SCROLL_TO_EXPLORE</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col gap-1"
          >
            <div className="w-0.5 h-4 bg-[#FF6B00]"></div>
            <div className="w-0.5 h-2 bg-[#0A0A0A]"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
