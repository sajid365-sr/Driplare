import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ConsultingHero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Blueprint Background */}
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

      {/* Sharp Black Border */}
      <div className="absolute inset-8 border-2 border-[#0A0A0A] rounded-3xl pointer-events-none"></div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-mono text-sm">
              <span>HIGH-STAKE STRATEGY</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-semibold text-[#0A0A0A] mb-8 leading-tight font-montserrat"
          >
            Technology is a Tool.{" "}
            <span className="text-[#FF6B00]">Architecture is the Strategy.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed mb-12 font-inter font-light"
          >
            We provide the technical clarity needed to scale. From AI feasibility audits to full-stack system roadmaps, we help B2B leaders build future-proof infrastructure without the technical debt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
              asChild
            >
              <Link to="/contact" className="flex items-center gap-3">
                Book a Strategic Audit
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          {/* Architecture Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 relative"
          >
            <div className="bg-gradient-to-br from-[#F5F5F5] to-[#E5E5E5] rounded-2xl p-12 border border-[#E5E5E5] shadow-lg">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-[#0A0A0A]/30 mx-auto mb-4" />
                <p className="text-[#0A0A0A]/50 font-mono text-sm">ARCHITECTURAL BLUEPRINT</p>
                <p className="text-[#0A0A0A]/30 text-xs mt-2">High-end architectural photography placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Guided Scroll Line - Architect's Ruler */}
      <motion.div
        className="fixed left-8 top-0 w-0.5 bg-[#FF6B00] z-50"
        style={{
          height: '100vh',
          transformOrigin: 'top'
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#0A0A0A]/60 text-sm font-mono">EXPLORE_STRATEGY</span>
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
