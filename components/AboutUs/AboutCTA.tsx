'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Zap, Target } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="ctaCircuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0%"
            y1="20%"
            x2="100%"
            y2="20%"
            stroke="url(#ctaCircuitGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.line
            x1="0%"
            y1="80%"
            x2="100%"
            y2="80%"
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
          {/* Icons Row */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center"
            >
              <Users className="w-6 h-6 text-[#FF6B00]" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-[#0A0A0A]/10 rounded-full flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-[#0A0A0A]" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center"
            >
              <Target className="w-6 h-6 text-[#FF6B00]" />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] leading-tight">
              Ready to meet your new{" "}
              <span className="text-[#FF6B00]">digital workforce</span>?
            </h2>

            <p className="text-xl text-[#0A0A0A]/70 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can engineer efficiency into your specific business model.
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
                  Book a Strategy Session
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
              <div className="text-2xl font-mono font-bold text-[#FF6B00]">100%</div>
              <div className="text-[#0A0A0A]/60 text-sm">Custom Solutions</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00]">24/7</div>
              <div className="text-[#0A0A0A]/60 text-sm">System Monitoring</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#FF6B00]">∞</div>
              <div className="text-[#0A0A0A]/60 text-sm">Scalability</div>
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
            <div className="inline-flex items-center gap-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[#0A0A0A]/60 font-mono text-sm">
                READY_FOR_COLLABORATION: TRUE | STATUS: ACTIVE
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
