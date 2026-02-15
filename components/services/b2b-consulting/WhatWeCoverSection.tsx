"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Settings, Megaphone, TrendingUp,
    HeadphonesIcon, PenTool, User, Sparkles, ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    Drawer, DrawerContent, DrawerHeader,
    DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer";
import { GridLayer } from "@/components/effects/bg-effects";

/* ─── Icon + gradient map ─── */
const AREA_META: Record<string, { icon: React.ElementType; gradient: string; glow: string }> = {
    operations: { icon: Settings, gradient: "from-[#7c3aed] to-[#3b82f6]", glow: "shadow-violet-500/20" },
    marketing: { icon: Megaphone, gradient: "from-[#3b82f6] to-[#10b981]", glow: "shadow-blue-500/20" },
    sales: { icon: TrendingUp, gradient: "from-[#10b981] to-[#7c3aed]", glow: "shadow-emerald-500/20" },
    support: { icon: HeadphonesIcon, gradient: "from-[#7c3aed] to-[#10b981]", glow: "shadow-violet-500/20" },
    content: { icon: PenTool, gradient: "from-[#3b82f6] to-[#7c3aed]", glow: "shadow-blue-500/20" },
    personal: { icon: User, gradient: "from-[#10b981] to-[#3b82f6]", glow: "shadow-emerald-500/20" },
};

/* ─── Animated background: floating particles ─── */
// function Particles() {
//     const [dots, setDots] = useState<Array<{ x: number; y: number; size: number; delay: number; duration: number }>>([]);

//     useEffect(() => {
//         setDots(
//             Array.from({ length: 24 }, () => ({
//                 x: Math.random() * 100,
//                 y: Math.random() * 100,
//                 size: Math.random() * 3 + 1,
//                 delay: Math.random() * 4,
//                 duration: Math.random() * 6 + 5,
//             }))
//         );
//     }, []);

//     return (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             {dots.map((dot, i) => (
//                 <motion.div
//                     key={i}
//                     className="absolute rounded-full bg-primary/20 dark:bg-primary/30"
//                     style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
//                     animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
//                     transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
//                 />
//             ))}
//         </div>
//     );
// }

/* ─── Animated grid lines background ─── */
// function GridLines() {
//     return (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//             <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
//                 <defs>
//                     <pattern id="cover-grid" width="48" height="48" patternUnits="userSpaceOnUse">
//                         <path d="M 48 0 L 0 0 0 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.75" />
//                     </pattern>
//                 </defs>
//                 <rect width="100%" height="100%" fill="url(#cover-grid)" />
//             </svg>
//             {/* Diagonal accent line */}
//             <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
//             <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
//         </div>
//     );
// }

type Area = {
    key: string;
    title: string;
    tagline: string;
    description: string;
    opportunities: string[];
    tools: string[];
    impact: string;
};

