"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

/* ─── Animated grid background ─── */
function GridLines() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.065]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="faq-grid" width="52" height="52" patternUnits="userSpaceOnUse">
                        <path d="M 52 0 L 0 0 0 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#faq-grid)" />
            </svg>
            {/* Vertical accent lines */}
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/8 dark:via-primary/15 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/6 dark:via-accent/12 to-transparent" />
        </div>
    );
}

/* ─── Glow blobs ─── */
function GlowBlobs() {
    return (
        <>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 left-0 w-64 h-64 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-accent/4 dark:bg-accent/8 blur-[80px] pointer-events-none" />
        </>
    );
}

/* ─── Individual FAQ Item ─── */
function FAQItem({
    faq,
    index,
    isOpen,
    onToggle,
}: {
    faq: { question: string; answer: string };
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`
        group relative overflow-hidden rounded-2xl border
        backdrop-blur-sm transition-all duration-300
        ${isOpen
                    ? "bg-card/80 dark:bg-white/[0.06] border-primary/30 dark:border-primary/25 shadow-lg shadow-primary/5"
                    : "bg-card/50 dark:bg-white/[0.03] border-border dark:border-white/[0.07] hover:border-primary/20 dark:hover:border-primary/20"
                }
      `}
        >
            {/* Inner glow when open */}
            {isOpen && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 dark:from-primary/6 dark:to-accent/6 pointer-events-none" />
            )}

            {/* Question row */}
            <button
                onClick={onToggle}
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 relative z-10"
            >
                <div className="flex items-start gap-3 flex-1">
                    <div className={`
            w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300
            ${isOpen
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 dark:bg-primary/15 text-primary"
                        }
          `}>
                        <span className="text-[10px] font-black">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <span className={`text-sm font-bold leading-relaxed transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                        {faq.question}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-0.5"
                >
                    <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
            </button>

            {/* Answer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 pl-15 text-sm text-muted-foreground leading-relaxed pl-[3.75rem] relative z-10">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const { t } = useTranslation("aiConsultingPage");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = t("faq.questions", {
        returnObjects: true,
    }) as Array<{ question: string; answer: string }>;

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="py-24 relative overflow-hidden bg-background dark:bg-[#0d0d14]">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/10 dark:from-white/[0.02] via-transparent to-muted/10 dark:to-white/[0.02]" />
            {/* <GridLines />
            <GlowBlobs /> */}

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* ── Header ── */}
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
                        className="inline-flex items-center gap-2 bg-primary/8 dark:bg-primary/12 border border-primary/20 dark:border-primary/25 rounded-full px-4 py-2 mb-6"
                    >
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("faq.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("faq.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("faq.subtitle")}
                    </p>
                </motion.div>

                {/* ── Two-column FAQ layout ── */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4 mb-10">
                        {/* Left column */}
                        <div className="space-y-3">
                            {faqs
                                .filter((_, i) => i % 2 === 0)
                                .map((faq, i) => {
                                    const realIndex = i * 2;
                                    return (
                                        <FAQItem
                                            key={realIndex}
                                            faq={faq}
                                            index={realIndex}
                                            isOpen={openIndex === realIndex}
                                            onToggle={() => toggle(realIndex)}
                                        />
                                    );
                                })}
                        </div>
                        {/* Right column */}
                        <div className="space-y-3">
                            {faqs
                                .filter((_, i) => i % 2 !== 0)
                                .map((faq, i) => {
                                    const realIndex = i * 2 + 1;
                                    return (
                                        <FAQItem
                                            key={realIndex}
                                            faq={faq}
                                            index={realIndex}
                                            isOpen={openIndex === realIndex}
                                            onToggle={() => toggle(realIndex)}
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    {/* ── Still have questions card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl border border-primary/20 dark:border-primary/15 backdrop-blur-sm bg-card/50 dark:bg-white/[0.03]"
                    >
                        {/* Gradient fill */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/6 dark:from-primary/10 dark:to-accent/10" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-8">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                                <MessageCircle className="w-7 h-7 text-white" />
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-black text-foreground mb-1">
                                    {t("faq.stillHaveQuestions.title")}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {t("faq.stillHaveQuestions.subtitle")}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 group"
                                    asChild
                                >
                                    <a href="/contact" className="flex items-center gap-2">
                                        {t("faq.stillHaveQuestions.primaryCta")}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="font-bold border-2 border-border dark:border-white/[0.10] dark:hover:bg-white/[0.04]"
                                    asChild
                                >
                                    <a
                                        href="https://wa.me/your-number"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {t("faq.stillHaveQuestions.secondaryCta")}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}