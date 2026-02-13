"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ArrowRight, Star, Zap, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabbedPricingSection() {
    const { t } = useTranslation("pricingPage");

    // Bangladesh Tiers
    const bangladeshTiers = [
        {
            name: t("pricing.bangladesh.starter.name"),
            price: t("pricing.bangladesh.starter.price"),
            setup: t("pricing.bangladesh.starter.setup"),
            monthly: t("pricing.bangladesh.starter.monthly"),
            description: t("pricing.bangladesh.starter.description"),
            features: t("pricing.bangladesh.starter.features", {
                returnObjects: true,
            }) as string[],
            cta: t("pricing.bangladesh.starter.cta"),
            popular: false,
            icon: Star,
        },
        {
            name: t("pricing.bangladesh.pro.name"),
            price: t("pricing.bangladesh.pro.price"),
            setup: t("pricing.bangladesh.pro.setup"),
            monthly: t("pricing.bangladesh.pro.monthly"),
            description: t("pricing.bangladesh.pro.description"),
            features: t("pricing.bangladesh.pro.features", {
                returnObjects: true,
            }) as string[],
            cta: t("pricing.bangladesh.pro.cta"),
            popular: true,
            icon: Zap,
        },
        {
            name: t("pricing.bangladesh.custom.name"),
            price: t("pricing.bangladesh.custom.price"),
            setup: t("pricing.bangladesh.custom.setup"),
            monthly: t("pricing.bangladesh.custom.monthly"),
            description: t("pricing.bangladesh.custom.description"),
            features: t("pricing.bangladesh.custom.features", {
                returnObjects: true,
            }) as string[],
            cta: t("pricing.bangladesh.custom.cta"),
            popular: false,
            icon: Crown,
        },
    ];

    // International Tiers
    const internationalTiers = [
        {
            name: t("pricing.international.starter.name"),
            price: t("pricing.international.starter.price"),
            period: t("pricing.international.starter.period"),
            description: t("pricing.international.starter.description"),
            features: t("pricing.international.starter.features", {
                returnObjects: true,
            }) as string[],
            cta: t("pricing.international.starter.cta"),
            popular: false,
            icon: Star,
        },
        {
            name: t("pricing.international.pro.name"),
            price: t("pricing.international.pro.price"),
            period: t("pricing.international.pro.period"),
            description: t("pricing.international.pro.description"),
            features: t("pricing.international.pro.features", {
                returnObjects: true,
            }) as string[],
            cta: t("pricing.international.pro.cta"),
            popular: true,
            icon: Zap,
        },
        {
            name: t("pricing.international.enterprise.name"),
            price: t("pricing.international.enterprise.price"),
            period: t("pricing.international.enterprise.period"),
            description: t("pricing.international.enterprise.description"),
            features: t("pricing.international.enterprise.features", {
                returnObjects: true,
            }) as string[],
            cta: t("pricing.international.enterprise.cta"),
            popular: false,
            icon: Crown,
        },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("pricing.sectionTitle")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("pricing.sectionSubtitle")}
                    </p>
                </motion.div>

                {/* Tabs */}
                <Tabs defaultValue="bangladesh" className="max-w-7xl mx-auto">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-muted p-1 rounded-2xl">
                        <TabsTrigger
                            value="bangladesh"
                            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
                        >
                            {t("pricing.tabs.bangladesh")}
                        </TabsTrigger>
                        <TabsTrigger
                            value="international"
                            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
                        >
                            {t("pricing.tabs.international")}
                        </TabsTrigger>
                        <TabsTrigger
                            value="enterprise"
                            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
                        >
                            {t("pricing.tabs.enterprise")}
                        </TabsTrigger>
                    </TabsList>

                    {/* Bangladesh Tab */}
                    <TabsContent value="bangladesh">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {bangladeshTiers.map((tier, index) => (
                                <motion.div
                                    key={tier.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 ${tier.popular
                                        ? "bg-card border-primary shadow-xl scale-105 z-10"
                                        : "bg-card/50 border-border hover:border-primary/50"
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase">
                                            {t("pricing.mostPopular")}
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <tier.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-black text-foreground">
                                                {tier.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {tier.description}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                                            <div>
                                                <div className="text-sm text-muted-foreground mb-1">
                                                    {t("pricing.setupFee")}
                                                </div>
                                                <div className="text-3xl font-black text-primary">
                                                    {tier.setup}
                                                </div>
                                            </div>
                                            <div className="border-t border-border pt-3">
                                                <div className="text-sm text-muted-foreground mb-1">
                                                    {t("pricing.monthlyFee")}
                                                </div>
                                                <div className="text-2xl font-bold text-foreground">
                                                    {tier.monthly}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-grow">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        className={`w-full py-6 rounded-2xl font-bold ${tier.popular
                                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                            : "bg-accent hover:bg-accent/90 text-accent-foreground"
                                            }`}
                                        asChild
                                    >
                                        <a href="/contact" className="flex items-center justify-center gap-2">
                                            {tier.cta}
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* International Tab */}
                    <TabsContent value="international">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {internationalTiers.map((tier, index) => (
                                <motion.div
                                    key={tier.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 ${tier.popular
                                        ? "bg-card border-primary shadow-xl scale-105 z-10"
                                        : "bg-card/50 border-border hover:border-primary/50"
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase">
                                            {t("pricing.mostPopular")}
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <tier.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-black text-foreground">
                                                {tier.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {tier.description}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-primary">
                                                {tier.price}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                / {tier.period}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-grow">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        className={`w-full py-6 rounded-2xl font-bold ${tier.popular
                                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                                            : "bg-accent hover:bg-accent/90 text-accent-foreground"
                                            }`}
                                        asChild
                                    >
                                        <a href="/contact" className="flex items-center justify-center gap-2">
                                            {tier.cta}
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Enterprise Tab */}
                    <TabsContent value="enterprise">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                    <Crown className="w-8 h-8 text-primary" />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                                    {t("pricing.enterprise.title")}
                                </h3>
                                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    {t("pricing.enterprise.description")}
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {(t("pricing.enterprise.features", {
                                        returnObjects: true,
                                    }) as string[]).map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 bg-card/50 rounded-2xl p-4 border border-border"
                                        >
                                            <Check className="w-5 h-5 text-accent flex-shrink-0" />
                                            <span className="text-sm font-medium text-foreground">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12"
                                    asChild
                                >
                                    <a href="/contact" className="flex items-center gap-2">
                                        {t("pricing.enterprise.cta")}
                                        <ArrowRight className="w-5 h-5" />
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}