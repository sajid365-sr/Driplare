import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ConsultingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="cta-consulting" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="15" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="25" cy="25" r="10" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2"/>
              <circle cx="25" cy="25" r="5" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.1"/>
              <line x1="10" y1="25" x2="40" y2="25" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2"/>
              <line x1="25" y1="10" x2="25" y2="40" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-consulting)" />
        </svg>
      </div>

      {/* Guided Scroll Line */}
      <motion.div
        className="fixed left-8 top-0 w-0.5 bg-[#FF6B00] z-40"
        style={{ y: lineY }}
        transition={{ type: "spring", stiffness: 100 }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icons */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-[#FF6B00]/20 rounded-full flex items-center justify-center"
            >
              <Clock className="w-6 h-6 text-[#FF6B00]" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 bg-[#FF6B00]/20 rounded-full flex items-center justify-center"
            >
              <ArrowRight className="w-6 h-6 text-[#FF6B00]" />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight font-montserrat">
              Ready for a Technical Second Opinion?
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
              Let's look under the hood of your business and see where we can engineer more efficiency.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Schedule a Strategy Call
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#22C55E]" />
              <div className="text-sm text-white/60 font-inter font-light">Strategic Clarity</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#22C55E]" />
              <div className="text-sm text-white/60 font-inter font-light">Technical Authority</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#22C55E]" />
              <div className="text-sm text-white/60 font-inter font-light">Future-Proof Systems</div>
            </div>
          </motion.div>

          {/* Technical Footer */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-white/70">
                CONSULTING_STATUS: AVAILABLE | RESPONSE_TIME: &lt;24HRS&gt; | METHODOLOGY: PROVEN_STRATEGY
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
