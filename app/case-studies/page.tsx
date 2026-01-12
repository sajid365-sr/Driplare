"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ResultsHero } from "@/components/CaseStudies/ResultsHero";
import { FilterBar } from "@/components/CaseStudies/FilterBar";
import { CaseStudyCard } from "@/components/CaseStudies/CaseStudyCard";
import { VideoTestimonialCarousel } from "@/components/CaseStudies/VideoTestimonialCarousel";
import { LogicAccordion } from "@/components/CaseStudies/LogicAccordion";
import { FinalCTA } from "@/components/CaseStudies/FinalCTA";

// টেকনিক্যাল স্ট্যাটিক ডাটা (যা ল্যাঙ্গুয়েজ ভেদে বদলাবে না)
const techMapping = {
  "ecommerce-ai-agent": {
    tags: ["OpenAI", "Vector Database", "n8n", "Meta API"],
    cat: "AI_AGENTS",
  },
  "pricing-monitor": {
    tags: ["Node.js", "n8n", "Puppeteer", "OpenAI"],
    cat: "AI_AGENTS",
  },
  "workflow-automation": {
    tags: ["n8n", "REST APIs", "Webhooks"],
    cat: "WORKFLOW_AUTOMATION",
  },
  "mern-dashboard": {
    tags: ["MongoDB", "React", "Socket.io"],
    cat: "MERN_INFRASTRUCTURE",
  },
};

export default function CaseStudies2() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  // JSON থেকে ডাটা আনা
  const studiesData = t("case_studies.items", { returnObjects: true }) as any[];

  // স্ট্যাটিক টেকনিক্যাল ডাটার সাথে মার্জ করা
  const caseStudies = Array.isArray(studiesData)
    ? studiesData.map((study) => ({
        ...study,
        techTags: techMapping[study.id as keyof typeof techMapping]?.tags || [],
        category: techMapping[study.id as keyof typeof techMapping]?.cat || "",
      }))
    : [];

  const filteredCaseStudies = caseStudies.filter((study) => {
    if (activeFilter === "all") return true;
    return study.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <ResultsHero />

      <div className="container mx-auto px-4">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <section className="py-20">
          <div className="grid grid-cols-1 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} index={index} />
              ))}
            </AnimatePresence>
          </div>
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
