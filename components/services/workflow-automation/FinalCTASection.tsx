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
          {/* Decorative Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />

          {/* Floating Glow for Dark Mode */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />

          {/* Content */}
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8 relative z-10 leading-none transition-colors">
            {t("services.workflow.finalCta.title")} <br />{" "}
            <span className="text-primary italic">
              {t("services.workflow.finalCta.titleHighlight")}
            </span>
          </h2>

          <div className="relative z-10">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                {t("services.workflow.finalCta.button")}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
