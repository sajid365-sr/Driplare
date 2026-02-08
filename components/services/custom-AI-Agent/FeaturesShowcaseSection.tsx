"use client";

import { motion } from "framer-motion";
import {
    Languages,
    Brain,
    Database,
    Zap,
    MessageCircle,
    ShoppingCart,
    BarChart3,
    Clock,
    Shield,
    Smartphone,
    Globe,
    CheckCircle2
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeaturesShowcaseSection() {
    const { t } = useTranslation();

    const features = t("services.AIAgent.features.mainFeatures", {
        returnObjects: true
    }) as Array<{
        icon: string;
        title: string;
        description: string;
        capabilities: string[];
    }>;

    const technicalFeatures = t("services.AIAgent.features.technicalFeatures", {
        returnObjects: true,
    }) as Array<{
        title: string;
        description: string;
    }>;

    // Icon mapping
    const iconMap: Record<string, any> = {
        Languages,
        Brain,
        Database,
        Zap,
        MessageCircle,
        ShoppingCart,
        BarChart3,
        Clock,
        Shield,
        Smartphone,
        Globe,
    };

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            {/* Background Elements */}
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
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("services.AIAgent.features.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("services.AIAgent.features.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("services.AIAgent.features.subtitle")}
                    </p>
                </motion.div>

                {/* Main Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Zap;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border-2 border-border rounded-3xl p-6 hover:border-primary/50 transition-all group"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <IconComponent className="w-7 h-7 text-primary" strokeWidth={2} />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Capabilities */}
                                <div className="space-y-2">
                                    {feature.capabilities.map((capability, capIndex) => (
                                        <div
                                            key={capIndex}
                                            className="flex items-start gap-2"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-foreground">
                                                {capability}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Technical Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                            {t("services.AIAgent.features.technicalTitle")}
                        </h3>
                        <p className="text-muted-foreground">
                            {t("services.AIAgent.features.technicalSubtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {technicalFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-card via-card to-muted/20 border-2 border-border rounded-2xl p-6 hover:border-secondary/50 transition-all"
                            >
                                <h4 className="text-lg font-bold text-foreground mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Integration Platforms */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mt-16"
                >
                    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 rounded-3xl p-8 text-center">
                        <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {t("services.AIAgent.features.platforms.title")}
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            {t("services.AIAgent.features.platforms.subtitle")}
                        </p>

                        {/* Platform Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(t("services.AIAgent.features.platforms.list", {
                                returnObjects: true,
                            }) as string[]).map((platform, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card border border-border rounded-xl p-4 font-semibold text-foreground text-sm hover:border-primary/50 hover:scale-105 transition-all"
                                >
                                    {platform}
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-xs text-muted-foreground mt-6">
                            {t("services.AIAgent.features.platforms.note")}
                        </p>
                    </div>
                </motion.div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3">
                        <Shield className="w-5 h-5 text-accent" />
                        <span className="text-sm font-bold text-accent">
                            {t("services.AIAgent.features.bottomNote")}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}