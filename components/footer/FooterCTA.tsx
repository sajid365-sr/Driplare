"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";

export function FooterCTA() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative border-b border-border overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-8 py-10 md:py-12">
                <div className="flex flex-col md:flex-row items-start md:items-center
                        justify-between gap-6">

                    {/* Left — message */}
                    <div className="flex items-center gap-4">
                        {/* Animated availability dot */}
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 dark:bg-primary/15
                              border border-primary/20 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500
                               ring-2 ring-background">
                                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                            </span>
                        </div>

                        <div>
                            <p className="text-sm font-black text-foreground">
                                {t("footer.cta.headline")}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                {t("footer.cta.sub")}
                            </p>
                        </div>
                    </div>

                    {/* Right — CTA */}
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2.5 flex-shrink-0
                       bg-primary hover:bg-primary/90
                       text-primary-foreground text-sm font-black
                       px-6 py-3 rounded-2xl
                       shadow-md shadow-primary/20
                       transition-all active:scale-95"
                    >
                        {t("footer.cta.primary")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}