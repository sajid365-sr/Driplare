import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Database,
  Zap,
  TrendingUp,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

export function ScrapingCTA() {
  return (
    <section className="py-24 bg-[#0A0A0B] text-white relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background: Mesh Gradient and Radar Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-[120px] opacity-50" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
          <defs>
            <pattern
              id="cta-grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1.5" fill="#FF6B00" />
              <path
                d="M 60 30 L 0 30 M 30 0 L 30 60"
                stroke="#FF6B00"
                strokeWidth="0.2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF6B00] text-xs font-mono mb-10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
            </span>
            SYSTEMS_READY: READY_FOR_DEPLOYMENT
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] font-montserrat tracking-tight">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9040]">
                Decode
              </span>{" "}
              Your Market?
            </h2>

            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-inter">
              Stop guessing. Start extracting. We build the neural pathways
              between raw web data and your business strategy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-[#FF6B00] hover:bg-[#FF8533] text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,107,0,0.5)] transition-all"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    Initialize Extraction
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </Button>
              </motion.div>

              <Button
                variant="outline"
                size="lg"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-10 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm"
              >
                View Technical Specs
              </Button>
            </div>
          </motion.div>

          {/* Futuristic Trust Grid */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              {
                icon: Database,
                val: "1.2PB+",
                label: "Data Scanned",
                color: "text-blue-400",
              },
              {
                icon: Zap,
                val: "45ms",
                label: "Avg. Latency",
                color: "text-[#FF6B00]",
              },
              {
                icon: ShieldCheck,
                val: "AES-256",
                label: "Security",
                color: "text-green-400",
              },
              {
                icon: Globe,
                val: "∞",
                label: "Scalable Sources",
                color: "text-purple-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-[#FF6B00]/50 transition-colors"
              >
                <item.icon className={`w-6 h-6 ${item.color} mb-3 mx-auto`} />
                <div className="text-2xl font-mono font-bold text-white mb-1">
                  {item.val}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Terminal Command Footer */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="font-mono text-[10px] md:text-xs text-white/30 bg-black/50 px-6 py-2 rounded-full border border-white/5 flex gap-4 items-center">
              <span className="text-[#FF6B00]">bash --init_extraction</span>
              <span className="hidden md:inline">|</span>
              <span>ENGINE: V8_TURBO</span>
              <span className="hidden md:inline">|</span>
              <span className="text-green-500">NODE_STATUS: OPTIMAL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
