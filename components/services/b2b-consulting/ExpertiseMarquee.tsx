'use client'

import { motion } from "framer-motion";

const expertise = [
  "MERN_STACK",
  "SYSTEM_ARCHITECTURE",
  "AI_AGENTS",
  "WORKFLOW_AUTOMATION",
  "AWS_INFRA",
  "API_GOVERNANCE",
  "NEURAL_NETS",
  "DATA_INTEGRITY",
  "SECURITY_AUDIT",
];

export function ExpertiseMarquee() {
  return (
    <section className="py-20 bg-white border-b border-black/5 relative overflow-hidden">
      <div className="container mb-12 text-center">
        <h2 className="text-2xl font-black font-montserrat uppercase tracking-tight">
          Technical <span className="text-[#FF6B00]">Stacks</span> We Optimize
        </h2>
      </div>

      <div className="flex overflow-hidden relative">
        <motion.div
          className="flex gap-8 whitespace-nowrap py-4"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...expertise, ...expertise, ...expertise].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#0A0A0B] px-8 py-4 rounded-2xl border border-white/10 group hover:border-[#FF6B00] transition-all"
            >
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full group-hover:animate-ping" />
              <span className="font-mono text-sm font-bold text-white uppercase tracking-[0.2em]">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Systems Built", val: "150+" },
          { label: "Debt Audits", val: "420+" },
          { label: "Success Rate", val: "98%" },
          { label: "Protocol Level", val: "ELITE" },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center p-6 border border-black/5 rounded-2xl"
          >
            <div className="text-3xl font-black font-montserrat text-[#FF6B00] mb-1">
              {stat.val}
            </div>
            <div className="text-[10px] font-mono font-bold text-black/30 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
