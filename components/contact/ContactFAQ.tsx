"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ContactFAQ() {
    const { t } = useTranslation("contactPage");

    const faqs = t("faq.items", { returnObjects: true }) as Array<{
        q: string;
        a: string;
    }>;

    return (
        <section className="py-16 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20
                          rounded-full px-3 py-1.5 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("faq.badge")}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                        {t("faq.title")}
                    </h2>
                    <p className="text-muted-foreground">{t("faq.subtitle")}</p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className="p-5 rounded-2xl border border-border bg-card"
                        >
                            <h3 className="text-lg font-black text-foreground mb-2">
                                {faq.q}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {faq.a}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}