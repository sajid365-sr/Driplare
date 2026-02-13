"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Clock, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function WebDevHero() {
    const { t } = useTranslation("webDevelopmentPage");

    const trustBadges = t("hero.trustBadges", {
        returnObjects: true,
    }) as Array<{ icon: string; text: string }>;

    // Icon mapping
    const iconMap: Record<string, any> = {
        CheckCircle2,
        Clock,
        DollarSign,
    };

    return (
        <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                        >
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                                {t("hero.badge")}
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
                            {t("hero.title")}
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                            {t("hero.subtitle")}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                                asChild
                            >
                                <a href="/contact" className="flex items-center gap-2">
                                    {t("hero.primaryCta")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 font-bold text-lg px-8"
                                asChild
                            >
                                <a href="#pricing-calculator">
                                    {t("hero.secondaryCta")}
                                </a>
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {trustBadges.map((badge, index) => {
                                const IconComponent = iconMap[badge.icon] || CheckCircle2;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-center gap-3 bg-card border border-border rounded-xl p-4"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <IconComponent className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-sm font-semibold text-foreground">
                                            {badge.text}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Visual - Website Mockups */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        {/* 
              IMAGE PLACEHOLDER 1: Main Website Mockup
              - Dimensions: 1200x800px (3:2 ratio)
              - Content: Browser mockup showing a modern website
              - Style: Floating with shadow, slight tilt
              - Examples: E-commerce homepage, corporate website, dashboard
              - Path: /images/web-dev/hero-mockup-main.png
            */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-card transform hover:scale-105 transition-transform duration-500">
                            {/* Browser Chrome */}
                            <div className="bg-card border-b border-border p-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex-1 bg-muted rounded px-3 py-1 text-xs text-muted-foreground">
                                    www.your-awesome-website.com
                                </div>
                            </div>

                            {/* Mockup Image */}
                            <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 aspect-[3/2] flex items-center justify-center">
                                {/* Replace this div with actual Image component */}
                                {/* <Image 
                  src="/images/web-dev/hero-mockup-main.png" 
                  alt="Website mockup"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                /> */}
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Zap className="w-10 h-10 text-primary" />
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium">
                                        [Main Website Mockup Preview]
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Browser window showing modern website design
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 
              IMAGE PLACEHOLDER 2: Floating Mobile Mockup (Optional)
              - Dimensions: 400x800px (1:2 ratio)
              - Content: Mobile screen showing responsive design
              - Style: Floating on bottom-right, smaller
              - Path: /images/web-dev/hero-mockup-mobile.png
            */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -bottom-8 -right-8 w-32 md:w-40 lg:w-48 hidden sm:block"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-card bg-card">
                                <div className="bg-gradient-to-br from-secondary/20 via-accent/20 to-primary/20 aspect-[1/2] flex items-center justify-center">
                                    {/* Replace with actual Image component */}
                                    {/* <Image 
                    src="/images/web-dev/hero-mockup-mobile.png" 
                    alt="Mobile mockup"
                    width={400}
                    height={800}
                    className="w-full h-full object-cover"
                  /> */}
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                                        </div>
                                        <p className="text-xs text-muted-foreground font-medium">
                                            [Mobile View]
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
            >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-xs font-medium">
                        {t("hero.scrollText")}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowRight className="w-4 h-4 rotate-90" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}