"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Clock, Shield, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function SimpleCTA() {
    const { t } = useTranslation("workflowAutomationPage");

    const trustBadges = t("simpleCta.trustBadges", {
        returnObjects: true,
    }) as string[];

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        {/* Decorative blurs */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
                        >
                            <Zap className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
                            {t("simpleCta.title")}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                            {t("simpleCta.subtitle")}
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            {trustBadges.map((badge, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.08 }}
                                    className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-semibold text-foreground"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-accent" />
                                    {badge}
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 shadow-lg shadow-primary/20 group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("simpleCta.primaryButton")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 font-bold text-lg px-8"
                                asChild
                            >
                                <a href="#pricing-section">
                                    {t("simpleCta.secondaryButton")}
                                </a>
                            </Button>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border/50">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center justify-center gap-2"
                            >
                                <Clock className="w-5 h-5 text-primary" />
                                <span className="text-sm font-semibold text-foreground">
                                    {t("simpleCta.stats.delivery")}
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center justify-center gap-2"
                            >
                                <Shield className="w-5 h-5 text-accent" />
                                <span className="text-sm font-semibold text-foreground">
                                    {t("simpleCta.stats.support")}
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="flex items-center justify-center gap-2"
                            >
                                <Zap className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-semibold text-foreground">
                                    {t("simpleCta.stats.start")}
                                </span>
                            </motion.div>
                        </div>

                        {/* Final note */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="text-xs text-muted-foreground mt-6"
                        >
                            {t("simpleCta.finalNote")}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}