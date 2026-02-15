"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Clock, Users, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CaseStudy } from "@/types/case-study-types";
import { GlowBlob, AccentLine, BRAND } from "@/components/effects/bg-effects";

/* ── Animated counter ── */
function Counter({ target, suffix = "", duration = 2 }: {
    target: number; suffix?: string; duration?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        const steps = 50;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, (duration * 1000) / steps);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

interface CaseStudyResultsStripProps { studies: CaseStudy[]; }

export function CaseStudyResultsStrip({ studies }: CaseStudyResultsStripProps) {
    const { t } = useTranslation("caseStudiesPage");

    const totalHours = studies.reduce((acc, s) => {
        if (s.beforeMetricValue && s.afterMetricValue && s.metricUnit?.toLowerCase().includes("hour"))
            return acc + (s.beforeMetricValue - s.afterMetricValue);
        return acc;
    }, 0);

    const stats = [
        {
            icon: Clock,
            value: totalHours > 0 ? totalHours : 500,
            suffix: "+",
            label: t("resultsStrip.stats.hours.label"),
            sublabel: t("resultsStrip.stats.hours.sublabel"),
            color: "text-primary",
            iconBg: "bg-primary/10 dark:bg-primary/15 border-primary/20 dark:border-primary/25",
        },
        {
            icon: Users,
            value: studies.length > 0 ? studies.length : 30,
            suffix: "+",
            label: t("resultsStrip.stats.clients.label"),
            sublabel: t("resultsStrip.stats.clients.sublabel"),
            color: "text-secondary",
            iconBg: "bg-secondary/10 dark:bg-secondary/15 border-secondary/20 dark:border-secondary/25",
        },
        {
            icon: Globe,
            value: new Set(studies.map((s) => s.clientLocation).filter(Boolean)).size || 8,
            suffix: "+",
            label: t("resultsStrip.stats.countries.label"),
            sublabel: t("resultsStrip.stats.countries.sublabel"),
            color: "text-accent",
            iconBg: "bg-accent/10 dark:bg-accent/15 border-accent/20 dark:border-accent/25",
        },
        {
            icon: TrendingUp,
            value: 95,
            suffix: "%",
            label: t("resultsStrip.stats.satisfaction.label"),
            sublabel: t("resultsStrip.stats.satisfaction.sublabel"),
            color: "text-amber-500",
            iconBg: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 dark:border-amber-500/25",
        },
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <GlowBlob color={BRAND.violet} position="left-center" size={400} opacity={0.05} animate={false} />
            <GlowBlob color={BRAND.emerald} position="right-center" size={350} opacity={0.04} animate={false} />
            <AccentLine color={BRAND.violet} position="top-0" direction="horizontal" opacity={0.07} />
            <AccentLine color={BRAND.blue} position="bottom-0" direction="horizontal" opacity={0.05} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
                        {t("resultsStrip.title")}
                    </h2>
                    <p className="text-muted-foreground text-base max-w-xl mx-auto">
                        {t("resultsStrip.subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative overflow-hidden rounded-2xl p-6 text-center
                           bg-card/70 dark:bg-white/[0.03]
                           border border-border dark:border-white/[0.07]
                           backdrop-blur-sm hover:scale-[1.03] transition-transform duration-300"
                            >
                                <div className={`w-11 h-11 rounded-xl ${stat.iconBg} border flex items-center justify-center mx-auto mb-4`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-1 tabular-nums`}>
                                    <Counter target={stat.value} suffix={stat.suffix} duration={1.8} />
                                </div>
                                <p className="text-sm font-bold text-foreground leading-snug mb-0.5">{stat.label}</p>
                                <p className="text-[11px] text-muted-foreground">{stat.sublabel}</p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xs text-muted-foreground mt-8"
                >
                    {t("resultsStrip.disclaimer")}
                </motion.p>
            </div>
        </section>
    );
}