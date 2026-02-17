"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles } from "lucide-react";
import { GridLayer, GlowBlob, BRAND } from "@/components/effects/bg-effects";

export function PricingTeaser() {
    const { t } = useTranslation("homePage");

    const anchors = t("homePricingTeaser.anchors", { returnObjects: true }) as Array<{
        service: string;
        from: string;
        note: string;
    }>;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.05} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={450} opacity={0.05} duration={20} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={400} opacity={0.04} duration={24} delay={6} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-12 max-w-2xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("homePricingTeaser.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 leading-tight">
                        {t("homePricingTeaser.title")}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        {t("homePricingTeaser.subtitle")}
                    </p>
                </motion.div>

                {/* 4 service anchor cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
                    {anchors.map((anchor, i) => (
                        <motion.div
                            key={anchor.service}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.38 }}
                            className="bg-card border border-border rounded-2xl px-5 py-5
                         hover:border-primary/30 hover:shadow-md transition-all"
                        >
                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">
                                {anchor.service}
                            </p>
                            <p className="text-2xl font-black text-primary mb-1">{anchor.from}</p>
                            <p className="text-xs text-muted-foreground leading-snug">{anchor.note}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.38 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90
                       text-primary-foreground font-black text-sm rounded-xl px-6 py-3
                       shadow-md shadow-primary/20 transition-all group"
                    >
                        {t("homePricingTeaser.cta")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center gap-2 bg-transparent border border-border
                       hover:border-primary/40 text-foreground font-black text-sm rounded-xl px-6 py-3
                       transition-all group"
                    >
                        {t("homePricingTeaser.ctaSecondary")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>

                {/* Trust note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-muted-foreground mt-5"
                >
                    {t("homePricingTeaser.trustNote")}
                </motion.p>

            </div>
        </section>
    );
}