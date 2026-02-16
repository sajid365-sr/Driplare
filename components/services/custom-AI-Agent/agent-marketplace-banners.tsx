"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Clock, ShoppingBag } from "lucide-react";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";

// ─────────────────────────────────────────────────────────────────────────────
// BANNER 1 — Mid-page, after Features section
// Tone: Curious / helpful  •  Goal: catch the buyer who already knows they want it
// ─────────────────────────────────────────────────────────────────────────────
export function AgentMarketplaceBanner1() {
    return (
        <section className="relative overflow-hidden py-0">
            {/* Thin accent line top */}
            <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            <div className="relative bg-gradient-to-r from-violet-600/[0.07] via-violet-500/[0.05] to-blue-500/[0.07]
                      dark:from-violet-600/[0.10] dark:via-violet-500/[0.08] dark:to-blue-500/[0.10]
                      border-y border-violet-500/10 dark:border-violet-500/15 py-8">

                {/* Subtle bg grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                    <GridLayer color={BRAND.violet} opacity={0.06} cellSize={40} />
                </div>
                {/* Soft glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        {/* Left: icon + text */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                                <ShoppingBag className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-0.5">
                                    Ready-Made Agents
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                    Already know what you need?{" "}
                                    <span className="text-muted-foreground font-normal">
                                        Browse pre-built agents — deployed in 24 hours, no discovery call needed.
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Right: CTA */}
                        <Link
                            href="/marketplace?tab=agents"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700
                         text-white text-sm font-black rounded-xl px-5 py-2.5
                         shadow-md shadow-violet-500/20 hover:shadow-violet-500/30
                         transition-all group whitespace-nowrap"
                        >
                            Browse AI Agents
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Thin accent line bottom */}
            <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// BANNER 2 — Near bottom, before AIAgentFinalCTA
// Tone: Urgency / escape valve  •  Goal: convert visitors who want fast, not custom
// ─────────────────────────────────────────────────────────────────────────────
export function AgentMarketplaceBanner2() {
    const stats = [
        { icon: <Clock className="w-4 h-4" />, value: "24hrs", label: "delivery" },
        { icon: <Bot className="w-4 h-4" />, value: "6+", label: "ready agents" },
        { icon: <Zap className="w-4 h-4" />, value: "৳299+", label: "starting from" },
    ];

    return (
        <section className="relative overflow-hidden" style={{ isolation: "isolate" }}>
            {/* Bg effects layer */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <DarkGridBoost color={BRAND.violet} opacity={0.06} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={400} opacity={0.08} duration={18} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={350} opacity={0.06} duration={22} delay={4} />
            </div>

            <div className="relative z-10 bg-gradient-to-br from-violet-600/[0.10] to-blue-600/[0.08]
                      dark:from-violet-600/[0.16] dark:to-blue-600/[0.13]
                      border-y border-violet-500/15 dark:border-violet-500/20 py-14">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
                    >
                        {/* ── Left text block ── */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Eyebrow */}
                            <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/25 rounded-full px-3 py-1.5 mb-4">
                                <Zap className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                                <span className="text-xs font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                                    Skip the custom build
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">
                                Get a ready-made AI Agent{" "}
                                <span className="text-violet-600 dark:text-violet-400">live in 24 hours</span>
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Our Marketplace has pre-built agents for Facebook automation, WhatsApp order handling,
                                Google review replies, and more — tested, proven, and ready to deploy into your business today.
                            </p>

                            {/* Stats row */}
                            <div className="flex items-center gap-6 mt-5 justify-center lg:justify-start">
                                {stats.map(({ icon, value, label }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="text-violet-500 dark:text-violet-400">{icon}</span>
                                        <div>
                                            <div className="text-base font-black text-foreground leading-none">{value}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Right CTA block ── */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                            <Link
                                href="/marketplace?tab=agents"
                                className="inline-flex items-center gap-2.5
                           bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600
                           text-white font-black text-base rounded-2xl px-8 py-4
                           shadow-xl shadow-violet-500/25 hover:shadow-violet-500/35
                           transition-all group"
                            >
                                Browse Ready-Made Agents
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <p className="text-xs text-muted-foreground text-center max-w-[200px] leading-relaxed">
                                Or{" "}
                                <Link href="#cta" className="text-foreground font-semibold hover:text-violet-600 transition-colors">
                                    book a free call
                                </Link>{" "}
                                if you need something fully custom.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}