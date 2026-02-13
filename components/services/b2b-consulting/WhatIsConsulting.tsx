"use client";

import { motion } from "framer-motion";
import { BrainCircuit, X, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhatIsConsulting() {
    const { t } = useTranslation("aiConsultingPage");

    const notList = t("whatIsConsulting.notList", {
        returnObjects: true,
    }) as string[];

    const isList = t("whatIsConsulting.isList", {
        returnObjects: true,
    }) as string[];

    const steps = t("whatIsConsulting.steps", {
        returnObjects: true,
    }) as Array<{ emoji: string; title: string; description: string }>;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

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
                        className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <BrainCircuit className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">
                            {t("whatIsConsulting.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whatIsConsulting.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("whatIsConsulting.subtitle")}
                    </p>
                </motion.div>

                {/* Analogy Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-14"
                >
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8 text-center">
                        <div className="text-4xl mb-4">🩺</div>
                        <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                            {t("whatIsConsulting.analogy")}
                        </p>
                    </div>
                </motion.div>

                {/* NOT this / IS this comparison */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
                    {/* NOT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-destructive/25 rounded-3xl overflow-hidden"
                    >
                        <div className="bg-destructive/10 border-b border-destructive/15 px-6 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                                <X className="w-4 h-4 text-destructive" />
                            </div>
                            <h3 className="text-base font-black text-foreground">
                                {t("whatIsConsulting.notTitle")}
                            </h3>
                        </div>
                        <div className="p-6 space-y-3">
                            {notList.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* IS */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-accent/30 rounded-3xl overflow-hidden"
                    >
                        <div className="bg-accent/10 border-b border-accent/20 px-6 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                            </div>
                            <h3 className="text-base font-black text-foreground">
                                {t("whatIsConsulting.isTitle")}
                            </h3>
                        </div>
                        <div className="p-6 space-y-3">
                            {isList.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* What you receive steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <p className="text-center text-sm font-black text-muted-foreground uppercase tracking-widest mb-8">
                        {t("whatIsConsulting.stepsLabel")}
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all group text-center"
                            >
                                <div className="text-4xl mb-4">{step.emoji}</div>
                                <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                                        <ArrowRight className="w-5 h-5 text-primary/40" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}