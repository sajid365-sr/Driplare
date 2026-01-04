import type { Metadata } from 'next'
import { useState } from "react";
import { VideoTestimonialCarousel } from "@/components/CaseStudies/VideoTestimonialCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { ResultsHero } from "@/components/CaseStudies-2/ResultsHero";
import { FilterBar } from "@/components/CaseStudies/FilterBar";
import { CaseStudyCard } from "@/components/CaseStudies-2/CaseStudyCard";
import { LogicAccordion } from "@/components/CaseStudies-2/LogicAccordion";
import { FinalCTA } from "@/components/CaseStudies-2/FinalCTA";

const caseStudies = [
  {
    id: "ecommerce-ai-agent",
    title: "24/7 Autonomous Sales & Support Agent",
    context: "High-Volume E-commerce Brand",
    problem:
      "Losing customers due to delayed responses; high overhead costs from manual moderators.",
    solution:
      "Custom AI Agent trained on proprietary product data to handle inquiries and close sales.",
    result: "Instant response time with 100% automated order confirmation.",
    metric: "70% Cost Reduction",
    techTags: ["OpenAI", "Vector Database", "n8n", "Meta API"],
    category: "AI_AGENTS",
  },
  {
    id: "pricing-monitor",
    title: "Competitor Pricing & Market Intelligence",
    context: "E-commerce Enterprise",
    problem: "40+ manual hours/week tracking competitor shifts.",
    solution: "Autonomous Node.js scraper + AI Analysis Agent.",
    result: "98% Reduction in Manual Labor",
    metric: "-40hrs/wk",
    techTags: ["Node.js", "n8n", "Puppeteer", "OpenAI"],
    category: "AI_AGENTS",
  },
  {
    id: "workflow-automation",
    title: "Multi-Platform Automation Suite",
    context: "SaaS Company",
    problem: "Data synchronization lag between CRM & Accounting.",
    solution: "Custom n8n workflows with intelligent error handling.",
    result: "85% Faster Processing Speed",
    metric: "0% Errors",
    techTags: ["n8n", "REST APIs", "Webhooks"],
    category: "WORKFLOW_AUTOMATION",
  },
  {
    id: "mern-dashboard",
    title: "Global BI Infrastructure",
    context: "Manufacturing Giant",
    problem: "Scattered data with no unified performance view.",
    solution: "Full-stack MERN application with real-time Socket.io.",
    result: "300% Improvement in Decision Speed",
    metric: "3x Faster",
    techTags: ["MongoDB", "React", "Socket.io"],
    category: "MERN_INFRASTRUCTURE",
  },
];

export const metadata: Metadata = {
  title: 'Case Studies - Advanced AI & Automation Solutions',
  description: 'Explore our advanced case studies featuring AI agents, workflow automation, and full-stack development solutions with measurable business impact.',
}

export default function CaseStudies2() {
  const [activeFilter, setActiveFilter] = useState("all");

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

      <div className="bg-accent/20 py-24">
        <div className="container mx-auto px-4">
          <LogicAccordion />
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
