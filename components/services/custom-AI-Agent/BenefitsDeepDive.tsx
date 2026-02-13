"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function BenefitsDeepDive() {
    const { t } = useTranslation("AIAgentPage");

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

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
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("benefits.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("benefits.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("benefits.subtitle")}
                    </p>
                </motion.div>

                {/* Three Main Benefits */}
                <div className="space-y-24 max-w-6xl mx-auto">

                    {/* Benefit 1: Reduce Workload */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left: Content */}
                        <div>
                            <div className="inline-flex items-center gap-3 bg-primary/10 rounded-2xl px-4 py-2 mb-4">
                                <Clock className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold text-primary uppercase">
                                    {t("benefits.workload.label")}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                                {t("benefits.workload.title")}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-6">
                                {t("benefits.workload.description")}
                            </p>

                            {/* Key Points */}
                            <div className="space-y-3 mb-6">
                                {(t("benefits.workload.points", { returnObjects: true }) as string[]).map(
                                    (point, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground">{point}</span>
                                        </motion.div>
                                    )
                                )}
                            </div>

                            {/* Stat Highlight */}
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-6">
                                <div className="text-4xl font-black text-primary mb-2">
                                    {t("benefits.workload.stat.value")}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {t("benefits.workload.stat.label")}
                                </div>
                            </div>
                        </div>

                        {/* Right: Visual Chart */}
                        <div className="bg-card border-2 border-border rounded-3xl p-8">
                            <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                                {t("benefits.workload.chart.title")}
                            </h4>

                            {/* Before/After Comparison */}
                            <div className="space-y-6">
                                {/* Before */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-muted-foreground">
                                            {t("benefits.workload.chart.before")}
                                        </span>
                                        <span className="text-lg font-black text-destructive">
                                            40 hrs/week
                                        </span>
                                    </div>
                                    <div className="h-12 bg-destructive/20 rounded-xl relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-destructive rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* After */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-muted-foreground">
                                            {t("benefits.workload.chart.after")}
                                        </span>
                                        <span className="text-lg font-black text-accent">
                                            2 hrs/week
                                        </span>
                                    </div>
                                    <div className="h-12 bg-accent/20 rounded-xl relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "5%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-accent rounded-xl"
                                        />
                                    </div>
                                </div>

                                {/* Savings */}
                                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-black text-accent mb-1">
                                        38 hrs/week
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {t("benefits.workload.chart.saved")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefit 2: Reduce Costs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Right: Visual Chart (Order reversed on large screens) */}
                        <div className="lg:order-2">
                            <div className="inline-flex items-center gap-3 bg-secondary/10 rounded-2xl px-4 py-2 mb-4">
                                <DollarSign className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-bold text-secondary uppercase">
                                    {t("benefits.cost.label")}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                                {t("benefits.cost.title")}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-6">
                                {t("benefits.cost.description")}
                            </p>

                            {/* Key Points */}
                            <div className="space-y-3 mb-6">
                                {(t("benefits.cost.points", { returnObjects: true }) as string[]).map(
                                    (point, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground">{point}</span>
                                        </motion.div>
                                    )
                                )}
                            </div>

                            {/* Stat Highlight */}
                            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border-2 border-secondary/30 rounded-2xl p-6">
                                <div className="text-4xl font-black text-secondary mb-2">
                                    {t("benefits.cost.stat.value")}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {t("benefits.cost.stat.label")}
                                </div>
                            </div>
                        </div>

                        {/* Left: Cost Comparison Chart */}
                        <div className="lg:order-1 bg-card border-2 border-border rounded-3xl p-8">
                            <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                                {t("benefits.cost.chart.title")}
                            </h4>

                            {/* Cost Bars */}
                            <div className="space-y-8">
                                {/* Hiring Employee */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-foreground">
                                            {t("benefits.cost.chart.employee")}
                                        </span>
                                        <span className="text-xl font-black text-destructive">
                                            ৳15,000/mo
                                        </span>
                                    </div>
                                    <div className="h-16 bg-destructive/20 rounded-2xl relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-gradient-to-r from-destructive to-destructive/80 rounded-2xl flex items-center justify-center"
                                        >
                                            <span className="text-sm font-bold text-white">
                                                + Benefits, Training, Management
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* AI Agent */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-foreground">
                                            {t("benefits.cost.chart.aiAgent")}
                                        </span>
                                        <span className="text-xl font-black text-accent">
                                            ৳500-1,000/mo
                                        </span>
                                    </div>
                                    <div className="h-16 bg-accent/20 rounded-2xl relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "6.7%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-2xl flex items-center px-4"
                                        >
                                            <span className="text-xs font-bold text-white whitespace-nowrap">
                                                All-in
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Monthly Savings */}
                                <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center">
                                    <div className="text-4xl font-black text-accent mb-2">
                                        ৳14,000+
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-3">
                                        {t("benefits.cost.chart.saved")}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        = ৳1,68,000 saved per year
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefit 3: Increase Sales */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left: Content */}
                        <div>
                            <div className="inline-flex items-center gap-3 bg-accent/10 rounded-2xl px-4 py-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                <span className="text-sm font-bold text-accent uppercase">
                                    {t("benefits.sales.label")}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                                {t("benefits.sales.title")}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-6">
                                {t("benefits.sales.description")}
                            </p>

                            {/* Key Points */}
                            <div className="space-y-3 mb-6">
                                {(t("benefits.sales.points", { returnObjects: true }) as string[]).map(
                                    (point, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground">{point}</span>
                                        </motion.div>
                                    )
                                )}
                            </div>

                            {/* Real Example */}
                            <div className="bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 rounded-2xl p-6">
                                <div className="text-sm font-semibold text-muted-foreground mb-2">
                                    {t("benefits.sales.example.label")}
                                </div>
                                <div className="text-2xl font-black text-foreground mb-2">
                                    {t("benefits.sales.example.business")}
                                </div>
                                <div className="text-lg text-accent font-bold">
                                    {t("benefits.sales.example.result")}
                                </div>
                            </div>
                        </div>

                        {/* Right: Growth Chart */}
                        <div className="bg-card border-2 border-border rounded-3xl p-8">
                            <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                                {t("benefits.sales.chart.title")}
                            </h4>

                            {/* Monthly Progress */}
                            <div className="space-y-4 mb-6">
                                {[
                                    { month: "Month 1", orders: 50, growth: 0, percent: 33 },
                                    { month: "Month 2", orders: 90, growth: "+80%", percent: 60 },
                                    { month: "Month 3", orders: 125, growth: "+150%", percent: 83 },
                                    { month: "Month 6", orders: 150, growth: "+200%", percent: 100 },
                                ].map((data, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-muted-foreground">
                                                {data.month}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-foreground">
                                                    {data.orders} orders
                                                </span>
                                                {data.growth && (
                                                    <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full">
                                                        {data.growth}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="h-8 bg-accent/20 rounded-xl relative overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${data.percent}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                                                className="h-full bg-gradient-to-r from-accent to-primary rounded-xl"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Final Result */}
                            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-center text-white">
                                <div className="text-5xl font-black mb-2">3x</div>
                                <div className="text-sm font-semibold">
                                    {t("benefits.sales.chart.result")}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="#demo" className="flex items-center gap-2">
                            {t("benefits.cta")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}