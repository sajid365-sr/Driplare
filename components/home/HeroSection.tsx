"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation("homePage");

  const getRandomPosition = () => {
    const width =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const height =
      typeof window !== "undefined" ? window.innerHeight : 800;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
    };
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              ...getRandomPosition(),
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight"
            >
              {t("hero.titlePart1")}{" "}
              <span className="text-gradient-violet">
                {t("hero.titlePart2")}
              </span>{" "}
              {t("hero.titlePart3")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                asChild
              >
                <Link href="/agent-marketplace" className="flex items-center gap-2">
                  {t("hero.btnViewSystems")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2"
                asChild
              >
                <Link href="/contact">{t("hero.btnBookConsult")}</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  {t("hero.fastSetup")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {t("hero.trustedBy")}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-card border-2 border-border rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-4">
                  driplare_ai_v1.0
                </span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-3">
                  <span className="text-muted-foreground">$</span>
                  <span className="text-accent">initialize_agent --type="sales"</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">→</span>
                  <span className="text-secondary">Training on your business data...</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">→</span>
                  <span className="text-muted-foreground">Connecting to WhatsApp...</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">✓</span>
                  <span className="text-primary font-bold animate-pulse">
                    LIVE: Handling customers 24/7
                  </span>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-card border-2 border-border rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    {t("hero.efficiency")}
                  </p>
                  <p className="text-2xl font-black text-foreground">+300%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Text */}
      <div className="absolute bottom-10 left-10 hidden xl:block pointer-events-none select-none">
        <p className="text-[10rem] font-black text-muted/5 uppercase leading-none">
          AI
        </p>
      </div>
    </section>
  );
}