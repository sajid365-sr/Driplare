'use client'

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ConsultingCTA() {
  return (
    <section className="py-32 bg-[#0A0A0B] text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-10">
            <Terminal className="w-5 h-5 text-[#FF6B00]" />
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-white/60">
              READY_FOR_SPEC_REVIEW?
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter uppercase mb-10 leading-[1.05]">
            Let’s Engineer Your{" "}
            <span className="text-[#FF6B00]">Next Decade</span> of Growth.
          </h2>

          <p className="text-xl text-white/50 font-inter mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop guessing your technical roadmap. Get a second opinion from
            architects who build for scale.
          </p>

          <Button
            size="lg"
            className="bg-[#FF6B00] hover:bg-white hover:text-black text-white px-12 h-20 rounded-2xl font-black text-xl shadow-2xl shadow-[#FF6B00]/20 transition-all group"
            asChild
          >
            <Link href="/contact">
              Schedule Architecture Call
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/5 pt-12">
            {["SYSTEMS_MAPPING", "DEBT_ELIMINATION", "AI_FEASIBILITY"].map(
              (text) => (
                <div
                  key={text}
                  className="font-mono text-[9px] font-bold text-white/30 tracking-[0.4em]"
                >
                  {text}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
