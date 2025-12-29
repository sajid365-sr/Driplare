import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchInterfaceProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const categories = [
  { label: "AI_AGENTS", value: "ai_agents" },
  { label: "WORKFLOW_ENGINEERING", value: "workflow_engineering" },
  { label: "MERN_SCALING", value: "mern_scaling" },
  { label: "DATA_STRATEGY", value: "data_strategy" }
];

export function SearchInterface({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}: SearchInterfaceProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0A0A0A]/60" />
            <Input
              type="text"
              placeholder="> Search_Database..."
              className="pl-10 h-12 bg-white border border-[#0A0A0A] rounded-none focus:border-[#FF6B00] focus:ring-0 font-mono text-[#0A0A0A]"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Category Filter Tags */}
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              onClick={() => onCategoryChange?.("")}
              className={`px-4 py-2 border border-[#0A0A0A] rounded-none font-mono text-sm transition-colors ${
                !selectedCategory
                  ? "bg-[#0A0A0A] text-white"
                  : "bg-white text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              [ ALL_POSTS ]
            </motion.button>

            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => onCategoryChange?.(category.value)}
                className={`px-4 py-2 border border-[#0A0A0A] rounded-none font-mono text-sm transition-colors ${
                  selectedCategory === category.value
                    ? "bg-[#FF6B00] text-white border-[#FF6B00]"
                    : "bg-white text-[#0A0A0A] hover:bg-[#FF6B00]/10"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                [ {category.label} ]
              </motion.button>
            ))}
          </div>

          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-[#F9F9F9] px-6 py-3 border border-[#0A0A0A] rounded-none">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-[#0A0A0A]">
                SEARCH_ACTIVE | FILTERS_READY | RESULTS: {searchTerm ? "FILTERED" : "ALL"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
