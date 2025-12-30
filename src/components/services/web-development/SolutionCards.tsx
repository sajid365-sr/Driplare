import { motion } from "framer-motion";
import { LayoutDashboard, Database, Link2, History } from "lucide-react";

const solutions = [
  {
    icon: <LayoutDashboard />,
    tag: "ANALYTICS",
    title: "Business Dashboards",
    desc: "Centralized MERN control centers that pull live data from your AI agents and automation.",
  },
  {
    icon: <Database />,
    tag: "OPERATIONS",
    title: "Internal Tooling",
    desc: "Bespoke inventory systems and client portals designed for your unique team logic.",
  },
  {
    icon: <Link2 />,
    tag: "CONNECTIVITY",
    title: "API Ecosystems",
    desc: "The nervous system of your business. Secure, lightning-fast bridges between your stack.",
  },
  {
    icon: <History />,
    tag: "LEGACY",
    title: "System Modernization",
    desc: "Migrating slow, outdated software into high-speed, mobile-responsive MERN environments.",
  },
];

export const SolutionCards = () => (
  <section className="py-24 bg-white">
    <div className="container">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
          Development_Scope
        </span>
        <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase mt-4">
          Solutions we engineer
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {solutions.map((sol, idx) => (
          <motion.div
            key={idx}
            className="p-8 bg-[#F9F9F9] border border-border/40 rounded-[2rem] hover:border-primary transition-colors group"
          >
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
              {sol.icon}
            </div>
            <span className="font-mono text-[9px] font-black text-primary/50 tracking-widest uppercase">
              {sol.tag}
            </span>
            <h3 className="font-black text-lg uppercase tracking-tight mt-2 mb-3">
              {sol.title}
            </h3>
            <p className="text-sm text-[#0A0A0A]/50 font-medium leading-relaxed">
              {sol.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
