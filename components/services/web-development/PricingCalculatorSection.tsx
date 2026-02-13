"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Calculator, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

type WebsiteType = {
    key: string;
    label: string;
    basePrice: number;
    baseDays: number;
};

type BuildType = "custom" | "template";

const WEBSITE_TYPES: WebsiteType[] = [
    { key: "ecommerce_custom", label: "", basePrice: 50000, baseDays: 18 },
    { key: "ecommerce_wp", label: "", basePrice: 20000, baseDays: 6 },
    { key: "business", label: "", basePrice: 28000, baseDays: 8 },
    { key: "landing", label: "", basePrice: 10000, baseDays: 4 },
    { key: "portfolio", label: "", basePrice: 14000, baseDays: 4 },
    { key: "dashboard", label: "", basePrice: 80000, baseDays: 25 },
    { key: "blog", label: "", basePrice: 16000, baseDays: 6 },
    { key: "booking", label: "", basePrice: 32000, baseDays: 12 },
];

// Price & timeline modifiers
const MODIFIERS = {
    custom: { price: 1.4, days: 1.3 },
    template: { price: 1.0, days: 1.0 },
    ecommerce: { price: 12000, days: 3 },
    payment: { price: 10000, days: 2 },
    multiLang: { price: 8000, days: 3 },
    customDesign: { price: 8000, days: 2 },
    extraPages: { price: 1500, days: 0.5 }, // per extra page above 5
};

