"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Clock, Shield, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function AIAgentSimpleCTA() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
                        >
                            <Sparkles className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
                            {t("services.AIAgent.simpleCta.title")}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                            {t("services.AIAgent.simpleCta.subtitle")}
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            {(t("services.AIAgent.simpleCta.trustBadges", {
                                returnObjects: true
                            }) as string[]).map((badge, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-semibold text-foreground"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-accent" />
                                    {badge}
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg px-8 shadow-lg shadow-primary/20 group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("services.AIAgent.simpleCta.primaryButton")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 font-bold text-base md:text-lg px-8"
                                asChild
                            >
                                <a
                                    href="https://wa.me/+8801305792949"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("services.AIAgent.simpleCta.secondaryButton")}
                                </a>
                            </Button>
                        </div>

                        {/* Bottom Stats/Info Row */}
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
                                    {t("services.AIAgent.simpleCta.stats.setup")}
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
                                    {t("services.AIAgent.simpleCta.stats.trial")}
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-semibold text-foreground">
                                    {t("services.AIAgent.simpleCta.stats.support")}
                                </span>
                            </motion.div>
                        </div>

                        {/* Final Note */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="text-xs text-muted-foreground mt-6"
                        >
                            {t("services.AIAgent.simpleCta.finalNote")}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}