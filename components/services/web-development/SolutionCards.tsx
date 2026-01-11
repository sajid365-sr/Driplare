"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Database, Link2, History } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SolutionCards = () => {
  const { t } = useTranslation();

  const solutions = [
    {
      icon: <LayoutDashboard />,
      tag: t("services.webDev.solutions.items.dashboards.tag"),
      title: t("services.webDev.solutions.items.dashboards.title"),
      desc: t("services.webDev.solutions.items.dashboards.desc"),
    },
    {
      icon: <Database />,
      tag: t("services.webDev.solutions.items.internal.tag"),
      title: t("services.webDev.solutions.items.internal.title"),
      desc: t("services.webDev.solutions.items.internal.desc"),
    },
    {
      icon: <Link2 />,
      tag: t("services.webDev.solutions.items.api.tag"),
      title: t("services.webDev.solutions.items.api.title"),
      desc: t("services.webDev.solutions.items.api.desc"),
    },
    {
      icon: <History />,
      tag: t("services.webDev.solutions.items.legacy.tag"),
      title: t("services.webDev.solutions.items.legacy.title"),
      desc: t("services.webDev.solutions.items.legacy.desc"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            {t("services.webDev.solutions.tagline")}
          </span>
          <h2 className="text-4xl font-black text-[#0A0A0A] dark:text-white tracking-tighter uppercase mt-4 transition-colors">
            {t("services.webDev.solutions.header")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-[#F9F9F9] dark:bg-white/5 border border-border/40 dark:border-white/10 rounded-[2rem] hover:border-primary transition-all group"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
                {sol.icon}
              </div>
              <span className="font-mono text-[9px] font-black text-primary/50 dark:text-primary/70 tracking-widest uppercase">
                {sol.tag}
              </span>
              <h3 className="font-black text-lg uppercase tracking-tight mt-2 mb-3 text-[#0A0A0A] dark:text-white transition-colors">
                {sol.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/50 dark:text-white/50 font-medium leading-relaxed transition-colors">
                {sol.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
