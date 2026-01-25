"use client";

import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ProcessedAgent, Agent } from "@/types/agent-marketplace";
import MarketplaceHero from "@/components/agent-marketplace/MarketplaceHero";
import MarketplaceStats from "@/components/agent-marketplace/MarketplaceStats";
import MarketplaceFilters from "@/components/agent-marketplace/MarketplaceFilters";
import MarketplaceGrid from "@/components/agent-marketplace/MarketplaceGrid";
import MarketplaceCTA from "@/components/agent-marketplace/MarketplaceCTA";

interface AgentMarketplaceClientProps {
  initialAgents: Agent[];
}

export default function AgentMarketplaceClient({ initialAgents }: AgentMarketplaceClientProps) {
  const { i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Process agents with language support
  const processedAgents: ProcessedAgent[] = useMemo(() => {
    const currentLang = i18n.language.split("-")[0] as "en" | "bn";

    return initialAgents
      .map((item) => {
        const langContent = item[currentLang] || item.en;

        return {
          id: item.id,
          slug: item.slug,
          category: item.category,
          price: item.price,
          rating: item.rating,
          totalSales: item.totalSales,
          mainImage: item.mainImage,
          gallery: item.gallery,
          videoUrl: item.videoUrl,
          techStack: item.techStack,
          difficulty: item.difficulty,
          setupTime: item.setupTime,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          name: langContent?.name || "",
          description: langContent?.description || "",
          fullDescription: langContent?.fullDescription || "",
          features: langContent?.features || [],
          benefits: langContent?.benefits,
          howItHelps: langContent?.howItHelps,
        };
      })
      .filter((agent) => {
        const matchesCategory = activeCategory === "All" || agent.category === activeCategory;
        const matchesSearch = agent.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          agent.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          agent.fullDescription
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "popular":
            return b.totalSales - a.totalSales;
          case "newest":
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [initialAgents, i18n.language, activeCategory, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MarketplaceHero />
      
      {/* Stats Section */}
      <MarketplaceStats totalAgents={initialAgents.length} />
      
      {/* Filters Section */}
      <MarketplaceFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={processedAgents.length}
      />
      
      {/* Agents Grid */}
      <MarketplaceGrid
        agents={processedAgents}
        viewMode={viewMode}
        onClearFilters={handleClearFilters}
      />
      
      {/* CTA Section */}
      <MarketplaceCTA />
    </div>
  );
}