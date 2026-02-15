"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrainCircuit, ArrowRight, CheckCircle2, Clock, Shield, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

/* ─── Floating particles ─── */
function Particles() {
    const [dots, setDots] = useState<Array<{
        x: number; y: number; size: number; delay: number; duration: number; color: string;
    }>>([]);

    useEffect(() => {
        const colors = ["bg-primary/30", "bg-secondary/30", "bg-accent/30"];
        setDots(
            Array.from({ length: 30 }, (_, i) => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                delay: Math.random() * 5,
                duration: Math.random() * 7 + 5,
                color: colors[i % 3],
            }))
        );
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {dots.map((dot, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${dot.color}`}
                    style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
                    animate={{ y: [-12, 12, -12], opacity: [0.15, 0.5, 0.15] }}
                    transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

/* ─── Radial scan ring animation ─── */
function ScanRing() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-primary/10 dark:border-primary/15"
                    initial={{ width: 100, height: 100, opacity: 0.6 }}
                    animate={{ width: 100 + i * 180, height: 100 + i * 180, opacity: 0 }}
                    transition={{
                        duration: 3.5,
                        delay: i * 1.1,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

const STAT_ICONS = [Clock, Shield, Zap];

export function SimpleCTA() {
    const { t } = useTranslation("aiConsultingPage");

    const trustBadges = t("simpleCta.trustBadges", {
        returnObjects: true,
    }) as string[];

    const stats = t("simpleCta.stats", {
        returnObjects: true,
    }) as Array<{ label: string }>;

    return (
        <section className="py-24 relative overflow-hidden bg-background dark:bg-[#0a0a12]">
            {/* Deep gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-secondary/6 dark:from-primary/12 dark:via-[#0a0a12] dark:to-secondary/12" />

            <Particles />
            <ScanRing />

            {/* Corner accent lines */}
            <div className="absolute top-0 left-3 w-40 h-40 border-l-2 border-t-2 border-primary/10 dark:border-primary/20 rounded-br-3xl pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-40 h-40 border-r-2 border-b-2 border-accent/10 dark:border-accent/20 rounded-tl-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl border border-primary/20 dark:border-primary/15 backdrop-blur-sm bg-card/40 dark:bg-white/[0.03] p-10 md:p-14 text-center"
                    >
                        {/* Inner gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10 pointer-events-none" />

                        {/* Animated icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="relative w-20 h-20 mx-auto mb-8"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30">
                                <BrainCircuit className="w-10 h-10 text-white" />
                            </div>
                            {/* Orbiting dot */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-3"
                            >
                                <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/40 absolute -top-0 left-1/2 -translate-x-1/2" />
                            </motion.div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-5xl font-black text-foreground mb-4 relative z-10"
                        >
                            {t("simpleCta.title")}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.38 }}
                            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed relative z-10"
                        >
                            {t("simpleCta.subtitle")}
                        </motion.p>

                        {/* Trust badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.44 }}
                            className="flex flex-wrap justify-center gap-3 mb-10 relative z-10"
                        >
                            {trustBadges.map((badge, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.07 }}
                                    className="inline-flex items-center gap-2 bg-card/80 dark:bg-white/[0.05] border border-border dark:border-white/[0.08] backdrop-blur-sm text-foreground text-sm font-semibold px-4 py-2 rounded-full"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                                    {badge}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-10 relative z-10"
                        >
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 shadow-xl shadow-primary/25 group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("simpleCta.primaryButton")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="font-bold text-lg px-8 border-2 border-border dark:border-white/[0.10] dark:hover:bg-white/[0.04]"
                                asChild
                            >
                                <a href="#pricing-section">
                                    {t("simpleCta.secondaryButton")}
                                </a>
                            </Button>
                        </motion.div>

                        {/* Stats strip */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.65 }}
                            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border dark:border-white/[0.06]"
                        >
                            {stats.map((stat, i) => {
                                const Icon = STAT_ICONS[i];
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 8 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7 + i * 0.1 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span className="text-sm font-semibold text-foreground">{stat.label}</span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Final micro note */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.85 }}
                            className="text-xs text-muted-foreground mt-6 relative z-10"
                        >
                            {t("simpleCta.finalNote")}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}