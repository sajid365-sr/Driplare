import React, { useState, useMemo } from "react";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { AgentCard } from "@/components/marketplace/AgentCard";

import { motion, AnimatePresence } from "framer-motion";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";

// Mock Data - You can later move this to a separate file or Supabase
const AGENTS = [
  {
    id: "1",
    name: "Social Concierge AI",
    category: "Customer Support",
    price: 499,
    description:
      "24/7 Instagram & FB Messenger agent that books appointments and answers FAQs.",
    tools: ["OpenAI", "n8n", "Meta API"],
    image: "https://www.lyzr.ai/wp-content/uploads/2025/02/blog_ai_agents_for_social_media-1024x576.webp",
    rating: 4.9,
  },
  {
    id: "2",
    name: "LinkedIn Lead Ghost",
    category: "Lead Generation",
    price: 799,
    description:
      "Automated outbound agent that finds prospects and crafts personalized intros.",
    tools: ["PhantomBuster", "Claude 3.5", "Make"],
    image: "https://media.licdn.com/dms/image/v2/D5612AQF_DGHYCGzi_A/article-cover_image-shrink_720_1280/B56ZczLdrwG0AQ-/0/1748910342152?e=2147483647&v=beta&t=Fk-l760iroGLxUBTuvT_Dwrj1V0thVl6rfVBSzARhog",
    rating: 5.0,
  },
  {
    id: "3",
    name: "E-com Price Watcher",
    category: "Data & Scraping",
    price: 299,
    description:
      "Monitors competitor prices hourly and updates your Shopify store automatically.",
    tools: ["BrightData", "Node.js", "Shopify"],
    image: "https://www.akira.ai/hubfs/Appstore%20Review%20Analysis%20Agent%20(67)-1.png",
    rating: 4.8,
  },
];

export default function Product() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = useMemo(() => {
    return AGENTS.filter((agent) => {
      const matchesCategory =
        activeCategory === "All" || agent.category === activeCategory;
      const matchesSearch = agent.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          <AnimatePresence>
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
      </div>
    </div>
  );
}
