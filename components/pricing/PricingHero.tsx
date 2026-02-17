"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GridLayer, GlowBlob, BRAND } from "@/components/effects/bg-effects";

export function PricingPageHero() {
  const { t } = useTranslation("pricingPage");

  return (
    <section className="relative min-h-[70vh] bg-background flex items-center justify-center overflow-hidden pt-20">

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <GridLayer color={BRAND.violet} opacity={0.06} cellSize={40} />
        <GlowBlob color={BRAND.violet} position="top-left" size={550} opacity={0.07} duration={18} />
        <GlowBlob color={BRAND.blue} position="bottom-right" size={500} opacity={0.05} duration={22} delay={4} />
        <GlowBlob color={BRAND.emerald} position="top-right" size={350} opacity={0.04} duration={26} delay={8} />
      </div>

      {/* Gradient fade to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/60 to-background pointer-events-none" />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t("Hero.badge")}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight"
          >
            {t("Hero.title.line1")}{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t("Hero.title.line2")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {t("Hero.subtitle")}
          </motion.p>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto"
          >
            {(t("Hero.props", { returnObjects: true }) as Array<{
              icon: string; value: string; label: string;
            }>).map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6
                           hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="text-3xl mb-2">{prop.icon}</div>
                <div className="text-2xl font-black text-primary mb-1">{prop.value}</div>
                <div className="text-sm text-muted-foreground">{prop.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}