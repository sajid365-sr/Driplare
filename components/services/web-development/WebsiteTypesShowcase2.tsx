"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
    ShoppingCart, Store, Briefcase, Zap,
    User, LayoutDashboard, FileText, Calendar,
    CheckCircle2, ArrowRight, ExternalLink, Globe,
} from "lucide-react";
import { GridLayer, BRAND } from "@/components/effects/bg-effects";

// ─── Icon map — driven by icon string from translation JSON ──────────────────
const ICON_MAP: Record<string, React.ElementType> = {
    ShoppingCart,
    Store,
    Briefcase,
    Zap,
    User,
    LayoutDashboard,
    FileText,
    Calendar,
};

// ─── Accent colour cycle (no hardcoded per-card colour in JSON) ──────────────
const ACCENT_CYCLE = ["violet", "blue", "emerald"] as const;
type Accent = (typeof ACCENT_CYCLE)[number];

const ACCENT = {
    violet: {
        badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
        icon: "from-violet-500/20 to-violet-400/10 text-violet-600 dark:text-violet-400",
        border: "hover:border-violet-400/40 dark:hover:border-violet-500/40",
        check: "text-violet-500 dark:text-violet-400",
    },
    blue: {
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        icon: "from-blue-500/20 to-blue-400/10 text-blue-600 dark:text-blue-400",
        border: "hover:border-blue-400/40 dark:hover:border-blue-500/40",
        check: "text-blue-500 dark:text-blue-400",
    },
    emerald: {
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        icon: "from-emerald-500/20 to-emerald-400/10 text-emerald-600 dark:text-emerald-400",
        border: "hover:border-emerald-400/40 dark:hover:border-emerald-500/40",
        check: "text-emerald-500 dark:text-emerald-400",
    },
} satisfies Record<Accent, Record<string, string>>;

// ─── Type pulled from i18next ────────────────────────────────────────────────
type WebsiteType = {
    icon: string;
    title: string;
    badge: string | null;
    hook: string;
    highlights: string[];
};

export function WebsiteTypesShowcase2() {
    const { t } = useTranslation("webDevelopmentPage2");

    const websiteTypes = t("websiteTypes.types", {
        returnObjects: true,
    }) as WebsiteType[];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Faint grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.30]">
                <GridLayer color={BRAND.violet} opacity={0.07} cellSize={44} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-transparent to-muted/40 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-14 max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-black text-primary uppercase tracking-widest">
                            {t("websiteTypes.badge")}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                        {t("websiteTypes.title")}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        {t("websiteTypes.subtitle")}
                    </p>
                </motion.div>

                {/* ── 8-card grid ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto mb-10">
                    {websiteTypes.map((type, i) => {
                        const Icon = ICON_MAP[type.icon] ?? Globe;
                        const accent: Accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
                        const s = ACCENT[accent];

                        return (
                            <motion.div
                                key={type.title}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06, duration: 0.38 }}
                            >
                                <div
                                    className={`
                    h-full bg-card border border-border rounded-3xl p-5
                    transition-all duration-300 ${s.border}
                    hover:shadow-lg hover:-translate-y-0.5
                    flex flex-col gap-4
                  `}
                                >
                                    {/* Icon + title row */}
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${s.icon} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-5 h-5" strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {type.badge && (
                                                <span className={`text-[9px] font-black uppercase tracking-widest border rounded-full px-2 py-0.5 mb-1 inline-block ${s.badge}`}>
                                                    {type.badge}
                                                </span>
                                            )}
                                            <h3 className="text-sm font-black text-foreground leading-snug">
                                                {type.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Hook */}
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {type.hook}
                                    </p>

                                    {/* Highlights */}
                                    <div className="flex flex-col gap-1.5 mt-auto">
                                        {type.highlights.map((h) => (
                                            <div key={h} className="flex items-start gap-2">
                                                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${s.check}`} />
                                                <span className="text-[11px] text-foreground/80 leading-snug">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Inline Marketplace banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-violet-500/15 dark:border-violet-500/20
                          bg-gradient-to-br from-violet-600/[0.07] via-blue-500/[0.04] to-emerald-500/[0.06]
                          dark:from-violet-600/[0.12] dark:via-blue-500/[0.08] dark:to-emerald-500/[0.08]
                          px-8 py-7">
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
                            <div className="text-center sm:text-left">
                                <p className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-1">
                                    {t("websiteTypes.bannerLabel")}
                                </p>
                                <p className="text-base font-black text-foreground mb-1">
                                    {t("websiteTypes.bannerTitle")}
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                                    {t("websiteTypes.bannerSubtitle")}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                                <Link
                                    href="/marketplace?tab=websites"
                                    className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700
                             text-white text-sm font-black rounded-xl px-5 py-2.5
                             shadow-md shadow-violet-500/20 transition-all group whitespace-nowrap"
                                >
                                    {t("websiteTypes.bannerCta")}
                                    <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-1.5 bg-background border border-border
                             hover:border-violet-400/40 text-foreground text-sm font-black
                             rounded-xl px-5 py-2.5 transition-all group whitespace-nowrap"
                                >
                                    {t("websiteTypes.bannerCtaSecondary")}
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}