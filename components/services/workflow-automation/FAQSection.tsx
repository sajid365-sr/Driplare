"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HelpCircle, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function FAQSection() {
    const { t } = useTranslation("workflowAutomationPage");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = t("faq.questions", {
        returnObjects: true,
    }) as Array<{ question: string; answer: string }>;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
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
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
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

                {/* Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                            className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-6 hover:bg-muted/30 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <h3 className="text-base font-bold text-foreground">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="flex-shrink-0 mt-0.5"
                                    >
                                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    </motion.div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="border-t border-border"
                                    >
                                        <p className="px-6 pt-4 pb-6 pl-14 text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto mt-10"
                >
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            {t("faq.stillHaveQuestions.title")}
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                            {t("faq.stillHaveQuestions.subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
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
                                className="border-2 font-bold"
                                asChild
                            >
                                <a
                                    href="https://wa.me/your-whatsapp-number"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("faq.stillHaveQuestions.secondaryCta")}
                                </a>
                            </Button>
                        </div>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}