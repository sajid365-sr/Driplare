"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
    Search, Bot, Zap, Globe, Star, Clock, ArrowRight,
    SlidersHorizontal, ChevronDown, Package, Filter,
    CheckCircle2, ShoppingBag, ExternalLink,
} from "lucide-react";
import { Agent, AutomationProduct, WebsiteProduct, DIFFICULTY_META, ProcessedAgent } from "@/types/marketplace-types";
import { GridLayer, DarkGridBoost, GlowBlob, Particles, BRAND } from "@/components/effects/bg-effects";

// ─── Category accent config ───────────────────────────────────────────────────
const SECTION_META = {
    agents: {
        icon: Bot,
        label: "AI Agents",
        accent: BRAND.violet,
        gradient: "from-violet-600 to-blue-500",
        chipBg: "bg-violet-500/10 border-violet-500/20 text-violet-500 dark:text-violet-400",
        border: "border-l-violet-500",
        href: (slug: string) => `/marketplace/agents/${slug}`,
    },
    automations: {
        icon: Zap,
        label: "Workflow Automations",
        accent: BRAND.blue,
        gradient: "from-blue-600 to-cyan-500",
        chipBg: "bg-blue-500/10 border-blue-500/20 text-blue-500 dark:text-blue-400",
        border: "border-l-blue-500",
        href: (slug: string) => `/marketplace/automations/${slug}`,
    },
    websites: {
        icon: Globe,
        label: "Website Packages",
        accent: BRAND.emerald,
        gradient: "from-emerald-600 to-teal-500",
        chipBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:text-emerald-400",
        border: "border-l-emerald-500",
        href: (slug: string) => `/marketplace/websites/${slug}`,
    },
};

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
            ))}
        </div>
    );
}

// ─── Unified Product Card ─────────────────────────────────────────────────────
interface ProductCardProps {
    index: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    priceLabel?: string;
    rating: number;
    totalSales: number;
    mainImage: string;
    techStack: string[];
    difficulty?: "Easy" | "Medium" | "Advanced";
    setupTime?: string;
    deliveryDays?: number;
    features: string[];
    category: string;
    badge?: string;
    type: "agents" | "automations" | "websites";
    locale: "en" | "bn";
}

