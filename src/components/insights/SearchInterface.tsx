import { Search } from "lucide-react";

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
    <div className="py-8 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-border/50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
        
        {/* Search Input - Functionality Implemented */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A0A0A]/30 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Intelligence Database..."
            className="w-full bg-[#0A0A0A]/5 border-none rounded-2xl py-4 pl-12 pr-4 font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        
        {/* Category Filters - Functionality Implemented */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {/* All Posts Reset Button */}
          <button 
            onClick={() => onCategoryChange?.("")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              !selectedCategory 
                ? "bg-[#0A0A0A] text-white shadow-lg" 
                : "bg-transparent text-[#0A0A0A]/50 hover:bg-[#0A0A0A]/5"
            }`}
          >
            All Reports
          </button>

          {categories.map((cat) => (
            <button 
              key={cat.value}
              onClick={() => onCategoryChange?.(cat.value)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.value 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-transparent text-[#0A0A0A]/50 hover:bg-[#0A0A0A]/5"
              }`}
            >
              {cat.label.replace("_", " ")}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}