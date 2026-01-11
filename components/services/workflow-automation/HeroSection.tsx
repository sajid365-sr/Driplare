"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F9F9F9] dark:bg-white/5 border border-border/60 dark:border-white/10 px-4 py-2 rounded-full mb-8">
            <Activity size={14} className="text-primary" />
            <span className="font-mono text-[10px] font-black tracking-[0.2em] text-[#0A0A0A]/60 dark:text-white/60 uppercase">
              {t("services.workflow.hero.status")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-[#0A0A0A] dark:text-white uppercase transition-colors">
            {t("services.workflow.hero.title")} <br />
            <span className="text-primary italic">
              {t("services.workflow.hero.titleHighlight")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#0A0A0A]/60 dark:text-white/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed transition-colors">
            {t("services.workflow.hero.description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-16 px-10 bg-[#0A0A0A] dark:bg-white hover:bg-primary dark:hover:bg-primary text-white dark:text-black rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
              >
                {t("services.workflow.hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="/case-studies"
              className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-white/40 hover:text-primary transition-colors"
            >
              {t("services.workflow.hero.browse")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
