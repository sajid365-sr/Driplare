import { motion } from "framer-motion";
import { Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ScrapingHero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Data Pulse Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="data-nodes" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="#E5E5E5" opacity="0.3"/>
              <circle cx="8" cy="8" r="0.5" fill="#E5E5E5" opacity="0.3"/>
              <circle cx="5" cy="5" r="0.5" fill="#FF6B00" opacity="0.2"/>
            </pattern>
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#data-nodes)" />

          {/* Animated pulse lines */}
          <motion.line
            x1="0%"
            y1="20%"
            x2="100%"
            y2="20%"
            stroke="url(#pulse-gradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          />
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#pulse-gradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.line
            x1="0%"
            y1="80%"
            x2="100%"
            y2="80%"
            stroke="url(#pulse-gradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        </svg>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-mono text-sm">
              <Database className="w-5 h-5 text-[#FF6B00]" />
              <span>DATA_INTELLIGENCE</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A0A0A] mb-8 leading-tight font-montserrat"
          >
            Turn the Web Into Your{" "}
            <span className="text-[#FF6B00]">Private Database.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed mb-12 font-inter"
          >
            We architect high-performance scrapers and monitoring systems that track competitors, prices, and market shifts in real-time. Stop guessing—start making data-driven decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-3">
                Request a Data Audit
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          {/* Status Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-block"
          >
            <div className="bg-[#FF6B00] text-white px-8 py-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-mono font-bold text-lg tracking-wider">
                  [ STATUS: 24/7_MARKET_SCAN_ACTIVE ]
                </span>
              </div>
            </div>
          </motion.div>

          {/* Data Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="font-mono font-bold text-[#FF6B00] text-3xl mb-2">100K+</div>
              <div className="text-sm text-[#0A0A0A]/60">Requests/Day</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="font-mono font-bold text-[#FF6B00] text-3xl mb-2">99.9%</div>
              <div className="text-sm text-[#0A0A0A]/60">Uptime</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="font-mono font-bold text-[#FF6B00] text-3xl mb-2">50+</div>
              <div className="text-sm text-[#0A0A0A]/60">Data Sources</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#0A0A0A]/60 text-sm font-mono">EXPLORE_DATA_EXTRACTION</span>
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
