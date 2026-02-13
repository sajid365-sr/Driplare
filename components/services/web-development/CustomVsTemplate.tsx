"use client";

import { motion } from "framer-motion";
import { Code2, LayoutTemplate, CheckCircle2, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function CustomVsTemplate() {
    const { t } = useTranslation("webDevelopmentPage");

    const customPoints = t("customVsTemplate.custom.points", {
        returnObjects: true,
    }) as Array<{ text: string; positive: boolean }>;

    const templatePoints = t("customVsTemplate.template.points", {
        returnObjects: true,
    }) as Array<{ text: string; positive: boolean }>;

    const bestForCustom = t("customVsTemplate.custom.bestFor", {
        returnObjects: true,
    }) as string[];

    const bestForTemplate = t("customVsTemplate.template.bestFor", {
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
                        className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <HelpCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">
                            {t("customVsTemplate.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("customVsTemplate.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("customVsTemplate.subtitle")}
                    </p>
                </motion.div>

                {/* Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                    {/* Custom Built */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-primary/40 rounded-3xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary to-secondary p-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                                <Code2 className="w-7 h-7 text-white" strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-1">
                                {t("customVsTemplate.custom.title")}
                            </h3>
                            <p className="text-white/80 text-sm">
                                {t("customVsTemplate.custom.tagline")}
                            </p>
                        </div>

                        {/* Points */}
                        <div className="p-6 space-y-3">
                            {customPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    {point.positive ? (
                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-destructive/60 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className={`text-sm ${point.positive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {point.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Best For */}
                        <div className="px-6 pb-6">
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                                    {t("customVsTemplate.bestForLabel")}
                                </p>
                                <div className="space-y-2">
                                    {bestForCustom.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            <span className="text-sm text-foreground font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* WordPress / Template */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-secondary/40 rounded-3xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-secondary to-accent p-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                                <LayoutTemplate className="w-7 h-7 text-white" strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-1">
                                {t("customVsTemplate.template.title")}
                            </h3>
                            <p className="text-white/80 text-sm">
                                {t("customVsTemplate.template.tagline")}
                            </p>
                        </div>

                        {/* Points */}
                        <div className="p-6 space-y-3">
                            {templatePoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.07 }}
                                    className="flex items-start gap-3"
                                >
                                    {point.positive ? (
                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-destructive/60 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className={`text-sm ${point.positive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {point.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Best For */}
                        <div className="px-6 pb-6">
                            <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
                                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">
                                    {t("customVsTemplate.bestForLabel")}
                                </p>
                                <div className="space-y-2">
                                    {bestForTemplate.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                            <span className="text-sm text-foreground font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Decision Helper */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8 text-center">
                        <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {t("customVsTemplate.confused.title")}
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                            {t("customVsTemplate.confused.subtitle")}
                        </p>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 group"
                            asChild
                        >
                            <a href="/contact" className="flex items-center gap-2">
                                {t("customVsTemplate.confused.cta")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}