"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, X, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhatIsAutomationSection() {
    const { t } = useTranslation("workflowAutomationPage");

    const beforeItems = t("whatIsAutomation.before.items", {
        returnObjects: true,
    }) as string[];

    const afterItems = t("whatIsAutomation.after.items", {
        returnObjects: true,
    }) as string[];

    const flowSteps = t("whatIsAutomation.flow.steps", {
        returnObjects: true,
    }) as Array<{ label: string; sub: string }>;

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
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("whatIsAutomation.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whatIsAutomation.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whatIsAutomation.subtitle")}
                    </p>
                </motion.div>

                {/* Analogy Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8 text-center">
                        <div className="text-4xl mb-4">🤖</div>
                        <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                            {t("whatIsAutomation.analogy")}
                        </p>
                    </div>
                </motion.div>

                {/* Before / After Comparison */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
                    {/* Before */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-destructive/30 rounded-3xl overflow-hidden"
                    >
                        <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                                <X className="w-4 h-4 text-destructive" />
                            </div>
                            <h3 className="text-lg font-black text-foreground">
                                {t("whatIsAutomation.before.title")}
                            </h3>
                        </div>
                        <div className="p-6 space-y-3">
                            {beforeItems.map((item, i) => (
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

                    {/* After */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-accent/30 rounded-3xl overflow-hidden"
                    >
                        <div className="bg-accent/10 border-b border-accent/20 px-6 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                <Check className="w-4 h-4 text-accent" />
                            </div>
                            <h3 className="text-lg font-black text-foreground">
                                {t("whatIsAutomation.after.title")}
                            </h3>
                        </div>
                        <div className="p-6 space-y-3">
                            {afterItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground font-medium">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* How it works visually — App A → Trigger → Action → App B */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
                        {t("whatIsAutomation.flow.label")}
                    </p>

                    {/*
            IMAGE PLACEHOLDER: Flow Diagram Illustration
            Dimensions: 900×200px
            Content: Clean horizontal flow showing:
              [App Icon] → [Trigger Badge] → [Arrow] → [Action Badge] → [App Icon]
              Example: Gmail icon → "New Email" → → "Save to Sheet" → Google Sheets icon
            Style: Matches brand colors, icons with rounded backgrounds
            Path: /images/automation/flow-diagram.png
            Alternative: Keep code-driven version below (works fine without image)
          */}

                    <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                        {flowSteps.map((step, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-4">
                                {/* Step node */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${i === 0 ? "bg-gradient-to-br from-secondary to-secondary/80" :
                                        i === 1 ? "bg-gradient-to-br from-primary to-primary/80" :
                                            i === 2 ? "bg-gradient-to-br from-secondary to-primary" :
                                                "bg-gradient-to-br from-accent to-accent/80"
                                        }`}>
                                        <span className="text-white text-2xl font-black">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-foreground">
                                            {step.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {step.sub}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Arrow between steps */}
                                {i < flowSteps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        whileInView={{ opacity: 1, scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 + 0.1 }}
                                        className="hidden md:block"
                                    >
                                        <ArrowRight className="w-6 h-6 text-primary/50" />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}