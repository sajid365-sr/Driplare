"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
    ArrowLeft, Star, CheckCircle2, Clock, Zap, Play,
    ChevronLeft, ChevronRight, ArrowRight, ShieldCheck,
    Workflow, Layers, Package, GitFork,
} from "lucide-react";
import { AutomationProduct } from "@/types/marketplace-types";
import { DIFFICULTY_META } from "@/types/marketplace-types";
import { GetStartedModal } from "@/components/agent-marketplace/get-started-modal";
import { GridLayer, DarkGridBoost, GlowBlob, Particles, BRAND } from "@/components/effects/bg-effects";
import { Button } from "@/components/ui/button";

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
            ))}
        </div>
    );
}

function ytId(url?: string) {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

function Gallery({ images }: { images: string[] }) {
    const [active, setActive] = useState(0);
    if (!images?.length) return null;
    return (
        <div className="space-y-3">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted dark:bg-white/[0.04]">
                <img src={images[active]} alt="" className="w-full h-full object-cover" />
                {images.length > 1 && (
                    <>
                        <button title="button" onClick={() => setActive(i => (i - 1 + images.length) % images.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => setActive(i => (i + 1) % images.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div className="flex gap-2">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setActive(i)}
                            className={`flex-1 aspect-video rounded-xl overflow-hidden border-2 transition-colors ${i === active ? "border-primary" : "border-transparent"}`}>
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function AutomationDetailClient({ automation }: { automation: AutomationProduct }) {
    const { i18n } = useTranslation();
    const locale = i18n.language?.startsWith("bn") ? "bn" : "en";
    const content = automation[locale as "en" | "bn"] ?? automation.en;
    const [modalOpen, setModalOpen] = useState(false);
    const diff = automation.difficulty ? DIFFICULTY_META[automation.difficulty] : null;
    const videoId = ytId(automation.videoUrl);

    const guarantees = [
        "Full setup walkthrough provided",
        "Works on your Make.com / n8n account",
        "7-day free support after delivery",
        "Tested on live accounts before handover",
    ];

    return (
        <div className="relative min-h-screen bg-background dark:bg-[#0a0a12]" style={{ isolation: "isolate" }}>
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <GridLayer color={BRAND.blue} opacity={0.03} cellSize={52} />
                <DarkGridBoost color={BRAND.blue} opacity={0.05} cellSize={52} />
                <GlowBlob color={BRAND.blue} position="top-left" size={600} opacity={0.055} duration={22} />
                <GlowBlob color={BRAND.violet} position="bottom-right" size={450} opacity={0.04} duration={26} delay={5} />
                <Particles colors={[BRAND.blue, BRAND.violet]} count={10} minOpacity={0.06} maxOpacity={0.22} speed={0.5} />
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
                {/* ── HERO ─────────────────────────────────────────────── */}
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none" aria-hidden>
                        <Zap className="w-64 h-64 text-white" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 pt-24 pb-12 relative z-10">
                        <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold mb-8 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            All Products
                        </Link>

                        <div className="flex flex-wrap items-start gap-3 mb-3">
                            <span className="text-xs font-black bg-white/15 text-white rounded-full px-3 py-1">{automation.category}</span>
                            {diff && <span className={`text-xs font-black border rounded-full px-3 py-1 backdrop-blur-sm ${diff.bg} ${diff.color}`}>{diff.label}</span>}
                            {automation.setupTime && (
                                <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />{automation.setupTime}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">{content.name}</h1>
                        <p className="text-white/70 text-base max-w-xl leading-relaxed mb-4">{content.description}</p>

                        <div className="flex items-center gap-4">
                            <Stars rating={automation.rating} />
                            <span className="text-white/60 text-sm">{automation.rating.toFixed(1)}</span>
                            {/* Platform pills */}
                            {automation.platform?.slice(0, 3).map(p => (
                                <span key={p} className="text-[11px] font-bold bg-white/15 text-white rounded-full px-2.5 py-1">{p}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── CONTENT ──────────────────────────────────────────── */}
                <div className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-8">

                        <div className="space-y-8">
                            {/* Gallery */}
                            {automation.gallery?.length > 0 && <Gallery images={automation.gallery} />}

                            {/* Main image if no gallery */}
                            {!automation.gallery?.length && automation.mainImage && (
                                <div className="aspect-video rounded-2xl overflow-hidden">
                                    <img src={automation.mainImage} alt={content.name} className="w-full h-full object-cover" />
                                </div>
                            )}

                            {/* Full description */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                                className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                <h2 className="text-base font-black text-foreground mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" />What This Automation Does
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">{content.fullDescription}</p>
                            </motion.div>

                            {/* Features */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />Features
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-2.5">
                                    {content.features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 dark:bg-white/[0.03] border border-border dark:border-white/[0.05]">
                                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-foreground font-medium">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* How it works */}
                            {content.howItWorks && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                    <h2 className="text-base font-black text-foreground mb-3 flex items-center gap-2">
                                        <GitFork className="w-4 h-4 text-primary" />How It Works
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{content.howItWorks}</p>
                                </motion.div>
                            )}

                            {/* Use Cases */}
                            {content.useCases?.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                    <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                        <Workflow className="w-4 h-4 text-primary" />Perfect For
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {content.useCases.map((u, i) => (
                                            <span key={i} className="text-sm text-foreground font-medium bg-primary/8 dark:bg-primary/12 border border-primary/15 rounded-xl px-3 py-1.5">
                                                {u}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tech Stack */}
                            {automation.techStack?.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                    <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-primary" />Built With
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {automation.techStack.map(t => (
                                            <span key={t} className="text-sm font-semibold bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.07] text-foreground px-3 py-1.5 rounded-lg">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Demo Video */}
                            {videoId && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                    className="rounded-2xl overflow-hidden border border-border dark:border-white/[0.07]">
                                    <div className="bg-card/70 dark:bg-white/[0.03] px-6 py-4 flex items-center gap-2">
                                        <Play className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-black text-foreground">Demo Video</span>
                                    </div>
                                    <div className="aspect-video">
                                        <iframe src={`https://www.youtube.com/embed/${videoId}`} className="w-full h-full" allowFullScreen title={`${content.name} demo`} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Workflow diagram */}
                            {automation.diagramUrl && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                                    className="rounded-2xl overflow-hidden border border-border dark:border-white/[0.07] bg-card/70 dark:bg-white/[0.03]">
                                    <div className="px-6 py-4 flex items-center gap-2 border-b border-border dark:border-white/[0.07]">
                                        <GitFork className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-black text-foreground">Workflow Diagram</span>
                                    </div>
                                    <img src={automation.diagramUrl} alt="Workflow diagram" className="w-full" />
                                </motion.div>
                            )}

                            {/* Guarantees */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                className="rounded-2xl bg-gradient-to-br from-accent/8 to-emerald-500/5 dark:from-accent/12 dark:to-emerald-500/8 border border-accent/15 p-6">
                                <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-accent" />Our Guarantee
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-2.5">
                                    {guarantees.map((g, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                            {g}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── RIGHT Sidebar ─────────────────────────────────── */}
                        <div className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="rounded-2xl bg-card/80 dark:bg-white/[0.04] border border-border dark:border-white/[0.09] overflow-hidden shadow-lg">
                                <div className="p-5">
                                    <div className="flex items-end gap-1.5 mb-0.5">
                                        <span className="text-3xl font-black text-foreground">৳{automation.price.toLocaleString()}</span>
                                        {automation.priceLabel && <span className="text-sm text-muted-foreground mb-1">{automation.priceLabel}</span>}
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{content.description}</p>

                                    <Button onClick={() => setModalOpen(true)}
                                        className="w-full bg-primary hover:bg-primary/90 font-black text-white shadow-lg shadow-primary/20 h-11 group mb-3">
                                        Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>

                                    <div className="space-y-2.5 pt-4 border-t border-border dark:border-white/[0.07]">
                                        {[
                                            { label: "Category", value: automation.category },
                                            { label: "Difficulty", value: automation.difficulty },
                                            { label: "Setup Time", value: automation.setupTime },
                                            { label: "Platforms", value: automation.platform?.join(", ") },
                                        ].filter(r => r.value).map(({ label, value }) => (
                                            <div key={label} className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">{label}</span>
                                                <span className="font-bold text-foreground text-right max-w-[55%]">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                                className="rounded-2xl bg-card/60 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-5">
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Need custom automation?</p>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    We build fully custom workflows tailored to your exact process.
                                </p>
                                <Link href="/solutions/workflow-automation"
                                    className="flex items-center gap-1.5 text-xs font-black text-primary hover:gap-2.5 transition-all">
                                    <Package className="w-3.5 h-3.5" />View Custom Automation
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <GetStartedModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                productId={(automation as any).id ?? ""}
                productSlug={automation.slug}
                productType="automation"
                productName={content.name}
                price={automation.price}
            />
        </div>
    );
}