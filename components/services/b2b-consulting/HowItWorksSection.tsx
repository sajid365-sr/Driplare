"use client";

import { motion } from "framer-motion";
import { PhoneCall, Search, Map, ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const STEP_ICONS = [PhoneCall, Search, Map];
const STEP_GRADIENTS = [
    "from-primary to-secondary",
    "from-secondary to-accent",
    "from-accent to-primary",
];

export function HowItWorksSection() {
    const { t } = useTranslation("aiConsultingPage");

    const steps = t("howItWorks.steps", {
        returnObjects: true,
    }) as Array<{
        day: string;
        title: string;
        description: string;
        details: string[];
        deliverable: string;
    }>;

    return (
        <section id="how-it-works" className="py-20 bg-background relative overflow-hidden">
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
            <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

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

                {/* Steps */}
                <div className="max-w-5xl mx-auto">
                    {/* Desktop: horizontal connector */}
                    <div className="hidden md:flex items-center justify-between mb-8 relative px-16">
                        {steps.map((_, i) => (
                            <div key={i} className="flex flex-col items-center z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, type: "spring" }}
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${STEP_GRADIENTS[i]} flex items-center justify-center shadow-lg`}
                                >
                                    {(() => {
                                        const Icon = STEP_ICONS[i];
                                        return <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />;
                                    })()}
                                </motion.div>
                                <div className="text-xs font-black text-muted-foreground mt-2">
                                    {steps[i].day}
                                </div>
                            </div>
                        ))}
                        {/* Connector line */}
                        <div className="absolute top-8 left-24 right-24 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
                    </div>

                    {/* Step cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-14">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="bg-card border-2 border-border rounded-3xl p-6 hover:border-primary/30 hover:shadow-lg transition-all group"
                            >
                                {/* Mobile icon */}
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${STEP_GRADIENTS[index]} flex items-center justify-center mb-4 md:hidden`}>
                                    {(() => {
                                        const Icon = STEP_ICONS[index];
                                        return <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />;
                                    })()}
                                </div>

                                {/* Step number badge */}
                                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
                                    <span className="text-xs font-black text-primary">{step.day}</span>
                                </div>

                                <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                    {step.description}
                                </p>

                                {/* Detail chips */}
                                <div className="space-y-2 mb-5">
                                    {step.details.map((detail, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-foreground">{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Deliverable tag */}
                                <div className="bg-accent/5 border border-accent/20 rounded-xl p-3">
                                    <p className="text-xs font-black text-accent uppercase tracking-widest mb-1">
                                        {t("howItWorks.deliverableLabel")}
                                    </p>
                                    <p className="text-xs text-foreground font-medium">{step.deliverable}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Timeline callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8 text-center"
                    >
                        <div className="text-3xl mb-3">⚡</div>
                        <h3 className="text-xl font-black text-foreground mb-2">
                            {t("howItWorks.timelineTitle")}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
}