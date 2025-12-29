import { useState } from "react";
import { ResultsHero } from "@/components/CaseStudies/ResultsHero";
import { FilterBar } from "@/components/CaseStudies/FilterBar";
import { CaseStudyCard } from "@/components/CaseStudies/CaseStudyCard";
import { VideoTestimonialCarousel } from "@/components/CaseStudies/VideoTestimonialCarousel";
import { LogicAccordion } from "@/components/CaseStudies/LogicAccordion";
import { FinalCTA } from "@/components/CaseStudies/FinalCTA";

const caseStudies = [
  {
    id: "pricing-monitor",
    title: "Competitor Pricing & Market Intelligence System",
    context: "E-commerce Enterprise (5,000+ SKUs)",
    problem: "40+ manual hours per week spent tracking competitor shifts across 15 websites.",
    solution: "An autonomous Node.js scraper integrated with an AI Analysis Agent and a React Dashboard.",
    result: "98% Reduction in Manual Labor | Instant Price-Adjustment Alerts",
    techTags: ["Node.js", "n8n", "Puppeteer", "OpenAI", "MongoDB", "React"],
    imageUrl: "",
    category: "AI_AGENTS"
  },
  {
    id: "workflow-automation",
    title: "Multi-Platform Workflow Automation Suite",
    context: "SaaS Company (500+ Daily Transactions)",
    problem: "Manual data synchronization between CRM, accounting software, and project management tools causing delays and errors.",
    solution: "Custom n8n workflows connecting all business systems with intelligent routing and error handling.",
    result: "85% Faster Processing | Zero Manual Data Entry Errors",
    techTags: ["n8n", "Node.js", "REST APIs", "Webhook Integration", "MongoDB"],
    imageUrl: "",
    category: "WORKFLOW_AUTOMATION"
  },
  {
    id: "mern-dashboard",
    title: "Real-Time Business Intelligence Dashboard",
    context: "Manufacturing Company (Global Operations)",
    problem: "Scattered data across multiple systems with no unified view of business performance.",
    solution: "Full-stack MERN application with real-time data visualization and automated reporting.",
    result: "300% Improvement in Decision Speed | 24/7 System Monitoring",
    techTags: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io", "Chart.js"],
    imageUrl: "",
    category: "MERN_INFRASTRUCTURE"
  }
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCaseStudies = caseStudies.filter(study => {
    if (activeFilter === "all") return true;
    return study.category.toLowerCase().includes(activeFilter);
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ResultsHero />

      {/* Filter Bar */}
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Case Study Grid */}
      <section className="py-20 bg-[#F9F9F9]">
        <div className="container">
          <div className="space-y-12">
            {filteredCaseStudies.map((study, index) => (
              <CaseStudyCard
                key={study.id}
                title={study.title}
                context={study.context}
                problem={study.problem}
                solution={study.solution}
                result={study.result}
                techTags={study.techTags}
                imageUrl={study.imageUrl}
                category={study.category}
                delay={index * 0.2}
              />
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#0A0A0A]/60 font-mono text-lg">
                NO_PROJECTS_FOUND: No case studies match the selected filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialCarousel />

      {/* Logic Accordion */}
      <LogicAccordion />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
