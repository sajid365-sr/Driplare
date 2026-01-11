"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ConsultingHero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="hero-grid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 border border-black/10 rounded-full font-mono text-[10px] tracking-widest mb-6 bg-black/[0.02]"
              >
                <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse" />
                {t("services.consulting.hero.badge")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black text-[#0A0A0B] mb-8 leading-[1.05] font-montserrat tracking-tighter"
              >
                {t("services.consulting.hero.titlePart1")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8533]">
                  {t("services.consulting.hero.titlePart2")}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-black/60 max-w-xl leading-relaxed mb-10 font-medium"
              >
                {t("services.consulting.hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-[#0A0A0B] hover:bg-primary text-white px-8 py-7 text-lg font-bold rounded-xl transition-all shadow-xl shadow-black/10 group"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    {t("services.consulting.hero.btnPrimary")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-black/10 hover:bg-black/5 px-8 py-7 text-lg font-bold rounded-xl"
                >
                  {t("services.consulting.hero.btnSecondary")}
                </Button>
              </motion.div>
            </div>

            {/* Neural Schematic Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex-1 relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary/5 rounded-[3rem] rotate-3 scale-105 border border-primary/10" />
                <div className="relative h-full w-full bg-white border-2 border-black rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group">
                  <div className="flex justify-between items-center mb-10 border-b border-black/5 pb-5">
                    <div className="font-mono text-[10px] font-bold tracking-tighter">
                      {t("services.consulting.hero.schematic.title")}
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-green-500/20 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        label: t("services.consulting.hero.schematic.node1"),
                        val: "ACTIVE",
                      },
                      {
                        label: t("services.consulting.hero.schematic.node2"),
                        val: "OPTIMIZED",
                      },
                      {
                        label: t("services.consulting.hero.schematic.node3"),
                        val: "READY",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-3">
                        <div className="flex justify-between text-[9px] font-mono font-bold uppercase tracking-widest">
                          <span>{item.label}</span>
                          <span className="text-primary">{item.val}</span>
                        </div>
                        <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, delay: 1.2 + i * 0.3 }}
                            className="h-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 flex justify-center">
                    <div className="relative">
                      <Cpu className="w-20 h-20 text-black/5 group-hover:text-primary/10 transition-colors duration-700" />
                      <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
