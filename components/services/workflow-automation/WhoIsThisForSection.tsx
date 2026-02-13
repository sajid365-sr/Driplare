"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function WhoIsThisForSection() {
    const { t } = useTranslation("workflowAutomationPage");

    const audiences = t("whoIsThisFor.audiences", {
        returnObjects: true,
    }) as Array<{
        emoji: string;
        title: string;
        subtitle: string;
        pains: string[];
        gains: string[];
        cta: string;
    }>;

    const cardColors = [
        { border: "border-primary/40", header: "from-primary to-secondary", tag: "bg-primary/10 text-primary border-primary/20" },
        { border: "border-secondary/40", header: "from-secondary to-accent", tag: "bg-secondary/10 text-secondary border-secondary/20" },
        { border: "border-accent/40", header: "from-accent to-primary", tag: "bg-accent/10 text-accent border-accent/20" },
    ];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
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
                        className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">
                            {t("whoIsThisFor.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whoIsThisFor.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whoIsThisFor.subtitle")}
                    </p>
                </motion.div>

                {/* Audience Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {audiences.map((audience, index) => {
                        const color = cardColors[index % cardColors.length];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`bg-card border-2 ${color.border} rounded-3xl overflow-hidden hover:shadow-xl transition-all group`}
                            >
                                {/* Card header */}
                                <div className={`bg-gradient-to-br ${color.header} p-6`}>
                                    <div className="text-4xl mb-3">{audience.emoji}</div>
                                    <h3 className="text-xl font-black text-white mb-1">
                                        {audience.title}
                                    </h3>
                                    <p className="text-white/75 text-sm">
                                        {audience.subtitle}
                                    </p>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Pain points */}
                                    <div>
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">
                                            {t("whoIsThisFor.painLabel")}
                                        </p>
                                        <div className="space-y-2">
                                            {audience.pains.map((pain, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.15 + i * 0.06 }}
                                                    className="flex items-start gap-2"
                                                >
                                                    <span className="text-destructive/70 text-sm flex-shrink-0 mt-0.5">✕</span>
                                                    <span className="text-sm text-muted-foreground">{pain}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="h-px bg-border" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${color.tag} bg-card`}>
                                                {t("whoIsThisFor.withAutomation")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Gains */}
                                    <div>
                                        <div className="space-y-2">
                                            {audience.gains.map((gain, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: 8 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.15 + i * 0.06 }}
                                                    className="flex items-start gap-2"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground font-medium">{gain}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        variant="outline"
                                        className={`w-full border-2 font-bold group/btn`}
                                        asChild
                                    >
                                        <a href="/contact" className="flex items-center justify-center gap-2">
                                            {audience.cta}
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}