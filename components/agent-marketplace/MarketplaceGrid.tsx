"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-marketplace/AgentCard";
import { ProcessedAgent } from "@/types/agent-marketplace";

interface MarketplaceGridProps {
  agents: ProcessedAgent[];
  viewMode: "grid" | "list";
  onClearFilters: () => void;
}

export default function MarketplaceGrid({ agents, viewMode, onClearFilters }: MarketplaceGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (agents.length === 0) {
    return (
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No AI Agents Found
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any agents matching your criteria. 
              Try adjusting your filters or search terms.
            </p>
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="lg"
              className="border-2"
            >
              Clear All Filters
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            : "space-y-6"
          }
        >
          <AnimatePresence mode="popLayout">
            {agents.map((agent, index) => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                index={index} 
                viewMode={viewMode} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}