"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { ResultsHero } from "@/components/CaseStudies/ResultsHero";
import { FilterBar } from "@/components/CaseStudies/FilterBar";
import { CaseStudyCard } from "@/components/CaseStudies/CaseStudyCard";
import { getAllCaseStudies } from "@/lib/case-study-action";
import { VideoTestimonialCarousel } from "@/components/CaseStudies/VideoTestimonialCarousel";
import { LogicAccordion } from "@/components/CaseStudies/LogicAccordion";
import { FinalCTA } from "@/components/CaseStudies/FinalCTA";


export default function CaseStudiesPage() {
  const { i18n, t } = useTranslation("caseStudiesPage");
  const [activeFilter, setActiveFilter] = useState("all");
  const [rawDbData, setRawDbData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে ডাটা ফেচ করা
  useEffect(() => {
    async function fetchData() {
      const result = await getAllCaseStudies();
      if (result.success) {
        setRawDbData(result.data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // ল্যাঙ্গুয়েজ এবং ফিল্টার অনুযায়ী ডাটা প্রসেস করা
  const processedStudies = useMemo(() => {
    const currentLang = i18n.language.split("-")[0] as "en" | "bn";

    return rawDbData
      .map((item) => {
        const langContent = item[currentLang] || item.en;

        return {
          id: item.id,
          slug: item.slug,
          category: item.category,
          techTags: item.techTags,
          // Metadata fields
          clientName: item.clientName,
          industry: item.industry,
          clientLocation: item.clientLocation,
          videoReviewUrl: item.videoReviewUrl,
          // Language specific fields
          title: langContent?.title || "",
          context: langContent?.context || "",
          problem: langContent?.problem || "",
          solution: langContent?.solution || "",
          result: langContent?.result || "",
          metric: langContent?.metric || "",
          testimonial: langContent?.testimonial || "",
        };
      })
      .filter((study) => {
        if (activeFilter === "all") return true;
        return study.category
          ?.toLowerCase()
          .includes(activeFilter.toLowerCase());
      });
  }, [rawDbData, i18n.language, activeFilter]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">




      <ResultsHero />

      <div className="container mx-auto px-4">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <section className="py-20">
          <div className="grid grid-cols-1 gap-12">
            {" "}

            <AnimatePresence mode="popLayout">
              {processedStudies.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {processedStudies.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              {t("listing.noResults")}
            </div>
          )}
        </section>
      </div>


      <VideoTestimonialCarousel />

      <div className="bg-accent/5 py-24">
        <div className="container mx-auto px-4">
          <LogicAccordion />
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
