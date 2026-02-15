"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Zap, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { GlowBlob, Particles, BRAND } from "@/components/effects/bg-effects";

function ScanRings() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-primary/10 dark:border-primary/15"
                    initial={{ width: 80, height: 80, opacity: 0.5 }}
                    animate={{ width: 80 + i * 200, height: 80 + i * 200, opacity: 0 }}
                    transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: "easeOut" }}
                />
            ))}
        </div>
    );
}

export function CaseStudyCTA() {
    const { t } = useTranslation("caseStudiesPage");
    const badges = t("cta.badges", { returnObjects: true }) as string[];

    return (
        <section className="py-24 relative overflow-hidden">
            <GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.06} duration={20} />
            <GlowBlob color={BRAND.emerald} position="bottom-right" size={400} opacity={0.05} duration={22} delay={4} />
            <Particles colors={[BRAND.violet, BRAND.blue, BRAND.emerald]} count={14} minOpacity={0.07} maxOpacity={0.28} speed={0.6} />

            <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/15 dark:border-primary/25 rounded-br pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-accent/15 dark:border-accent/25 rounded-tl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl border border-primary/20 dark:border-primary/15
                       backdrop-blur-sm bg-card/50 dark:bg-white/[0.03] p-10 md:p-14 text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/8 dark:to-accent/8 pointer-events-none" />
                        <ScanRings />

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="relative w-16 h-16 mx-auto mb-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/25">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2.5"
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-md absolute top-0 left-1/2 -translate-x-1/2" />
                            </motion.div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="text-3xl md:text-4xl font-black text-foreground mb-3 relative z-10"
                        >
                            {t("cta.title")}<br />
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {t("cta.titleHighlight")}
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.32 }}
                            className="text-muted-foreground text-base mb-8 max-w-lg mx-auto leading-relaxed relative z-10"
                        >
                            {t("cta.subtitle")}
                        </motion.p>

                        {/* Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.38 }}
                            className="flex flex-wrap justify-center gap-2.5 mb-8 relative z-10"
                        >
                            {badges.map((badge, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.42 + i * 0.06 }}
                                    className="inline-flex items-center gap-1.5 bg-card/80 dark:bg-white/[0.05]
                             border border-border dark:border-white/[0.08] backdrop-blur-sm
                             text-foreground text-xs font-semibold px-3 py-1.5 rounded-full"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                    {badge}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
                        >
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg shadow-primary/20 group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("cta.primaryButton")}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                            <Button
                                size="lg" variant="outline"
                                className="font-bold px-8 border-2 border-border dark:border-white/[0.10] dark:hover:bg-white/[0.04]"
                                asChild
                            >
                                <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    {t("cta.secondaryButton")}
                                </a>
                            </Button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-xs text-muted-foreground mt-6 relative z-10"
                        >
                            {t("cta.note")}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}