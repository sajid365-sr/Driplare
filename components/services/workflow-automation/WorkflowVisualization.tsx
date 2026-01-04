'use client'

import { motion } from "framer-motion";
import { Zap, ArrowRight, Settings } from "lucide-react";

export const WorkflowVisualization = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="relative group p-1 bg-border/40 rounded-[3rem] overflow-hidden shadow-2xl">
          {/* Main Visual Container */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.8rem] overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://thumbs.dreamstime.com/b/futuristic-neon-digital-circuit-board-background-glowing-abstract-lines-circular-nodes-high-tech-connectivity-design-402151126.jpg')`, // Technical circuit/node background
              }}
            />

            {/* Dark/Gradient Overlay to make elements pop */}
            <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-[2px]" />

            {/* The Orchestration Layer (The UI Elements) */}
            <div className="relative z-10 w-full max-w-5xl px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                {/* Step 1: Input */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-full md:w-64 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-center"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="text-white/40" size={20} />
                  </div>
                  <span className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase mb-2 block">
                    Trigger
                  </span>
                  <p className="text-white font-bold text-sm uppercase">
                    Manual Data Entry
                  </p>
                </motion.div>

                {/* Animated Connector 1 */}
                <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary relative">
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#FF6B00]"
                  />
                </div>

                {/* Step 2: Central Hub */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="w-full md:w-80 p-10 bg-[#0A0A0A] border-2 border-primary rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(255,107,0,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <Zap
                    className="text-primary mx-auto mb-4 animate-pulse"
                    size={40}
                    fill="currentColor"
                  />
                  <h3 className="text-white font-black text-xl tracking-tighter uppercase mb-2">
                    Driplare_Engine
                  </h3>
                  <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">
                    Status: Processing_Logic
                  </span>
                </motion.div>

                {/* Animated Connector 2 */}
                <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-primary/0 relative">
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#FF6B00]"
                  />
                </div>

                {/* Step 3: Output */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-full md:w-64 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-center"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="text-white/40" size={20} />
                  </div>
                  <span className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase mb-2 block">
                    Action
                  </span>
                  <p className="text-white font-bold text-sm uppercase">
                    Auto-Synced Success
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="px-6 py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full">
              <p className="font-mono text-[10px] font-black text-primary tracking-[0.4em] uppercase">
                System_Architecture_Visualization_V2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
