"use client";

import { motion } from "framer-motion";
import {
    Rocket,
    CheckCircle2,
    ArrowRight,
    Clock,
    Users
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function HowItWorksSection() {
    const { t } = useTranslation("AIAgentPage");

    const steps = t("howItWorks.steps", { returnObjects: true }) as Array<{
        number: string;
        title: string;
        description: string;
        duration: string;
        details: string[];
    }>;

    const timeline = t("howItWorks.timeline", { returnObjects: true }) as Array<{
        phase: string;
        time: string;
    }>;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
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
                        <Rocket className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">
                            {t("howItWorks.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("howItWorks.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("howItWorks.subtitle")}
                    </p>
                </motion.div>

                {/* Timeline Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-bold text-foreground">
                                {t("howItWorks.timelineTitle")}
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-black text-primary mb-2">
                                        {item.time}
                                    </div>
                                    <div className="text-sm text-muted-foreground font-medium">
                                        {item.phase}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-border text-center">
                            <p className="text-sm font-bold text-accent">
                                {t("howItWorks.totalTime")}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Steps */}
                <div className="max-w-5xl mx-auto space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative"
                        >
                            <div className="grid md:grid-cols-12 gap-6 items-start">
                                {/* Step Number Circle */}
                                <div className="md:col-span-2 flex justify-center md:justify-end">
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 + 0.2 }}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20"
                                        >
                                            <span className="text-2xl font-black text-white">
                                                {step.number}
                                            </span>
                                        </motion.div>

                                        {/* Connecting Line */}
                                        {index < steps.length - 1 && (
                                            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
                                        )}
                                    </div>
                                </div>

                                {/* Step Content */}
                                <div className="md:col-span-10">
                                    <div className="bg-card border-2 border-border rounded-3xl p-6 md:p-8 hover:border-primary/30 transition-all group">
                                        {/* Duration Badge */}
                                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1 mb-4">
                                            <Clock className="w-3 h-3 text-accent" />
                                            <span className="text-xs font-bold text-accent">
                                                {step.duration}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Details List */}
                                        <div className="space-y-3">
                                            {step.details.map((detail, detailIndex) => (
                                                <motion.div
                                                    key={detailIndex}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.15 + detailIndex * 0.1 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground">
                                                        {detail}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* What We Need From You */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mt-16"
                >
                    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-border rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-6 h-6 text-primary" />
                            <h3 className="text-2xl font-bold text-foreground">
                                {t("howItWorks.needFromYou.title")}
                            </h3>
                        </div>

                        <p className="text-muted-foreground mb-6">
                            {t("howItWorks.needFromYou.subtitle")}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {(t("howItWorks.needFromYou.items", {
                                returnObjects: true,
                            }) as string[]).map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium text-foreground">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground text-center">
                                {t("howItWorks.needFromYou.note")}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="/contact" className="flex items-center gap-2">
                            {t("howItWorks.cta")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        {t("howItWorks.ctaSubtext")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}