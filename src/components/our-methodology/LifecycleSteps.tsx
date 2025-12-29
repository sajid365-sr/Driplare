import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, FileText, Cog, TrendingUp } from "lucide-react";

const phases = [
  {
    phase: "Phase 01",
    title: "Systems Audit",
    subtitle: "[Discovery]",
    icon: Search,
    action: "We deep-dive into your existing manual bottlenecks, data structures, and tech stack.",
    deliverable: "A 'Friction Report' identifying exactly where your business is losing time and money.",
    color: "#0A0A0A",
    position: 0
  },
  {
    phase: "Phase 02",
    title: "Logic Architecture",
    subtitle: "[Design]",
    icon: FileText,
    action: "Before writing code, we map the logic. We design the n8n workflows, AI prompt chains, and MERN infrastructure.",
    deliverable: "A Technical Blueprint for your approval.",
    color: "#FF6B00",
    position: 1
  },
  {
    phase: "Phase 03",
    title: "Deployment & Integration",
    subtitle: "[Build]",
    icon: Cog,
    action: "Our engineers build the 'Bridge.' We develop the custom AI agents and full-stack dashboards in a secure sandbox environment.",
    deliverable: "A fully functional, integrated system ready for stress testing.",
    color: "#0A0A0A",
    position: 2
  },
  {
    phase: "Phase 04",
    title: "Continuous Optimization",
    subtitle: "[Evolution]",
    icon: TrendingUp,
    action: "Post-launch, we monitor API health, refine AI accuracy based on real-world logs, and scale the infrastructure as you grow.",
    deliverable: "24/7 Operational Stability and performance reports.",
    color: "#FF6B00",
    position: 3
  }
];

interface LifecycleStepsProps {
  activePhase?: number;
  onPhaseChange?: (phase: number) => void;
}

export function LifecycleSteps({ activePhase = 0, onPhaseChange }: LifecycleStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-20 bg-[#F9F9F9]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
            The 4-Phase Lifecycle
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 font-inter font-light max-w-2xl mx-auto">
            Vertical or Horizontal "Path" layout using 1px black lines and orange nodes.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Circuit Board Path */}
          <div className="relative mb-16">
            {/* Main Path Line */}
            <svg className="w-full h-32 md:h-24" viewBox="0 0 1000 200">
              <defs>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A0A0A" />
                  <stop offset="25%" stopColor="#FF6B00" />
                  <stop offset="75%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#0A0A0A" />
                </linearGradient>
              </defs>

              {/* Base path */}
              <path
                d="M 100 100 L 300 100 L 300 50 L 500 50 L 500 150 L 700 150 L 700 100 L 900 100"
                stroke="#E5E5E5"
                strokeWidth="2"
                fill="none"
              />

              {/* Animated progress path */}
              <motion.path
                d="M 100 100 L 300 100 L 300 50 L 500 50 L 500 150 L 700 150 L 700 100 L 900 100"
                stroke="url(#path-gradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                style={{ pathLength: pathProgress }}
                transition={{ duration: 0.5 }}
              />

              {/* Circuit nodes */}
              {[100, 300, 500, 700, 900].map((x, index) => (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={index % 2 === 0 ? 100 : index === 1 ? 50 : index === 3 ? 150 : 100}
                  r="8"
                  fill={phases[index]?.color || "#0A0A0A"}
                  stroke="#E5E5E5"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                />
              ))}
            </svg>
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative group ${
                  activePhase === index ? 'ring-2 ring-[#FF6B00]' : ''
                }`}
                onHoverStart={() => setHoveredPhase(index)}
                onHoverEnd={() => setHoveredPhase(null)}
              >
                {/* Phase Card */}
                <div className={`bg-white p-6 border border-[#E5E5E5] rounded-none transition-all duration-300 ${
                  activePhase === index ? 'border-[#FF6B00] shadow-lg' : ''
                }`}>

                  {/* Phase Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-none border-2 flex items-center justify-center ${
                      activePhase === index ? 'border-[#FF6B00] bg-[#FF6B00]/10' : 'border-[#0A0A0A] bg-[#0A0A0A]/10'
                    }`}>
                      <phase.icon className={`w-6 h-6 ${
                        activePhase === index ? 'text-[#FF6B00]' : 'text-[#0A0A0A]'
                      }`} />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#0A0A0A]/60">{phase.phase}</div>
                      <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">{phase.title}</div>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="font-mono text-sm text-[#0A0A0A]/60 mb-4">{phase.subtitle}</div>

                  {/* Action */}
                  <div className="mb-4">
                    <div className="font-mono text-xs text-[#0A0A0A]/60 mb-2">[ THE_ACTION ]</div>
                    <p className="text-[#0A0A0A]/80 font-inter font-light leading-relaxed text-sm">
                      {phase.action}
                    </p>
                  </div>

                  {/* Deliverable - Expanding Logic */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: hoveredPhase === index || activePhase === index ? 1 : 0,
                      x: hoveredPhase === index || activePhase === index ? 0 : -20
                    }}
                    transition={{ duration: 0.3 }}
                    className="border-l-4 border-[#FF6B00] pl-4 bg-[#FFF3E0] p-3"
                  >
                    <div className="font-mono text-xs text-[#0A0A0A]/60 mb-1">[ THE_DELIVERABLE ]</div>
                    <p className="text-[#0A0A0A]/80 font-inter font-light text-sm">
                      {phase.deliverable}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
