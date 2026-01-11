"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const HighImpactCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container">
        <div className="bg-[#0A0A0A] dark:bg-white/5 border border-transparent dark:border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group">
          {/* Advanced Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full" />

          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8 relative z-10 leading-tight">
            {t("services.webDev.cta.title")} <br />{" "}
            <span className="text-primary italic">
              {t("services.webDev.cta.titleHighlight")}
            </span>
          </h2>

          <p className="text-white/40 dark:text-white/60 text-lg mb-12 max-w-xl mx-auto font-mono uppercase tracking-[0.2em] text-[10px] font-bold relative z-10">
            {t("services.webDev.cta.status")}
          </p>

          <div className="relative z-10">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                {t("services.webDev.cta.button")}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
