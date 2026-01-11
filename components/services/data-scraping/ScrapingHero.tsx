"use client";

import { motion } from "framer-motion";
import { Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ScrapingHero() {
  const { t } = useTranslation();

  const metrics = [
    { label: t("services.scraping.hero.metrics.daily"), val: "500K+" },
    { label: t("services.scraping.hero.metrics.uptime"), val: "99.9%" },
    { label: t("services.scraping.hero.metrics.sources"), val: "100+" },
    { label: t("services.scraping.hero.metrics.latency"), val: "<200ms" },
  ];

  return (
    <section className="relative min-h-[90vh] bg-white dark:bg-[#0A0A0A] flex items-center justify-center overflow-hidden pt-20 transition-colors duration-300">
      {/* Laser Scanning Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <div className="absolute inset-0 bg-[grid:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Moving Scanning Line Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 dark:opacity-40"
        animate={{ y: [0, 800, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#F9F9F9] dark:bg-white/5 border border-border/60 dark:border-white/10 px-4 py-2 rounded-full mb-8"
        >
          <Database size={14} className="text-primary" />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A]/60 dark:text-white/60 uppercase">
            {t("services.scraping.hero.badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-[#0A0A0A] dark:text-white mb-8 leading-[0.9] tracking-tighter uppercase transition-colors"
        >
          {t("services.scraping.hero.title")} <br />
          <span className="text-primary italic">
            {t("services.scraping.hero.titleHighlight")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-[#0A0A0A]/50 dark:text-white/50 max-w-2xl mx-auto font-medium leading-relaxed mb-12 transition-colors"
        >
          {t("services.scraping.hero.description")}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            size="lg"
            className="h-16 px-10 bg-[#0A0A0A] dark:bg-white hover:bg-primary dark:hover:bg-primary text-white dark:text-black rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-2xl dark:shadow-primary/10"
            asChild
          >
            <Link href="/contact">
              {t("services.scraping.hero.cta")} <ArrowRight className="ml-2" />
            </Link>
          </Button>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold text-[#0A0A0A]/40 dark:text-white/40 uppercase tracking-widest bg-[#F9F9F9] dark:bg-white/5 px-4 py-2 rounded-lg border border-border/40 dark:border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            {t("services.scraping.hero.status")}
          </div>
        </motion.div>

        {/* Metrics Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-white dark:bg-black border border-border/40 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:border-primary/40 transition-all"
            >
              <div className="text-2xl font-black tracking-tighter text-[#0A0A0A] dark:text-white transition-colors">
                {m.val}
              </div>
              <div className="font-mono text-[9px] text-[#0A0A0A]/30 dark:text-white/30 uppercase tracking-widest mt-1 transition-colors">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
