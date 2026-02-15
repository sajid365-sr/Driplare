"use client";

import { GlowBlob } from "@/components/effects/bg-effects";
import { motion } from "framer-motion";
import {
    Languages,
    Brain,
    ShoppingCart,
    MessageCircle,
    Database,
    BarChart3,
    Zap,
    CheckCircle2,
    Globe,
    Clock,
    Sparkles
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeaturesShowcaseSection() {
    const { t } = useTranslation("AIAgentPage");

    const features = t("features.mainFeatures", {
        returnObjects: true
    }) as Array<{
        icon: string;
        title: string;
        tagline: string;
        description: string;
        highlights: string[];
    }>;

    // Icon mapping
    const iconMap: Record<string, React.ElementType> = {
        Languages,
        Brain,
        ShoppingCart,
        MessageCircle,
        Database,
        BarChart3,
        Clock,
        Sparkles,
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
            <GlowBlob position="top-left" size={700} opacity={0.4} />

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
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("features.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("features.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("features.subtitle")}
                    </p>
                </motion.div>

                {/* Main Features Grid - 6 Enriched Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Zap;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-card border-2 border-border rounded-3xl p-8 h-full hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-8 h-8 text-primary" strokeWidth={2} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>

                                    {/* Tagline */}
                                    <p className="text-sm font-bold text-accent mb-4">
                                        {feature.tagline}
                                    </p>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="space-y-3 pt-4 border-t border-border">
                                        {feature.highlights.map((highlight, hIndex) => (
                                            <motion.div
                                                key={hIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + hIndex * 0.05 }}
                                                className="flex items-start gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-xs text-foreground font-medium">
                                                    {highlight}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Integration Platforms Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 rounded-3xl p-8 md:p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                            <Globe className="w-8 h-8 text-primary" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                            {t("features.platforms.title")}
                        </h3>

                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {t("features.platforms.subtitle")}
                        </p>

                        {/* Platform Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                            {(t("features.platforms.list", {
                                returnObjects: true,
                            }) as string[]).map((platform, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card border-2 border-border rounded-2xl p-4 font-bold text-foreground hover:border-primary/50 hover:scale-105 transition-all cursor-default"
                                >
                                    {platform}
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-sm text-muted-foreground mt-8">
                            {t("features.platforms.note")}
                        </p>
                    </div>
                </motion.div>

                {/* Bottom Security Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-full px-6 py-3">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-accent" />
                            <span className="text-sm font-bold text-accent">
                                {t("features.bottomNotes.availability")}
                            </span>
                        </div>
                        <div className="w-px h-6 bg-border" />
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent" />
                            <span className="text-sm font-bold text-accent">
                                {t("features.bottomNotes.speed")}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}