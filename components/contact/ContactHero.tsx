"use client";
import { motion } from "framer-motion";
import { Bot, ArrowRight } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Technical Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern
              id="hero-circuit"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#FF6B00" opacity="0.3" />
              <circle cx="18" cy="18" r="1" fill="#FF6B00" opacity="0.3" />
              <line
                x1="2"
                y1="2"
                x2="18"
                y2="18"
                stroke="#E5E5E5"
                strokeWidth="0.5"
              />
              <line
                x1="18"
                y1="2"
                x2="2"
                y2="18"
                stroke="#E5E5E5"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-circuit)" />
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
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-mono text-sm">
              <Bot className="w-4 h-4 text-[#FF6B00]" />
              <span>SYSTEMS_ENGAGED</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A0A0A] mb-8 leading-tight font-montserrat"
          >
            Let's Engineer Your Next{" "}
            <span className="text-[#FF6B00]">Competitive Advantage.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed mb-12 font-montserrat"
          >
            Choose your preferred path: Talk to our AI Architect Assistant for
            instant scheduling, or send a manual brief.
          </motion.p>

          {/* Path Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <div className="flex items-center gap-3 text-[#0A0A0A]/60">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm">AI_ARCHITECT_ASSISTANT</span>
            </div>

            <div className="hidden sm:block w-8 h-0.5 bg-[#E5E5E5]"></div>

            <div className="flex items-center gap-3 text-[#0A0A0A]/60">
              <div className="w-3 h-3 bg-[#0A0A0A] rounded-full"></div>
              <span className="font-mono text-sm">MANUAL_BRIEF_SYSTEM</span>
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
          <span className="text-[#0A0A0A]/60 text-sm font-mono">
            SELECT_YOUR_PATH
          </span>
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

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 hidden md:block"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity },
        }}
      >
        <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-[#FF6B00] rounded-full"></div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 hidden md:block"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-8 h-8 bg-[#0A0A0A]/10 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-[#0A0A0A] rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
