'use client'

import { motion } from "framer-motion";
import { Search, FileText, Cog, CheckCircle, ArrowDown } from "lucide-react";

const phases = [
  {
    phase: "01",
    title: "Technical Audit",
    status: "DISCOVERY_MODE",
    description:
      "A deep-layer analysis of your current manual bottlenecks and legacy codebases. We find the leaks.",
    deliverables: [
      "Process Mapping",
      "Architecture Review",
      "Debt Identification",
    ],
    icon: Search,
  },
  {
    phase: "02",
    title: "Strategic Blueprint",
    status: "ARCHITECT_MODE",
    description:
      "We deliver a comprehensive system schematic. A complete technical specification for your future scale.",
    deliverables: [
      "Tech Spec PDF",
      "Cost-Benefit Logic",
      "Implementation Path",
    ],
    icon: FileText,
  },
  {
    phase: "03",
    title: "Implementation Oversight",
    status: "ENGINEERING_MODE",
    description:
      "We lead the execution team to ensure the blueprint is built to spec. Quality assurance at every node.",
    deliverables: [
      "Code Integrity Review",
      "QA Validation",
      "Perf Optimization",
    ],
    icon: Cog,
  },
];

export function ConsultingRoadmap() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-montserrat tracking-tighter uppercase mb-6">
            The Execution <span className="text-[#FF6B00]">Pathway</span>
          </h2>
          <p className="text-lg text-black/50 font-inter">
            From raw complexity to a streamlined technical asset. Our 3-phase
            methodology.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central Connecting Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-black/5 hidden md:block" />

          <div className="space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Visual Icon Node */}
                <div className="flex-1 flex justify-center z-10">
                  <div className="relative">
                    <div className="w-24 h-24 bg-black rounded-3xl rotate-12 flex items-center justify-center group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                      <phase.icon className="w-10 h-10 text-white -rotate-12 group-hover:rotate-0 transition-transform" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-black font-mono shadow-lg">
                      {phase.phase}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                  <div className="bg-[#F9F9F9] border border-black/5 p-10 rounded-[2rem] hover:border-[#FF6B00]/30 transition-all shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-mono font-bold text-[#FF6B00] tracking-widest bg-[#FF6B00]/5 px-3 py-1 rounded-full border border-[#FF6B00]/10">
                        {phase.status}
                      </span>
                      <ArrowDown className="w-4 h-4 text-black/20" />
                    </div>
                    <h3 className="text-2xl font-black font-montserrat mb-4 uppercase">
                      {phase.title}
                    </h3>
                    <p className="text-black/60 font-inter leading-relaxed mb-8">
                      {phase.description}
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                      {phase.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-xs font-mono font-bold text-black/40 bg-white border border-black/5 p-3 rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
