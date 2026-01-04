'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sparkles } from "lucide-react";

export function PricingHero() {
  const [billingType, setBillingType] = useState("setup");

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden mt-10">
      {/* Blueprint Grid Background */}
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

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="pricing-circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#FF6B00" opacity="0.3"/>
              <circle cx="18" cy="18" r="1" fill="#FF6B00" opacity="0.3"/>
              <line x1="2" y1="2" x2="18" y2="18" stroke="#E5E5E5" strokeWidth="0.5"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="#E5E5E5" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-circuit)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
        <Sparkles size={14} /> SYSTEM_INVESTMENT
      </div>

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A0A0A] mb-8 leading-tight"
          >
            Invest in Systems,{" "}
            <span className="text-[#FF6B00]">Not Just Software.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We don't charge for hours; we charge for the value our systems create. Choose a plan that fits your current scale, or request a custom architectural quote.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mb-8"
          >
            <ToggleGroup
              type="single"
              value={billingType}
              onValueChange={(value) => value && setBillingType(value)}
              className="bg-[#F5F5F5] p-1 rounded-xl"
            >
              <ToggleGroupItem
                value="retainer"
                className="px-6 py-3 rounded-lg font-mono text-sm data-[state=on]:bg-[#FF6B00] data-[state=on]:text-white"
              >
                Monthly Retainer
              </ToggleGroupItem>
              <ToggleGroupItem
                value="setup"
                className="px-6 py-3 rounded-lg font-mono text-sm data-[state=on]:bg-[#FF6B00] data-[state=on]:text-white"
              >
                One-Time Setup
              </ToggleGroupItem>
            </ToggleGroup>
          </motion.div>

          {/* ROI Indicators */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-2">300%</div>
              <div className="text-sm text-[#0A0A0A]/60">Average ROI</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-2">6mo</div>
              <div className="text-sm text-[#0A0A0A]/60">Payback Period</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-2">99.9%</div>
              <div className="text-sm text-[#0A0A0A]/60">System Uptime</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#0A0A0A]/60 text-sm font-mono">EXPLORE_INVESTMENTS</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col gap-1"
          >
            <div className="w-0.5 h-4 bg-[#FF6B00]"></div>
            <div className="w-0.5 h-2 bg-[#0A0A0A]"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
