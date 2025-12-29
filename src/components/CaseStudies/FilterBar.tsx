import { motion } from "framer-motion";
import { useState } from "react";

const filters = [
  { id: "all", label: "ALL_SYSTEMS" },
  { id: "ai", label: "AI_AGENTS" },
  { id: "workflow", label: "WORKFLOW_AUTOMATION" },
  { id: "mern", label: "MERN_INFRASTRUCTURE" }
];

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <section className="py-12 bg-[#F9F9F9] border-y border-[#E5E5E5]">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-6 py-3 rounded-full font-mono text-sm transition-all duration-300 border-2 ${
                activeFilter === filter.id
                  ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-lg"
                  : "bg-white text-[#0A0A0A] border-[#E5E5E5] hover:border-[#FF6B00] hover:text-[#FF6B00]"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              [{filter.label}]
            </motion.button>
          ))}
        </div>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#0A0A0A]/60 text-sm font-mono">
            FILTER_STATUS: {filters.find(f => f.id === activeFilter)?.label || 'ALL_SYSTEMS'} | PROJECTS_FOUND: {
              activeFilter === 'all' ? '3' :
              activeFilter === 'ai' ? '2' :
              activeFilter === 'workflow' ? '1' :
              activeFilter === 'mern' ? '1' : '3'
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}
