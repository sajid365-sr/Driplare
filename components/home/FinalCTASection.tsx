"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FinalCTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background pattern - Adapts to light/dark */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Circuit animation overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20 dark:opacity-10">
          <defs>
            <linearGradient
              id="pulseGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#pulseGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Headline - Gradient text */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0A0A0A] via-[#FF6B00] to-[#0A0A0A] dark:from-white dark:to-[#FF6B00] bg-clip-text text-transparent">
            {t("cta.title")}
          </h2>

          {/* Subtext */}
          <p className="text-xl text-[#0A0A0A]/70 dark:text-white/70 mb-8 max-w-2xl mx-auto font-mono">
            {t("cta.subtitle")}
          </p>

          {/* CTA Button */}
          <motion.div
            className="mb-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl font-bold rounded-xl shadow-2xl transition-all"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-3">
                {t("cta.button")}
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          {/* Scarcity footer note */}
          <motion.div
            className="inline-flex items-center gap-3 bg-gray-100 dark:bg-[#1F1F1F] border border-[#FF6B00]/30 rounded-full px-6 py-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Clock className="w-5 h-5 text-[#FF6B00] shrink-0" />
            <span className="text-[#0A0A0A]/80 dark:text-white/80 font-mono text-xs md:text-sm">
              {t("cta.scarcity")}
            </span>
          </motion.div>

          {/* Trust indicators / Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-gray-200 dark:border-white/10 pt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF6B00] font-mono">
                99.9%
              </div>
              <div className="text-[#0A0A0A]/60 dark:text-white/60 text-sm uppercase tracking-wider">
                {t("cta.stats.uptime")}
              </div>
            </div>
            <div className="text-center border-y md:border-y-0 md:border-x border-gray-200 dark:border-white/10 py-4 md:py-0">
              <div className="text-3xl font-bold text-[#FF6B00] font-mono">
                24/7
              </div>
              <div className="text-[#0A0A0A]/60 dark:text-white/60 text-sm uppercase tracking-wider">
                {t("cta.stats.monitoring")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF6B00] font-mono">
                ∞
              </div>
              <div className="text-[#0A0A0A]/60 dark:text-white/60 text-sm uppercase tracking-wider">
                {t("cta.stats.scalability")}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
