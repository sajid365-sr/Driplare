"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
    ArrowRight, Zap, Package, Clock,
    DollarSign, CheckCircle2,
} from "lucide-react";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";

// ─────────────────────────────────────────────────────────────────────────────
// BANNER 1 — After WhoIsThisForSection, before ToolsIntegrationsSection
// ─────────────────────────────────────────────────────────────────────────────
export function AutomationMarketplaceBanner1() {
    const { t } = useTranslation("workflowAutomationPage");

    return (
        <section className="relative overflow-hidden py-0">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            <div className="relative bg-gradient-to-r from-blue-600/[0.07] via-blue-500/[0.05] to-cyan-500/[0.07]
                      dark:from-blue-600/[0.10] dark:via-blue-500/[0.08] dark:to-cyan-500/[0.10]
                      border-y border-blue-500/10 dark:border-blue-500/15 py-8">
                <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                    <GridLayer color={BRAND.blue} opacity={0.06} cellSize={40} />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-0.5">
                                    {t("marketplaceBanner1.label")}
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                    {t("marketplaceBanner1.text")}{" "}
                                    <span className="text-muted-foreground font-normal">
                                        {t("marketplaceBanner1.subtext")}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/marketplace?tab=automations"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         text-white text-sm font-black rounded-xl px-5 py-2.5
                         shadow-md shadow-blue-500/20 hover:shadow-blue-500/30
                         transition-all group whitespace-nowrap"
                        >
                            {t("marketplaceBanner1.cta")}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICING TEASER — Replaces AutomationPricingSection
// ─────────────────────────────────────────────────────────────────────────────
export function AutomationPricingTeaser() {
    const { t } = useTranslation("workflowAutomationPage");

    const anchors = t("pricingTeaser.anchors", { returnObjects: true }) as Array<{
        label: string;
        from: string;
    }>;

    return (
        <section className="py-14 bg-background relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                    backgroundSize: "44px 44px",
                }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06]
                          dark:from-primary/[0.10] dark:via-secondary/[0.07] dark:to-accent/[0.08]
                          border border-border dark:border-white/[0.09]
                          rounded-3xl px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    <DollarSign className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-0.5">
                                        {t("pricingTeaser.label")}
                                    </p>
                                    <p className="text-base font-black text-foreground leading-snug">
                                        {t("pricingTeaser.title")}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/pricing#automation"
                                className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-black text-primary
                           hover:underline underline-offset-4 transition-all group"
                            >
                                {t("pricingTeaser.cta")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 mb-5">
                            {anchors.map(({ label, from }) => (
                                <div
                                    key={label}
                                    className="flex flex-col gap-1 bg-background dark:bg-white/[0.03]
                             border border-border dark:border-white/[0.07]
                             rounded-2xl px-4 py-3"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                        <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
                                    </div>
                                    <span className="text-lg font-black text-foreground">{from}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                            {t("pricingTeaser.note")}{" "}
                            <Link
                                href="/pricing#automation"
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                            >
                                {t("pricingTeaser.noteLink")}
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// BANNER 2 — After AutomationHowItWorksSection, before WebDevFAQSection
// ─────────────────────────────────────────────────────────────────────────────
export function AutomationMarketplaceBanner2() {
    const { t } = useTranslation("workflowAutomationPage");

    const stats = [
        { icon: <Clock className="w-4 h-4" />, value: t("marketplaceBanner2.stat1Value"), label: t("marketplaceBanner2.stat1Label") },
        { icon: <Package className="w-4 h-4" />, value: t("marketplaceBanner2.stat2Value"), label: t("marketplaceBanner2.stat2Label") },
        { icon: <Zap className="w-4 h-4" />, value: t("marketplaceBanner2.stat3Value"), label: t("marketplaceBanner2.stat3Label") },
    ];

    return (
        <section className="relative overflow-hidden" style={{ isolation: "isolate" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <DarkGridBoost color={BRAND.blue} opacity={0.06} cellSize={44} />
                <GlowBlob color={BRAND.blue} position="top-left" size={400} opacity={0.08} duration={18} />
                <GlowBlob color={BRAND.violet} position="bottom-right" size={350} opacity={0.06} duration={22} delay={4} />
            </div>

            <div className="relative z-10 bg-gradient-to-br from-blue-600/[0.10] to-cyan-600/[0.07]
                      dark:from-blue-600/[0.16] dark:to-cyan-600/[0.12]
                      border-y border-blue-500/15 dark:border-blue-500/20 py-14">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                    >
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 rounded-full px-3 py-1.5 mb-4">
                                <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                                <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                    {t("marketplaceBanner2.eyebrow")}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">
                                {t("marketplaceBanner2.title")}{" "}
                                <span className="text-blue-600 dark:text-blue-400">
                                    {t("marketplaceBanner2.titleAccent")}
                                </span>
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                                {t("marketplaceBanner2.subtitle")}
                            </p>

                            <div className="flex items-center gap-6 mt-5 justify-center lg:justify-start">
                                {stats.map(({ icon, value, label }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="text-blue-500 dark:text-blue-400">{icon}</span>
                                        <div>
                                            <div className="text-base font-black text-foreground leading-none">{value}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                            <Link
                                href="/marketplace?tab=automations"
                                className="inline-flex items-center gap-2.5
                           bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                           text-white font-black text-base rounded-2xl px-8 py-4
                           shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35
                           transition-all group"
                            >
                                {t("marketplaceBanner2.cta")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <p className="text-xs text-muted-foreground text-center max-w-[200px] leading-relaxed">
                                {t("marketplaceBanner2.ctaNote")}{" "}
                                <Link href="/contact" className="text-foreground font-semibold hover:text-blue-600 transition-colors">
                                    {t("marketplaceBanner2.ctaSecondary")}
                                </Link>{" "}
                                {t("marketplaceBanner2.ctaNoteEnd")}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}