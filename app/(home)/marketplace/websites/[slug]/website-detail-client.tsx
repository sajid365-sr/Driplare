"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
    ArrowLeft, Star, CheckCircle2, Clock, ArrowRight,
    ChevronLeft, ChevronRight, ShieldCheck, Globe,
    Layers, Package, ExternalLink, CalendarDays, RotateCcw,
} from "lucide-react";
import { WebsiteProduct } from "@/types/marketplace-types";
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

function Gallery({ images }: { images: string[] }) {
    const [active, setActive] = useState(0);
    if (!images?.length) return null;
    return (
        <div className="space-y-3">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted dark:bg-white/[0.04]">
                <img src={images[active]} alt="" className="w-full h-full object-cover" />
                {images.length > 1 && (
                    <>
                        <button onClick={() => setActive(i => (i - 1 + images.length) % images.length)}
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

export function WebsiteDetailClient({ website }: { website: WebsiteProduct }) {
    const { i18n } = useTranslation();
    const locale = i18n.language?.startsWith("bn") ? "bn" : "en";
    const content = website[locale as "en" | "bn"] ?? website.en;
    const [modalOpen, setModalOpen] = useState(false);

    const guarantees = [
        "Mobile-responsive on all devices",
        "SEO-ready from day one",
        "Source code fully yours",
        "Post-launch support included",
    ];

    return (
        <div className="relative min-h-screen bg-background dark:bg-[#0a0a12]" style={{ isolation: "isolate" }}>
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <GridLayer color={BRAND.emerald} opacity={0.03} cellSize={52} />
                <DarkGridBoost color={BRAND.emerald} opacity={0.05} cellSize={52} />
                <GlowBlob color={BRAND.emerald} position="top-left" size={600} opacity={0.05} duration={22} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={450} opacity={0.04} duration={26} delay={5} />
                <Particles colors={[BRAND.emerald, BRAND.blue]} count={10} minOpacity={0.06} maxOpacity={0.22} speed={0.5} />
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
                {/* ── HERO ─────────────────────────────────────────────── */}
                <div className="relative bg-gradient-to-br from-emerald-600 to-teal-500 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none" aria-hidden>
                        <Globe className="w-64 h-64 text-white" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 pt-8 pb-12 relative z-10">
                        <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold mb-8 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            All Products
                        </Link>

                        <div className="flex flex-wrap items-start gap-3 mb-3">
                            <span className="text-xs font-black bg-white/15 text-white rounded-full px-3 py-1">{website.category}</span>
                            {website.deliveryDays && (
                                <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />{website.deliveryDays} day delivery
                                </span>
                            )}
                            {website.pages && (
                                <span className="text-xs font-semibold text-white/70">{website.pages} pages</span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">{content.name}</h1>
                        <p className="text-white/70 text-base max-w-xl leading-relaxed mb-4">{content.description}</p>

                        <div className="flex items-center gap-4">
                            <Stars rating={website.rating} />
                            <span className="text-white/60 text-sm">{website.rating.toFixed(1)}</span>
                            {website.demoUrl && (
                                <a href={website.demoUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-white/70 hover:text-white text-xs font-bold transition-colors">
                                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── CONTENT ──────────────────────────────────────────── */}
                <div className="container mx-auto px-4 md:px-6 py-10 max-w-6xl">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-8">

                        <div className="space-y-8">
                            {/* Gallery / main image */}
                            {website.gallery?.length > 0
                                ? <Gallery images={website.gallery} />
                                : website.mainImage && (
                                    <div className="aspect-video rounded-2xl overflow-hidden">
                                        <img src={website.mainImage} alt={content.name} className="w-full h-full object-cover" />
                                    </div>
                                )
                            }

                            {/* Full description */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                                className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                <h2 className="text-base font-black text-foreground mb-3 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-primary" />About This Package
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

                            {/* What you get */}
                            {content.deliverables?.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                    <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                        <Package className="w-4 h-4 text-primary" />What You Get
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {content.deliverables.map((d, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />{d}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Ideal for */}
                            {content.idealFor?.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                    <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" />Ideal For
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {content.idealFor.map((u, i) => (
                                            <span key={i} className="text-sm text-foreground font-medium bg-primary/8 dark:bg-primary/12 border border-primary/15 rounded-xl px-3 py-1.5">
                                                {u}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tech stack */}
                            {website.techStack?.length > 0 && (
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                    className="rounded-2xl bg-card/70 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-6">
                                    <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-primary" />Built With
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {website.techStack.map(t => (
                                            <span key={t} className="text-sm font-semibold bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.07] text-foreground px-3 py-1.5 rounded-lg">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Guarantees */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="rounded-2xl bg-gradient-to-br from-accent/8 to-emerald-500/5 dark:from-accent/12 dark:to-emerald-500/8 border border-accent/15 p-6">
                                <h2 className="text-base font-black text-foreground mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-accent" />Our Guarantee
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-2.5">
                                    {guarantees.map((g, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />{g}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Sidebar ───────────────────────────────────────── */}
                        <div className="space-y-4">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="sticky top-4 rounded-2xl bg-card/80 dark:bg-white/[0.04] border border-border dark:border-white/[0.09] overflow-hidden shadow-lg">
                                <div className="p-5">
                                    <div className="flex items-end gap-1.5 mb-0.5">
                                        <span className="text-3xl font-black text-foreground">৳{website.price.toLocaleString()}</span>
                                        {website.priceLabel && <span className="text-sm text-muted-foreground mb-1">{website.priceLabel}</span>}
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{content.description}</p>

                                    <Button onClick={() => setModalOpen(true)}
                                        className="w-full bg-primary hover:bg-primary/90 font-black text-white shadow-lg shadow-primary/20 h-11 group mb-3">
                                        Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>

                                    {website.demoUrl && (
                                        <a href={website.demoUrl} target="_blank" rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 border border-border dark:border-white/[0.10] rounded-xl h-10 text-sm font-bold text-foreground hover:bg-muted/50 transition-colors mb-4">
                                            <ExternalLink className="w-4 h-4" /> View Live Demo
                                        </a>
                                    )}

                                    <div className="space-y-2.5 pt-4 border-t border-border dark:border-white/[0.07]">
                                        {[
                                            { label: "Category", value: website.category, icon: <Globe className="w-3.5 h-3.5" /> },
                                            { label: "Delivery", value: website.deliveryDays ? `${website.deliveryDays} days` : null, icon: <CalendarDays className="w-3.5 h-3.5" /> },
                                            { label: "Pages", value: website.pages ? `${website.pages} pages` : null, icon: null },
                                            { label: "Revisions", value: website.revisions ? `${website.revisions} rounds` : null, icon: <RotateCcw className="w-3.5 h-3.5" /> },
                                            { label: "Support", value: website.support, icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                                        ].filter(r => r.value).map(({ label, value }) => (
                                            <div key={label} className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">{label}</span>
                                                <span className="font-bold text-foreground">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                                className="rounded-2xl bg-card/60 dark:bg-white/[0.03] border border-border dark:border-white/[0.07] p-5">
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Need custom web work?</p>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    We also build fully custom websites, web apps, and SaaS products.
                                </p>
                                <Link href="/solutions/web-development"
                                    className="flex items-center gap-1.5 text-xs font-black text-primary hover:gap-2.5 transition-all">
                                    <Package className="w-3.5 h-3.5" />View Web Dev Services
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
                productId={(website as any).id ?? ""}
                productSlug={website.slug}
                productType="website"
                productName={content.name}
                price={website.price}
            />
        </div>
    );
}