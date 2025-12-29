import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Settings, Workflow } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "AI Feasibility & Roadmap",
    focus: "Strategy",
    description: "Not every problem needs an AI agent. We audit your workflows to identify where AI will provide the highest ROI and design a 12-month implementation roadmap.",
    color: "#FF6B00"
  },
  {
    icon: Settings,
    title: "Tech Stack Optimization",
    focus: "Efficiency",
    description: "Is your current stack holding you back? We analyze your MERN, legacy, or No-Code infrastructure to eliminate redundancies and optimize performance.",
    color: "#0A0A0A"
  },
  {
    icon: Workflow,
    title: "Automation Architecture",
    focus: "Scalability",
    description: "We design the 'plumbing' of your business. We architect how your CRM, ERP, and AI systems communicate to ensure 100% data integrity as you grow.",
    color: "#FF6B00"
  }
];

export function AdvisoryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 bg-[#F9F9F9] relative">
      {/* Blueprint Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Guided Scroll Line */}
      <motion.div
        className="fixed left-8 top-0 w-0.5 bg-[#FF6B00] z-40"
        style={{ y: lineY }}
        transition={{ type: "spring", stiffness: 100 }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] mb-4 font-montserrat">
            The Consulting Pillars
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-inter font-light">
            The "How We Help" — 3-column monochromatic cards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white border-2 border-[#E5E5E5] rounded-xl p-8 hover:border-[#FF6B00] transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon
                    className="w-8 h-8"
                    style={{ color: pillar.color }}
                  />
                </div>
              </div>

              {/* Title & Focus */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2 font-montserrat">{pillar.title}</h3>
                <span className="inline-block bg-[#F5F5F5] text-[#0A0A0A] px-3 py-1 rounded-full text-sm font-mono font-bold">
                  {pillar.focus}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#0A0A0A]/70 leading-relaxed font-inter font-light">{pillar.description}</p>

              {/* Technical Specs */}
              <div className="mt-6 pt-4 border-t border-[#E5E5E5]/50">
                <div className="text-xs font-mono text-[#0A0A0A]/50">
                  {pillar.title.includes("AI Feasibility") && "DELIVERABLE: 12_MONTH_ROADMAP | METHOD: WORKFLOW_AUDIT | SUCCESS_METRIC: ROI_IDENTIFICATION"}
                  {pillar.title.includes("Tech Stack") && "DELIVERABLE: OPTIMIZATION_REPORT | METHOD: INFRASTRUCTURE_ANALYSIS | SUCCESS_METRIC: PERFORMANCE_INCREASE"}
                  {pillar.title.includes("Automation") && "DELIVERABLE: ARCHITECTURE_BLUEPRINT | METHOD: SYSTEM_INTEGRATION | SUCCESS_METRIC: DATA_INTEGRITY"}
                </div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6B00] rounded-b-xl origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-[#0A0A0A] text-white px-8 py-4 rounded-xl">
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
            <span className="font-mono text-sm">CONSULTING_FRAMEWORK: ACTIVE | METHODOLOGY: PROVEN | SUCCESS_RATE: 95%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
