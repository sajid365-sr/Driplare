import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "DISCOVERY",
    desc: "Audit manual friction points and identify high-ROI automation nodes.",
    tag: "AUDIT",
  },
  {
    id: "02",
    title: "ARCHITECTURE",
    desc: "Design of RAG pipelines, agent personality, and tool-integration logic.",
    tag: "DESIGN",
  },
  {
    id: "03",
    title: "DEPLOYMENT",
    desc: "Model training on proprietary data and secure environment staging.",
    tag: "LAUNCH",
  },
  {
    id: "04",
    title: "OPTIMIZATION",
    desc: "Continuous logic refinement and performance scaling based on live data.",
    tag: "EVOLVE",
  },
];

export const RoadmapSection = () => (
  <section className="py-24 bg-[#F9F9F9]">
    <div className="container">
      <div className="max-w-4xl mb-16">
        <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
          Protocol
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter uppercase mt-4">
          The Driplare Roadmap
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-border/60 shadow-sm group hover:border-primary transition-colors"
          >
            <span className="font-mono text-4xl font-black text-primary/10">
              {step.id}
            </span>
            <div className="mt-4">
              <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
                {step.tag}
              </span>
              <h3 className="text-xl font-black text-[#0A0A0A] mt-4 mb-3 uppercase tracking-tighter">
                {step.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/60 font-medium leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
