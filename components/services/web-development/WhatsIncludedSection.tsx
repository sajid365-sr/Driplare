"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PlusCircle, Package, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WhatsIncludedSection() {
    const { t } = useTranslation("webDevelopmentPage");

    const included = t("whatsIncluded.included", {
        returnObjects: true,
    }) as string[];

    const addons = t("whatsIncluded.addons", {
        returnObjects: true,
    }) as Array<{ name: string; price: string }>;

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
                        <Package className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("whatsIncluded.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whatsIncluded.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whatsIncluded.subtitle")}
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
                    {/* Standard Inclusions */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-accent/30 rounded-3xl overflow-hidden"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-br from-accent/20 to-secondary/20 border-b border-border px-8 py-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-foreground">
                                    {t("whatsIncluded.includedTitle")}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {t("whatsIncluded.includedSubtitle")}
                                </p>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="p-8">
                            <div className="grid sm:grid-cols-2 gap-3">
                                {included.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.06 }}
                                        className="flex items-start gap-3 bg-muted/40 rounded-xl p-3"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-foreground font-medium leading-snug">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Add-ons */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div className="bg-card border-2 border-secondary/30 rounded-3xl overflow-hidden flex-1">
                            {/* Card Header */}
                            <div className="bg-gradient-to-br from-secondary/20 to-primary/20 border-b border-border px-8 py-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                    <PlusCircle className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-foreground">
                                        {t("whatsIncluded.addonsTitle")}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t("whatsIncluded.addonsSubtitle")}
                                    </p>
                                </div>
                            </div>

                            {/* Addon Items */}
                            <div className="p-8 space-y-3">
                                {addons.map((addon, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.07 }}
                                        className="flex items-center justify-between gap-4 bg-muted/40 rounded-xl px-4 py-3 group hover:border-secondary/30 hover:bg-secondary/5 border border-transparent transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <PlusCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                                            <span className="text-sm text-foreground font-medium">
                                                {addon.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-black text-secondary whitespace-nowrap">
                                            {addon.price}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-6 text-center"
                        >
                            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                            <p className="text-foreground font-bold mb-1">
                                {t("whatsIncluded.cta.title")}
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t("whatsIncluded.cta.subtitle")}
                            </p>
                            <Button
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("whatsIncluded.cta.button")}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}