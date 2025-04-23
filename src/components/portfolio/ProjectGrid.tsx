
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filters = [
  { label: "All", value: "all" },
  { label: "Web Design", value: "web" },
  { label: "Digital Marketing", value: "marketing" },
  { label: "AI Solutions", value: "ai" }
];

const projects = [
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
    title: "Visionary Health Portal",
    category: "web",
    metric: "↑ 40% conversions"
  },
  {
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=600",
    title: "SyncWin SaaS",
    category: "web",
    metric: "Signups 2x"
  },
  {
    img: "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=600",
    title: "EcoSites Commerce",
    category: "web",
    metric: "Mobile conversions ↑ 70%"
  },
  {
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600",
    title: "Nova AI Campaign",
    category: "marketing",
    metric: "Engagement ↑ 54%"
  },
  {
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600",
    title: "RetailX Predict",
    category: "ai",
    metric: "Churn ↓ 33%"
  }
];

export function ProjectGrid() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? projects : projects.filter(p => p.category === active);

  return (
    <>
      {/* Filters */}
      <div className="flex gap-4 flex-wrap justify-center mb-10">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-6 py-2 rounded-full font-semibold border-2 transition-colors duration-200 ${
              active === f.value
                ? "bg-[#F88220] border-[#F88220] text-white shadow-lg"
                : "border-[#F88220] text-[#F88220] bg-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.img}
              className="relative rounded-2xl overflow-hidden group shadow-lg bg-[#191924]"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.7, delay: 0.04 * i }}
              whileHover={{ y: -10, boxShadow: "0 4px 52px #F8822090" }}
            >
              <img src={proj.img} alt={proj.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 bg-[#F88220] text-white px-3 py-1 rounded-md font-semibold text-xs uppercase z-10">{filters.find(f => f.value === proj.category)?.label}</div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-20 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="text-xl font-extrabold text-white drop-shadow-lg mb-2">
                  {proj.title}
                </div>
                <div className="font-mono text-[#F88220] text-base font-semibold">{proj.metric}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
