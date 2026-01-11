"use client";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function FooterTop() {
  const { t, i18n } = useTranslation();

  const currentDate = new Date()
    .toLocaleDateString(i18n.language === "bn" ? "bn-BD" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/\s/g, "_")
    .toUpperCase();

  return (
    <div className="border-b border-black/5 dark:border-white/5 py-12 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="text-3xl font-black tracking-tighter text-[#0A0A0A] dark:text-white"
            >
              DRIPLARE<span className="text-primary">.</span>
            </Link>
            <p className="text-[10px] font-mono font-bold text-[#0A0A0A]/40 dark:text-white/40 mt-1 uppercase tracking-widest">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="inline-flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-transparent group-hover:border-primary/20 px-6 py-2.5 rounded-2xl transition-all">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-mono text-xs text-[#0A0A0A] dark:text-white font-black tracking-wider uppercase">
                {t("footer.status")}
              </span>
            </div>
            <div className="mt-2 font-mono text-[9px] text-[#0A0A0A]/40 dark:text-white/40 font-bold uppercase tracking-widest">
              {t("footer.lastSync")}: {currentDate} // 0-LATENCY
            </div>
          </div>

          <div>
            <Button
              asChild
              className="bg-[#0A0A0A] dark:bg-primary hover:bg-primary dark:hover:bg-primary/90 text-white px-8 py-7 rounded-2xl font-bold text-lg shadow-xl shadow-black/10 dark:shadow-white/5 transition-all active:scale-95 group border-none"
            >
              <Link href="/contact">
                {t("footer.initiate")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
