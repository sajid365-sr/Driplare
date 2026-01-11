"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-[#F9F9F9] dark:bg-white/5 border border-border/60 dark:border-white/10 px-4 py-2 rounded-full mb-8">
            <Box size={14} className="text-primary" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A]/60 dark:text-white/60 uppercase">
              {t("services.webDev.hero.infra")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-[#0A0A0A] dark:text-white uppercase">
            {t("services.webDev.hero.title")} <br />
            <span className="text-primary italic">
              {t("services.webDev.hero.titleHighlight")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#0A0A0A]/60 dark:text-white/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            {t("services.webDev.hero.description")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-16 px-10 bg-[#0A0A0A] dark:bg-white hover:bg-primary dark:hover:bg-primary text-white dark:text-black rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl shadow-black/10 dark:shadow-white/5"
              >
                {t("services.webDev.hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="/case-studies"
              className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]/40 dark:text-white/40 hover:text-primary transition-colors"
            >
              {t("services.webDev.hero.viewStack")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Element for Dark Mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0,transparent_70%)] pointer-events-none" />
    </section>
  );
};
