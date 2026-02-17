"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { GlowBlob, DarkGridBoost, BRAND } from "@/components/effects/bg-effects";
import Link from "next/link";

export function PricingFinalCTA() {
  const { t } = useTranslation("pricingPage");

  return (
    <section className="py-20 relative overflow-hidden" style={{ isolation: "isolate" }}>
      {/* Bg */}
      <div className="absolute inset-0 pointer-events-none">
        <DarkGridBoost color={BRAND.violet} opacity={0.06} cellSize={44} />
        <GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.09} duration={18} />
        <GlowBlob color={BRAND.blue} position="bottom-right" size={450} opacity={0.07} duration={22} delay={5} />
        <GlowBlob color={BRAND.emerald} position="top-right" size={300} opacity={0.05} duration={28} delay={10} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              {t("CTA.badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-foreground mb-5"
          >
            {t("CTA.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {t("CTA.subtitle")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg shadow-primary/20 group"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                {t("CTA.primary")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 font-bold px-8 group"
              asChild
            >
              <Link href="/marketplace" className="flex items-center gap-2">
                {t("CTA.secondary")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}