import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#FFFFFF 1px, transparent 1px),
            linear-gradient(90deg, #FFFFFF 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Circuit animation overlay */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#pulseGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#FF6B00] bg-clip-text text-transparent">
            Ready to build a business that runs itself?
          </h2>

          {/* Subtext */}
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto font-mono">
            Join the elite group of businesses that have automated their operations and reclaimed their time.
          </p>

          {/* CTA Button */}
          <motion.div
            className="mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-3">
                Book Your Technical Discovery Call
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          {/* Scarcity footer note */}
          <motion.div
            className="inline-flex items-center gap-3 bg-[#1F1F1F] border border-[#FF6B00]/30 rounded-full px-6 py-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Clock className="w-5 h-5 text-[#FF6B00]" />
            <span className="text-white/80 font-mono text-sm">
              Limited to 2 new client integrations per month to ensure architectural precision.
            </span>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF6B00] font-mono">99.9%</div>
              <div className="text-white/60 text-sm">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF6B00] font-mono">24/7</div>
              <div className="text-white/60 text-sm">System Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF6B00] font-mono">∞</div>
              <div className="text-white/60 text-sm">Scalability Potential</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
