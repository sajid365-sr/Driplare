"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
    Bot, Zap, Globe, Star, Crown, Check, ArrowRight,
    ExternalLink, Calculator, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GridLayer, GlowBlob, DarkGridBoost, BRAND } from "@/components/effects/bg-effects";

// ─── shared tier card ─────────────────────────────────────────────────────────
type TierCardProps = {
    name: string;
    badge?: string | null;
    price: string;
    priceNote: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
    index: number;
};

function TierCard({
    name, badge, price, priceNote, description,
    features, cta, highlighted, index,
}: TierCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="relative flex flex-col h-full"
        >
            {highlighted && (
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent opacity-70 -z-10 blur-[2px]" />
            )}
            <div
                className={`
          flex flex-col flex-1 p-7 rounded-3xl border-2 h-full
          ${highlighted
                        ? "bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.06] border-primary/50 shadow-xl shadow-primary/10"
                        : "bg-card border-border hover:border-primary/30 transition-colors"}
        `}
            >
                {/* Badge */}
                {badge && (
                    <div className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/25 rounded-full px-3 py-1 mb-4 self-start">
                        <Star className="w-3 h-3 text-accent" />
                        <span className="text-xs font-black text-accent uppercase tracking-wide">{badge}</span>
                    </div>
                )}

                {/* Name + price */}
                <h3 className="text-xl font-black text-foreground mb-1">{name}</h3>
                <div className="mb-1">
                    <span className="text-3xl font-black text-primary">{price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{priceNote}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                    {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{f}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Button
                    size="lg"
                    className={`w-full font-bold group ${highlighted
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground border border-border"
                        }`}
                    asChild
                >
                    <Link href="/contact" className="flex items-center justify-center gap-2">
                        {cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </Button>
            </div>
        </motion.div>
    );
}

// ─── BD / International toggle ────────────────────────────────────────────────
function RegionToggle({
    isIntl, setIsIntl, labelBD, labelIntl,
}: { isIntl: boolean; setIsIntl: (v: boolean) => void; labelBD: string; labelIntl: string }) {
    return (
        <div className="flex items-center justify-center mb-10">
            <div className="inline-flex items-center bg-muted rounded-2xl p-1 border border-border">
                {[{ label: labelBD, val: false }, { label: labelIntl, val: true }].map(({ label, val }) => (
                    <button
                        key={String(val)}
                        onClick={() => setIsIntl(val)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${isIntl === val
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── main component ───────────────────────────────────────────────────────────
export function TabbedPricingSection() {
    const { t } = useTranslation("pricingPage");
    const [agentIntl, setAgentIntl] = useState(false);
    const [consultingIntl, setConsultingIntl] = useState(false);

    // ── AI Agents data ──
    type AgentTier = {
        name: string; badge?: string | null;
        priceBD: string; priceIntl: string;
        noteBD: string; noteIntl: string;
        description: string; features: string[]; cta: string; highlighted: boolean;
    };
    const agentTiers = t("aiAgents.tiers", { returnObjects: true }) as AgentTier[];

    // ── Automation data ──
    type AutoTier = {
        name: string; badge?: string | null; price: string; priceNote: string;
        description: string; features: string[]; cta: string; highlighted: boolean;
    };
    const autoTiers = t("automation.tiers", { returnObjects: true }) as AutoTier[];

    // ── Consulting data ──
    type ConsultTier = {
        name: string; badge?: string | null;
        priceBD: string; priceIntl: string;
        noteBD: string; noteIntl: string;
        description: string; features: string[]; cta: string; highlighted: boolean;
    };
    const consultTiers = t("consulting.tiers", { returnObjects: true }) as ConsultTier[];

    // ── Web Dev data ──
    type WebType = {
        name: string; badge?: string | null; price: string; priceIntl: string;
        timeline: string; features: string[];
    };
    const webTypes = t("webDev.types", { returnObjects: true }) as WebType[];

    // ── Marketplace data ──
    type MarketCat = {
        icon: string; name: string; items: string; priceFrom: string;
        highlight: string; cta: string; href: string;
    };
    const marketCats = t("marketplace.categories", { returnObjects: true }) as MarketCat[];

    const MARKET_ICONS: Record<string, React.ElementType> = { Bot, Zap, Globe };

    const TAB_KEYS = ["aiAgents", "automation", "consulting", "webDev", "marketplace"] as const;

    return (
        <section className="py-20 bg-background relative overflow-hidden" id="pricing-tabs">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.05} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.05} duration={20} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={450} opacity={0.04} duration={25} delay={5} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Tabs ── */}
                <Tabs defaultValue="aiAgents" className="max-w-7xl mx-auto">
                    <TabsList className="flex flex-wrap w-full max-w-2xl mx-auto gap-1 mb-14 bg-muted p-1.5 rounded-2xl h-auto">
                        {TAB_KEYS.map((key) => (
                            <TabsTrigger
                                key={key}
                                value={key}
                                className="flex-1 min-w-[80px] rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold text-sm py-2.5 transition-all"
                            >
                                {t(`tabs.${key}`)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* ══════════════════════ AI AGENTS TAB ══════════════════════ */}
                    <TabsContent value="aiAgents">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                                {t("aiAgents.description")}
                            </p>
                            <RegionToggle
                                isIntl={agentIntl} setIsIntl={setAgentIntl}
                                labelBD={t("aiAgents.toggleBD")} labelIntl={t("aiAgents.toggleIntl")}
                            />
                            <div className="grid md:grid-cols-3 gap-6">
                                {agentTiers.map((tier, i) => (
                                    <TierCard
                                        key={tier.name}
                                        index={i}
                                        name={tier.name}
                                        badge={tier.badge}
                                        price={agentIntl ? tier.priceIntl : tier.priceBD}
                                        priceNote={agentIntl ? tier.noteIntl : tier.noteBD}
                                        description={tier.description}
                                        features={tier.features}
                                        cta={tier.cta}
                                        highlighted={tier.highlighted}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* ══════════════════════ AUTOMATION TAB ══════════════════════ */}
                    <TabsContent value="automation">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-4">
                                {t("automation.description")}
                            </p>
                            <div className="flex justify-center mb-10">
                                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 text-xs text-amber-700 dark:text-amber-400 font-medium">
                                    {t("automation.note")}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {autoTiers.map((tier, i) => (
                                    <TierCard
                                        key={tier.name}
                                        index={i}
                                        name={tier.name}
                                        badge={tier.badge}
                                        price={tier.price}
                                        priceNote={tier.priceNote}
                                        description={tier.description}
                                        features={tier.features}
                                        cta={tier.cta}
                                        highlighted={tier.highlighted}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* ══════════════════════ CONSULTING TAB ══════════════════════ */}
                    <TabsContent value="consulting">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
                                {t("consulting.description")}
                            </p>
                            <RegionToggle
                                isIntl={consultingIntl} setIsIntl={setConsultingIntl}
                                labelBD={t("consulting.toggleBD")} labelIntl={t("consulting.toggleIntl")}
                            />
                            <div className="grid md:grid-cols-3 gap-6">
                                {consultTiers.map((tier, i) => (
                                    <TierCard
                                        key={tier.name}
                                        index={i}
                                        name={tier.name}
                                        badge={tier.badge}
                                        price={consultingIntl ? tier.priceIntl : tier.priceBD}
                                        priceNote={consultingIntl ? tier.noteIntl : tier.noteBD}
                                        description={tier.description}
                                        features={tier.features}
                                        cta={tier.cta}
                                        highlighted={tier.highlighted}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* ══════════════════════ WEB DEV TAB ══════════════════════ */}
                    <TabsContent value="webDev">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-4">
                                {t("webDev.description")}
                            </p>
                            <div className="flex justify-center mb-10">
                                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 text-xs text-amber-700 dark:text-amber-400 font-medium">
                                    {t("webDev.note")}
                                </div>
                            </div>

                            {/* Web type grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                                {webTypes.map((type, i) => (
                                    <motion.div
                                        key={type.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07, duration: 0.38 }}
                                        className="bg-card border border-border rounded-3xl p-5 hover:border-primary/30 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <div>
                                                {type.badge && (
                                                    <span className="text-[9px] font-black uppercase tracking-widest bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5 mb-1.5 inline-block">
                                                        {type.badge}
                                                    </span>
                                                )}
                                                <h3 className="text-sm font-black text-foreground">{type.name}</h3>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-base font-black text-primary">{type.price}</div>
                                                <div className="text-[10px] text-muted-foreground">{type.priceIntl}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
                                            <span>⏱</span>
                                            <span>{type.timeline}</span>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {type.features.map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-[11px] text-foreground/80">
                                                    <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Calculator CTA */}
                            <div className="text-center">
                                <Link
                                    href="/solutions/web-development#calculator"
                                    className="inline-flex items-center gap-2 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-secondary dark:text-secondary font-bold text-sm rounded-2xl px-6 py-3 transition-all group"
                                >
                                    <Calculator className="w-4 h-4" />
                                    {t("webDev.calculatorCta")}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </TabsContent>

                    {/* ══════════════════════ MARKETPLACE TAB ══════════════════════ */}
                    <TabsContent value="marketplace">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                                {t("marketplace.description")}
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
                                {marketCats.map((cat, i) => {
                                    const Icon = MARKET_ICONS[cat.icon] ?? Zap;
                                    return (
                                        <motion.div
                                            key={cat.name}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.4 }}
                                            className="bg-card border-2 border-border rounded-3xl p-7 hover:border-primary/40 hover:shadow-xl transition-all group flex flex-col gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-0.5">{cat.items}</p>
                                                <h3 className="text-xl font-black text-foreground">{cat.name}</h3>
                                                <div className="text-2xl font-black text-primary mt-1">{cat.priceFrom}</div>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cat.highlight}</p>
                                            <Link
                                                href={cat.href}
                                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm rounded-xl px-5 py-2.5 transition-all group/btn w-full justify-center"
                                            >
                                                {cat.cta}
                                                <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="text-center">
                                <Link
                                    href={t("marketplace.browseHref")}
                                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-sm transition-colors group"
                                >
                                    {t("marketplace.browseCta")}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}