
import { motion } from "framer-motion";
import { Users, Settings, Lightbulb } from "lucide-react";

const AGENT_USE_CASES = [
  {
    icon: Users,
    label: "Sales Outreach",
    tip: "Let AI auto-prospect & follow up",
  },
  {
    icon: Settings,
    label: "Data Entry",
    tip: "Streamline back-office workflows",
  },
  {
    icon: Lightbulb,
    label: "Content Suggestions",
    tip: "Get fresh post & blog ideas instantly",
  },
];

export function CustomAgentsSection() {
  return (
    <section id="agents" className="py-20 md:py-28 bg-transparent">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Custom AI Agents</h3>
        <p className="text-blue-100 text-lg mb-2">Tailored AI assistants for your workflows. <span className="block text-[#1eaedb] font-semibold">Built & trained just for you.</span></p>
      </motion.div>
      <motion.div
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.22,
            }
          }
        }}
      >
        {AGENT_USE_CASES.map((use, idx) => (
          <motion.div
            key={use.label}
            className="relative rounded-xl shadow-xl bg-gradient-to-br from-[#22243d]/40 to-[#1eaedb]/10 p-8 flex flex-col group hover:bg-[#1eaedb]/20 hover:scale-105 transition-all justify-center items-center min-h-[180px]"
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.14, duration: 0.7, type: "spring" }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 8px 28px 0 #1eaedb44",
            }}
          >
            <use.icon size={38} className="text-[#F88220] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="font-bold text-white text-xl mb-1">{use.label}</div>
            {/* Tooltip on hover */}
            <div className="absolute text-xs left-1/2 -bottom-6 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-[#22243d] px-3 py-2 rounded-lg shadow-md text-[#1eaedb] transition-all z-10">
              {use.tip}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
