"use client";

import { motion } from "framer-motion";
import { Search, Download, Filter, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ExtractionFlow() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      title: t("services.scraping.flow.steps.targeting.title"),
      detail: t("services.scraping.flow.steps.targeting.detail"),
    },
    {
      icon: Download,
      title: t("services.scraping.flow.steps.extraction.title"),
      detail: t("services.scraping.flow.steps.extraction.detail"),
    },
    {
      icon: Filter,
      title: t("services.scraping.flow.steps.refining.title"),
      detail: t("services.scraping.flow.steps.refining.detail"),
    },
    {
      icon: Monitor,
      title: t("services.scraping.flow.steps.monitoring.title"),
      detail: t("services.scraping.flow.steps.monitoring.detail"),
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-white/5 transition-colors duration-300">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            {t("services.scraping.flow.tagline")}
          </span>
          <h2 className="text-4xl font-black text-[#0A0A0A] dark:text-white tracking-tighter uppercase mt-4">
            {t("services.scraping.flow.header")}
          </h2>
        </div>

        <div className="relative pt-12">
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="absolute top-24 left-10 right-10 h-[1px] bg-border dark:bg-white/10 hidden lg:block" />

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white dark:bg-[#0A0A0A] p-8 rounded-[2rem] border border-border/40 dark:border-white/10 shadow-sm group hover:border-primary/40 transition-all"
              >
                {/* Icon Box */}
                <div className="w-12 h-12 bg-[#0A0A0A] dark:bg-primary rounded-xl flex items-center justify-center text-primary dark:text-white mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  <step.icon size={20} />
                </div>

                <div className="font-mono text-[10px] text-primary font-bold mb-2">
                  PHASE_0{idx + 1}
                </div>

                <h3 className="font-black text-xl uppercase tracking-tighter mb-2 text-[#0A0A0A] dark:text-white">
                  {step.title}
                </h3>

                <p className="text-sm text-[#0A0A0A]/50 dark:text-white/50 font-medium min-h-[40px]">
                  {step.detail}
                </p>

                {/* Status Indicator */}
                <div className="mt-6 font-mono text-[9px] text-[#0A0A0A]/20 dark:text-white/20 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-ping" />
                  {t("services.scraping.flow.footer")} //{" "}
                  {idx === 3
                    ? t("services.scraping.flow.final")
                    : t("services.scraping.flow.next")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
