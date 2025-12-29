import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Box, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center">
      {/* Background Graphic: The Neural Line */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <motion.path
          d="M -100 500 Q 400 100 800 500 T 1800 300"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF6B00" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: The Vision */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-mono text-sm tracking-widest"
          >
            <span className="h-px w-8 bg-primary"></span>
            ENGINEERING AUTONOMY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter"
          >
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400  ">
              INVISIBLE 
            </span> <br />
            WORKFORCES.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed"
          >
            We don't just build tools. We architect autonomous systems that handle your operations, sales, and data while you focus on the next big move.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-7 text-lg font-bold group">
              <Link to="/case-studies" className="flex items-center gap-2">
                View Systems <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-black/10 bg-black text-white hover:bg-orange/5 rounded-full px-8 py-7 text-lg font-bold">
              <Link to="/contact">Book a Consult</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: The Engine (Interactive Terminal Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <div className="bg-[#151515] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="text-[10px] font-mono text-gray-500 ml-4 flex items-center gap-2">
                <Terminal size={12} /> driplare_engine_v1.0.exe
              </div>
            </div>

            {/* Simulated Logic Flow */}
            <div className="space-y-4 font-mono text-xs">
              <div className="flex gap-3 text-green-400">
                <span className="text-gray-600">01</span>
                <span>$ init_ai_agent --target="inbox_automation"</span>
              </div>
              <div className="flex gap-3 text-blue-400">
                <span className="text-gray-600">02</span>
                <span className="flex items-center gap-2">
                  <Activity size={12} /> status: TRAINING_ON_CATALOG_DATA...
                </span>
              </div>
              <div className="flex gap-3 text-gray-400">
                <span className="text-gray-600">03</span>
                <span>// Integrating Shopify & Meta APIs</span>
              </div>
              <div className="flex gap-3 text-primary font-bold">
                <span className="text-gray-600">04</span>
                <span className="animate-pulse">SYSTEM_LIVE: 24/7 AUTONOMOUS_MODE</span>
              </div>
            </div>

            {/* Floating Visual Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all" />
          </div>

          {/* Abstract Floating Stats */}
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Box size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 leading-none">Efficiency</div>
              <div className="text-lg font-black text-black leading-none">+300%</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="text-[10rem] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter uppercase leading-none">
          SYSTEMS
        </p>
      </div>
    </section>
  );
}