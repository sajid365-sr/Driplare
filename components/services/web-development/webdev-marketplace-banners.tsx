"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, Globe, Clock, Package, Zap } from "lucide-react";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";

// ─────────────────────────────────────────────────────────────────────────────
// BANNER 1 — After DevelopmentProcessSection, before PricingCalculatorSection
// Tone: Helpful shortcut  •  Catches visitors who want pre-built, not custom
// ─────────────────────────────────────────────────────────────────────────────
export function WebDevMarketplaceBanner1() {
    const { t } = useTranslation("webDevelopmentPage2");

    return (
        <section className="relative overflow-hidden py-0">
            <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            <div className="relative bg-gradient-to-r from-violet-600/[0.07] via-violet-500/[0.05] to-blue-500/[0.07]
                      dark:from-violet-600/[0.10] dark:via-violet-500/[0.08] dark:to-blue-500/[0.10]
                      border-y border-violet-500/10 dark:border-violet-500/15 py-8">

                {/* Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                    <GridLayer color={BRAND.violet} opacity={0.06} cellSize={40} />
                </div>
                {/* Glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

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
                            <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-0.5">
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

                        {/* Right: CTA */}
                        <Link
                            href="/marketplace?tab=websites"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700
                         text-white text-sm font-black rounded-xl px-5 py-2.5
                         shadow-md shadow-violet-500/20 hover:shadow-violet-500/30
                         transition-all group whitespace-nowrap"
                        >
                            {t("marketplaceBanner1.cta")}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// BANNER 2 — After PricingCalculatorSection, before WebDevFAQSection
// Tone: Urgency / escape valve  •  Converts visitors who want fast + fixed-price
// ─────────────────────────────────────────────────────────────────────────────
export function WebDevMarketplaceBanner2() {
    const { t } = useTranslation("webDevelopmentPage2");

    const stats = [
        {
            icon: <Clock className="w-4 h-4" />,
            value: t("marketplaceBanner2.stat1Value"),
            label: t("marketplaceBanner2.stat1Label"),
        },
        {
            icon: <Package className="w-4 h-4" />,
            value: t("marketplaceBanner2.stat2Value"),
            label: t("marketplaceBanner2.stat2Label"),
        },
        {
            icon: <Zap className="w-4 h-4" />,
            value: t("marketplaceBanner2.stat3Value"),
            label: t("marketplaceBanner2.stat3Label"),
        },
    ];

    return (
        <section className="relative overflow-hidden" style={{ isolation: "isolate" }}>
            {/* Bg effects */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <DarkGridBoost color={BRAND.violet} opacity={0.06} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={400} opacity={0.08} duration={18} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={350} opacity={0.06} duration={22} delay={4} />
            </div>

            <div className="relative z-10 bg-gradient-to-br from-violet-600/[0.10] to-blue-600/[0.08]
                      dark:from-violet-600/[0.16] dark:to-blue-600/[0.13]
                      border-y border-violet-500/15 dark:border-violet-500/20 py-14">
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
                            <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/25 rounded-full px-3 py-1.5 mb-4">
                                <Zap className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                                <span className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                                    {t("marketplaceBanner2.eyebrow")}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">
                                {t("marketplaceBanner2.title")}{" "}
                                <span className="text-violet-600 dark:text-violet-400">
                                    {t("marketplaceBanner2.titleAccent")}
                                </span>
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                                {t("marketplaceBanner2.subtitle")}
                            </p>

                            {/* Stats row */}
                            <div className="flex items-center gap-6 mt-5 justify-center lg:justify-start">
                                {stats.map(({ icon, value, label }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="text-violet-500 dark:text-violet-400">{icon}</span>
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
                                href="/marketplace?tab=websites"
                                className="inline-flex items-center gap-2.5
                           bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600
                           text-white font-black text-base rounded-2xl px-8 py-4
                           shadow-xl shadow-violet-500/25 hover:shadow-violet-500/35
                           transition-all group"
                            >
                                {t("marketplaceBanner2.cta")}
                                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Link>
                            <p className="text-xs text-muted-foreground text-center max-w-[220px] leading-relaxed">
                                {t("marketplaceBanner2.ctaNote")}{" "}
                                <Link href="/contact" className="text-foreground font-semibold hover:text-violet-600 transition-colors">
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