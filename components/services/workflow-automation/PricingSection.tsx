"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle2, ArrowRight, Star, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function PricingSection() {
    const { t } = useTranslation("workflowAutomationPage");

    const tiers = t("pricing.tiers", {
        returnObjects: true,
    }) as Array<{
        name: string;
        badge?: string;
        price: string;
        priceNote: string;
        description: string;
        features: string[];
        cta: string;
        highlighted: boolean;
    }>;

    const faqs = t("pricing.faqs", {
        returnObjects: true,
    }) as Array<{ q: string; a: string }>;

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

            {/* Decorative blob behind highlighted card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("pricing.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("pricing.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("pricing.subtitle")}
                    </p>
                </motion.div>

                {/* Value line */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5">
                        <span className="text-sm font-bold text-foreground">
                            {t("pricing.valueNote")}
                        </span>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className={`relative flex flex-col rounded-3xl overflow-hidden border-2 transition-all ${tier.highlighted
                                ? "border-primary shadow-2xl shadow-primary/20 scale-[1.03]"
                                : "border-border hover:border-primary/30 hover:shadow-lg"
                                }`}
                        >
                            {/* Popular badge */}
                            {tier.badge && (
                                <div className="absolute top-0 inset-x-0 flex justify-center">
                                    <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-black px-6 py-1.5 rounded-b-xl flex items-center gap-1.5">
                                        <Star className="w-3 h-3 fill-white" />
                                        {tier.badge}
                                    </div>
                                </div>
                            )}

                            <div className={`flex flex-col flex-1 p-8 ${tier.highlighted ? "bg-card pt-10" : "bg-card"} ${tier.badge ? "pt-10" : ""}`}>
                                {/* Tier name */}
                                <div className="mb-6">
                                    <h3 className={`text-xl font-black mb-2 ${tier.highlighted ? "text-primary" : "text-foreground"}`}>
                                        {tier.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tier.description}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-6 pb-6 border-b border-border">
                                    <div className={`text-4xl font-black mb-1 ${tier.highlighted ? "text-primary" : "text-foreground"}`}>
                                        {tier.price}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium">
                                        {tier.priceNote}
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 flex-1 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -8 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.12 + i * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2
                                                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlighted ? "text-primary" : "text-accent"
                                                    }`}
                                            />
                                            <span className="text-sm text-foreground">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Button
                                    size="lg"
                                    className={`w-full font-bold group ${tier.highlighted
                                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                                        : "border-2 border-border hover:border-primary/50"
                                        }`}
                                    variant={tier.highlighted ? "default" : "outline"}
                                    asChild
                                >
                                    <a href="/contact" className="flex items-center justify-center gap-2">
                                        {tier.cta}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mini FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="grid sm:grid-cols-2 gap-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-card border border-border rounded-2xl p-5"
                            >
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-foreground mb-1">{faq.q}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}