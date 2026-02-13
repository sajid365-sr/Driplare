"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProblemSection() {
    const { t } = useTranslation("aiConsultingPage");

    const mistakes = t("problem.mistakes", {
        returnObjects: true,
    }) as Array<{ icon: string; title: string; description: string }>;

    const costs = t("problem.costs", {
        returnObjects: true,
    }) as Array<{ value: string; label: string }>;

    const withUs = t("problem.withUs.points", {
        returnObjects: true,
    }) as string[];

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-2 mb-6"
                    >
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm font-semibold text-destructive">
                            {t("problem.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("problem.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("problem.subtitle")}
                    </p>
                </motion.div>

                {/* Cost stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14"
                >
                    {costs.map((cost, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border-2 border-destructive/20 rounded-2xl p-5 text-center"
                        >
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <TrendingDown className="w-4 h-4 text-destructive" />
                                <span className="text-2xl font-black text-destructive">
                                    {cost.value}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium leading-snug">
                                {cost.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Common mistakes grid */}
                <div className="max-w-6xl mx-auto mb-14">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-sm font-black text-muted-foreground uppercase tracking-widest mb-8"
                    >
                        {t("problem.mistakesLabel")}
                    </motion.p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {mistakes.map((mistake, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-card border-2 border-border rounded-2xl p-6 hover:border-destructive/30 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/15 transition-colors">
                                        <X className="w-5 h-5 text-destructive" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-xl">{mistake.icon}</span>
                                            <h3 className="text-sm font-black text-foreground">
                                                {mistake.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {mistake.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* With Us callout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10 border-2 border-accent/30 rounded-3xl p-8">
                        <div className="flex items-start gap-3 mb-6">
                            <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                            <h3 className="text-xl font-black text-foreground">
                                {t("problem.withUs.title")}
                            </h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {withUs.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground font-medium">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}