"use client";

import { motion } from "framer-motion";
import { PhoneCall, Map, Code2, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const STEP_ICONS = [PhoneCall, Map, Code2, Rocket];

export function HowItWorksSection() {
    const { t } = useTranslation("workflowAutomationPage");

    const steps = t("howItWorks.steps", {
        returnObjects: true,
    }) as Array<{
        day: string;
        title: string;
        description: string;
        details: string[];
    }>;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
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

            {/* Decorative blobs */}
            <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

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
                        <Rocket className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
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

                {/* Steps — alternating left/right layout on desktop */}
                <div className="max-w-5xl mx-auto space-y-8 md:space-y-0">
                    {steps.map((step, index) => {
                        const IconComponent = STEP_ICONS[index];
                        const isEven = index % 2 === 0;
                        const isLast = index === steps.length - 1;

                        return (
                            <div key={index} className="relative">
                                {/* Connector line between steps (desktop only) */}
                                {!isLast && (
                                    <div className="hidden md:block absolute left-1/2 top-full h-8 w-0.5 bg-gradient-to-b from-primary/40 to-transparent -translate-x-1/2 z-10" />
                                )}

                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${!isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content card */}
                                    <div className="flex-1 bg-card border-2 border-border rounded-3xl p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                                        {/* Step badge */}
                                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-4">
                                            <span className="text-xs font-black text-accent">{step.day}</span>
                                        </div>

                                        <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-5">
                                            {step.description}
                                        </p>

                                        {/* Detail tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {step.details.map((detail, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted border border-border text-foreground px-3 py-1.5 rounded-full"
                                                >
                                                    <CheckCircle2 className="w-3 h-3 text-accent" />
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Step number + icon — center column */}
                                    <div className="flex flex-row md:flex-col items-center gap-3 flex-shrink-0">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20"
                                        >
                                            <IconComponent className="w-7 h-7 text-white" strokeWidth={1.75} />
                                        </motion.div>
                                        <div className="text-3xl font-black text-primary/20 select-none">
                                            0{index + 1}
                                        </div>
                                    </div>

                                    {/* Spacer on opposite side (desktop) */}
                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Timeline note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mt-14"
                >
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-7 text-center">
                        <div className="text-3xl mb-3">⚡</div>
                        <h3 className="text-xl font-black text-foreground mb-2">
                            {t("howItWorks.timelineTitle")}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl mx-auto">
                            {t("howItWorks.timelineText")}
                        </p>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 group"
                            asChild
                        >
                            <a href="/contact" className="flex items-center gap-2">
                                {t("howItWorks.ctaButton")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}