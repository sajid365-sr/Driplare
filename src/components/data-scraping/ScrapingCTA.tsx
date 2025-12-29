import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function ScrapingCTA() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="cta-data" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#FF6B00" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2"/>
              <circle cx="20" cy="20" r="15" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-data)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icons Animation */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-[#FF6B00]/20 rounded-full flex items-center justify-center"
            >
              <Database className="w-6 h-6 text-[#FF6B00]" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 bg-[#FF6B00]/20 rounded-full flex items-center justify-center"
            >
              <TrendingUp className="w-6 h-6 text-[#FF6B00]" />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-montserrat">
              What data is your business missing?
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-inter">
              Let's build a system that finds it for you.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Start Your Data Extraction
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">24/7</div>
              <div className="text-white/60 text-sm font-inter">Automated Collection</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">99.9%</div>
              <div className="text-white/60 text-sm font-inter">Data Accuracy</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">∞</div>
              <div className="text-white/60 text-sm font-inter">Scalable Sources</div>
            </div>
          </motion.div>

          {/* Technical Footer */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-white/70">
                DATA_SYSTEMS: ACTIVE | EXTRACTION_ENGINES: ONLINE | DASHBOARDS: READY
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
