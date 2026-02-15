"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin, Clock, Zap, Quote, SearchX, LayoutList } from "lucide-react";
import Link from "next/link";
import { CaseStudy } from "@/types/case-study-types";
import { BRAND } from "@/components/effects/bg-effects";

/* ── Category colour config ─────────────────────────────────── */
export const CATEGORY_META: Record<string, {
    dot: string; label: string; gradient: string; numberColor: string; chipBg: string;
}> = {
    "AI Agents": { dot: BRAND.violet, label: "text-violet-500 dark:text-violet-400", gradient: "from-violet-600 to-blue-500", numberColor: "text-violet-500/20 dark:text-violet-400/15", chipBg: "bg-violet-500/8 border-violet-500/15 text-violet-500 dark:text-violet-400" },
    "Workflow Automation": { dot: BRAND.blue, label: "text-blue-500 dark:text-blue-400", gradient: "from-blue-600 to-cyan-500", numberColor: "text-blue-500/20 dark:text-blue-400/15", chipBg: "bg-blue-500/8 border-blue-500/15 text-blue-500 dark:text-blue-400" },
    "Web Development": { dot: BRAND.emerald, label: "text-emerald-500 dark:text-emerald-400", gradient: "from-emerald-600 to-teal-500", numberColor: "text-emerald-500/20 dark:text-emerald-400/15", chipBg: "bg-emerald-500/8 border-emerald-500/15 text-emerald-500 dark:text-emerald-400" },
    "AI Consulting": { dot: BRAND.amber, label: "text-amber-500 dark:text-amber-400", gradient: "from-amber-500 to-orange-500", numberColor: "text-amber-500/20 dark:text-amber-400/15", chipBg: "bg-amber-500/8 border-amber-500/15 text-amber-500 dark:text-amber-400" },
};
const FALLBACK = CATEGORY_META["AI Agents"];

function reductionPct(before: number, after: number) {
    return Math.round(((before - after) / before) * 100);
}

