"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Zap, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ScrapingCTA() {
  const { t } = useTranslation();

  const trustStats = [
    {
      icon: Database,
      val: "1.2PB+",
      label: t("services.scraping.cta.trustGrid.data"),
      color: "text-blue-400",
    },
    {
      icon: Zap,
      val: "45ms",
      label: t("services.scraping.cta.trustGrid.latency"),
      color: "text-primary",
    },
    {
      icon: ShieldCheck,
      val: "AES-256",
      label: t("services.scraping.cta.trustGrid.security"),
      color: "text-green-400",
    },
    {
      icon: Globe,
      val: "∞",
      label: t("services.scraping.cta.trustGrid.sources"),
      color: "text-purple-400",
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0B] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-30" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.1]">
          <defs>
            <pattern
              id="cta-dots"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#FF6B00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-mono mb-10 backdrop-blur-md uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t("services.scraping.cta.badge")}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[1] tracking-tighter uppercase italic">
              {t("services.scraping.cta.titleStart")}{" "}
              <span className="text-primary">
                {t("services.scraping.cta.titleHighlight")}{" "}
              </span>
              {t("services.scraping.cta.titleEnd")}
            </h2>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("services.scraping.cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-8 text-lg font-black rounded-2xl shadow-[0_20px_50px_rgba(255,107,0,0.3)] transition-all group w-full sm:w-auto"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-3">
                  {t("services.scraping.cta.buttonPrimary")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-10 py-8 text-lg font-bold rounded-2xl backdrop-blur-sm w-full sm:w-auto"
              >
                {t("services.scraping.cta.buttonSecondary")}
              </Button>
            </div>
          </motion.div>

          {/* Trust Grid */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustStats.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-primary/40 transition-all group"
              >
                <item.icon className={`w-5 h-5 ${item.color} mb-4 mx-auto`} />
                <div className="text-2xl font-black text-white mb-1 font-mono tracking-tighter">
                  {item.val}
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal Footer */}
          <motion.div
            className="mt-16 inline-flex items-center gap-4 font-mono text-[10px] text-white/20 bg-black/40 px-8 py-3 rounded-full border border-white/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="text-primary font-bold">
              bash --init_extraction
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span>ENGINE: V8_TURBO</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-green-500/50">STATUS: OPTIMAL</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