export function WhatWeCoverSection() {
    const { t } = useTranslation("aiConsultingPage");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Area | null>(null);

    const areas = t("whatWeCover.areas", { returnObjects: true }) as Area[];

    const handleOpen = (area: Area) => {
        setSelected(area);
        setOpen(true);
    };

    const meta = selected ? (AREA_META[selected.key] ?? AREA_META.operations) : null;
    const SelectedIcon = meta?.icon ?? Sparkles;

    return (
        <section className="py-24 relative overflow-hidden bg-background dark:bg-[#0d0d14]">
            {/* Deep gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-[#0d0d14] dark:to-secondary/10" />
            <GridLayer opacity={0.3} />

            {/* Radial glow blobs */}
            {/* <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/8 dark:bg-primary/15 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/8 dark:bg-secondary/15 blur-[120px] pointer-events-none" /> */}

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Header ── */}
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
                        className="inline-flex items-center gap-2 bg-accent/10 dark:bg-accent/15 border border-accent/25 rounded-full px-4 py-2 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("whatWeCover.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whatWeCover.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whatWeCover.subtitle")}
                    </p>
                </motion.div>

                {/* ── Area Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-8">
                    {areas.map((area, index) => {
                        const m = AREA_META[area.key] ?? AREA_META.operations;
                        const IconComponent = m.icon;

                        return (
                            <motion.div
                                key={area.key}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.09 }}
                            >
                                <button
                                    onClick={() => handleOpen(area)}
                                    className={`
                    group w-full text-left relative overflow-hidden
                    bg-card/60 dark:bg-white/[0.04]
                    border border-border dark:border-white/[0.08]
                    hover:border-primary/50 dark:hover:border-primary/40
                    backdrop-blur-sm rounded-2xl p-6
                    transition-all duration-300
                    hover:shadow-xl ${m.glow}
                  `}
                                >
                                    {/* Card inner glow on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />

                                    {/* Top row */}
                                    <div className="flex items-start justify-between mb-5 relative z-10">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-lg opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}>
                                            <IconComponent className="w-5 h-5 text-white" strokeWidth={2} />
                                        </div>
                                        {/* Animated dot */}
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                                            className="w-2 h-2 rounded-full bg-accent mt-1"
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="relative z-10">
                                        <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
                                            {area.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                                            {area.tagline}
                                        </p>

                                        {/* CTA hint */}
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                            {t("whatWeCover.expandLabel")}
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-xs text-muted-foreground"
                >
                    {t("whatWeCover.bottomNote")}
                </motion.p>
            </div>

            {/* ── Drawer ── */}
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="max-h-[88vh] bg-card dark:bg-[#13131f] border-t border-border dark:border-white/[0.08]">
                    {selected && meta && (
                        <>
                            {/* Gradient header strip */}
                            <div className={`bg-gradient-to-r ${meta.gradient} px-6 pt-6 pb-8 relative overflow-hidden`}>
                                {/* Noise texture overlay */}
                                <div className="absolute inset-0 opacity-10"
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

                                <div className="flex items-center gap-4 max-w-4xl mx-auto relative z-10">
                                    <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0 p-3">
                                        <SelectedIcon className="w-6 h-6 text-white" strokeWidth={2} />
                                    </div>
                                    <DrawerHeader className="p-0 text-left">
                                        <DrawerTitle className="text-xl font-black text-white">
                                            {selected.title}
                                        </DrawerTitle>
                                        <DrawerDescription className="text-white/70 text-sm mt-0.5">
                                            {selected.description}
                                        </DrawerDescription>
                                    </DrawerHeader>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="overflow-y-auto px-6 pb-2 max-w-4xl mx-auto w-full">
                                <div className="grid md:grid-cols-2 gap-8 py-6">

                                    {/* Opportunities */}
                                    <div>
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">
                                            {t("whatWeCover.opportunitiesLabel")}
                                        </p>
                                        <div className="space-y-3">
                                            {selected.opportunities.map((op, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.07 }}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center flex-shrink-0 mt-0.5 opacity-80`}>
                                                        <span className="text-[10px] font-black text-white">{i + 1}</span>
                                                    </div>
                                                    <span className="text-sm text-foreground leading-relaxed">{op}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tools + Impact */}
                                    <div className="flex flex-col gap-5">
                                        {/* Tools */}
                                        <div>
                                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">
                                                {t("whatWeCover.toolsLabel")}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selected.tools.map((tool, i) => (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.85 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.06 }}
                                                        className="text-xs font-bold bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary px-3 py-1.5 rounded-full"
                                                    >
                                                        {tool}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Impact */}
                                        <div className="bg-accent/8 dark:bg-accent/12 border border-accent/20 dark:border-accent/25 rounded-2xl p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-3.5 h-3.5 text-accent" />
                                                <p className="text-xs font-black text-accent uppercase tracking-widest">
                                                    {t("whatWeCover.impactLabel")}
                                                </p>
                                            </div>
                                            <p className="text-sm text-foreground font-medium leading-relaxed">
                                                {selected.impact}
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <Button
                                            className={`w-full font-bold text-white bg-gradient-to-r ${meta.gradient} hover:opacity-90 border-0 group`}
                                            asChild
                                        >
                                            <a href="/contact" className="flex items-center justify-center gap-2">
                                                {t("whatWeCover.panelCta")}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <DrawerFooter className="pt-0 max-w-4xl mx-auto w-full px-6 pb-6">
                                <DrawerClose asChild>
                                    <Button variant="outline" className="border-2 font-bold dark:border-white/10 dark:hover:bg-white/5">
                                        {t("whatWeCover.collapseLabel")}
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </section>
    );
}