export function PricingCalculatorSection() {
    const { t } = useTranslation("webDevelopmentPage");

    const [selectedType, setSelectedType] = useState<string>("landing");
    const [buildType, setBuildType] = useState<BuildType>("template");
    const [pageCount, setPageCount] = useState<number>(5);
    const [hasEcommerce, setHasEcommerce] = useState(false);
    const [hasPayment, setHasPayment] = useState(false);
    const [hasMultiLang, setHasMultiLang] = useState(false);
    const [hasCustomDesign, setHasCustomDesign] = useState(false);

    const websiteTypeLabels = t("pricingCalculator.websiteTypes", {
        returnObjects: true,
    }) as Record<string, string>;

    const result = useMemo(() => {
        const base = WEBSITE_TYPES.find((w) => w.key === selectedType)
            ?? WEBSITE_TYPES[0];

        const buildMod = MODIFIERS[buildType];
        let price = base.basePrice * buildMod.price;
        let days = base.baseDays * buildMod.days;

        if (hasEcommerce) { price += MODIFIERS.ecommerce.price; days += MODIFIERS.ecommerce.days; }
        if (hasPayment) { price += MODIFIERS.payment.price; days += MODIFIERS.payment.days; }
        if (hasMultiLang) { price += MODIFIERS.multiLang.price; days += MODIFIERS.multiLang.days; }
        if (hasCustomDesign) { price += MODIFIERS.customDesign.price; days += MODIFIERS.customDesign.days; }

        const extraPages = Math.max(0, pageCount - 5);
        price += extraPages * MODIFIERS.extraPages.price;
        days += extraPages * MODIFIERS.extraPages.days;

        // ±20% range
        const low = Math.round(price * 0.85 / 1000) * 1000;
        const high = Math.round(price * 1.15 / 1000) * 1000;
        const daysRounded = Math.round(days);

        return { low, high, days: daysRounded };
    }, [selectedType, buildType, pageCount, hasEcommerce, hasPayment, hasMultiLang, hasCustomDesign]);

    const toggleOptions = [
        { key: "ecommerce", value: hasEcommerce, setter: setHasEcommerce },
        { key: "payment", value: hasPayment, setter: setHasPayment },
        { key: "multiLang", value: hasMultiLang, setter: setHasMultiLang },
        { key: "customDesign", value: hasCustomDesign, setter: setHasCustomDesign },
    ];

    return (
        <section
            id="pricing-calculator"
            className="py-20 bg-muted/30 relative overflow-hidden"
        >
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
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Calculator className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("pricingCalculator.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("pricingCalculator.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("pricingCalculator.subtitle")}
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Inputs */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-border rounded-3xl p-8 space-y-8"
                    >
                        {/* Step 1: Website Type */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-3 block">
                                {t("pricingCalculator.step1")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {WEBSITE_TYPES.map((type) => (
                                    <button
                                        key={type.key}
                                        onClick={() => setSelectedType(type.key)}
                                        className={`text-left text-sm font-semibold px-4 py-3 rounded-xl border-2 transition-all ${selectedType === type.key
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40"
                                            }`}
                                    >
                                        {websiteTypeLabels[type.key] ?? type.key}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Build Type */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-3 block">
                                {t("pricingCalculator.step2")}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {(["template", "custom"] as BuildType[]).map((bt) => (
                                    <button
                                        key={bt}
                                        onClick={() => setBuildType(bt)}
                                        className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${buildType === bt
                                            ? "border-secondary bg-secondary/10 text-secondary"
                                            : "border-border bg-muted/40 text-muted-foreground hover:border-secondary/40"
                                            }`}
                                    >
                                        {t(`pricingCalculator.buildTypes.${bt}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Number of Pages */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-bold text-foreground">
                                    {t("pricingCalculator.step3")}
                                </label>
                                <span className="text-2xl font-black text-primary">
                                    {pageCount}
                                </span>
                            </div>
                            <input
                                title="Number of Pages"
                                placeholder="Number of Pages"
                                type="range"
                                min={1}
                                max={20}
                                value={pageCount}
                                onChange={(e) => setPageCount(Number(e.target.value))}
                                className="w-full accent-[hsl(var(--primary))]"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>1</span>
                                <span>20</span>
                            </div>
                        </div>

                        {/* Step 4: Add-on Features */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-3 block">
                                {t("pricingCalculator.step4")}
                            </label>
                            <div className="space-y-2">
                                {toggleOptions.map(({ key, value, setter }) => (
                                    <button
                                        key={key}
                                        onClick={() => setter(!value)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${value
                                            ? "border-accent bg-accent/10"
                                            : "border-border bg-muted/40 hover:border-accent/40"
                                            }`}
                                    >
                                        <span className={`text-sm font-semibold ${value ? "text-accent" : "text-muted-foreground"}`}>
                                            {t(`pricingCalculator.addons.${key}`)}
                                        </span>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${value ? "border-accent bg-accent" : "border-muted-foreground"
                                            }`}>
                                            {value && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Result */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Price Result */}
                        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white">
                            <p className="text-white/80 text-sm font-semibold mb-2">
                                {t("pricingCalculator.result.estimatedPrice")}
                            </p>
                            <div className="text-4xl md:text-5xl font-black mb-1">
                                ৳{result.low.toLocaleString()}
                                <span className="text-2xl font-bold opacity-80"> – </span>
                                ৳{result.high.toLocaleString()}
                            </div>
                            <p className="text-white/70 text-xs mt-2">
                                {t("pricingCalculator.result.disclaimer")}
                            </p>

                            <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3">
                                <Clock className="w-5 h-5 text-white/80 flex-shrink-0" />
                                <div>
                                    <p className="text-white/70 text-xs">
                                        {t("pricingCalculator.result.estimatedTime")}
                                    </p>
                                    <p className="text-xl font-black">
                                        {result.days}{" "}
                                        {t("pricingCalculator.result.days")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-card border-2 border-border rounded-3xl p-6 space-y-3">
                            <p className="text-sm font-bold text-foreground mb-4">
                                {t("pricingCalculator.result.summaryTitle")}
                            </p>
                            {[
                                { labelKey: "typeLabel", value: websiteTypeLabels[selectedType] ?? selectedType },
                                { labelKey: "buildLabel", value: t(`pricingCalculator.buildTypes.${buildType}`) },
                                { labelKey: "pagesLabel", value: `${pageCount} ${t("pricingCalculator.result.pagesUnit")}` },
                            ].map(({ labelKey, value }) => (
                                <div key={labelKey} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {t(`pricingCalculator.result.${labelKey}`)}
                                    </span>
                                    <span className="font-bold text-foreground">{value}</span>
                                </div>
                            ))}
                            {toggleOptions.filter(o => o.value).map(({ key }) => (
                                <div key={key} className="flex items-center gap-2 text-sm text-accent">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-semibold">
                                        {t(`pricingCalculator.addons.${key}`)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-6 text-center">
                            <p className="text-foreground font-bold mb-1">
                                {t("pricingCalculator.cta.title")}
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                                {t("pricingCalculator.cta.subtitle")}
                            </p>
                            <Button
                                size="lg"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center justify-center gap-2">
                                    {t("pricingCalculator.cta.button")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}