/* ══════════════════════════════════════════════════════════════
   SINGLE PROJECT ROW
   Wide horizontal layout. Metric number is huge and ghosted
   on the right. Category colour bleeds from left border.
══════════════════════════════════════════════════════════════ */
function ProjectRow({ study, index, locale }: {
    study: CaseStudy; index: number; locale: "en" | "bn";
}) {
    const { t } = useTranslation("caseStudiesPage");
    // ← KEY FIX: content picks from study.en or study.bn based on active locale
    const content = study[locale] ?? study.en;
    const meta = CATEGORY_META[study.category] ?? FALLBACK;
    const hasMetric = study.beforeMetricValue != null && study.afterMetricValue != null;
    const pct = hasMetric
        ? reductionPct(study.beforeMetricValue!, study.afterMetricValue!)
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.07, duration: 0.4 }}
            className="group relative overflow-hidden rounded-2xl
                 bg-card/70 dark:bg-white/[0.03]
                 border border-border dark:border-white/[0.07]
                 hover:border-primary/30 dark:hover:border-primary/20
                 hover:shadow-xl hover:shadow-primary/5
                 transition-all duration-300"
        >
            {/* Left colour accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${meta.gradient} opacity-70`} />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-r from-primary/3 to-transparent dark:from-primary/5 pointer-events-none" />

            {/* Ghost number — decorative, right-aligned */}
            {hasMetric && (
                <div
                    className={`absolute right-6 top-1/2 -translate-y-1/2 text-[90px] md:text-[110px] font-black leading-none select-none pointer-events-none tabular-nums ${meta.numberColor}`}
                    aria-hidden
                >
                    {study.afterMetricValue}
                </div>
            )}

            <div className="relative z-10 pl-6 pr-6 md:pr-8 py-6 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">

                {/* ── Col 1: Metric block ── */}
                {hasMetric ? (
                    <div className="flex-shrink-0 text-center md:text-left min-w-[100px]">
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                            {t("grid.impact")}
                        </div>
                        <div className="flex items-end gap-1.5 justify-center md:justify-start">
                            <span className="text-xl font-black text-muted-foreground/40 line-through tabular-nums leading-none">
                                {study.beforeMetricValue}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-accent mb-0.5 flex-shrink-0" />
                            <span className="text-3xl font-black text-foreground tabular-nums leading-none">
                                {study.afterMetricValue}
                            </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1">{study.metricUnit}</div>
                        {pct !== null && (
                            <div className="mt-2 inline-flex items-center gap-1 bg-accent/10 dark:bg-accent/12 border border-accent/20 rounded-full px-2 py-0.5">
                                <Zap className="w-2.5 h-2.5 text-accent" />
                                <span className="text-[10px] font-black text-accent">↓{pct}%</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-shrink-0 min-w-[100px]">
                        <p className="text-2xl font-black text-primary">{content.metric}</p>
                    </div>
                )}

                {/* ── Col 2: Story content ── */}
                <div className="min-w-0">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2.5">
                        <div className="flex items-center gap-1.5">
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: meta.dot }}
                                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                            />
                            <span className={`text-[11px] font-black ${meta.label}`}>{study.category}</span>
                        </div>
                        {study.industry && (
                            <span className="text-[11px] text-muted-foreground hidden sm:block">{study.industry}</span>
                        )}
                        {study.clientLocation && (
                            <span className="text-[11px] text-muted-foreground flex items-center gap-0.5 hidden sm:flex">
                                <MapPin className="w-2.5 h-2.5" />{study.clientLocation}
                            </span>
                        )}
                        {study.projectDuration && (
                            <span className="text-[11px] text-muted-foreground flex items-center gap-0.5 hidden md:flex">
                                <Clock className="w-2.5 h-2.5" />{study.projectDuration}
                            </span>
                        )}
                    </div>

                    {/* Title — the main read */}
                    <h3 className="text-base md:text-lg font-black text-foreground group-hover:text-primary
                         transition-colors leading-snug line-clamp-1 mb-1.5">
                        {content.title}
                    </h3>

                    {/* Client + one sentence of the problem */}
                    {study.clientName && (
                        <p className="text-xs text-muted-foreground font-medium mb-2">{study.clientName}</p>
                    )}

                    {/* Testimonial — the emotional hook */}
                    {content.testimonial && (
                        <div className="flex items-start gap-1.5 mt-1">
                            <Quote className="w-3 h-3 text-primary/30 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground italic line-clamp-1">
                                {content.testimonial}
                            </p>
                        </div>
                    )}

                    {/* Tech tags */}
                    {study.techTags?.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1">
                            {study.techTags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] font-semibold bg-muted/50 dark:bg-white/[0.04] border border-border dark:border-white/[0.06] text-muted-foreground px-2 py-0.5 rounded-md">
                                    {tag}
                                </span>
                            ))}
                            {study.techTags.length > 3 && (
                                <span className="text-[10px] text-muted-foreground py-0.5 px-0.5 self-center">
                                    +{study.techTags.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Col 3: CTA arrow ── */}
                <div className="flex-shrink-0">
                    <Link
                        href={`/case-studies/${study.slug}`}
                        className="flex items-center gap-2 text-xs font-black text-primary
                       hover:gap-3 transition-all duration-200 group/link whitespace-nowrap"
                    >
                        <span className="hidden sm:block">{t("grid.readFull")}</span>
                        <div className="w-8 h-8 rounded-xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary transition-all">
                            <ArrowRight className="w-3.5 h-3.5 text-primary group-hover/link:text-white transition-colors" />
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════════
   CASE STUDY LIST — main export
══════════════════════════════════════════════════════════════ */
interface CaseStudyListProps {
    studies: CaseStudy[];
    activeCategory: string;
}

export function CaseStudyList({ studies, activeCategory }: CaseStudyListProps) {
    const { t, i18n } = useTranslation("caseStudiesPage");

    // ← KEY FIX: derive locale from i18next's active language
    const locale = (i18n.language?.startsWith("bn") ? "bn" : "en") as "en" | "bn";

    const filtered = activeCategory === "All"
        ? studies
        : studies.filter((s) => s.category === activeCategory);

    return (
        <section className="pb-20 relative">
            <div className="container mx-auto px-4 md:px-6">

                {/* Count label */}
                <div className="flex items-center gap-2 mb-6">
                    <LayoutList className="w-4 h-4 text-muted-foreground" />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`${activeCategory}-${filtered.length}`}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="text-sm text-muted-foreground"
                        >
                            {filtered.length === 0
                                ? t("grid.noResults")
                                : t(filtered.length === 1 ? "grid.showingCount_one" : "grid.showingCount_other", { count: filtered.length })}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* List */}
                <AnimatePresence mode="wait">
                    {filtered.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-muted/60 dark:bg-white/[0.04] flex items-center justify-center mb-4">
                                <SearchX className="w-7 h-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-1.5">{t("grid.emptyTitle")}</h3>
                            <p className="text-sm text-muted-foreground max-w-xs">{t("grid.emptySubtitle")}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4 max-w-4xl mx-auto"
                        >
                            {filtered.map((study, i) => (
                                <ProjectRow
                                    key={study.id ?? study.slug}
                                    study={study}
                                    index={i}
                                    locale={locale}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}