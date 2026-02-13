"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    Calculator,
    TrendingUp,
    DollarSign,
    Clock,
    Users,
    ArrowRight,
    CheckCircle2,
    Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function ROICalculatorSection() {
    const { t } = useTranslation("AIAgentPage");

    // Calculator State
    const [messagesPerDay, setMessagesPerDay] = useState(50);
    const [hoursSpentDaily, setHoursSpentDaily] = useState(3);
    const [hourlyRate, setHourlyRate] = useState(500);

    // Calculations
    const monthlyMessages = messagesPerDay * 30;
    const monthlyHours = hoursSpentDaily * 30;
    const currentMonthlyCost = monthlyHours * hourlyRate;
    const aiAgentCost = 1000; // Maximum monthly cost
    const monthlySavings = currentMonthlyCost - aiAgentCost;
    const annualSavings = monthlySavings * 12;
    const roi = ((monthlySavings / aiAgentCost) * 100).toFixed(0);
    const paybackDays = Math.ceil((aiAgentCost / monthlySavings) * 30);

    return (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
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
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Calculator className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("roiCalculator.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("roiCalculator.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("roiCalculator.subtitle")}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left: Calculator Inputs */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border-2 border-border rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                            <Users className="w-6 h-6 text-primary" />
                            {t("roiCalculator.inputTitle")}
                        </h3>

                        {/* Input 1: Messages Per Day */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-foreground">
                                    {t("roiCalculator.inputs.messagesPerDay.label")}
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-primary">
                                        {messagesPerDay}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {t("roiCalculator.inputs.messagesPerDay.unit")}
                                    </span>
                                </div>
                            </div>
                            <Slider
                                value={[messagesPerDay]}
                                onValueChange={(value) => setMessagesPerDay(value[0])}
                                min={10}
                                max={500}
                                step={10}
                                className="mb-2"
                            />
                            <p className="text-xs text-muted-foreground">
                                {t("roiCalculator.inputs.messagesPerDay.hint")}
                            </p>
                        </div>

                        {/* Input 2: Hours Spent Daily */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-foreground">
                                    {t("roiCalculator.inputs.hoursSpent.label")}
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-secondary">
                                        {hoursSpentDaily}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {t("roiCalculator.inputs.hoursSpent.unit")}
                                    </span>
                                </div>
                            </div>
                            <Slider
                                value={[hoursSpentDaily]}
                                onValueChange={(value) => setHoursSpentDaily(value[0])}
                                min={1}
                                max={12}
                                step={0.5}
                                className="mb-2"
                            />
                            <p className="text-xs text-muted-foreground">
                                {t("roiCalculator.inputs.hoursSpent.hint")}
                            </p>
                        </div>

                        {/* Input 3: Hourly Rate */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-foreground">
                                    {t("roiCalculator.inputs.hourlyRate.label")}
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-accent">
                                        ৳{hourlyRate}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {t("roiCalculator.inputs.hourlyRate.unit")}
                                    </span>
                                </div>
                            </div>
                            <Slider
                                value={[hourlyRate]}
                                onValueChange={(value) => setHourlyRate(value[0])}
                                min={200}
                                max={2000}
                                step={100}
                                className="mb-2"
                            />
                            <p className="text-xs text-muted-foreground">
                                {t("roiCalculator.inputs.hourlyRate.hint")}
                            </p>
                        </div>

                        {/* Monthly Summary */}
                        <div className="bg-muted/50 border border-border rounded-2xl p-4">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-xs text-muted-foreground mb-1">
                                        {t("roiCalculator.monthlySummary.messages")}
                                    </div>
                                    <div className="text-lg font-bold text-foreground">
                                        {monthlyMessages.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground mb-1">
                                        {t("roiCalculator.monthlySummary.hours")}
                                    </div>
                                    <div className="text-lg font-bold text-foreground">
                                        {monthlyHours} hrs
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Current Cost */}
                        <div className="bg-destructive/10 border-2 border-destructive/30 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-destructive" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        {t("roiCalculator.results.currentCost.label")}
                                    </div>
                                    <div className="text-3xl font-black text-destructive">
                                        ৳{currentMonthlyCost.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t("roiCalculator.results.currentCost.description")}
                            </p>
                        </div>

                        {/* With AI Agent */}
                        <div className="bg-accent/10 border-2 border-accent/30 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        {t("roiCalculator.results.withAI.label")}
                                    </div>
                                    <div className="text-3xl font-black text-accent">
                                        ৳{aiAgentCost.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t("roiCalculator.results.withAI.description")}
                            </p>
                        </div>

                        {/* Monthly Savings */}
                        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-white/80">
                                        {t("roiCalculator.results.savings.label")}
                                    </div>
                                    <div className="text-3xl font-black text-white">
                                        ৳{monthlySavings.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                <div>
                                    <div className="text-xs text-white/70 mb-1">
                                        {t("roiCalculator.results.savings.annual")}
                                    </div>
                                    <div className="text-lg font-bold">
                                        ৳{(annualSavings / 1000).toFixed(0)}K
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/70 mb-1">
                                        {t("roiCalculator.results.savings.roi")}
                                    </div>
                                    <div className="text-lg font-bold">{roi}%</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/70 mb-1">
                                        {t("roiCalculator.results.savings.payback")}
                                    </div>
                                    <div className="text-lg font-bold">{paybackDays}d</div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Benefits */}
                        <div className="bg-card border-2 border-border rounded-2xl p-6">
                            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                {t("roiCalculator.additionalBenefits.title")}
                            </h4>
                            <ul className="space-y-3">
                                {(t("roiCalculator.additionalBenefits.list", {
                                    returnObjects: true,
                                }) as string[]).map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 text-sm text-muted-foreground"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                        {benefit}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="bg-card border-2 border-border rounded-3xl p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {t("roiCalculator.cta.title")}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {t("roiCalculator.cta.subtitle")}
                        </p>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                            asChild
                        >
                            <a href="/contact" className="flex items-center gap-2">
                                {t("roiCalculator.cta.button")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                            {t("roiCalculator.cta.note")}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}