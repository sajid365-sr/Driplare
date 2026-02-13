"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const TOOL_LOGOS = [
    { name: "n8n", logoUrl: "/images/automation/tools/n8n.svg" },
    { name: "Make", logoUrl: "/images/automation/tools/make.svg" },
    { name: "WhatsApp", logoUrl: "/images/automation/tools/whatsapp.svg" },
    { name: "Zapier", logoUrl: "/images/automation/tools/zapier.svg" },
    { name: "OpenAI", logoUrl: "/images/automation/tools/openai.svg" },
    { name: "Sheets", logoUrl: "/images/automation/tools/sheets.svg" },
    { name: "Slack", logoUrl: "/images/automation/tools/slack.svg" },
    { name: "Notion", logoUrl: "/images/automation/tools/notion.svg" },
];

// Animated flow nodes shown in the hero visual
const FLOW_NODES = [
    { label: "New Lead", color: "from-primary to-primary/80", delay: 0 },
    { label: "Send Email", color: "from-secondary to-secondary/80", delay: 0.4 },
    { label: "Update CRM", color: "from-accent to-accent/80", delay: 0.8 },
    { label: "Notify Slack", color: "from-primary to-secondary", delay: 1.2 },
];

export function AutomationHero() {
    const { t } = useTranslation("workflowAutomationPage");

    const audiences = t("hero.audiences", { returnObjects: true }) as Array<{
        icon: string;
        label: string;
    }>;

    return (
        <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Grid background */}
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

            {/* Decorative blobs */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* ── Left: Copy ── */}
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

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
                        >
                            {t("hero.titleLine1")}{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {t("hero.titleHighlight")}
                            </span>{" "}
                            {t("hero.titleLine2")}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
                        >
                            {t("hero.subtitle")}
                        </motion.p>

                        {/* Audience pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-3 mb-10"
                        >
                            {audiences.map((a, i) => (
                                <div
                                    key={i}
                                    className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-semibold text-foreground"
                                >
                                    <span>{a.icon}</span>
                                    <span>{a.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mb-12"
                        >
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
                                className="border-2 font-bold text-lg px-8 group"
                                asChild
                            >
                                <a href="#what-we-automate" className="flex items-center gap-2">
                                    <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    {t("hero.secondaryCta")}
                                </a>
                            </Button>
                        </motion.div>

                        {/* Tool logos */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                                {t("hero.toolsLabel")}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {TOOL_LOGOS.map((tool, i) => (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.9 + i * 0.07 }}
                                        className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/40 hover:scale-110 transition-all"
                                        title={tool.name}
                                    >
                                        {/*
                      IMAGE PLACEHOLDER: Tool Logo
                      Dimensions: 24×24px SVG preferred
                      Path: tool.logoUrl
                      Source: https://svgl.app (search each tool name)
                      Format: SVG with transparent background
                    */}
                                        {/* <Image src={tool.logoUrl} alt={tool.name} width={24} height={24} className="object-contain" /> */}
                                        <span className="text-xs font-black text-primary">
                                            {tool.name.slice(0, 2).toUpperCase()}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Animated Flow Visual ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        {/*
              IMAGE / VIDEO PLACEHOLDER: Automation Flow Visual
              Option A — Animated GIF/Video (RECOMMENDED):
                Dimensions: 600×500px
                Content: Screen recording of a real n8n or Make workflow running
                  e.g., form submission → email sent → Google Sheet updated → Slack notified
                Path: /images/automation/hero-flow-demo.gif
                OR use a <video autoPlay loop muted playsInline> tag

              Option B — Static Illustration:
                Dimensions: 600×500px
                Content: Clean illustration of connected app icons with arrows/lines
                Style: Matches brand colors (violet, blue, emerald)
                Path: /images/automation/hero-flow-illustration.png
            */}

                        {/* Code-driven placeholder — replace with real image/video above */}
                        <div className="relative bg-card border-2 border-border rounded-3xl p-8 shadow-2xl">
                            {/* Pulsing top indicator */}
                            <div className="flex items-center gap-2 mb-6">
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-3 h-3 rounded-full bg-accent"
                                />
                                <span className="text-sm font-bold text-foreground">
                                    {t("hero.flowLabel")}
                                </span>
                            </div>

                            {/* Flow nodes */}
                            <div className="space-y-3">
                                {FLOW_NODES.map((node, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {/* Node */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 + node.delay, duration: 0.4 }}
                                            className={`flex-1 bg-gradient-to-r ${node.color} rounded-xl px-4 py-3 text-white font-bold text-sm`}
                                        >
                                            {node.label}
                                        </motion.div>

                                        {/* Animated checkmark */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1.3 + node.delay, type: "spring" }}
                                            className="w-8 h-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center flex-shrink-0"
                                        >
                                            <Zap className="w-4 h-4 text-accent" />
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* Connector line */}
                            <div className="absolute left-[2.85rem] top-[5.5rem] bottom-10 w-0.5 bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40 -z-10" />

                            {/* Bottom stat */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.6 }}
                                className="mt-6 pt-6 border-t border-border flex items-center justify-between"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-black text-primary">4</div>
                                    <div className="text-xs text-muted-foreground">
                                        {t("hero.flowStats.steps")}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-accent">0.3s</div>
                                    <div className="text-xs text-muted-foreground">
                                        {t("hero.flowStats.time")}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-secondary">24/7</div>
                                    <div className="text-xs text-muted-foreground">
                                        {t("hero.flowStats.runs")}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.8 }}
                            className="absolute -bottom-5 -left-5 bg-card border-2 border-accent/30 rounded-2xl px-4 py-3 shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-sm font-bold text-foreground">
                                    {t("hero.liveBadge")}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
            >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-xs font-medium">{t("hero.scrollText")}</span>
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