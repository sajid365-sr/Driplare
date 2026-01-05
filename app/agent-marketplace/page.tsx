"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { AgentCard } from "@/components/marketplace/AgentCard";
import { motion, AnimatePresence } from "framer-motion";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { getAllAgents } from "@/lib/agent-marketplace-action";

export default function Product() {
  const [agents, setAgents] = useState<any[]>([]); // ডাটাবেজ থেকে আসা ডাটা এখানে থাকবে
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // ডাটাবেজ থেকে ডাটা ফেচ করার ফাংশন
  useEffect(() => {
    async function fetchAgents() {
      setLoading(true);
      const result = await getAllAgents();
      if (result.success) {
        setAgents(result.data || []);
      }
      setLoading(false);
    }
    fetchAgents();
  }, []);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesCategory =
        activeCategory === "All" || agent.category === activeCategory;
      const matchesSearch = agent.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, agents]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <MarketplaceHero />

      <div className="container mx-auto px-4 mt-12">
        <MarketplaceFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loading ? (
          // Loading State
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground italic">
                  No agents found matching your criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
