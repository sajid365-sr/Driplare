import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const expertise = [
  "MERN_STACK",
  "CLOUD_INFRASTRUCTURE",
  "AI_LLM_SELECTION",
  "WORKFLOW_ENGINEERING",
  "API_SECURITY",
  "DATABASE_OPTIMIZATION",
  "SYSTEM_ARCHITECTURE",
  "SCALABILITY_DESIGN",
  "INTEGRATION_PATTERNS",
  "PERFORMANCE_MONITORING"
];

export function ExpertiseMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-16 bg-white border-y border-[#E5E5E5] relative">
      {/* Blueprint Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-4 font-montserrat">
            Technical Stack Advisory
          </h2>
          <p className="text-[#0A0A0A]/70 font-inter font-light">
            Scrolling text of technologies you advise on, using JetBrains Mono.
          </p>
        </motion.div>

        {/* Scrolling Marquee */}
        <div className="relative overflow-hidden bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-8">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F9F9F9] to-transparent z-10"></div>

          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F9F9F9] to-transparent z-10"></div>

          {/* Scrolling content */}
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{
              x: [0, -100 * expertise.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...expertise, ...expertise, ...expertise].map((tech, index) => (
              <motion.div
                key={`${tech}-${index}`}
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#E5E5E5] shadow-sm"
                whileHover={{ scale: 1.05, backgroundColor: "#FF6B00", color: "white" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse"></div>
                <span className="font-mono text-sm font-bold text-[#0A0A0A] tracking-wider">
                  [{tech}]
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technical Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-[#F9F9F9] p-4 rounded-lg border border-[#E5E5E5]">
            <div className="font-mono font-bold text-[#FF6B00] text-2xl mb-1">15+</div>
            <div className="text-xs text-[#0A0A0A]/60">Technologies Advised</div>
          </div>

          <div className="bg-[#F9F9F9] p-4 rounded-lg border border-[#E5E5E5]">
            <div className="font-mono font-bold text-[#FF6B00] text-2xl mb-1">500+</div>
            <div className="text-xs text-[#0A0A0A]/60">Architecture Reviews</div>
          </div>

          <div className="bg-[#F9F9F9] p-4 rounded-lg border border-[#E5E5E5]">
            <div className="font-mono font-bold text-[#FF6B00] text-2xl mb-1">99%</div>
            <div className="text-xs text-[#0A0A0A]/60">Recommendation Accuracy</div>
          </div>

          <div className="bg-[#F9F9F9] p-4 rounded-lg border border-[#E5E5E5]">
            <div className="font-mono font-bold text-[#FF6B00] text-2xl mb-1">24/7</div>
            <div className="text-xs text-[#0A0A0A]/60">Technical Support</div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 bg-[#0A0A0A] text-white px-8 py-4 rounded-xl">
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
            <span className="font-mono text-sm">EXPERTISE_LEVEL: ENTERPRISE | COVERAGE: COMPREHENSIVE | UPDATES: CONTINUOUS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
