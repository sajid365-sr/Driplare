'use client'

import { motion } from "framer-motion";
import { Database, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ScrapingHero() {
  return (
    <section className="relative min-h-[90vh] bg-white flex items-center justify-center overflow-hidden pt-20">
      {/* Laser Scanning Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[grid:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"
        animate={{ y: [0, 800, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#F9F9F9] border border-border/60 px-4 py-2 rounded-full mb-8"
        >
          <Database size={14} className="text-primary" />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A]/60 uppercase">
            ESTABLISHING_DATA_LINK_V4.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-[#0A0A0A] mb-8 leading-[0.9] tracking-tighter uppercase"
        >
          Your Private <br />
          <span className="text-primary italic">Web Database.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-[#0A0A0A]/50 max-w-2xl mx-auto font-medium leading-relaxed mb-12"
        >
          We engineer high-performance scrapers that bypass anti-bot shields to
          deliver structured, real-time intelligence directly to your dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            size="lg"
            className="h-16 px-10 bg-[#0A0A0A] hover:bg-primary text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-2xl"
            asChild
          >
            <Link href="/contact">
              Request Data Audit <ArrowRight className="ml-2" />
            </Link>
          </Button>

          <div className="flex items-center gap-3 font-mono text-[10px] font-bold text-[#0A0A0A]/40 uppercase tracking-widest bg-[#F9F9F9] px-4 py-2 rounded-lg border border-border/40">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            24/7_Market_Scanner_Active
          </div>
        </motion.div>

        {/* Metrics Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "REQUESTS_DAILY", val: "500K+" },
            { label: "UPTIME_REL", val: "99.9%" },
            { label: "SOURCES", val: "100+" },
            { label: "LATENCY", val: "<200ms" },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-white border border-border/40 p-4 rounded-2xl"
            >
              <div className="text-2xl font-black tracking-tighter text-[#0A0A0A]">
                {m.val}
              </div>
              <div className="font-mono text-[9px] text-[#0A0A0A]/30 uppercase tracking-widest mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
