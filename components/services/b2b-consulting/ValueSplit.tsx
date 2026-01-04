'use client'

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

export function ValueSplit() {
  const benefits = [
    { icon: TrendingUp, title: "Reduced Dev Waste", metric: "30%_SAVINGS" },
    {
      icon: DollarSign,
      title: "Hosting Optimization",
      metric: "40%_EFFICIENCY",
    },
    { icon: Shield, title: "Security Compliance", metric: "100%_SECURE" },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] border-y border-black/5 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Architectural Visual Container */}
            <div className="bg-white border-2 border-black rounded-[2.5rem] p-4 shadow-2xl overflow-hidden group">
              <div className="bg-[#0A0A0B] rounded-[2rem] p-12 aspect-square flex flex-col items-center justify-center relative">
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
                <Layers className="w-24 h-24 text-[#FF6B00] mb-8 relative z-10" />
                <div className="text-center relative z-10">
                  <div className="font-mono text-[10px] text-[#FF6B00] tracking-widest mb-2 font-bold uppercase">
                    System_Hierarchy_v4.2
                  </div>
                  <div className="text-white/40 text-xs font-inter max-w-[200px]">
                    Strategic architecture visualizing data flow and security
                    nodes.
                  </div>
                </div>
              </div>
            </div>
            {/* Metadata overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white border border-black/10 p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="text-[10px] font-mono font-bold text-black/30 mb-1 uppercase">
                Output_Metric
              </div>
              <div className="text-2xl font-black text-[#FF6B00] font-montserrat tracking-tighter">
                ZERO_DEBT
              </div>
            </div>
          </motion.div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black font-montserrat tracking-tighter uppercase mb-6 leading-tight">
                Avoid the <br />
                <span className="text-[#FF6B00]">"Feature Trap"</span>
              </h2>
              <p className="text-lg text-black/60 font-inter leading-relaxed">
                Most agencies build features. We build **Systems**. We ensure
                the tools you build today don't become the technical debt of
                tomorrow.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border border-black/5 rounded-2xl flex items-center gap-4 hover:border-[#FF6B00]/30 transition-all group"
                >
                  <div className="p-3 bg-black text-white rounded-xl group-hover:bg-[#FF6B00] transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-black/40 font-mono uppercase tracking-widest mb-1">
                      {item.metric}
                    </div>
                    <div className="text-sm font-bold text-black font-montserrat">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-[#FF6B00] hover:bg-black text-white px-10 h-16 rounded-xl font-bold shadow-xl shadow-[#FF6B00]/20 transition-all text-lg group">
              <Link href="/contact" className="flex items-center gap-3">
                Request Strategy Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
