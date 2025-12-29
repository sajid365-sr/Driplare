import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#FFFFFF 1px, transparent 1px),
            linear-gradient(90deg, #FFFFFF 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0%"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke="url(#ctaGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.line
            x1="0%"
            y1="70%"
            x2="100%"
            y2="70%"
            stroke="url(#ctaGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
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
          <div className="inline-flex items-center gap-2 bg-[#1F1F1F] px-4 py-2 rounded-full mb-8">
            <TrendingUp className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-white/60 font-mono text-sm">NEXT_LEVEL_SYSTEMS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#FF6B00] bg-clip-text text-transparent">
            Your Business is One Agent Away from Infinite Scale
          </h2>

          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Ready to see your logo on this page next? Let's architect a system that doesn't just work—it evolves.
          </p>

          <motion.div
            className="mb-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-3">
                Book Your Efficiency Audit
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-mono font-bold text-[#FF6B00] mb-2">24/7</div>
              <div className="text-white/60 text-sm">AUTOMATED MONITORING</div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-mono font-bold text-[#FF6B00] mb-2">100%</div>
              <div className="text-white/60 text-sm">SYSTEM RELIABILITY</div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-3xl font-mono font-bold text-[#FF6B00] mb-2">∞</div>
              <div className="text-white/60 text-sm">SCALING POTENTIAL</div>
            </motion.div>
          </div>

          {/* Technical Footer */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center font-mono text-sm text-white/40">
              <div>READY_TO_ENGINEER: TRUE | SYSTEM_STATUS: ACTIVE | NEXT_INTEGRATION: AVAILABLE</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
