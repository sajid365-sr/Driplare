"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, ExternalLink } from "lucide-react";
import { GridLayer, BRAND } from "@/components/effects/bg-effects";

// ─── 5 best recipes: name, emoji, one-line hook, 3-step flow, tool pills ────
const RECIPES = [
    {
        emoji: "📦",
        title: "WhatsApp Order Confirmation",
        hook: "Every new order triggers an instant, personalised WhatsApp message to the customer.",
        steps: [
            "New order placed on WooCommerce / Shopify",
            "Order details extracted automatically",
            "Personalised WhatsApp message sent instantly",
        ],
        tools: ["WooCommerce", "WhatsApp API", "n8n"],
        category: "E-commerce",
        accent: "violet",
    },
    {
        emoji: "🎯",
        title: "Lead Capture → WhatsApp Follow-Up",
        hook: "Form submitted? The lead gets a WhatsApp reply in under 60 seconds and lands in your CRM.",
        steps: [
            "Lead submits Facebook Lead Ad or website form",
            "Lead saved to Google Sheets or CRM",
            "Personalised WhatsApp follow-up sent in < 60 s",
        ],
        tools: ["Facebook Ads", "WhatsApp API", "n8n", "Google Sheets"],
        category: "Leads",
        accent: "blue",
    },
    {
        emoji: "📱",
        title: "Auto Social Media Poster",
        hook: "Write once, publish everywhere — Facebook, Instagram, and LinkedIn on autopilot.",
        steps: [
            "Add content to a shared Google Sheet or Notion",
            "Automation formats it for each platform",
            "Posts published at scheduled times automatically",
        ],
        tools: ["Google Sheets", "Make", "Meta API", "LinkedIn API"],
        category: "Social Media",
        accent: "emerald",
    },
    {
        emoji: "📊",
        title: "Daily Sales Report on WhatsApp",
        hook: "Wake up to yesterday's full sales summary — delivered to your WhatsApp every morning.",
        steps: [
            "Scheduled trigger fires every morning at 9 AM",
            "Sales data pulled from WooCommerce or Sheets",
            "Formatted summary sent to your WhatsApp",
        ],
        tools: ["Google Sheets", "WhatsApp API", "n8n"],
        category: "Reporting",
        accent: "violet",
    },
    {
        emoji: "🛒",
        title: "Abandoned Cart Recovery",
        hook: "A 3-touch follow-up sequence over 48 hours — email first, then WhatsApp — to win back lost sales.",
        steps: [
            "Cart abandoned detected after 1 hour",
            "Email reminder sent with cart contents",
            "WhatsApp follow-up sent if no purchase after 24 h",
        ],
        tools: ["WooCommerce", "Gmail", "WhatsApp API", "n8n"],
        category: "E-commerce",
        accent: "blue",
    },
] as const;

const ACCENT_STYLES = {
    violet: {
        badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
        dot: "bg-violet-500",
        border: "hover:border-violet-400/40 dark:hover:border-violet-500/40",
        number: "text-violet-500 dark:text-violet-400",
        tool: "bg-violet-500/8 text-violet-700 dark:text-violet-300 border-violet-400/20",
    },
    blue: {
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        dot: "bg-blue-500",
        border: "hover:border-blue-400/40 dark:hover:border-blue-500/40",
        number: "text-blue-500 dark:text-blue-400",
        tool: "bg-blue-500/8 text-blue-700 dark:text-blue-300 border-blue-400/20",
    },
    emerald: {
        badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-500",
        border: "hover:border-emerald-400/40 dark:hover:border-emerald-500/40",
        number: "text-emerald-500 dark:text-emerald-400",
        tool: "bg-emerald-500/8 text-emerald-700 dark:text-emerald-300 border-emerald-400/20",
    },
} as const;

export function AutomationRecipesShowcase() {
    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            {/* Faint grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.35]">
                <GridLayer color={BRAND.blue} opacity={0.07} cellSize={44} />
            </div>
            {/* Soft top fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-14 max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-5">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-black text-primary uppercase tracking-widest">
                            What We Can Automate
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                        Popular Automation Examples
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        A snapshot of the workflows we build most often. Each one saves hours of manual work
                        and runs 24/7 without anyone touching it.
                    </p>
                </motion.div>

                {/* ── Recipe grid ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-6">
                    {RECIPES.map((recipe, i) => {
                        const s = ACCENT_STYLES[recipe.accent];
                        const isLast = i === RECIPES.length - 1;

                        return (
                            <motion.div
                                key={recipe.title}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                // Last card centred on lg when 5 items in 3-col grid
                                className={isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
                            >
                                <div
                                    className={`
                    h-full bg-card border border-border rounded-3xl p-6
                    transition-all duration-300 ${s.border}
                    hover:shadow-lg hover:-translate-y-0.5
                    flex flex-col gap-5
                  `}
                                >
                                    {/* Card header */}
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl leading-none mt-0.5 flex-shrink-0" aria-hidden>
                                            {recipe.emoji}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                <span className={`text-[10px] font-black uppercase tracking-widest border rounded-full px-2.5 py-0.5 ${s.badge}`}>
                                                    {recipe.category}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-black text-foreground leading-snug">
                                                {recipe.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* One-line hook */}
                                    <p className="text-sm text-muted-foreground leading-relaxed -mt-1">
                                        {recipe.hook}
                                    </p>

                                    {/* 3-step flow */}
                                    <div className="flex flex-col gap-2.5">
                                        {recipe.steps.map((step, si) => (
                                            <div key={si} className="flex items-start gap-2.5">
                                                <span className={`text-xs font-black mt-0.5 w-4 flex-shrink-0 ${s.number}`}>
                                                    {si + 1}.
                                                </span>
                                                <span className="text-xs text-foreground/80 leading-snug">{step}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tool pills */}
                                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border">
                                        {recipe.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className={`text-[10px] font-semibold border rounded-lg px-2 py-0.5 ${s.tool}`}
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Bottom CTA strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-accent/[0.06]
                          dark:from-primary/[0.10] dark:via-secondary/[0.07] dark:to-accent/[0.08]
                          border border-border rounded-3xl px-8 py-7 flex flex-col sm:flex-row
                          items-center justify-between gap-5 text-center sm:text-left">
                        <div>
                            <p className="text-sm font-black text-foreground mb-1">
                                Want something not on this list?
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                                These are just examples — we build fully custom automations for any workflow.
                                Browse ready-made packs or tell us what you need.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                            <Link
                                href="/marketplace?tab=automations"
                                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90
                           text-primary-foreground text-sm font-black rounded-xl px-5 py-2.5
                           shadow-md shadow-primary/20 transition-all group whitespace-nowrap"
                            >
                                Browse Marketplace
                                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 bg-background border border-border
                           hover:border-primary/40 text-foreground text-sm font-black
                           rounded-xl px-5 py-2.5 transition-all group whitespace-nowrap"
                            >
                                Request Custom
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}