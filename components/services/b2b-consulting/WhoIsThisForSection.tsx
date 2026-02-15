"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

/* ─── Animated background: dot grid ─── */
function DotGrid() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="who-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="hsl(var(--primary))" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#who-dots)" />
            </svg>
        </div>
    );
}

/* ─── Floating glow orbs ─── */
function GlowOrbs() {
    return (
        <>
            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/6 dark:bg-primary/12 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/6 dark:bg-accent/12 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-48 h-48 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-[80px] pointer-events-none" />
        </>
    );
}

/* ─── Animated sparkle ─── */
function SparkleIcon({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4], rotate: [0, 15, 0] }}
            transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
        >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
        </motion.div>
    );
}

const AUDIENCE_COLORS = [
    { border: "dark:border-violet-500/20", icon: "from-[#7c3aed] to-[#3b82f6]", glow: "dark:shadow-violet-500/10" },
    { border: "dark:border-blue-500/20", icon: "from-[#3b82f6] to-[#10b981]", glow: "dark:shadow-blue-500/10" },
    { border: "dark:border-emerald-500/20", icon: "from-[#10b981] to-[#7c3aed]", glow: "dark:shadow-emerald-500/10" },
    { border: "dark:border-violet-500/20", icon: "from-[#7c3aed] to-[#10b981]", glow: "dark:shadow-violet-500/10" },
];

type Audience = {
    emoji: string;
    title: string;
    subtitle: string;
    pains: string[];
    gains: string[];
    cta: string;
};

export function WhoIsThisForSection() {
    const { t } = useTranslation("aiConsultingPage");

    const audiences = t("whoIsThisFor.audiences", {
        returnObjects: true,
    }) as Audience[];

    return (
        <section className="py-24 relative overflow-hidden bg-background dark:bg-[#0a0a12]">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-secondary/4 dark:from-primary/8 dark:via-[#0a0a12] dark:to-secondary/8" />
            <DotGrid />
            <GlowOrbs />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-secondary/10 dark:bg-secondary/15 border border-secondary/20 dark:border-secondary/25 rounded-full px-4 py-2 mb-6"
                    >
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">
                            {t("whoIsThisFor.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whoIsThisFor.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whoIsThisFor.subtitle")}
                    </p>
                </motion.div>

                {/* ── Audience Cards ── */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {audiences.map((audience, index) => {
                        const color = AUDIENCE_COLORS[index % AUDIENCE_COLORS.length];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                className={`
                  group relative overflow-hidden rounded-3xl
                  bg-card/60 dark:bg-white/[0.03]
                  border border-border ${color.border}
                  hover:border-primary/40 dark:hover:border-primary/30
                  backdrop-blur-sm
                  hover:shadow-xl ${color.glow}
                  transition-all duration-300
                `}
                            >
                                {/* Inner hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/4 via-transparent to-accent/4 dark:from-primary/8 dark:to-accent/8 rounded-3xl" />

                                {/* Gradient header */}
                                <div className={`bg-gradient-to-br ${color.icon} p-6 relative overflow-hidden`}>
                                    {/* Subtle noise texture */}
                                    <div className="absolute inset-0 opacity-[0.08]"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                                    />
                                    <div className="relative z-10 flex items-start justify-between">
                                        <div>
                                            <div className="text-3xl mb-2">{audience.emoji}</div>
                                            <h3 className="text-xl font-black text-white">{audience.title}</h3>
                                            <p className="text-white/70 text-sm mt-1">{audience.subtitle}</p>
                                        </div>
                                        <SparkleIcon delay={index * 0.5} />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 relative z-10">
                                    {/* Pain points */}
                                    <div className="mb-5">
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">
                                            {t("whoIsThisFor.painLabel")}
                                        </p>
                                        <div className="space-y-2">
                                            {audience.pains.map((pain, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.12 + i * 0.06 }}
                                                    className="flex items-start gap-2.5"
                                                >
                                                    <X className="w-3.5 h-3.5 text-destructive/60 flex-shrink-0 mt-0.5" />
                                                    <span className="text-xs text-muted-foreground">{pain}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider with label */}
                                    <div className="relative mb-5">
                                        <div className="h-px bg-border dark:bg-white/[0.06]" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-[10px] font-black px-3 py-0.5 rounded-full bg-gradient-to-r ${color.icon} text-white`}>
                                                {t("whoIsThisFor.afterLabel")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Gains */}
                                    <div className="space-y-2 mb-6">
                                        {audience.gains.map((gain, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 8 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.12 + i * 0.06 }}
                                                className="flex items-start gap-2.5"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-xs text-foreground font-medium">{gain}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        variant="outline"
                                        className={`
                      w-full font-bold border-2
                      border-border dark:border-white/[0.08]
                      hover:border-primary/50 dark:hover:border-primary/40
                      dark:hover:bg-white/[0.04]
                      group/btn transition-all
                    `}
                                        asChild
                                    >
                                        <a href="/contact" className="flex items-center justify-center gap-2">
                                            {audience.cta}
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Bottom note ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/8 dark:bg-primary/12 border border-primary/15 dark:border-primary/20 rounded-full px-5 py-2.5">
                        <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-semibold text-foreground">
                            {t("whoIsThisFor.bottomNote")}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}