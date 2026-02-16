"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowRight, LayoutGrid, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CASE_STUDY_CATEGORIES } from "@/types/case-study-types";
import { GridLayer, DarkGridBoost, GlowBlob, Particles, BRAND } from "@/components/effects/bg-effects";

/* ── Category color map ── */
export const CATEGORY_META: Record<string, { color: string; bg: string; dot: string }> = {
    "All": { color: "text-foreground", bg: "bg-primary", dot: BRAND.violet },
    "AI Agents": { color: "text-violet-400", bg: "bg-violet-500", dot: BRAND.violet },
    "Workflow Automation": { color: "text-blue-400", bg: "bg-blue-500", dot: BRAND.blue },
    "Web Development": { color: "text-emerald-400", bg: "bg-emerald-500", dot: BRAND.emerald },
    "AI Consulting": { color: "text-amber-400", bg: "bg-amber-500", dot: "#f59e0b" },
};

interface CaseStudyHeroProps {
    /** Live categories fetched from DB — always accurate */
    categories: string[];
    /** Total published case study count */
    totalCount: number;
    /** Aggregate stats */
    stats: { label: string; value: string }[];
    /** Controlled from parent page so grid reacts to filter */
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
}

export function CaseStudyHero({
    categories,
    totalCount,
    stats,
    activeCategory,
    onCategoryChange,
}: CaseStudyHeroProps) {
    const { t } = useTranslation("caseStudiesPage");

    const allCategories = ["All", ...categories];

    return (
        <section className="relative overflow-hidden pt-24 pb-16 bg-background dark:bg-[#0a0a12]">
            {/* Background */}
            <GridLayer color={BRAND.violet} opacity={0.9} cellSize={52} />
            <DarkGridBoost color={BRAND.violet} opacity={0.55} cellSize={52} />
            <GlowBlob color={BRAND.violet} position="top-left" size={600} opacity={0.06} duration={20} />
            <GlowBlob color={BRAND.blue} position="top-right" size={400} opacity={0.05} duration={24} delay={4} />
            <Particles colors={[BRAND.violet, BRAND.blue, BRAND.emerald]} count={14} minOpacity={0.08} maxOpacity={0.35} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Badge ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-6"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/15 border border-primary/20 dark:border-primary/25 rounded-full px-4 py-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("hero.badge")}
                        </span>
                    </div>
                </motion.div>

                {/* ── Heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-5 max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
                        {t("hero.titleLine1")}{" "}
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            {t("hero.titleHighlight")}
                        </span>
                        <br />
                        {t("hero.titleLine2")}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t("hero.subtitle")}
                    </p>
                </motion.div>

                {/* ── Stats row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-6 mb-12"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-black text-primary">{stat.value}</div>
                            <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                    {/* Live count from DB */}
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-black text-accent">{totalCount}</div>
                        <div className="text-xs text-muted-foreground font-medium">{t("hero.casesLabel")}</div>
                    </div>
                </motion.div>

                {/* ── Category filter tabs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center"
                >
                    <div className="bg-card/60 dark:bg-white/[0.04] border border-border dark:border-white/[0.08] backdrop-blur-sm rounded-2xl p-1.5 flex flex-wrap gap-1 justify-center">
                        {allCategories.map((cat) => {
                            const isActive = activeCategory === cat;
                            const meta = CATEGORY_META[cat] ?? CATEGORY_META["All"];

                            return (
                                <button
                                    key={cat}
                                    onClick={() => onCategoryChange(cat)}
                                    className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
                    transition-all duration-200
                    ${isActive
                                            ? "bg-card dark:bg-white/[0.08] text-foreground shadow-sm border border-border dark:border-white/[0.10]"
                                            : "text-muted-foreground hover:text-foreground hover:bg-card/50 dark:hover:bg-white/[0.04]"
                                        }
                  `}
                                >
                                    {/* Colored dot */}
                                    <motion.div
                                        animate={{ scale: isActive ? 1 : 0.7, opacity: isActive ? 1 : 0.4 }}
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ background: meta.dot }}
                                    />
                                    {cat}
                                    {/* Active underline */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="filter-underline"
                                            className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ── Active filter label ── */}
                <AnimatePresence mode="wait">
                    {activeCategory !== "All" && (
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="flex justify-center mt-4"
                        >
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Filter className="w-3 h-3" />
                                <span>
                                    {t("hero.filteringBy")}{" "}
                                    <span className="font-bold text-foreground">{activeCategory}</span>
                                </span>
                                <button
                                    onClick={() => onCategoryChange("All")}
                                    className="text-primary hover:underline font-bold"
                                >
                                    {t("hero.clearFilter")}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}