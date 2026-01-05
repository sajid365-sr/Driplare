"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export function PricingCTA() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #FF6B00 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #FF6B00 1px, transparent 1px)
          `,
          backgroundSize: "150px 150px",
        }}
      />

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient
              id="ctaCircuitGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
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
            stroke="url(#ctaCircuitGradient)"
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
            stroke="url(#ctaCircuitGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>

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
              <TrendingUp className="w-6 h-6 text-white" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to buy back your time?
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can engineer efficiency into your specific
              business model.
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
                <Link href="/contact" className="flex items-center gap-3">
                  Start Your Efficiency Audit
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
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">
                30-Day
              </div>
              <div className="text-white/60 text-sm">Money-Back Guarantee</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">
                24/7
              </div>
              <div className="text-white/60 text-sm">Technical Support</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">
                ∞
              </div>
              <div className="text-white/60 text-sm">Scalability Promise</div>
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
                INVESTMENT_READINESS: ACTIVE | ROI_CALCULATOR: AVAILABLE |
                NEXT_STEP: CONTACT
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
