"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Shield,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ValueSplit() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: TrendingUp,
      title: t("services.consulting.valueSplit.benefits.dev"),
      metric: "30%_SAVINGS",
    },
    {
      icon: DollarSign,
      title: t("services.consulting.valueSplit.benefits.hosting"),
      metric: "40%_EFFICIENCY",
    },
    {
      icon: Shield,
      title: t("services.consulting.valueSplit.benefits.security"),
      metric: "100%_SECURE",
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] border-y border-black/5 relative overflow-hidden">
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Architectural Visual Container */}
            <div className="bg-white border-2 border-black rounded-[3rem] p-4 shadow-2xl overflow-hidden group">
              <div className="bg-[#0A0A0B] rounded-[2.5rem] p-12 aspect-square flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <pattern
                      id="blueprint-grid"
                      x="0"
                      y="0"
                      width="30"
                      height="30"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 30 0 L 0 0 0 30"
                        fill="none"
                        stroke="#FF6B00"
                        strokeWidth="0.5"
                      />
                    </pattern>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#blueprint-grid)"
                    />
                  </svg>
                </div>
                <Layers className="w-24 h-24 text-primary mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="text-center relative z-10">
                  <div className="font-mono text-[10px] text-primary tracking-widest mb-4 font-black uppercase">
                    System_Hierarchy_v4.2
                  </div>
                  <div className="text-white/40 text-xs font-medium max-w-[220px] leading-relaxed">
                    {t("services.consulting.valueSplit.visualText")}
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata overlay */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-6 -right-6 bg-white border-2 border-black p-8 rounded-3xl shadow-2xl hidden md:block"
            >
              <div className="text-[10px] font-mono font-black text-black/30 mb-2 uppercase tracking-tighter">
                Output_Metric
              </div>
              <div className="text-3xl font-black text-primary font-montserrat tracking-tighter italic">
                ZERO_DEBT
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black font-montserrat tracking-tighter uppercase mb-8 leading-[0.9]">
                {t("services.consulting.valueSplit.title")} <br />
                <span className="text-primary italic">
                  {t("services.consulting.valueSplit.titleSpan")}
                </span>
              </h2>
              <p className="text-lg md:text-xl text-black/60 font-medium leading-relaxed max-w-xl">
                {/* description with markdown-like bold handling if needed, or direct string */}
                {t("services.consulting.valueSplit.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border border-black/5 rounded-2xl flex items-center gap-5 hover:border-primary/30 transition-all group shadow-sm"
                >
                  <div className="p-4 bg-[#0A0A0B] text-white rounded-2xl group-hover:bg-primary transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-black/30 font-mono uppercase tracking-widest mb-1">
                      {item.metric}
                    </div>
                    <div className="text-sm font-bold text-black font-montserrat uppercase tracking-tight">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="bg-primary hover:bg-[#0A0A0B] text-white px-10 h-20 rounded-2xl font-black shadow-2xl shadow-primary/20 transition-all text-xl group w-full sm:w-auto"
              asChild
            >
              <Link
                href="/contact"
                className="flex items-center justify-center gap-4"
              >
                {t("services.consulting.valueSplit.cta")}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
