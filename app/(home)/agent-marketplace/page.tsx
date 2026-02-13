"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProcessedAgent, Agent } from "@/types/agent-marketplace";
import MarketplaceHero from "@/components/agent-marketplace/MarketplaceHero";
import MarketplaceStats from "@/components/agent-marketplace/MarketplaceStats";
import MarketplaceFilters from "@/components/agent-marketplace/MarketplaceFilters";
import MarketplaceGrid from "@/components/agent-marketplace/MarketplaceGrid";
import MarketplaceCTA from "@/components/agent-marketplace/MarketplaceCTA";
import AgentMarketplaceClient from "@/components/agent-marketplace/AgentMarketplaceClient";
import { getAllAgents } from "@/lib/agent-marketplace-action";

// export const metadata = {
//   title: "AI Agent Marketplace | Driplare",
//   description: "Discover powerful AI agents designed to automate your business processes, boost productivity, and drive innovation.",
// };

export default function AgentMarketplacePage() {


  const { i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // const [initialAgents, setInitialAgents] = useState<Agent[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAgents() {
      try {
        const response = await getAllAgents();
        console.log(response)
        if (response?.data && response?.success) {
          // setInitialAgents(response.data);


        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    getAgents();
  }, []);

  // const result = await getAllAgents();
  // const initialAgents = result.success ? result.data : [];

  // return <AgentMarketplaceClient initialAgents={initialAgents || []} />;
  return (
    <div className="text-4xl">Testing</div>
  )
}