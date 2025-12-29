import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Audit",
    description: "We map your manual bottlenecks and identify high-impact automation opportunities."
  },
  {
    number: "02",
    title: "Architect",
    description: "We design the logic flow and agent personality that matches your business needs."
  },
  {
    number: "03",
    title: "Integrate",
    description: "We build the MERN foundation and connect all your systems through secure APIs."
  },
  {
    number: "04",
    title: "Scale",
    description: "Continuous monitoring and optimization ensures 24/7 performance and growth."
  }
];

export function HowWeEngineerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 bg-white relative overflow-hidden">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            How We Engineer
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            A technical, disciplined approach to building systems that scale.
          </p>
        </motion.div>

        {/* Circuit board layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#E5E5E5] -translate-x-1/2"></div>

          {/* Animated pulse */}
          <motion.div
            className="absolute left-1/2 top-0 w-4 h-4 bg-[#FF6B00] rounded-full -translate-x-1/2 z-10"
            style={{ y: pulseY }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255, 107, 0, 0.7)',
                '0 0 0 20px rgba(255, 107, 0, 0)',
                '0 0 0 0 rgba(255, 107, 0, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`flex items-center gap-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold font-mono">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-[#0A0A0A]">{step.title}</h3>
                    </div>
                    <p className="text-[#0A0A0A]/70 leading-relaxed">{step.description}</p>

                    {/* Technical details */}
                    <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                      <div className="flex flex-wrap gap-2">
                        {step.number === "01" && (
                          <>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">Process Mapping</span>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">Pain Point Analysis</span>
                          </>
                        )}
                        {step.number === "02" && (
                          <>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">System Design</span>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">Architecture Planning</span>
                          </>
                        )}
                        {step.number === "03" && (
                          <>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">API Development</span>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">Integration Testing</span>
                          </>
                        )}
                        {step.number === "04" && (
                          <>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">Performance Monitoring</span>
                            <span className="px-2 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded">Continuous Optimization</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection node */}
                <div className="relative">
                  <div className="w-6 h-6 bg-[#FF6B00] rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-[#FF6B00] rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Empty space for balance */}
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

