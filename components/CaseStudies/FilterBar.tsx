"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const { t } = useTranslation("caseStudiesPage");

  const filters = [
    { id: "all", label: t("filter.all") },
    { id: "ai", label: t("filter.ai") },
    { id: "workflow", label: t("filter.workflow") },
    { id: "mern", label: t("filter.mern") },
  ];

  // প্রজেক্ট কাউন্ট লজিক (অরিজিনাল অনুযায়ী রাখা হয়েছে)
  const getProjectCount = (filterId: string) => {
    switch (filterId) {
      case "all":
        return "4"; // আপনার অরিজিনাল ডাটাতে ৪টি কেস স্টাডি ছিল
      case "ai":
        return "2";
      case "workflow":
        return "1";
      case "mern":
        return "1";
      default:
        return "0";
    }
  };

  return (
    <section className="py-12 bg-[#F9F9F9] dark:bg-[#0A0A0B] border-y border-[#E5E5E5] dark:border-white/5 transition-colors">
      <div className="container px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-6 py-3 rounded-full font-mono text-sm transition-all duration-300 border-2 ${
                activeFilter === filter.id
                  ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20"
                  : "bg-white dark:bg-white/5 text-[#0A0A0A] dark:text-white/70 border-[#E5E5E5] dark:border-white/10 hover:border-[#FF6B00] hover:text-[#FF6B00]"
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
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#0A0A0A]/60 dark:text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-widest">
            {t("filter.status_label")}:{" "}
            <span className="text-[#FF6B00]">
              {filters.find((f) => f.id === activeFilter)?.label}
            </span>
            <span className="mx-4 text-black/10 dark:text-white/10">|</span>
            {t("filter.found_label")}:{" "}
            <span className="text-[#FF6B00]">
              {getProjectCount(activeFilter)}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
