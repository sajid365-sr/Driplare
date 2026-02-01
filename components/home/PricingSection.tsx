"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function PricingSection() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

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
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("homepricing.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("homepricing.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("homepricing.subtitle")}
                    </p>
                </motion.div>

                {/* Main Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-card border-2 border-primary/50 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Free Trial Banner */}
                        <div className="bg-gradient-to-r from-accent to-accent/80 px-6 py-4">
                            <div className="flex items-center justify-center gap-3 text-white">
                                <Gift className="w-5 h-5" />
                                <span className="font-bold text-sm md:text-base">
                                    {t("homepricing.trialBanner")}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                {/* Left: Package Info */}
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                                        {t("homepricing.popular")}
                                    </div>

                                    <h3 className="text-3xl font-black text-foreground mb-3">
                                        {t("homepricing.packageName")}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {t("homepricing.packageDescription")}
                                    </p>

                                    {/* Pricing */}
                                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 mb-6 border border-border">
                                        <div className="mb-4">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-4xl font-black text-primary">
                                                    {t("homepricing.setupPrice")}
                                                </span>
                                                <span className="text-sm text-muted-foreground font-medium">
                                                    {t("homepricing.oneTime")}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {t("homepricing.setupNote")}
                                            </p>
                                        </div>

                                        <div className="border-t border-border pt-4">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-2xl font-bold text-foreground">
                                                    {t("homepricing.monthlyPrice")}
                                                </span>
                                                <span className="text-sm text-muted-foreground font-medium">
                                                    / {t("homepricing.perMonth")}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {t("homepricing.monthlyNote")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CTAs */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            size="lg"
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold flex-1 group"
                                            asChild
                                        >
                                            <a href="/contact">
                                                {t("homepricing.ctaPrimary")}
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>

                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 font-bold flex-1"
                                            asChild
                                        >
                                            <a href="/pricing">{t("homepricing.ctaSecondary")}</a>
                                        </Button>
                                    </div>
                                </div>

                                {/* Right: Features List */}
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-6">
                                        {t("homepricing.includedTitle")}
                                    </h4>

                                    <div className="space-y-4">
                                        {(t("homepricing.features", { returnObjects: true }) as string[]).map(
                                            (feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-foreground font-medium">
                                                        {feature}
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>

                                    {/* Trust Badge */}
                                    <div className="mt-8 pt-6 border-t border-border">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Sparkles
                                                        key={i}
                                                        className="w-4 h-4 text-accent fill-accent"
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium">
                                                {t("homepricing.trustBadge")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Benefits Bar */}
                        <div className="bg-muted/30 border-t border-border px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                {(t("homepricing.benefits", { returnObjects: true }) as Array<{
                                    icon: string;
                                    text: string;
                                }>).map((benefit, index) => (
                                    <div key={index} className="flex items-center justify-center gap-2">
                                        <span className="text-2xl">{benefit.icon}</span>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {benefit.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <p className="text-sm text-muted-foreground">
                        {t("homepricing.additionalInfo")}{" "}
                        <a
                            href="/pricing"
                            className="text-primary font-semibold hover:underline"
                        >
                            {t("homepricing.viewAllPricing")}
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}