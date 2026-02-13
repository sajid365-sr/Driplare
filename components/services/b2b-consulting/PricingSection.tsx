"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Zap, CheckCircle2, ArrowRight, Star, Globe, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function PricingSection() {
    const { t } = useTranslation("aiConsultingPage");
    const [isInternational, setIsInternational] = useState(false);

    const tiers = t("pricing.tiers", {
        returnObjects: true,
    }) as Array<{
        name: string;
        badge?: string;
        priceBD: string;
        priceIntl: string;
        priceBDNote: string;
        priceIntlNote: string;
        duration: string;
        description: string;
        features: string[];
        deliverables: string[];
        cta: string;
        highlighted: boolean;
    }>;

    const faqs = t("pricing.faqs", {
        returnObjects: true,
    }) as Array<{ q: string; a: string }>;

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
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

                {/* Region Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-12"
                >
                    <div className="bg-card border-2 border-border rounded-2xl p-1.5 flex items-center gap-1">
                        <button
                            onClick={() => setIsInternational(false)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${!isInternational
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <MapPin className="w-4 h-4" />
                            {t("pricing.toggleBD")}
                        </button>
                        <button
                            onClick={() => setIsInternational(true)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${isInternational
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Globe className="w-4 h-4" />
                            {t("pricing.toggleIntl")}
                        </button>
                    </div>
                </motion.div>

                {/* Region note */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={isInternational ? "intl" : "bd"}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-center text-xs text-muted-foreground mb-10"
                    >
                        {isInternational ? t("pricing.intlNote") : t("pricing.bdNote")}
                    </motion.p>
                </AnimatePresence>

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

                            <div className={`flex flex-col flex-1 p-7 bg-card ${tier.badge ? "pt-10" : ""}`}>
                                {/* Name + duration */}
                                <div className="mb-5">
                                    <h3 className={`text-xl font-black mb-1 ${tier.highlighted ? "text-primary" : "text-foreground"}`}>
                                        {tier.name}
                                    </h3>
                                    <div className="inline-flex items-center gap-1.5 bg-muted border border-border rounded-full px-3 py-1">
                                        <span className="text-xs font-semibold text-muted-foreground">{tier.duration}</span>
                                    </div>
                                </div>

                                {/* Price — animated swap */}
                                <div className="mb-5 pb-5 border-b border-border overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isInternational ? "intl" : "bd"}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className={`text-3xl font-black mb-1 ${tier.highlighted ? "text-primary" : "text-foreground"}`}>
                                                {isInternational ? tier.priceIntl : tier.priceBD}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {isInternational ? tier.priceIntlNote : tier.priceBDNote}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                    {tier.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2.5 mb-5">
                                    {tier.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlighted ? "text-primary" : "text-accent"}`} />
                                            <span className="text-sm text-foreground">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Deliverables */}
                                <div className="bg-muted/50 border border-border rounded-xl p-4 mb-6 flex-1">
                                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">
                                        {t("pricing.deliverablesLabel")}
                                    </p>
                                    <ul className="space-y-1.5">
                                        {tier.deliverables.map((d, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <ArrowRight className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-xs text-foreground">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <Button
                                    size="lg"
                                    className={`w-full font-bold group ${tier.highlighted
                                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                                        : "border-2"
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

                {/* Mini FAQs */}
                <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-card border border-border rounded-2xl p-5"
                        >
                            <p className="text-sm font-bold text-foreground mb-1.5">{faq.q}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}