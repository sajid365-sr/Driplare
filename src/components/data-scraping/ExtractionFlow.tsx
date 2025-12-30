import { motion } from "framer-motion";
import {
  Search,
  Download,
  Filter,
  Monitor,
  Globe,
  Database,
} from "lucide-react";

const steps = [
  { icon: Search, title: "Targeting", detail: "Anti-bot analysis" },
  { icon: Download, title: "Extraction", detail: "Residential IP rotation" },
  { icon: Filter, title: "Refining", detail: "Data normalization" },
  { icon: Monitor, title: "Monitoring", detail: "Real-time API push" },
];

export function ExtractionFlow() {
  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            Architecture_Lifecycle
          </span>
          <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase mt-4">
            The Data Pipeline
          </h2>
        </div>

        <div className="relative pt-12">
          {/* Connecting Line */}
          <div className="absolute top-24 left-10 right-10 h-[1px] bg-border hidden lg:block" />

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white p-8 rounded-[2rem] border border-border/40 shadow-sm group hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  <step.icon size={20} />
                </div>
                <div className="font-mono text-[10px] text-primary font-bold mb-2">
                  PHASE_0{idx + 1}
                </div>
                <h3 className="font-black text-xl uppercase tracking-tighter mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#0A0A0A]/50 font-medium">
                  {step.detail}
                </p>

                {/* Visual Connector for Mobile */}
                <div className="mt-6 font-mono text-[9px] text-[#0A0A0A]/20 tracking-widest uppercase">
                  READY_FOR_HANDOVER // {idx === 3 ? "FINAL" : "NEXT"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
