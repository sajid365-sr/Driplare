"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const FinalCTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container">
        <div className="bg-[#0A0A0A] dark:bg-white/5 border border-transparent dark:border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group transition-all">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-colors" />

          {/* Heading */}
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-[0.02em] uppercase mb-8 relative z-10 leading-[1.1]">
            {t("services.aiAgents.cta.title")} <br />{" "}
            <span className="text-primary italic font-serif lowercase">
              {t("services.aiAgents.cta.for")}
            </span>{" "}
            {t("services.aiAgents.cta.tasks")}
          </h2>

          {/* Status Tag */}
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-mono uppercase tracking-[0.2em] text-[10px] font-bold">
            {t("services.aiAgents.cta.status")}
          </p>

          {/* CTA Button */}
          <Link href="/contact" className="relative z-10">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              {t("services.aiAgents.cta.button")}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
