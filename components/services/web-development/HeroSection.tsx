'use client'

import { motion } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      <div className="container relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 bg-[#F9F9F9] border border-border/60 px-4 py-2 rounded-full mb-8">
            <Box size={14} className="text-primary" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A]/60 uppercase">
              INFRASTRUCTURE // MERN_CORE_V1
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-[#0A0A0A] uppercase">
            Scalable Systems <br />
            <span className="text-primary italic">Built to Endure.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#0A0A0A]/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            We don't just build websites; we engineer high-performance web
            ecosystems. Robust, secure, and ready to handle your next 10x growth
            phase.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-16 px-10 bg-[#0A0A0A] hover:bg-primary text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl"
              >
                Consult an Architect
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="/case-studies"
              className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]/40 hover:text-primary transition-colors"
            >
              [ VIEW_STACK_CAPABILITIES ]
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
