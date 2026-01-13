"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// লজিকের জন্য এই ইংরেজি নামগুলোই থাকবে (Database matching এর জন্য)
const CATEGORIES = [
  "All",
  "Lead Generation",
  "Customer Support",
  "Data & Scraping",
  "E-commerce",
];

export function MarketplaceFilters({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: any) {
  const { t } = useTranslation();

  // ক্যাটাগরি নামগুলোকে JSON কি-এর সাথে ম্যাপ করার ফাংশন
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "All":
        return t("marketplace.filters.categories.all");
      case "Lead Generation":
        return t("marketplace.filters.categories.lead_generation");
      case "Customer Support":
        return t("marketplace.filters.categories.customer_support");
      case "Data & Scraping":
        return t("marketplace.filters.categories.data_scraping");
      case "E-commerce":
        return t("marketplace.filters.categories.e_commerce");
      default:
        return cat;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-accent/30 p-4 rounded-2xl border border-border/50 backdrop-blur-sm shadow-sm">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === cat
                ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                : "hover:bg-primary/10 text-muted-foreground hover:text-primary bg-background/50 border border-transparent hover:border-primary/10"
            )}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-72 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder={t("marketplace.filters.placeholder")}
          className="pl-10 bg-background/50 border-border/50 focus:border-primary rounded-xl transition-all focus:bg-background h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
