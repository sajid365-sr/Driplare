"use client";

const categories = [
  "All",
  "Productivity",
  "Marketing",
  "DevOps",
  "Customer Support",
  "Personal Assistant",
];

export const AgentFilters = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:border-purple-500/50 hover:bg-purple-500/5 transition-all active:scale-95"
        >
          {category}
        </button>
      ))}
    </div>
  );
};
