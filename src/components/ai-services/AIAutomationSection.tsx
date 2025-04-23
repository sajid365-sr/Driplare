
import { motion } from "framer-motion";
import { Settings, Zap, FileText } from "lucide-react";

const FLOW_STEPS = [
  {
    icon: Settings,
    label: "Data Extraction",
    desc: "AI parses incoming data & docs"
  },
  {
    icon: Zap,
    label: "Trigger Action",
    desc: "Automated workflows run instantly"
  },
  {
    icon: FileText,
    label: "Report Generation",
    desc: "Summary docs & analytics output",
    metric: "Save 10+ hours/week on average."
  }
];

export function AIAutomationSection() {
  return (
    <section id="automation" className="relative py-20 md:py-28 bg-transparent flex flex-col items-center">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-5">AI Automation</h3>
        <p className="text-lg text-blue-100 mb-2">Automate repetitive tasks end-to-end.<br/><span className="text-[#1eaedb] font-semibold">Workflow Example:</span></p>
      </div>
      {/* Flow diagram */}
      <motion.div
        className="flex flex-col gap-12 md:gap-16 items-center w-full max-w-2xl relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25, once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.33 }
          }
        }}
      >
        {FLOW_STEPS.map((step, idx) => (
          <motion.div
            key={step.label}
            className="relative flex flex-row gap-4 items-center bg-gradient-to-r from-[#1eaedb]/10 to-[#F88220]/10 rounded-2xl px-7 py-7 w-full shadow-xl"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.7 }}
          >
            <step.icon size={34} className="text-[#1eaedb] drop-shadow-md" />
            <div>
              <div className="font-semibold text-white text-lg">{step.label}</div>
              <div className="text-blue-100 text-base">{step.desc}</div>
              {step.metric && (
                <div className="text-[#F88220] font-bold mt-3 text-base">{step.metric}</div>
              )}
            </div>
            {idx < FLOW_STEPS.length - 1 && (
              <svg className="absolute left-1/2 -bottom-9 md:-bottom-12 h-10 w-8" viewBox="0 0 24 48" fill="none">
                <motion.path
                  d="M12 0 C12 16, 12 32, 12 48"
                  stroke="#1EAEDB"
                  strokeWidth="2.5"
                  strokeDasharray="8"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 0.5 + idx * 0.2, duration: 0.66 }}
                />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
