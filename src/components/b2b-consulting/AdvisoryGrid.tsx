import { motion } from "framer-motion";
import {
  Target,
  Settings,
  Workflow,
  Plus,
  ShieldCheck,
  Database,
  Zap,
} from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "AI Feasibility & Roadmap",
    focus: "Investment Strategy",
    description:
      "Not every problem needs an AI agent. We audit your workflows to identify where AI will provide the highest ROI and design a 12-month implementation roadmap.",
    protocol: "PROTO_AI_09",
    stats: ["ROI Forecast", "Feasibility Score", "12mo Roadmap"],
  },
  {
    icon: Settings,
    title: "Tech Stack Optimization",
    focus: "Technical Efficiency",
    description:
      "Is your current stack holding you back? We analyze your MERN, legacy, or No-Code infrastructure to eliminate redundancies and optimize performance.",
    protocol: "PROTO_STACK_12",
    stats: ["Debt Analysis", "Speed Optimization", "Redundancy Kill"],
  },
  {
    icon: Workflow,
    title: "Automation Architecture",
    focus: "System Scalability",
    description:
      "We architect how your CRM, ERP, and AI systems communicate. We build the 'plumbing' that ensures 100% data integrity as you scale.",
    protocol: "PROTO_AUTO_04",
    stats: ["Integrity Sync", "API Mapping", "Scale Validation"],
  },
];

export function AdvisoryGrid() {
  return (
    <section className="py-24 bg-white border-t border-black/5 relative">
      <div className="container relative z-10 px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1 bg-black text-white text-[10px] font-mono font-bold mb-4 rounded-full">
            THE_CONSULTING_FRAMEWORK
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0B] mb-6 font-montserrat tracking-tighter uppercase">
            Strategic Advisory Pillars
          </h2>
          <p className="text-lg text-black/50 max-w-2xl mx-auto font-inter">
            Bridging the gap between engineering complexity and business
            objectives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-black/10 rounded-2xl p-8 hover:border-[#FF6B00] transition-all duration-500 flex flex-col h-full hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-10">
                <div className="p-3 bg-[#F5F5F7] rounded-xl text-black group-hover:bg-[#FF6B00] group-hover:text-white transition-colors duration-500">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div className="text-right font-mono text-[9px] font-bold text-black/30">
                  REF: {pillar.protocol}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[#FF6B00] font-mono text-[10px] font-bold uppercase tracking-widest">
                  {pillar.focus}
                </span>
                <h3 className="text-2xl font-bold text-black mt-1 font-montserrat tracking-tight">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-black/60 text-sm leading-relaxed font-inter mb-8 flex-grow">
                {pillar.description}
              </p>

              {/* Stat Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pillar.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 bg-black/[0.03] rounded border border-black/5 text-[9px] font-mono font-bold"
                  >
                    + {stat}
                  </div>
                ))}
              </div>

              {/* Metadata Footer */}
              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <div className="text-[10px] font-mono text-black/40">
                  AUDIT_READY: 100%
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#FF6B00]">
                  INITIATE <Plus className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Success Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="bg-[#0A0A0B] text-white px-8 py-5 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <div className="text-left">
                <div className="text-[10px] font-mono text-white/50">
                  DATA_GOVERNANCE
                </div>
                <div className="text-xs font-bold font-mono">
                  ENCRYPTED_ADVISORY
                </div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#FF6B00]" />
              <div className="text-left">
                <div className="text-[10px] font-mono text-white/50">
                  SYSTEM_SUCCESS
                </div>
                <div className="text-xs font-bold font-mono">
                  95%_ADOPTION_RATE
                </div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <div className="text-[10px] font-mono text-white/50">
                  NETWORK_SCALE
                </div>
                <div className="text-xs font-bold font-mono">
                  MULTI_CLOUD_READY
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
