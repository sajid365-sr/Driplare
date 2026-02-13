"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Clock, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const CATEGORY_COLORS: Record<string, string> = {
    ecommerce: "bg-primary/10 text-primary border-primary/20",
    social: "bg-secondary/10 text-secondary border-secondary/20",
    leads: "bg-accent/10 text-accent border-accent/20",
    inbox: "bg-primary/10 text-primary border-primary/20",
    reporting: "bg-secondary/10 text-secondary border-secondary/20",
    operations: "bg-accent/10 text-accent border-accent/20",
};

const DIFFICULTY_COLORS: Record<string, string> = {
    Starter: "bg-accent/10 text-accent border-accent/20",
    Intermediate: "bg-secondary/10 text-secondary border-secondary/20",
    Advanced: "bg-primary/10 text-primary border-primary/20",
    "সহজ": "bg-accent/10 text-accent border-accent/20",
    "মধ্যম": "bg-secondary/10 text-secondary border-secondary/20",
    "উন্নত": "bg-primary/10 text-primary border-primary/20",
};

export function AutomationRecipesSection() {
    const { t } = useTranslation("workflowAutomationPage");

    const recipes = t("recipes.items", {
        returnObjects: true,
    }) as Array<{
        emoji: string;
        title: string;
        description: string;
        steps: string[];
        tools: string[];
        time: string;
        category: string;
        categoryKey: string;
        difficulty: string;
        popular?: boolean;
    }>;

    const filters = t("recipes.filters", {
        returnObjects: true,
    }) as string[];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
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
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("recipes.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("recipes.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("recipes.subtitle")}
                    </p>
                </motion.div>

                {/* Recipe Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="group"
                        >
                            <div className="bg-card border-2 border-border rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all h-full flex flex-col">

                                {/* Card Top */}
                                <div className="p-6 flex-1">
                                    {/* Badges row */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_COLORS[recipe.categoryKey] ?? "bg-muted text-muted-foreground border-border"}`}>
                                            <Tag className="w-3 h-3 inline mr-1" />
                                            {recipe.category}
                                        </span>
                                        {recipe.popular && (
                                            <span className="text-xs font-bold bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full">
                                                🔥 {t("recipes.popularLabel")}
                                            </span>
                                        )}
                                    </div>

                                    {/* Emoji + Title */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <span className="text-3xl flex-shrink-0">{recipe.emoji}</span>
                                        <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors leading-snug">
                                            {recipe.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                        {recipe.description}
                                    </p>

                                    {/* Steps flow */}
                                    <div className="space-y-2 mb-5">
                                        {recipe.steps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                                                    {i < recipe.steps.length - 1 ? (
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                                                <span className="text-[10px] font-black text-primary">{i + 1}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                                                            <Zap className="w-3 h-3 text-accent" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className={`text-xs ${i === recipe.steps.length - 1 ? "text-accent font-bold" : "text-foreground"}`}>
                                                    {step}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tool badges */}
                                    <div className="flex flex-wrap gap-2">
                                        {recipe.tools.map((tool, i) => (
                                            <span
                                                key={i}
                                                className="text-xs font-semibold bg-muted border border-border text-muted-foreground px-2.5 py-1 rounded-lg"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                {recipe.time}
                                            </span>
                                        </div>
                                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${DIFFICULTY_COLORS[recipe.difficulty] ?? "bg-muted text-muted-foreground border-border"}`}>
                                            {recipe.difficulty}
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-2 font-bold text-xs h-8 group/btn"
                                        asChild
                                    >
                                        <a href="/contact" className="flex items-center gap-1.5">
                                            {t("recipes.getThisLabel")}
                                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-muted-foreground mb-6">
                        {t("recipes.bottomText")}
                    </p>
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="/contact" className="flex items-center gap-2">
                            {t("recipes.bottomCta")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}