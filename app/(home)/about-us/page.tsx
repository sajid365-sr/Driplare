"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight, Target, Users, Zap, Globe,
    Heart, Shield, TrendingUp, CheckCircle2,
    Sparkles, Bot, Code, Briefcase, MessageCircle,
} from "lucide-react";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function AboutHero() {
    const { t } = useTranslation("aboutPage");

    return (
        <section className="pt-28 pb-16 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                            rounded-full px-3 py-1.5 mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                                {t("about.hero.badge")}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-foreground leading-[1.05] mb-5">
                            {t("about.hero.title")}{" "}
                            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                {t("about.hero.titleAccent")}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                            {t("about.hero.subtitle")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/contact"
                                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90
                           text-primary-foreground font-black text-sm px-6 py-3 rounded-xl
                           shadow-md shadow-primary/20 transition-all">
                                {t("about.hero.cta")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link href="/case-studies"
                                className="inline-flex items-center gap-2 border border-border hover:border-primary/30
                           text-foreground font-bold text-sm px-6 py-3 rounded-xl
                           bg-transparent hover:bg-muted/50 transition-all">
                                {t("about.hero.ctaSecondary")}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Origin Story ─────────────────────────────────────────────────────────────
function OriginStory() {
    const { t } = useTranslation("aboutPage");

    return (
        <section className="py-16 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: Image placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[320px] md:h-[400px] rounded-3xl overflow-hidden
                       border border-border bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"
                    >
                        {/* Placeholder — replace with actual founder/team photo */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <Users className="w-16 h-16 opacity-20" />
                        </div>
                    </motion.div>

                    {/* Right: Story */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-5"
                    >
                        <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20
                            rounded-full px-3 py-1 text-[10px] font-black text-secondary uppercase tracking-widest">
                            {t("about.origin.badge")}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                            {t("about.origin.title")}
                        </h2>

                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <p>{t("about.origin.p1")}</p>
                            <p>{t("about.origin.p2")}</p>
                            <p>{t("about.origin.p3")}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Mission ──────────────────────────────────────────────────────────────────
function Mission() {
    const { t } = useTranslation("aboutPage");

    return (
        <section className="py-16 border-t border-border bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20
                          rounded-full px-3 py-1.5 mb-6">
                        <Target className="w-3.5 h-3.5 text-accent" />
                        <span className="text-[11px] font-black text-accent uppercase tracking-widest">
                            {t("about.mission.badge")}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-5">
                        {t("about.mission.title")}
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {t("about.mission.subtitle")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// ─── What We Do ───────────────────────────────────────────────────────────────
function WhatWeDo() {
    const { t } = useTranslation("aboutPage");

    const services = [
        { icon: Bot, color: "text-violet-500", bg: "bg-violet-500/10", key: "aiAgents" },
        { icon: Zap, color: "text-blue-500", bg: "bg-blue-500/10", key: "automation" },
        { icon: Code, color: "text-emerald-500", bg: "bg-emerald-500/10", key: "webDev" },
        { icon: Briefcase, color: "text-amber-500", bg: "bg-amber-500/10", key: "consulting" },
    ];

    return (
        <section className="py-16 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-12 max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                        {t("about.services.title")}
                    </h2>
                    <p className="text-muted-foreground">
                        {t("about.services.subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                    {services.map((s, i) => {
                        const Icon = s.icon;
                        const data = t(`about.services.items.${s.key}`, { returnObjects: true }) as {
                            name: string; desc: string; link: string;
                        };
                        return (
                            <motion.div
                                key={s.key}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.42 }}
                                className="group p-6 rounded-2xl border border-border bg-card
                           hover:border-primary/30 hover:shadow-lg transition-all"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-4`}>
                                    <Icon className={`w-6 h-6 ${s.color}`} />
                                </div>
                                <h3 className="text-base font-black text-foreground mb-2">
                                    {data.name}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                    {data.desc}
                                </p>
                                <Link href={data.link}
                                    className="inline-flex items-center gap-1.5 text-[11px] font-black
                             text-primary hover:gap-2.5 transition-all group/link">
                                    Learn more
                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function Team() {
    const { t } = useTranslation("aboutPage");

    const team = t("about.team.members", { returnObjects: true }) as Array<{
        name: string; role: string; bio: string;
    }>;

    return (
        <section className="py-16 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                        {t("about.team.title")}
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {t("about.team.subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.42 }}
                            className="text-center"
                        >
                            {/* Avatar placeholder */}
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20
                              border-2 border-border mx-auto mb-4 flex items-center justify-center">
                                <Users className="w-10 h-10 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-base font-black text-foreground mb-1">
                                {member.name}
                            </h3>
                            <p className="text-xs text-primary font-bold mb-2">
                                {member.role}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Values ───────────────────────────────────────────────────────────────────
function Values() {
    const { t } = useTranslation("aboutPage");

    const values = [
        { icon: Heart, color: "text-red-500", bg: "bg-red-500/10", key: "transparency" },
        { icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10", key: "quality" },
        { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", key: "results" },
    ];

    return (
        <section className="py-16 border-t border-border bg-muted/20">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                        {t("about.values.title")}
                    </h2>
                    <p className="text-muted-foreground">
                        {t("about.values.subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        const data = t(`about.values.items.${v.key}`, { returnObjects: true }) as {
                            name: string; desc: string;
                        };
                        return (
                            <motion.div
                                key={v.key}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.42 }}
                                className="flex flex-col items-center text-center p-6 rounded-2xl
                           border border-border bg-card"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center mb-4`}>
                                    <Icon className={`w-7 h-7 ${v.color}`} />
                                </div>
                                <h3 className="text-base font-black text-foreground mb-2">
                                    {data.name}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {data.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
    const { t } = useTranslation("aboutPage");

    const stats = t("about.stats.items", { returnObjects: true }) as Array<{
        value: string; label: string;
    }>;

    return (
        <section className="py-12 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className="text-center p-5 rounded-2xl bg-muted/40 border border-border"
                        >
                            <div className="text-3xl md:text-4xl font-black text-primary mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function AboutCTA() {
    const { t } = useTranslation("aboutPage");

    return (
        <section className="py-16 border-t border-border relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <GlowBlob color={BRAND.emerald} position="center" size={500} opacity={0.3} />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <MessageCircle className="w-14 h-14 text-primary mx-auto mb-5" />
                    <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                        {t("about.cta.title")}
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        {t("about.cta.subtitle")}
                    </p>
                    <Link href="/contact"
                        className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90
                       text-primary-foreground font-black text-sm px-8 py-3.5 rounded-xl
                       shadow-lg shadow-primary/20 transition-all">
                        {t("about.cta.button")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* bg-effects */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.5} cellSize={44} style="dots" />
                <DarkGridBoost color={BRAND.violet} opacity={0.055} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.7} duration={22} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={420} opacity={0.4} duration={26} delay={8} />
            </div>

            <div className="relative z-10">
                <AboutHero />
                <OriginStory />
                <Mission />
                <WhatWeDo />
                <Team />
                <Values />
                <Stats />
                <AboutCTA />
            </div>
        </div>
    );
}