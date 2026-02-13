"use client";

import { motion } from "framer-motion";
import {
    ShoppingCart,
    Briefcase,
    Zap,
    User,
    LayoutDashboard,
    FileText,
    Calendar,
    Store,
    ArrowRight,
    Clock,
    DollarSign,
    CheckCircle2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function WebsiteTypesShowcase() {
    const { t } = useTranslation("webDevelopmentPage");

    const websiteTypes = t("websiteTypes.types", {
        returnObjects: true,
    }) as Array<{
        icon: string;
        title: string;
        description: string;
        features: string[];
        priceRange: string;
        timeline: string;
        badge?: string;
        imageUrl: string; // Placeholder path
    }>;

    const iconMap: Record<string, any> = {
        ShoppingCart,
        Store,
        Briefcase,
        Zap,
        User,
        LayoutDashboard,
        FileText,
        Calendar,
    };

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30 opacity-50" />

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
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Store className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("websiteTypes.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("websiteTypes.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("websiteTypes.subtitle")}
                    </p>
                </motion.div>

                {/* Website Types Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {websiteTypes.map((type, index) => {
                        const IconComponent = iconMap[type.icon] || Store;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl h-full flex flex-col">
                                    {/* 
                    IMAGE PLACEHOLDER: Website Type Preview
                    Dimensions: 800x500px (16:10 ratio)
                    Path: type.imageUrl (from translations)
                    Content: Screenshot or mockup of this website type
                    Examples:
                      - E-commerce: Product page screenshot
                      - Landing Page: Hero section screenshot
                      - Portfolio: Portfolio grid screenshot
                  */}
                                    <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 overflow-hidden">
                                        {/* Uncomment to use real images */}
                                        {/* <Image
                      src={type.imageUrl}
                      alt={type.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    /> */}

                                        {/* Placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <IconComponent className="w-16 h-16 text-primary/30" />
                                        </div>

                                        {/* Optional Badge */}
                                        {type.badge && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                                                    {type.badge}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Icon & Title */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-6 h-6 text-primary" strokeWidth={2} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                                                    {type.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                            {type.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-2 mb-6 flex-1">
                                            {type.features.map((feature, fIndex) => (
                                                <div key={fIndex} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                                    <span className="text-xs text-foreground">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price & Timeline */}
                                        <div className="flex items-center gap-4 pt-4 border-t border-border mb-4">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-bold text-foreground">
                                                    {type.priceRange}
                                                </span>
                                            </div>
                                            <div className="w-px h-4 bg-border" />
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-secondary" />
                                                <span className="text-sm font-semibold text-muted-foreground">
                                                    {type.timeline}
                                                </span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <Button
                                            variant="outline"
                                            className="w-full group/btn border-2"
                                            asChild
                                        >
                                            <a href="/contact" className="flex items-center justify-center gap-2">
                                                {t("websiteTypes.ctaButton")}
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-6">
                        {t("websiteTypes.bottomText")}
                    </p>
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="/contact" className="flex items-center gap-2">
                            {t("websiteTypes.bottomCta")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}