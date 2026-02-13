"use client";

import { motion } from "framer-motion";
import { Brain, MessageCircle, Database, Cpu, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhatIsAIAgent() {
    const { t } = useTranslation("AIAgentPage");

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
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
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("whatIsAI.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whatIsAI.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whatIsAI.subtitle")}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: Explanation */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-card border-2 border-border rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                {t("whatIsAI.explanation.title")}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {t("whatIsAI.explanation.text")}
                            </p>

                            {/* Simple Breakdown */}
                            <div className="space-y-4">
                                {(t("whatIsAI.explanation.points", {
                                    returnObjects: true,
                                }) as Array<{ title: string; text: string }>).map(
                                    (point, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-primary font-bold text-sm">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground mb-1">
                                                    {point.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {point.text}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Key Difference Callout */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-foreground mb-2">
                                        {t("whatIsAI.difference.title")}
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t("whatIsAI.difference.text")}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Visual Diagram */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-card border-2 border-border rounded-3xl p-8 relative overflow-hidden">
                            {/* Background Grid */}
                            <div
                                className="absolute inset-0 opacity-5"
                                style={{
                                    backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                                   linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                                    backgroundSize: "20px 20px",
                                }}
                            />

                            {/* Flow Diagram */}
                            <div className="relative space-y-8">
                                {/* Customer */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4 bg-background border border-border rounded-2xl p-6"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">
                                            {t("whatIsAI.diagram.customer")}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {t("whatIsAI.diagram.customerAction")}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Arrow Down */}
                                <div className="flex justify-center">
                                    <motion.div
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-1 h-12 bg-gradient-to-b from-primary to-accent"
                                    />
                                </div>

                                {/* AI Brain */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-6"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                                        <Brain className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">
                                            {t("whatIsAI.diagram.brain")}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {t("whatIsAI.diagram.brainAction")}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Arrow Down */}
                                <div className="flex justify-center">
                                    <motion.div
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="w-1 h-12 bg-gradient-to-b from-accent to-primary"
                                    />
                                </div>

                                {/* Response + Save */}
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
                                        className="flex flex-col items-center gap-3 bg-background border border-border rounded-2xl p-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                                            <MessageCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-foreground text-sm">
                                                {t("whatIsAI.diagram.reply")}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {t("whatIsAI.diagram.replyAction")}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 }}
                                        className="flex flex-col items-center gap-3 bg-background border border-border rounded-2xl p-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                                            <Database className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-foreground text-sm">
                                                {t("whatIsAI.diagram.save")}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {t("whatIsAI.diagram.saveAction")}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Powered by Badge */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground"
                            >
                                <Cpu className="w-4 h-4" />
                                <span>{t("whatIsAI.diagram.poweredBy")}</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}