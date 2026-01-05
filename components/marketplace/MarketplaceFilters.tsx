"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-accent/30 p-4 rounded-2xl border border-border/50 backdrop-blur-sm">
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "hover:bg-primary/10 text-muted-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search agents..."
          className="pl-10 bg-background/50 border-border/50 focus:border-primary rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
