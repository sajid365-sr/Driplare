import { motion } from "framer-motion";
import { ArrowRight, Cpu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ConsultingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="hero-grid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 border border-black/10 rounded-full font-mono text-[10px] tracking-widest mb-6"
              >
                <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse" />
                ADVISORY_STATUS: ELITE_STRATEGY
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black text-[#0A0A0B] mb-8 leading-[1.05] font-montserrat tracking-tighter"
              >
                Technology is a Tool. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8533]">
                  Architecture is Strategy.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-black/60 max-w-xl leading-relaxed mb-10 font-inter"
              >
                Driplare provides the technical clarity needed to scale. We
                audit your infrastructure, identify AI feasibility, and build
                the full-stack system roadmaps that eliminate technical debt.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#0A0A0B] hover:bg-[#FF6B00] text-white px-8 py-7 text-lg font-bold rounded-xl transition-all shadow-xl shadow-black/10"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    Book Strategic Audit
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-black/10 hover:bg-black/5 px-8 py-7 text-lg font-bold rounded-xl"
                >
                  View Framework
                </Button>
              </motion.div>
            </div>

            {/* Neural Schematic Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex-1 relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-[#FF6B00]/5 rounded-3xl rotate-3 scale-105 border border-[#FF6B00]/10" />
                <div className="relative h-full w-full bg-white border-2 border-black rounded-3xl p-8 shadow-2xl overflow-hidden group">
                  <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                    <div className="font-mono text-[10px] font-bold">
                      DRIPLARE_SCHEMATIC_v4
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="space-y-6">
                    {[
                      { label: "Data_Extraction_Nodes", val: "ACTIVE" },
                      { label: "AI_Processing_Layer", val: "OPTIMIZED" },
                      { label: "Neural_Pathway_Sync", val: "READY" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span>{item.label}</span>
                          <span className="text-[#FF6B00] font-bold">
                            {item.val}
                          </span>
                        </div>
                        <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, delay: 1 + i * 0.2 }}
                            className="h-full bg-black"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-center">
                    <Cpu className="w-16 h-16 text-black/5 group-hover:text-[#FF6B00]/20 transition-colors duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
