"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Sparkles, Building2, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const STATS = [
    { valueKey: "hero.stats.tools.value", labelKey: "hero.stats.tools.label" },
    { valueKey: "hero.stats.clients.value", labelKey: "hero.stats.clients.label" },
    { valueKey: "hero.stats.success.value", labelKey: "hero.stats.success.label" },
];

export function Hero() {
    const { t } = useTranslation("aiConsultingPage");

    const audiences = t("hero.audiences", {
        returnObjects: true,
    }) as Array<{ icon: string; label: string; sub: string }>;

    return (
        <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/8 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* ── Left: Copy ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                        >
                            <BrainCircuit className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                                {t("hero.badge")}
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
                        >
                            {t("hero.titleLine1")}{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    {t("hero.titleHighlight")}
                                </span>
                                {/* Underline accent */}
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.9, duration: 0.5 }}
                                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full origin-left"
                                />
                            </span>
                            <br />
                            {t("hero.titleLine2")}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl"
                        >
                            {t("hero.subtitle")}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="flex flex-col sm:flex-row gap-4 mb-12"
                        >
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group shadow-lg shadow-primary/20"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("hero.primaryCta")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 font-bold text-lg px-8"
                                asChild
                            >
                                <a href="#how-it-works">
                                    {t("hero.secondaryCta")}
                                </a>
                            </Button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {STATS.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl md:text-3xl font-black text-primary mb-0.5">
                                        {t(stat.valueKey)}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium leading-snug">
                                        {t(stat.labelKey)}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Visual ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/*
              IMAGE PLACEHOLDER: AI Consulting Hero Visual
              Option A — Illustration (RECOMMENDED):
                Dimensions: 600×520px
                Content: A person studying business documents/charts,
                  with AI icons and lightbulb moments floating around them.
                  Or: a magnifying glass over a business workflow with
                  AI suggestions appearing.
                Style: Matches brand colors (violet, blue, emerald)
                Path: /images/consulting/hero-illustration.png

              Option B — Photo:
                Dimensions: 600×520px
                Content: Professional in a consultation setting,
                  laptop with data/charts visible
                Path: /images/consulting/hero-photo.jpg
            */}

                        {/* Code-driven placeholder — replace with image above */}
                        <div className="relative bg-card border-2 border-border rounded-3xl p-8 shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                        <BrainCircuit className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-foreground">
                                            {t("hero.visual.title")}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {t("hero.visual.subtitle")}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-2 h-2 rounded-full bg-accent"
                                    />
                                    <span className="text-xs font-bold text-accent">
                                        {t("hero.visual.live")}
                                    </span>
                                </div>
                            </div>

                            {/* Audit area rows */}
                            {(t("hero.visual.areas", { returnObjects: true }) as Array<{ label: string; score: number; color: string }>).map((area, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + i * 0.12 }}
                                    className="flex items-center gap-4 mb-4 last:mb-0"
                                >
                                    <div className="w-28 text-xs font-semibold text-muted-foreground flex-shrink-0">
                                        {area.label}
                                    </div>
                                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${area.score}%` }}
                                            transition={{ delay: 1.2 + i * 0.12, duration: 0.7, ease: "easeOut" }}
                                            className={`h-full rounded-full bg-gradient-to-r ${area.color}`}
                                        />
                                    </div>
                                    <div className="w-10 text-xs font-black text-right text-foreground flex-shrink-0">
                                        {area.score}%
                                    </div>
                                </motion.div>
                            ))}

                            {/* Bottom recommendation card */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                className="mt-6 pt-6 border-t border-border bg-accent/5 border border-accent/20 rounded-2xl p-4"
                            >
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-black text-foreground mb-0.5">
                                            {t("hero.visual.recommendation.label")}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {t("hero.visual.recommendation.text")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Audience floating badges */}
                        {audiences.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
                                className={`absolute bg-card border-2 border-border rounded-2xl px-4 py-2.5 shadow-lg ${i === 0
                                    ? "-left-8 top-1/4"
                                    : i === 1
                                        ? "-right-6 bottom-1/3"
                                        : "-bottom-4 left-1/4"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{a.icon}</span>
                                    <div>
                                        <div className="text-xs font-black text-foreground whitespace-nowrap">
                                            {a.label}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                                            {a.sub}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
            >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-xs font-medium">{t("hero.scrollText")}</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowRight className="w-4 h-4 rotate-90" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}