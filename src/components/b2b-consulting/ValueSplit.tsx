import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ValueSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Reduced Development Waste",
      description: "Save 30% on dev costs by building the right features first.",
      metric: "30%_COST_SAVINGS"
    },
    {
      icon: DollarSign,
      title: "Optimized API & Hosting Expenses",
      description: "Right-size your infrastructure from day one.",
      metric: "40%_INFRA_OPTIMIZATION"
    },
    {
      icon: Shield,
      title: "Security-First System Design",
      description: "Build with compliance and protection in mind.",
      metric: "100%_SECURITY_COMPLIANCE"
    }
  ];

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
            Why an "Outside Architect"?
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-inter font-light">
            The Value Prop — Two-column split. Left is a "Blueprint" image; Right is the copy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - Blueprint Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white border-2 border-[#E5E5E5] rounded-2xl p-8 shadow-lg">
              {/* Blueprint Pattern */}
              <div
                className="aspect-square rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(#E5E5E5 1px, transparent 1px),
                    linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              >
                {/* Architectural Elements */}
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-[#0A0A0A]/50 font-mono text-xs mb-2">ARCHITECTURAL_BLUEPRINT</div>
                  <div className="text-[#0A0A0A]/30 text-xs">High-end architectural photography placeholder</div>
                </div>

                {/* Blueprint Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <pattern id="blueprint-lines" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="25" x2="50" y2="25" stroke="#0A0A0A" strokeWidth="0.5" />
                      <line x1="25" y1="0" x2="25" y2="50" stroke="#0A0A0A" strokeWidth="0.5" />
                      <circle cx="25" cy="25" r="8" fill="none" stroke="#FF6B00" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#blueprint-lines)" />
                </svg>
              </div>

              {/* Technical Specs */}
              <div className="mt-6 text-center">
                <div className="text-xs font-mono text-[#0A0A0A]/50 bg-[#E5E5E5] px-4 py-2 rounded">
                  SCALE: ENTERPRISE | COMPLEXITY: HIGH | ACCURACY: ARCHITECTURAL
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-6 font-montserrat">
                Avoid the "Junior Developer" Trap
              </h3>
              <p className="text-lg text-[#0A0A0A]/70 leading-relaxed font-inter font-light mb-8">
                Many companies hire developers to build features. We help you build <span className="text-[#FF6B00] font-semibold">Systems</span>. We ensure that the tools you build today don't become the technical debt of tomorrow.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] mb-4 font-montserrat">Key Benefits</h4>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:border-[#FF6B00] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-[#0A0A0A] mb-2 font-montserrat">{benefit.title}</h5>
                      <p className="text-[#0A0A0A]/70 text-sm font-inter font-light">{benefit.description}</p>
                      <div className="mt-3 text-xs font-mono text-[#FF6B00] font-bold">
                        {benefit.metric}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-6"
            >
              <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-4 font-bold" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Get Your Technical Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-[#0A0A0A] text-white px-8 py-4 rounded-xl">
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
            <span className="font-mono text-sm">ARCHITECTURE_PRINCIPLE: SYSTEMS_OVER_FEATURES | APPROACH: STRATEGIC | RESULT: FUTURE_PROOF</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
