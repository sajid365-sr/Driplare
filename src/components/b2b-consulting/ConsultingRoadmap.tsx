import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, FileText, Cog, CheckCircle } from "lucide-react";

const phases = [
  {
    phase: "Phase 01",
    title: "Technical Audit",
    description: "A deep dive into your current manual bottlenecks and codebases.",
    deliverables: ["Process Documentation", "System Architecture Review", "Bottleneck Identification"],
    icon: Search,
    duration: "1-2 Weeks"
  },
  {
    phase: "Phase 02",
    title: "Strategic Blueprint",
    description: "We deliver a comprehensive PDF architecture of your recommended system.",
    deliverables: ["Technical Specification", "Cost-Benefit Analysis", "Implementation Timeline"],
    icon: FileText,
    duration: "2-3 Weeks"
  },
  {
    phase: "Phase 03",
    title: "Implementation Oversight",
    description: "We lead the development team (ours or yours) to ensure the vision is built to spec.",
    deliverables: ["Code Review Sessions", "Quality Assurance", "Performance Optimization"],
    icon: Cog,
    duration: "Ongoing"
  }
];

export function ConsultingRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 bg-white relative">
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
            The Roadmap Visual
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-inter font-light">
            The Deliverable — A vertical, clean timeline showing the "Consulting to Execution" journey.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#E5E5E5]"></div>
            <motion.div
              className="absolute left-8 top-0 w-0.5 bg-[#FF6B00]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Timeline Items */}
            <div className="space-y-16">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                  className={`flex items-start gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-white border-2 border-[#E5E5E5] rounded-full flex items-center justify-center shadow-lg">
                      <phase.icon className="w-8 h-8 text-[#0A0A0A]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF6B00] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold font-mono text-xs">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[#FF6B00] font-mono font-bold text-sm">{phase.phase}</span>
                        <span className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-xs font-mono font-bold">
                          {phase.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold text-[#0A0A0A] mb-3 font-montserrat">{phase.title}</h3>
                      <p className="text-[#0A0A0A]/70 mb-6 font-inter font-light leading-relaxed">{phase.description}</p>

                      {/* Deliverables */}
                      <div>
                        <h4 className="font-semibold text-[#0A0A0A] mb-3 font-montserrat">Key Deliverables</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {phase.deliverables.map((deliverable, deliverableIndex) => (
                            <div key={deliverableIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                              <span className="text-sm text-[#0A0A0A]/70 font-inter font-light">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div className="mt-6 pt-4 border-t border-[#E5E5E5]/50">
                        <div className="text-xs font-mono text-[#0A0A0A]/50">
                          {phase.title.includes("Technical Audit") && "METHODOLOGY: DEEP_DIVE_ANALYSIS | TOOLS: WORKFLOW_MAPPING | OUTPUT: BOTTLENECK_REPORT"}
                          {phase.title.includes("Strategic Blueprint") && "DELIVERABLE_FORMAT: COMPREHENSIVE_PDF | ANALYSIS_TYPE: COST_BENEFIT | TIMELINE: DETAILED"}
                          {phase.title.includes("Implementation") && "APPROACH: AGILE_METHODOLOGY | MONITORING: REAL_TIME | SUCCESS_CRITERIA: SPEC_COMPLIANCE"}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final Success Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-4 bg-[#FF6B00] text-white px-8 py-4 rounded-xl">
              <CheckCircle className="w-6 h-6" />
              <span className="font-mono font-bold text-lg">EXECUTION_COMPLETE: SYSTEM_OPERATIONAL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
