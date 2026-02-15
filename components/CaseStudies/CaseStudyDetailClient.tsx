"use client";

import { motion } from "framer-motion";
import { useState } from "react"; // kept for Gallery component
import {
    ArrowLeft, MapPin, Clock, Tag, Quote,
    Play, Image as ImageIcon, ExternalLink,
    Zap, AlertTriangle, Lightbulb, CheckCircle2,
    ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CaseStudy } from "@/types/case-study-types";
import { GridLayer, DarkGridBoost, GlowBlob, Particles, BRAND } from "@/components/effects/bg-effects";
import { CATEGORY_META } from "./CaseStudyHero";

interface Props { study: CaseStudy; }

/* ── YouTube embed helper ── */
function ytId(url?: string) {
    if (!url) return null;
    const m = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
    return m ? m[1] : null;
}

/* ── Section heading ── */
function SectionHeading({ icon: Icon, label, color = "text-primary" }: {
    icon: any; label: string; color?: string;
}) {
    return (
        <div className="flex items-center gap-2.5 mb-4">
            <div className={`w-7 h-7 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
            </div>
            <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest">{label}</h2>
        </div>
    );
}

/* ── Story block ── */
function StoryBlock({ icon, label, color, children }: {
    icon: any; label: string; color?: string; children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] backdrop-blur-sm p-6"
        >
            <SectionHeading icon={icon} label={label} color={color} />
            <p className="text-sm text-foreground leading-relaxed">{children}</p>
        </motion.div>
    );
}

/* ── Image gallery ── */
function Gallery({ images }: { images: string[] }) {
    const [active, setActive] = useState(0);
    if (!images?.length) return null;
    return (
        <div className="rounded-2xl overflow-hidden border border-border dark:border-white/[0.07] bg-card dark:bg-white/[0.03]">
            {/* Main image */}
            <div className="aspect-video bg-muted dark:bg-white/[0.04] relative overflow-hidden">
                <img
                    src={images[active]}
                    alt={`Gallery ${active + 1}`}
                    className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActive((p) => (p + 1) % images.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 right-3 text-xs text-white/70 bg-black/40 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
                            {active + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === active ? "border-primary" : "border-transparent opacity-50 hover:opacity-75"}`}
                        >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Video embed ── */
function VideoEmbed({ url, label }: { url: string; label: string }) {
    const id = ytId(url);
    if (!id) return null;
    return (
        <div className="rounded-2xl overflow-hidden border border-border dark:border-white/[0.07]">
            <div className="px-4 pt-4 pb-2 bg-card dark:bg-white/[0.03] border-b border-border dark:border-white/[0.07]">
                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{label}</p>
            </div>
            <div className="aspect-video">
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={label}
                />
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export function CaseStudyDetailClient({ study }: Props) {
    const { t, i18n } = useTranslation("caseStudiesPage");
    // ← Derives locale from i18next — switches automatically when user changes language
    const locale = (i18n.language?.startsWith("bn") ? "bn" : "en") as "en" | "bn";
    const content = study[locale] ?? study.en;
    const meta = CATEGORY_META[study.category] ?? CATEGORY_META["AI Agents"];

    const hasMetric = study.beforeMetricValue != null && study.afterMetricValue != null;
    const pct = hasMetric
        ? Math.round(((study.beforeMetricValue! - study.afterMetricValue!) / study.beforeMetricValue!) * 100)
        : null;

    const reviewId = ytId(study.videoReviewUrl);
    const dashId = ytId(study.dashboardVideoUrl);

    return (
        <div className="min-h-screen bg-background dark:bg-[#0a0a12] relative" style={{ isolation: "isolate" }}>

            {/* Page-level bg */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <GridLayer color={BRAND.violet} opacity={0.03} cellSize={52} />
                <DarkGridBoost color={BRAND.violet} opacity={0.05} cellSize={52} />
                <GlowBlob color={BRAND.violet} position="top-left" size={600} opacity={0.05} duration={22} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={500} opacity={0.04} duration={26} delay={5} />
                <Particles colors={[BRAND.violet, BRAND.blue]} count={12} minOpacity={0.06} maxOpacity={0.25} speed={0.6} />
            </div>

            <div className="relative" style={{ zIndex: 1 }}>

                {/* ── HERO ─────────────────────────────────────────── */}
                <div className={`relative bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
                    {/* Noise */}
                    <div className="absolute inset-0 opacity-[0.06]"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

                    {/* Ghost number bg */}
                    {hasMetric && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[220px] font-black text-white/[0.05] leading-none select-none pointer-events-none tabular-nums pr-12" aria-hidden>
                            {study.afterMetricValue}
                        </div>
                    )}

                    <div className="container mx-auto px-4 md:px-6 pt-8 pb-14 relative z-10">
                        {/* Back link */}
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold mb-10 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            {t("detail.backLink")}
                        </Link>

                        {/* Meta chips */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span className="text-xs font-black text-white/80 bg-white/15 rounded-full px-3 py-1">
                                {study.category}
                            </span>
                            {study.industry && (
                                <span className="text-xs text-white/60 bg-white/10 rounded-full px-3 py-1 flex items-center gap-1">
                                    <Tag className="w-2.5 h-2.5" />{study.industry}
                                </span>
                            )}
                            {study.clientLocation && (
                                <span className="text-xs text-white/60 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />{study.clientLocation}
                                </span>
                            )}
                            {study.projectDuration && (
                                <span className="text-xs text-white/60 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />{study.projectDuration}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl mb-4"
                        >
                            {content.title}
                        </motion.h1>

                        {/* Client name */}
                        {study.clientName && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/60 text-base font-medium"
                            >
                                {study.clientName}
                            </motion.p>
                        )}
                    </div>
                </div>

                {/* ── METRIC BANNER ────────────────────────────────── */}
                {hasMetric && (
                    <div className="container mx-auto px-4 md:px-6 -mt-6 relative z-10 mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl bg-card dark:bg-white/[0.04] border border-border dark:border-white/[0.08] backdrop-blur-sm p-6 shadow-xl shadow-black/5 max-w-2xl"
                        >
                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">{t("detail.sectionLabels.impact")}</p>
                            <div className="flex items-center gap-6 flex-wrap">
                                <div>
                                    <div className="text-3xl font-black text-muted-foreground/40 line-through tabular-nums">
                                        {study.beforeMetricValue}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5">{study.metricUnit} {t("detail.metric.before")}</div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-accent" />
                                <div>
                                    <div className="text-4xl font-black text-foreground tabular-nums">{study.afterMetricValue}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">{study.metricUnit} {t("detail.metric.after")}</div>
                                </div>
                                {pct !== null && (
                                    <div className="ml-auto flex items-center gap-1.5 bg-accent/10 dark:bg-accent/15 border border-accent/20 rounded-xl px-4 py-2">
                                        <Zap className="w-4 h-4 text-accent" />
                                        <span className="text-lg font-black text-accent">↓{pct}%</span>
                                    </div>
                                )}
                                {study.secondaryMetric && (
                                    <div className="flex items-center gap-1.5 bg-primary/8 dark:bg-primary/12 border border-primary/15 rounded-xl px-4 py-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-bold text-primary">{study.secondaryMetric}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* ── MAIN CONTENT ─────────────────────────────────── */}
                <div className="container mx-auto px-4 md:px-6 pb-24">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                        {/* Left column — story (2/3 width) */}
                        <div className="lg:col-span-2 space-y-5">

                            <StoryBlock icon={MapPin} label={t("detail.sectionLabels.context")} color="text-secondary">
                                {content.context}
                            </StoryBlock>

                            <StoryBlock icon={AlertTriangle} label={t("detail.sectionLabels.problem")} color="text-destructive">
                                {content.problem}
                            </StoryBlock>

                            <StoryBlock icon={Lightbulb} label={t("detail.sectionLabels.solution")} color="text-accent">
                                {content.solution}
                            </StoryBlock>

                            {content.myApproach && (
                                <StoryBlock icon={Zap} label={t("detail.sectionLabels.approach")} color="text-primary">
                                    {content.myApproach}
                                </StoryBlock>
                            )}

                            {content.failedAttempts && (
                                <StoryBlock icon={AlertTriangle} label={t("detail.sectionLabels.failedAttempts")} color="text-amber-500">
                                    {content.failedAttempts}
                                </StoryBlock>
                            )}

                            <StoryBlock icon={CheckCircle2} label={t("detail.sectionLabels.result")} color="text-emerald-500">
                                {content.result}
                            </StoryBlock>

                            {/* Gallery */}
                            {study.gallery?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <SectionHeading icon={ImageIcon} label="Gallery" />
                                    <Gallery images={study.gallery} />
                                </motion.div>
                            )}

                            {/* Workflow diagram */}
                            {study.n8nDiagramUrl && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl overflow-hidden border border-border dark:border-white/[0.07] bg-card dark:bg-white/[0.03]"
                                >
                                    <div className="px-5 py-3 border-b border-border dark:border-white/[0.07]">
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                                            Workflow Diagram
                                        </p>
                                    </div>
                                    <img
                                        src={study.n8nDiagramUrl}
                                        alt="Workflow Diagram"
                                        className="w-full object-contain bg-white dark:bg-white/5 p-4"
                                    />
                                </motion.div>
                            )}

                            {/* Videos */}
                            {dashId && (
                                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <VideoEmbed url={study.dashboardVideoUrl!} label="Solution Demo" />
                                </motion.div>
                            )}
                        </div>

                        {/* Right column — sidebar (1/3 width) */}
                        <div className="space-y-5">

                            {/* Testimonial card */}
                            {content.testimonial && (
                                <motion.div
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl bg-primary/5 dark:bg-primary/8 border border-primary/15 dark:border-primary/20 p-6"
                                >
                                    <Quote className="w-8 h-8 text-primary/20 mb-3" />
                                    <p className="text-sm text-foreground italic leading-relaxed mb-4">
                                        {content.testimonial}
                                    </p>
                                    {content.testimonialRole && (
                                        <p className="text-xs font-black text-primary not-italic">{content.testimonialRole}</p>
                                    )}
                                </motion.div>
                            )}

                            {/* Video review */}
                            {reviewId && (
                                <motion.div
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <VideoEmbed url={study.videoReviewUrl!} label="Client Video Review" />
                                </motion.div>
                            )}

                            {/* Tech stack */}
                            {study.techTags?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-5"
                                >
                                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">{t("detail.sectionLabels.techStack")}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {study.techTags.map((tag) => (
                                            <span key={tag} className="text-xs font-semibold bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.07] text-foreground px-3 py-1.5 rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Project details */}
                            <motion.div
                                initial={{ opacity: 0, x: 16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-5 space-y-3"
                            >
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">{t("detail.sectionLabels.projectDetails")}</p>
                                {[
                                    { label: t("detail.projectMeta.client"), value: study.clientName },
                                    { label: t("detail.projectMeta.industry"), value: study.industry },
                                    { label: t("detail.projectMeta.location"), value: study.clientLocation },
                                    { label: t("detail.projectMeta.duration"), value: study.projectDuration },
                                    { label: t("detail.projectMeta.roi"), value: study.roi },
                                ].filter(d => d.value).map(({ label, value }) => (
                                    <div key={label} className="flex items-start justify-between gap-3">
                                        <span className="text-xs text-muted-foreground">{label}</span>
                                        <span className="text-xs font-bold text-foreground text-right">{value}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: 16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/15 dark:to-accent/15 border border-primary/20 dark:border-primary/15 p-6 text-center"
                            >
                                <p className="text-sm font-black text-foreground mb-1.5">{t("detail.cta.title")}</p>
                                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{t("detail.cta.subtitle")}</p>
                                <Button className="w-full bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 group" asChild>
                                    <a href="/contact" className="flex items-center justify-center gap-2">
                                        {t("detail.cta.button")}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}