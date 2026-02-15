"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CaseStudy } from "@/types/case-study-types";
import { CaseStudyCard } from "./CaseStudyCard";

interface CaseStudyGridProps {
    studies: CaseStudy[];
    activeCategory: string;
    locale?: "en" | "bn";
}

export function CaseStudyGrid({ studies, activeCategory, locale = "en" }: CaseStudyGridProps) {
    const { t } = useTranslation("caseStudiesPage");

    const filtered = activeCategory === "All"
        ? studies
        : studies.filter((s) => s.category === activeCategory);

    return (
        <section className="pb-20 relative">
            <div className="container mx-auto px-4 md:px-6">

                {/* ── Count label ── */}
                <div className="flex items-center gap-2 mb-7">
                    <LayoutGrid className="w-4 h-4 text-muted-foreground" />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`${activeCategory}-${filtered.length}`}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="text-sm text-muted-foreground"
                        >
                            {filtered.length === 0
                                ? t("grid.noResults")
                                : `Showing ${filtered.length} case ${filtered.length === 1 ? "study" : "studies"}`}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* ── Grid ── */}
                <AnimatePresence mode="wait">
                    {filtered.length === 0 ? (

                        /* Empty state */
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-24 text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-muted/60 dark:bg-white/[0.04] flex items-center justify-center mb-4">
                                <SearchX className="w-7 h-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-1.5">Nothing here yet</h3>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                We're working on adding more case studies for this category. Check back soon.
                            </p>
                        </motion.div>

                    ) : (

                        /* 2-column grid on md+, 1 column on mobile */
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                        >
                            {filtered.map((study, i) => (
                                <CaseStudyCard
                                    key={study.id ?? study.slug}
                                    study={study}
                                    index={i}
                                    locale={locale}
                                />
                            ))}
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}