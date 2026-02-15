"use client";

import { useState } from "react";
import { CaseStudy } from "@/types/case-study-types";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyList } from "./CaseStudyList";
import { CaseStudyResultsStrip } from "./CaseStudyResultsStrip";
import { CaseStudyCTA } from "./CaseStudyCTA";
import { GridLayer, DarkGridBoost, GlowBlob, Particles, BRAND } from "@/components/effects/bg-effects";

interface CaseStudiesClientProps {
    studies: CaseStudy[];
    categories: string[];
    stats: { value: string; label: string }[];
}

export function CaseStudiesClient({ studies, categories, stats }: CaseStudiesClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    console.log(categories)

    return (
        <div className="relative min-h-screen bg-background dark:bg-[#0a0a12]" style={{ isolation: "isolate" }}>

            {/* Page-wide background — fixed so it persists while scrolling */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <GridLayer color={BRAND.violet} opacity={0.035} cellSize={52} />
                <DarkGridBoost color={BRAND.violet} opacity={0.055} cellSize={52} />
                <GlowBlob color={BRAND.violet} position="top-left" size={650} opacity={0.06} duration={20} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={550} opacity={0.05} duration={25} delay={5} />
                <GlowBlob color={BRAND.emerald} position="center" size={400} opacity={0.03} animate={false} />
                <Particles colors={[BRAND.violet, BRAND.blue, BRAND.emerald]} count={16} minOpacity={0.08} maxOpacity={0.3} speed={0.7} />
            </div>

            {/* Content */}
            <div className="relative" style={{ zIndex: 1 }}>
                <CaseStudyHero
                    categories={categories}
                    totalCount={studies.length}
                    stats={stats}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                {/* Section 2 — Project list (new layout) */}
                <CaseStudyList
                    studies={studies}
                    activeCategory={activeCategory}
                />

                {/* Section 3 — Results Strip */}
                <CaseStudyResultsStrip studies={studies} />

                {/* Section 4 — CTA */}
                <CaseStudyCTA />
            </div>
        </div>
    );
}