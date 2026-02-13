"use client";

import { motion } from "framer-motion";
import { Puzzle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/*
  IMAGE PLACEHOLDERS — tool logos
  Source: https://svgl.app (search each tool name)
  Format: SVG preferred, 48×48px, transparent background
  Place at: /images/automation/tools/{filename}

  Required files:
  n8n.svg | make.svg | zapier.svg | openai.svg | whatsapp.svg |
  telegram.svg | slack.svg | discord.svg | gmail.svg | outlook.svg |
  sheets.svg | notion.svg | airtable.svg | facebook.svg |
  instagram.svg | linkedin.svg | twitter.svg | youtube.svg |
  shopify.svg | woocommerce.svg | wordpress.svg | vercel.svg |
  stripe.svg | webhook.svg
*/

type Tool = {
    name: string;
    logo: string;
    category: string;
};

const TOOLS: Tool[] = [
    // Automation Engines
    { name: "n8n", logo: "/images/automation/tools/n8n.svg", category: "engine" },
    { name: "Make", logo: "/images/automation/tools/make.svg", category: "engine" },
    { name: "Zapier", logo: "/images/automation/tools/zapier.svg", category: "engine" },
    // AI
    { name: "OpenAI", logo: "/images/automation/tools/openai.svg", category: "ai" },
    // Messaging
    { name: "WhatsApp", logo: "/images/automation/tools/whatsapp.svg", category: "messaging" },
    { name: "Telegram", logo: "/images/automation/tools/telegram.svg", category: "messaging" },
    { name: "Slack", logo: "/images/automation/tools/slack.svg", category: "messaging" },
    { name: "Discord", logo: "/images/automation/tools/discord.svg", category: "messaging" },
    // Email
    { name: "Gmail", logo: "/images/automation/tools/gmail.svg", category: "email" },
    { name: "Outlook", logo: "/images/automation/tools/outlook.svg", category: "email" },
    // Productivity
    { name: "Sheets", logo: "/images/automation/tools/sheets.svg", category: "data" },
    { name: "Notion", logo: "/images/automation/tools/notion.svg", category: "data" },
    { name: "Airtable", logo: "/images/automation/tools/airtable.svg", category: "data" },
    // Social
    { name: "Facebook", logo: "/images/automation/tools/facebook.svg", category: "social" },
    { name: "Instagram", logo: "/images/automation/tools/instagram.svg", category: "social" },
    { name: "LinkedIn", logo: "/images/automation/tools/linkedin.svg", category: "social" },
    { name: "X / Twitter", logo: "/images/automation/tools/twitter.svg", category: "social" },
    { name: "YouTube", logo: "/images/automation/tools/youtube.svg", category: "social" },
    // E-commerce
    { name: "Shopify", logo: "/images/automation/tools/shopify.svg", category: "ecom" },
    { name: "WooCommerce", logo: "/images/automation/tools/woocommerce.svg", category: "ecom" },
    { name: "WordPress", logo: "/images/automation/tools/wordpress.svg", category: "ecom" },
    // Dev / API
    { name: "Stripe", logo: "/images/automation/tools/stripe.svg", category: "api" },
    { name: "Webhooks", logo: "/images/automation/tools/webhook.svg", category: "api" },
    { name: "REST API", logo: "/images/automation/tools/vercel.svg", category: "api" },
];

// Marquee row split — top row slightly faster, bottom reversed
const ROW_A = TOOLS.slice(0, 12);
const ROW_B = TOOLS.slice(12);

function ToolLogo({ tool }: { tool: Tool }) {
    return (
        <div className="flex-shrink-0 group flex flex-col items-center gap-2 mx-3">
            <div className="w-14 h-14 rounded-2xl bg-card border-2 border-border group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 flex items-center justify-center transition-all duration-300">
                {/* Swap comment below with <Image> once logos are available */}
                {/*
          <Image
            src={tool.logo}
            alt={tool.name}
            width={32}
            height={32}
            className="object-contain"
          />
        */}
                <span className="text-xs font-black text-primary select-none">
                    {tool.name.slice(0, 2).toUpperCase()}
                </span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {tool.name}
            </span>
        </div>
    );
}

function MarqueeRow({
    tools,
    reverse = false,
    duration = 40,
}: {
    tools: Tool[];
    reverse?: boolean;
    duration?: number;
}) {
    // Duplicate for seamless loop
    const doubled = [...tools, ...tools];

    return (
        <div className="overflow-hidden w-full py-2">
            <motion.div
                className="flex"
                animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
            >
                {doubled.map((tool, i) => (
                    <ToolLogo key={`${tool.name}-${i}`} tool={tool} />
                ))}
            </motion.div>
        </div>
    );
}

export function ToolsIntegrationsSection() {
    const { t } = useTranslation("workflowAutomationPage");

    const stats = t("toolsIntegrations.stats", {
        returnObjects: true,
    }) as Array<{ value: string; label: string }>;

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

            {/* Side fade masks for marquee */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Puzzle className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">
                            {t("toolsIntegrations.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("toolsIntegrations.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        {t("toolsIntegrations.subtitle")}
                    </p>

                    {/* API tagline */}
                    <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-full px-5 py-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-bold text-foreground">
                            {t("toolsIntegrations.tagline")}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Marquee rows — full width, outside container */}
            <div className="space-y-4 mb-14">
                <MarqueeRow tools={ROW_A} duration={45} />
                <MarqueeRow tools={ROW_B} reverse duration={35} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center bg-card border-2 border-border rounded-2xl py-5 px-4"
                        >
                            <div className="text-2xl md:text-3xl font-black text-primary mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs font-semibold text-muted-foreground leading-snug">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-muted-foreground mb-6">
                        {t("toolsIntegrations.ctaText")}
                    </p>
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="/contact" className="flex items-center gap-2">
                            {t("toolsIntegrations.ctaButton")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}