function ProductCard(p: ProductCardProps) {
    const meta = SECTION_META[p.type];
    const diff = p.difficulty ? DIFFICULTY_META[p.difficulty] : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: p.index * 0.07 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl
                  bg-card/80 dark:bg-white/[0.035]
                  border border-border dark:border-white/[0.07]
                  border-l-4 ${meta.border}
                  hover:border-primary/30 dark:hover:border-primary/20
                  hover:shadow-xl hover:shadow-black/8
                  transition-all duration-300`}
        >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-primary/4 to-transparent dark:from-primary/7 pointer-events-none" />

            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted dark:bg-white/[0.04]">
                <img
                    src={p.mainImage}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-background/90 dark:bg-[#0a0a12]/90 backdrop-blur-sm border border-border dark:border-white/[0.10] rounded-xl px-3 py-1.5">
                    <span className="text-sm font-black text-foreground">৳{p.price.toLocaleString()}</span>
                    {p.priceLabel && <span className="text-[10px] text-muted-foreground ml-1">{p.priceLabel}</span>}
                </div>
                {/* Category chip */}
                <div className={`absolute top-3 left-3 text-[10px] font-black border rounded-full px-2.5 py-1 backdrop-blur-sm ${meta.chipBg}`}>
                    {p.category}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 px-5 py-4 gap-3">
                {/* Name + description */}
                <div>
                    <h3 className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-1">
                        {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Stars rating={p.rating} />
                        <span className="text-[10px] text-muted-foreground ml-0.5">{p.rating.toFixed(1)}</span>
                    </div>
                    {p.totalSales > 0 && (
                        <span className="text-[10px] text-muted-foreground">{p.totalSales} sold</span>
                    )}
                    {diff && (
                        <span className={`text-[10px] font-bold border rounded-full px-2 py-0.5 ${diff.bg} ${diff.color}`}>
                            {diff.label}
                        </span>
                    )}
                    {(p.setupTime ?? p.deliveryDays) && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {p.setupTime ?? `${p.deliveryDays}d delivery`}
                        </span>
                    )}
                </div>

                {/* Top 3 features */}
                <ul className="space-y-1">
                    {p.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{f}</span>
                        </li>
                    ))}
                </ul>

                {/* Tech stack */}
                {p.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                        {p.techStack.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] font-semibold bg-muted/60 dark:bg-white/[0.04] border border-border dark:border-white/[0.06] text-muted-foreground px-2 py-0.5 rounded-md">
                                {t}
                            </span>
                        ))}
                        {p.techStack.length > 3 && <span className="text-[10px] text-muted-foreground self-center">+{p.techStack.length - 3}</span>}
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-auto pt-3 border-t border-border dark:border-white/[0.06] flex items-center justify-between">
                    <span className="text-base font-black text-foreground">৳{p.price.toLocaleString()}</span>
                    <Link
                        href={meta.href(p.slug)}
                        className="flex items-center gap-1.5 text-xs font-black text-primary hover:gap-2.5 transition-all group/link"
                    >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ type, count }: { type: keyof typeof SECTION_META; count: number }) {
    const meta = SECTION_META[type];
    const Icon = meta.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6"
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">{meta.label}</h2>
                    <p className="text-xs text-muted-foreground">{count} product{count !== 1 ? "s" : ""} available</p>
                </div>
            </div>
            <div
                className="h-px flex-1 mx-6 opacity-20"
                style={{ background: `linear-gradient(to right, ${meta.accent}, transparent)` }}
            />
        </motion.div>
    );
}

// ─── MAIN CLIENT COMPONENT ────────────────────────────────────────────────────
interface Props {
    agents: ProcessedAgent[];
    automations: AutomationProduct[];
    websites: WebsiteProduct[];
}

type TabType = "all" | "agents" | "automations" | "websites";

export function MarketplaceClient({ agents, automations, websites }: Props) {
    const { i18n } = useTranslation();
    const locale = i18n.language?.startsWith("bn") ? "bn" : "en";

    const [search, setSearch] = useState("");
    const [tab, setTab] = useState<TabType>("all");
    const [maxPrice, setMaxPrice] = useState<number>(999999);
    const [showFilter, setShowFilter] = useState(false);

    const PRICE_OPTIONS = [
        { label: "All prices", value: 999999 },
        { label: "Under ৳500", value: 500 },
        { label: "Under ৳2,000", value: 2000 },
        { label: "Under ৳5,000", value: 5000 },
        { label: "Under ৳15,000", value: 15000 },
    ];

    // Helper: normalise any product into card props
    function agentToCard(a: Agent, i: number): ProductCardProps {
        const c = (a as any)[locale] ?? (a as any).en;
        return {
            index: i, slug: a.slug, name: c.name, description: c.description,
            price: a.price, rating: a.rating, totalSales: a.totalSales,
            mainImage: a.mainImage, techStack: a.techStack,
            difficulty: a.difficulty as any, setupTime: a.setupTime,
            features: c.features, category: a.category, type: "agents", locale: locale as any
        };
    }
    function automationToCard(a: AutomationProduct, i: number): ProductCardProps {
        const c = a[locale as "en" | "bn"] ?? a.en;
        return {
            index: i, slug: a.slug, name: c.name, description: c.description,
            price: a.price, priceLabel: a.priceLabel, rating: a.rating, totalSales: a.totalSales,
            mainImage: a.mainImage, techStack: a.techStack,
            difficulty: a.difficulty as any, setupTime: a.setupTime,
            features: c.features, category: a.category, type: "automations", locale: locale as any
        };
    }
    function websiteToCard(a: WebsiteProduct, i: number): ProductCardProps {
        const c = a[locale as "en" | "bn"] ?? a.en;
        return {
            index: i, slug: a.slug, name: c.name, description: c.description,
            price: a.price, priceLabel: a.priceLabel, rating: a.rating, totalSales: a.totalSales,
            mainImage: a.mainImage, techStack: a.techStack,
            deliveryDays: a.deliveryDays,
            features: c.features, category: a.category, type: "websites", locale: locale as any
        };
    }

    const filteredAgents = useMemo(() =>
        agents.filter(a => {
            const c = (a as any)[locale] ?? (a as any).en;
            return a.price <= maxPrice &&
                (search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));
        }), [agents, search, maxPrice, locale]);

    const filteredAutomations = useMemo(() =>
        automations.filter(a => {
            const c = a[locale as "en" | "bn"] ?? a.en;
            return a.price <= maxPrice &&
                (search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));
        }), [automations, search, maxPrice, locale]);

    const filteredWebsites = useMemo(() =>
        websites.filter(a => {
            const c = a[locale as "en" | "bn"] ?? a.en;
            return a.price <= maxPrice &&
                (search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));
        }), [websites, search, maxPrice, locale]);

    const totalCount = filteredAgents.length + filteredAutomations.length + filteredWebsites.length;

    const TABS: { id: TabType; label: string; icon: any; count: number }[] = [
        { id: "all", label: "All Products", icon: ShoppingBag, count: agents.length + automations.length + websites.length },
        { id: "agents", label: "AI Agents", icon: Bot, count: agents.length },
        { id: "automations", label: "Automations", icon: Zap, count: automations.length },
        { id: "websites", label: "Websites", icon: Globe, count: websites.length },
    ];

    return (
        <div className="relative min-h-screen bg-background dark:bg-[#0a0a12]" style={{ isolation: "isolate" }}>
            {/* Page background */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <GridLayer color={BRAND.violet} opacity={0.03} cellSize={52} />
                <DarkGridBoost color={BRAND.violet} opacity={0.05} cellSize={52} />
                <GlowBlob color={BRAND.violet} position="top-left" size={600} opacity={0.055} duration={20} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={500} opacity={0.045} duration={25} delay={5} />
                <GlowBlob color={BRAND.emerald} position="center" size={350} opacity={0.025} animate={false} />
                <Particles colors={[BRAND.violet, BRAND.blue, BRAND.emerald]} count={14} minOpacity={0.07} maxOpacity={0.28} speed={0.6} />
            </div>

            <div className="relative" style={{ zIndex: 1 }}>

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <section className="pt-24 pb-12 px-4 md:px-6">
                    <div className="container mx-auto max-w-5xl">
                        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/15 border border-primary/20 rounded-full px-4 py-2 mb-5">
                                <Package className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold text-primary">Ready-Made Products</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
                                Deploy AI in{" "}
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    Minutes, Not Months
                                </span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                                Pick a ready-made AI agent, automation workflow, or website package. Get set up today — no technical knowledge required.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                            className="flex flex-wrap justify-center gap-6 mb-10">
                            {[
                                { label: "AI Agents", value: agents.length, icon: Bot, color: "text-violet-500" },
                                { label: "Automations", value: automations.length, icon: Zap, color: "text-blue-500" },
                                { label: "Website Pkgs", value: websites.length, icon: Globe, color: "text-emerald-500" },
                            ].map(s => {
                                const Icon = s.icon; return (
                                    <div key={s.label} className="text-center">
                                        <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                                        <div className="text-xs text-muted-foreground font-medium flex items-center gap-1 justify-center">
                                            <Icon className="w-3 h-3" />{s.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* Search + Filter bar */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="flex gap-3 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search products, categories..."
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card/80 dark:bg-white/[0.04] border border-border dark:border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors shadow-sm"
                                />
                            </div>
                            {/* Price filter */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card/80 dark:bg-white/[0.04] border border-border dark:border-white/[0.08] text-sm font-semibold text-foreground hover:border-primary/30 transition-colors shadow-sm"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <span className="hidden sm:block">Price</span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilter ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {showFilter && (
                                        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                                            className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-card dark:bg-[#0f0f1a] border border-border dark:border-white/[0.09] shadow-xl z-20 overflow-hidden p-1">
                                            {PRICE_OPTIONS.map(o => (
                                                <button key={o.value} onClick={() => { setMaxPrice(o.value); setShowFilter(false); }}
                                                    className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${maxPrice === o.value ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted/50"}`}>
                                                    {o.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Tab filters */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                            className="flex flex-wrap gap-2">
                            {TABS.map(t => {
                                const Icon = t.icon; return (
                                    <button key={t.id} onClick={() => setTab(t.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all
                    ${tab === t.id
                                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                                : "bg-card/60 dark:bg-white/[0.04] border border-border dark:border-white/[0.07] text-muted-foreground hover:text-foreground hover:bg-card"}`}>
                                        <Icon className="w-3.5 h-3.5" />
                                        {t.label}
                                        <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-black ${tab === t.id ? "bg-white/20 text-white" : "bg-muted dark:bg-white/[0.08] text-muted-foreground"}`}>
                                            {t.count}
                                        </span>
                                    </button>
                                );
                            })}
                            {/* Result count */}
                            {(search || maxPrice < 999999) && (
                                <span className="self-center text-xs text-muted-foreground ml-auto">{totalCount} result{totalCount !== 1 ? "s" : ""}</span>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* ── PRODUCT SECTIONS ─────────────────────────────────────── */}
                <div className="container mx-auto max-w-5xl px-4 md:px-6 pb-24 space-y-16">

                    {/* AI Agents */}
                    {(tab === "all" || tab === "agents") && filteredAgents.length > 0 && (
                        <section>
                            <SectionHeader type="agents" count={filteredAgents.length} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {filteredAgents.map((a, i) => (
                                    <ProductCard key={a.id ?? a.slug} {...agentToCard(a, i)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Automations */}
                    {(tab === "all" || tab === "automations") && filteredAutomations.length > 0 && (
                        <section>
                            <SectionHeader type="automations" count={filteredAutomations.length} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {filteredAutomations.map((a, i) => (
                                    <ProductCard key={a.id ?? a.slug} {...automationToCard(a, i)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Websites */}
                    {(tab === "all" || tab === "websites") && filteredWebsites.length > 0 && (
                        <section>
                            <SectionHeader type="websites" count={filteredWebsites.length} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {filteredWebsites.map((a, i) => (
                                    <ProductCard key={a.id ?? a.slug} {...websiteToCard(a, i)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Empty state */}
                    {totalCount === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-muted/60 dark:bg-white/[0.04] flex items-center justify-center mb-4">
                                <Search className="w-7 h-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-1.5">No products found</h3>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                Try a different search term or adjust your price filter.
                            </p>
                            <button onClick={() => { setSearch(""); setMaxPrice(999999); }}
                                className="mt-4 text-sm font-bold text-primary hover:underline">
                                Clear filters
                            </button>
                        </motion.div>
                    )}

                    {/* Bottom CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="rounded-3xl bg-gradient-to-br from-primary/8 to-accent/8 dark:from-primary/12 dark:to-accent/12
                       border border-primary/15 dark:border-primary/12 p-8 text-center">
                        <p className="text-lg font-black text-foreground mb-2">Don't see what you need?</p>
                        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                            We build custom AI agents, automations, and websites too. Book a free discovery call and tell us what you need.
                        </p>
                        <Link href="/contact"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md shadow-primary/20 transition-colors group">
                            Book Free Discovery Call
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}