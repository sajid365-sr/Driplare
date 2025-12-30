import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const painPoints = [
  {
    title: "FRAGMENTED STACK",
    desc: "Your CRM, Billing, and Support don't speak. We fix the silence.",
    code: "ERR_SILOED_DATA",
  },
  {
    title: "THE MANUAL TAX",
    desc: "Every hour of data entry is an hour stolen from growth.",
    code: "ERR_LOW_ROI",
  },
  {
    title: "HUMAN DRIFT",
    desc: "Manual processes eventually fail. Automation is 100% consistent.",
    code: "ERR_LOGIC_FAIL",
  },
];

export const ProblemGrid = () => (
  <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden">
    <div className="container">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
          Audit_Report
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mt-4 mb-6">
          The Cost of{" "}
          <span className="text-primary italic">Doing Nothing.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {painPoints.map((point, idx) => (
          <motion.div
            key={idx}
            className="p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent relative group"
            whileHover={{ borderColor: "rgba(255, 107, 0, 0.3)" }}
          >
            <AlertTriangle
              className="text-primary/40 group-hover:text-primary transition-colors mb-6"
              size={24}
            />
            <span className="font-mono text-[10px] text-primary font-black tracking-widest uppercase">
              {point.code}
            </span>
            <h3 className="text-xl font-black uppercase mt-2 mb-4 tracking-tight">
              {point.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              {point.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
