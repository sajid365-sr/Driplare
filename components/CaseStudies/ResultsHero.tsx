"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ResultsHero() {
  const { t } = useTranslation("caseStudiesPage");

  return (
    <section className="relative py-24 overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <span className="font-mono text-primary text-sm font-bold uppercase tracking-[0.3em]">
            {t("hero.badge")}
          </span>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            {t("hero.title")}{" "}
            <span className="text-primary italic">
              {t("hero.titleSpan")}
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            {t("hero.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
