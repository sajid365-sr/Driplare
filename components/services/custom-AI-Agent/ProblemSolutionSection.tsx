'use client'

import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

export const ProblemSolutionSection = () => {
  const points = [
    {
      old: "Leads wait hours for responses",
      new: "Instant qualification & booking",
      label: "LATENCY",
    },
    {
      old: "40% of time on data entry",
      new: "Agents handle the busy work",
      label: "CAPACITY",
    },
    {
      old: "Inconsistent human follow-up",
      new: "100% precision logic execution",
      label: "PRECISION",
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Manual Burden */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-border/60 p-10 rounded-[2.5rem]"
          >
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="text-red-500" size={24} />
              <h3 className="font-black text-xl uppercase tracking-tighter">
                Manual_Burden
              </h3>
            </div>
            <div className="space-y-8">
              {points.map((p) => (
                <div key={p.label} className="group">
                  <span className="font-mono text-[9px] text-[#0A0A0A]/30 font-bold uppercase tracking-[0.2em]">
                    {p.label}
                  </span>
                  <p className="text-[#0A0A0A]/60 font-medium mt-1">{p.old}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Advantage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CheckCircle2 size={120} className="text-primary" />
            </div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <CheckCircle2 size={24} className="text-primary" />
              <h3 className="font-black text-xl uppercase tracking-tighter">
                Driplare_Advantage
              </h3>
            </div>
            <div className="space-y-8 relative z-10">
              {points.map((p) => (
                <div key={p.label}>
                  <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.2em]">
                    {p.label}_SOLVED
                  </span>
                  <p className="text-white font-black text-lg mt-1 tracking-tight">
                    {p.new}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
