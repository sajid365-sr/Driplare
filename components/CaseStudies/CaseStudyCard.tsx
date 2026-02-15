"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Quote, Zap } from "lucide-react";
import Link from "next/link";
import { CaseStudy } from "@/types/case-study-types";
import { BRAND } from "@/components/effects/bg-effects";

/* ── Category config ─────────────────────────────────────────── */
export const CATEGORY_META: Record<string, {
  dot: string;
  label: string;
  gradient: string;
  accentText: string;
  chipBg: string;
}> = {
  "AI Agents": { dot: BRAND.violet, label: "text-violet-500 dark:text-violet-400", gradient: "from-violet-600 to-blue-500", accentText: "text-violet-500 dark:text-violet-400", chipBg: "bg-violet-500/10 border-violet-500/20" },
  "Workflow Automation": { dot: BRAND.blue, label: "text-blue-500 dark:text-blue-400", gradient: "from-blue-600 to-cyan-500", accentText: "text-blue-500 dark:text-blue-400", chipBg: "bg-blue-500/10 border-blue-500/20" },
  "Web Development": { dot: BRAND.emerald, label: "text-emerald-500 dark:text-emerald-400", gradient: "from-emerald-600 to-teal-500", accentText: "text-emerald-500 dark:text-emerald-400", chipBg: "bg-emerald-500/10 border-emerald-500/20" },
  "AI Consulting": { dot: BRAND.amber, label: "text-amber-500 dark:text-amber-400", gradient: "from-amber-500 to-orange-500", accentText: "text-amber-500 dark:text-amber-400", chipBg: "bg-amber-500/10 border-amber-500/20" },
};
const FALLBACK = CATEGORY_META["AI Agents"];

/* ── Helpers ─────────────────────────────────────────────────── */
function reductionPct(before: number, after: number) {
  return Math.round(((before - after) / before) * 100);
}

/* ═══════════════════════════════════════════════════════════════
   STORY CARD
   One dominant result number. One line of context. One quote.
   Client scans it in 3 seconds and wants to know more.
═══════════════════════════════════════════════════════════════ */
interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  locale?: "en" | "bn";
}

export function CaseStudyCard({ study, index, locale = "en" }: CaseStudyCardProps) {
  const content = study[locale] ?? study.en;
  const meta = CATEGORY_META[study.category] ?? FALLBACK;
  const hasMetric = study.beforeMetricValue != null && study.afterMetricValue != null;
  const pct = hasMetric ? reductionPct(study.beforeMetricValue!, study.afterMetricValue!) : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden
                 bg-card dark:bg-white/[0.035]
                 border border-border dark:border-white/[0.07]
                 hover:border-primary/30 dark:hover:border-primary/25
                 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/8
                 transition-all duration-300"
    >
      {/* ── Gradient header strip ─────────────────────────────── */}
      <div className={`relative bg-gradient-to-br ${meta.gradient} px-6 pt-6 pb-7 overflow-hidden`}>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* Decorative large digit ghost */}
        {hasMetric && (
          <div
            className="absolute -right-3 -bottom-5 text-[100px] font-black text-white/[0.07] leading-none select-none pointer-events-none tabular-nums"
            aria-hidden
          >
            {study.afterMetricValue}
          </div>
        )}

        {/* Top row: category chip + optional star */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="text-xs font-black text-white/80 tracking-wide">
              {study.category}
            </span>
            {study.clientLocation && (
              <>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-xs text-white/60 flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5" />
                  {study.clientLocation}
                </span>
              </>
            )}
          </div>
          {study.featured && <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
        </div>

        {/* THE HERO NUMBER — what the client remembers */}
        <div className="relative z-10">
          {hasMetric ? (
            <div className="flex items-end gap-2">
              {/* Strikethrough old value — smaller */}
              <div className="text-center mb-1">
                <span className="text-2xl font-black text-white/35 line-through tabular-nums">
                  {study.beforeMetricValue}
                </span>
                <p className="text-[10px] text-white/35 mt-0.5">{study.metricUnit}</p>
              </div>

              <ArrowRight className="w-4 h-4 text-white/50 mb-3 flex-shrink-0" />

              {/* New value — BIG */}
              <div className="text-center mb-1">
                <span className="text-5xl font-black text-white leading-none tabular-nums">
                  {study.afterMetricValue}
                </span>
                <p className="text-xs text-white/70 mt-1">{study.metricUnit}</p>
              </div>

              {/* % badge */}
              {pct !== null && (
                <div className="mb-2 ml-auto self-end bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-white" />
                  <span className="text-xs font-black text-white">↓{pct}%</span>
                </div>
              )}
            </div>
          ) : (
            /* Fallback: show metric string */
            <p className="text-3xl font-black text-white">{content?.metric}</p>
          )}
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-6 py-5 gap-4">

        {/* Title + client — read in 2 seconds */}
        <div>
          <h3 className="text-[15px] font-black text-foreground group-hover:text-primary
                         transition-colors leading-snug line-clamp-2 mb-1">
            {content?.title}
          </h3>
          {study.clientName && (
            <p className="text-xs text-muted-foreground font-medium">{study.clientName}</p>
          )}
        </div>

        {/* Testimonial — the human moment */}
        {content?.testimonial && (
          <div className="flex gap-2.5">
            <Quote className="w-3.5 h-3.5 text-primary/30 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-2">
                {content.testimonial}
              </p>
              {content.testimonialRole && (
                <p className="text-[11px] text-muted-foreground/60 font-semibold not-italic mt-1">
                  — {content.testimonialRole}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Spacer pushes footer down */}
        <div className="flex-1" />

        {/* Tech tags — secondary info, small */}
        {study.techTags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {study.techTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold bg-muted/60 dark:bg-white/[0.04]
                           border border-border dark:border-white/[0.06]
                           text-muted-foreground px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
            {study.techTags.length > 3 && (
              <span className="text-[10px] text-muted-foreground/60 py-0.5 px-0.5 self-center">
                +{study.techTags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer: duration + CTA */}
        <div className="flex items-center justify-between pt-3.5 border-t border-border dark:border-white/[0.06]">
          {study.projectDuration ? (
            <span className="text-[11px] text-muted-foreground font-medium">
              {study.projectDuration}
            </span>
          ) : <div />}

          <Link
            href={`/case-studies/${study.slug}`}
            className="flex items-center gap-1 text-xs font-black text-primary
                       hover:gap-2 transition-all duration-200 group/link"
          >
            Read full story
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}