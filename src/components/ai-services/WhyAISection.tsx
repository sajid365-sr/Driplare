
import { motion } from "framer-motion";
import { Zap, Users, Settings } from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "24/7 Smart Support",
    desc: "AI handles queries any hour with context-aware responses.",
    accent: "from-[#1EAEDB]/70 to-[#F88220]/80"
  },
  {
    icon: Users,
    title: "Customizable AI Agents",
    desc: "Assistants tailored to your exact workflows and brand.",
    accent: "from-[#F88220]/70 to-[#1EAEDB]/60"
  },
  {
    icon: Settings,
    title: "End-to-End Automation",
    desc: "Automate processes—free your team for real creativity.",
    accent: "from-[#512cc1]/50 to-[#F88220]/80"
  }
];

export function WhyAISection() {
  return (
    <section className="relative py-24 px-4 bg-transparent">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why AI with Driplare?</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            className={`flex-1 rounded-3xl px-7 py-8 bg-gradient-to-br ${b.accent} glass-morphism shadow-lg group transition-transform hover:scale-105`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.6, type: "spring" }}
          >
            <motion.div
              className="mb-4 flex justify-center"
              initial={{ pathLength: 0, opacity: 0.7 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.6 }}
            >
              <b.icon
                size={48}
                className="text-white drop-shadow-lg group-hover:text-[#1eaedb] group-hover:scale-110 transition-all duration-300"
                strokeWidth={2.2}
              />
            </motion.div>
            <div className="text-xl font-bold mb-2 text-white text-center">{b.title}</div>
            <div className="text-blue-100 text-base opacity-90 text-center">{b.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
