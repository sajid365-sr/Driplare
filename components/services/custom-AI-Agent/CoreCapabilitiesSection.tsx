'use client'

import { motion } from "framer-motion";
import { Target, Bot, BarChart3, Settings2 } from "lucide-react";

const capabilities = [
  {
    icon: <Target />,
    title: "Lead Qualification",
    desc: "Vet and score leads from WhatsApp or Email. Only high-value prospects reach your CRM.",
  },
  {
    icon: <Bot />,
    title: "Support Agents",
    desc: "Agents that access your internal RAG knowledge base to solve complex user queries.",
  },
  {
    icon: <BarChart3 />,
    title: "Research & Data",
    desc: "Autonomous agents that scrape and summarize market insights directly to your dashboard.",
  },
  {
    icon: <Settings2 />,
    title: "Operations Logic",
    desc: "Connect your stack via n8n to trigger database updates and Slack alerts instantly.",
  },
];

export const CoreCapabilitiesSection = () => (
  <section className="py-24 bg-white">
    <div className="container">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
          Modules
        </span>
        <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase mt-4">
          Core_Capabilities
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((cap, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-[#F9F9F9] border border-border/40 rounded-[2rem] hover:border-primary/40 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
              {cap.icon}
            </div>
            <h3 className="font-black text-lg uppercase tracking-tight mb-3">
              {cap.title}
            </h3>
            <p className="text-sm text-[#0A0A0A]/50 font-medium leading-relaxed">
              {cap.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
