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
// Tone: Helpful shortcut  •  Goal: catch visitors who want pre-built, not custom
// ─────────────────────────────────────────────────────────────────────────────
export function AutomationMarketplaceBanner1() {
    return (
        <section className="relative overflow-hidden py-0">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            <div className="relative bg-gradient-to-r from-blue-600/[0.07] via-blue-500/[0.05] to-cyan-500/[0.07]
                      dark:from-blue-600/[0.10] dark:via-blue-500/[0.08] dark:to-cyan-500/[0.10]
                      border-y border-blue-500/10 dark:border-blue-500/15 py-8">

                {/* Subtle bg grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                    <GridLayer color={BRAND.blue} opacity={0.06} cellSize={40} />
                </div>
                {/* Soft glow right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        {/* Left: icon + text */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-0.5">
                                    Ready-Made Automation Packs
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                    Don't need something fully custom?{" "}
                                    <span className="text-muted-foreground font-normal">
                                        Browse pre-built automation packs — from ৳249, live in 24 hours.
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Right: CTA */}
                        <Link
                            href="/marketplace?tab=automations"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         text-white text-sm font-black rounded-xl px-5 py-2.5
                         shadow-md shadow-blue-500/20 hover:shadow-blue-500/30
                         transition-all group whitespace-nowrap"
                        >
                            Browse Automation Packs
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
// AUTOMATION PRICING TEASER — Replaces AutomationPricingSection
// Single compact callout. Anchors expectations, pushes to Pricing page.
// Drop this wherever AutomationPricingSection used to be.
// ─────────────────────────────────────────────────────────────────────────────
export function AutomationPricingTeaser() {
    const { t } = useTranslation("workflowAutomationPage");
    const anchors = [
        { label: "Simple (1–2 workflows)", from: "৳8,000" },
        { label: "Growth (3–5 workflows)", from: "৳20,000" },
        { label: "Complex / Custom", from: "Custom quote" },
    ];

    return (
        <section className="py-14 bg-background relative overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6 max-w-3xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                >
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-accent">
                        {t("pricing.badge")}
                    </span>
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                    {t("pricing.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                    {t("pricing.subtitle")}
                </p>
            </motion.div>

            {/* Value line */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center mb-14"
            >
                <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5">
                    <span className="text-sm font-bold text-foreground">
                        {t("pricing.valueNote")}
                    </span>
                </div>
            </motion.div>
            {/* Faint grid */}
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

                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    <DollarSign className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-0.5">
                                        Transparent Pricing
                                    </p>
                                    <p className="text-base font-black text-foreground leading-snug">
                                        Automation pricing that scales with complexity
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/pricing#automation"
                                className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-black text-primary
                           hover:underline underline-offset-4 transition-all group"
                            >
                                See full pricing
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Anchor points */}
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

                        {/* Footer note */}
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                            💡 Pricing is one-time setup + optional monthly maintenance. No hidden charges.{" "}
                            <Link
                                href="/pricing#automation"
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                            >
                                See the full breakdown →
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
// Tone: Urgency / escape valve  •  Goal: convert visitors who want fast + affordable
// ─────────────────────────────────────────────────────────────────────────────
export function AutomationMarketplaceBanner2() {
    const stats = [
        { icon: <Clock className="w-4 h-4" />, value: "24hrs", label: "setup time" },
        { icon: <Package className="w-4 h-4" />, value: "4+", label: "ready packs" },
        { icon: <Zap className="w-4 h-4" />, value: "৳249+", label: "starting from" },
    ];

    return (
        <section className="relative overflow-hidden" style={{ isolation: "isolate" }}>
            {/* Bg effects */}
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
                        {/* ── Left text block ── */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Eyebrow */}
                            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 rounded-full px-3 py-1.5 mb-4">
                                <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                                <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                    Skip the custom build
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">
                                Need automation fast?{" "}
                                <span className="text-blue-600 dark:text-blue-400">
                                    Ready-made packs from ৳249
                                </span>
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Our Marketplace has pre-built automation packs for Facebook comments, WhatsApp order
                                confirmation, Google review replies, and abandoned cart recovery — tested, proven, and
                                deployable into your business today without a discovery call.
                            </p>

                            {/* Stats row */}
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

                        {/* ── Right CTA block ── */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                            <Link
                                href="/marketplace?tab=automations"
                                className="inline-flex items-center gap-2.5
                           bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                           text-white font-black text-base rounded-2xl px-8 py-4
                           shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35
                           transition-all group"
                            >
                                Browse Automation Packs
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <p className="text-xs text-muted-foreground text-center max-w-[200px] leading-relaxed">
                                Or{" "}
                                <Link href="#cta" className="text-foreground font-semibold hover:text-blue-600 transition-colors">
                                    book a free discovery call
                                </Link>{" "}
                                for a fully custom workflow.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}