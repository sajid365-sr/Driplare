"use client";

import { motion } from "framer-motion";
import { Target, Bot, BarChart3, Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CoreCapabilitiesSection = () => {
  const { t } = useTranslation();

  const capabilities = [
    {
      icon: <Target />,
      title: t("services.aiAgents.capabilities.items.leadQual.title"),
      desc: t("services.aiAgents.capabilities.items.leadQual.desc"),
    },
    {
      icon: <Bot />,
      title: t("services.aiAgents.capabilities.items.support.title"),
      desc: t("services.aiAgents.capabilities.items.support.desc"),
    },
    {
      icon: <BarChart3 />,
      title: t("services.aiAgents.capabilities.items.research.title"),
      desc: t("services.aiAgents.capabilities.items.research.desc"),
    },
    {
      icon: <Settings2 />,
      title: t("services.aiAgents.capabilities.items.ops.title"),
      desc: t("services.aiAgents.capabilities.items.ops.desc"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            {t("services.aiAgents.capabilities.tagline")}
          </span>
          <h2 className="text-4xl font-black text-[#0A0A0A] dark:text-white tracking-tighter uppercase mt-4 transition-colors">
            {t("services.aiAgents.capabilities.title")}
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
              className="p-8 bg-[#F9F9F9] dark:bg-white/5 border border-border/40 dark:border-white/10 rounded-[2rem] hover:border-primary/40 transition-all group"
            >
              <div className="w-12 h-12 bg-white dark:bg-black rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {cap.icon}
              </div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-3 text-[#0A0A0A] dark:text-white transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/50 dark:text-white/50 font-medium leading-relaxed transition-colors">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
