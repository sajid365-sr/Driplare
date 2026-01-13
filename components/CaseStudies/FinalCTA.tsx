"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 border-t border-border/50 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-primary/20">
          {/* Decorative background text - dynamic and adapts to language */}
          <div className="absolute top-0 left-0 text-[6rem] md:text-[10rem] font-black opacity-10 pointer-events-none -translate-x-1/4 -translate-y-1/4 text-white select-none uppercase">
            {t("case_studies.final_cta.bg_text")}
          </div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
              {t("case_studies.final_cta.title_line1")} <br />
              <span className="opacity-90">
                {t("case_studies.final_cta.title_line2")}
              </span>
            </h2>

            <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              {t("case_studies.final_cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-neutral-100 dark:bg-white dark:text-primary rounded-full px-8 md:px-10 py-7 md:py-8 text-lg md:text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <Link href="/contact" className="flex items-center">
                  {t("case_studies.final_cta.btn_text")}{" "}
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mb-32" />
        </div>
      </div>
    </section>
  );
}
