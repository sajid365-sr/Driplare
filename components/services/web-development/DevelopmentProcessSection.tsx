"use client";

import { motion } from "framer-motion";
import {
    PhoneCall,
    PenTool,
    Code2,
    MessageSquareMore,
    Rocket,
    ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const stepIcons = [PhoneCall, PenTool, Code2, MessageSquareMore, Rocket];

export function DevelopmentProcessSection() {
    const { t } = useTranslation("webDevelopmentPage");

    const steps = t("process.steps", {
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
                            {t("process.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("process.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("process.subtitle")}
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => {
                        const IconComponent = stepIcons[index];
                        const isLast = index === steps.length - 1;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative flex gap-6 md:gap-8"
                            >
                                {/* Left: Icon + Connector Line */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + 0.1, type: "spring" }}
                                        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 z-10"
                                    >
                                        <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                                    </motion.div>

                                    {/* Connector */}
                                    {!isLast && (
                                        <div className="w-0.5 flex-1 my-2 bg-gradient-to-b from-primary/50 to-transparent min-h-[2rem]" />
                                    )}
                                </div>

                                {/* Right: Content */}
                                <div className={`pb-10 flex-1 ${isLast ? "" : ""}`}>
                                    {/* Day Badge */}
                                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-3">
                                        <span className="text-xs font-bold text-accent">
                                            {step.day}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-foreground mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Detail tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {step.details.map((detail, dIndex) => (
                                            <span
                                                key={dIndex}
                                                className="text-xs font-semibold bg-muted border border-border text-foreground px-3 py-1.5 rounded-full"
                                            >
                                                {detail}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-4"
                >
                    <p className="text-muted-foreground mb-6 text-lg">
                        {t("process.ctaText")}
                    </p>
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="/contact" className="flex items-center gap-2">
                            {t("process.ctaButton")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}