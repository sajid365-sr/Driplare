"use client";

import { motion } from "framer-motion";
import { Bot, Zap, TrendingUp, Clock, ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";


export function AIAgentHero() {
    const { t } = useTranslation("AIAgentPage");

    return (
        <section className="relative min-h-[90vh] bg-background flex items-center overflow-hidden pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Floating AI Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent to-secondary opacity-20 blur-xl"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                        >
                            <Bot className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary">
                                {t("Hero.badge")}
                            </span>
                        </motion.div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
                            {t("Hero.title.line1")}{" "}
                            <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                {t("Hero.title.line2")}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                            {t("Hero.subtitle")}
                        </p>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {(t("Hero.benefits", { returnObjects: true }) as Array<{
                                icon: string;
                                text: string;
                            }>).map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3"
                                >
                                    <span className="text-2xl">{benefit.icon}</span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {benefit.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                                asChild
                            >
                                <a href="#demo" className="flex items-center gap-2">
                                    {t("Hero.primaryCta")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 font-bold text-lg px-8 group"
                                asChild
                            >
                                <a href="#how-it-works" className="flex items-center gap-2">
                                    <Play className="w-5 h-5" />
                                    {t("Hero.secondaryCta")}
                                </a>
                            </Button>
                        </motion.div>

                        {/* Trust Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"
                                    />
                                ))}
                            </div>
                            <span className="font-medium">{t("Hero.trustBadge")}</span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Visual/Demo Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Main Visual Card */}
                        <div className="relative aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl border-2 border-border overflow-hidden shadow-2xl">
                            {/* 
                VISUAL RECOMMENDATION:
                - AI chatbot interface mockup
                - Chat bubbles showing conversation
                - Product images, order details
                - Animated typing indicator
                
                Placeholder for now - replace with actual illustration
              */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl"
                                >
                                    <Bot className="w-16 h-16 text-white" strokeWidth={2} />
                                </motion.div>
                            </div>

                            {/* Floating Stat Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute top-6 left-6 bg-card/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-accent" />
                                    <div>
                                        <div className="text-2xl font-black text-foreground">24/7</div>
                                        <div className="text-xs text-muted-foreground">
                                            {t("Hero.stats.available")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="absolute top-6 right-6 bg-card/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="text-2xl font-black text-foreground">&lt;1s</div>
                                        <div className="text-xs text-muted-foreground">
                                            {t("Hero.stats.response")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border rounded-2xl px-4 py-3 shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-secondary" />
                                    <div>
                                        <div className="text-2xl font-black text-foreground">3x</div>
                                        <div className="text-xs text-muted-foreground">
                                            {t("Hero.stats.sales")}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full opacity-20 blur-2xl" />
                        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 blur-2xl" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-sm text-muted-foreground font-medium">
                    {t("Hero.scrollText")}
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent"
                />
            </motion.div>
        </section>
    );
}