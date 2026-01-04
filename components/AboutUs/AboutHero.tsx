'use client'

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Blueprint Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px),
            radial-gradient(circle at 20% 50%, #FF6B00 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, #FF6B00 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, #FF6B00 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px, 150px 150px, 200px 200px'
        }}
      />

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#FF6B00" opacity="0.3"/>
              <circle cx="18" cy="18" r="1" fill="#FF6B00" opacity="0.3"/>
              <line x1="2" y1="2" x2="18" y2="18" stroke="#E5E5E5" strokeWidth="0.5"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="#E5E5E5" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 bg-[#FF6B00] text-white font-mono text-sm tracking-wider rounded-full">
              BEYOND THE CODE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A0A0A] mb-8 leading-tight"
          >
            We Don't Just Build Software.{" "}
            <span className="block text-[#FF6B00]">We Architect Efficiency.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed"
          >
            Driplare was founded to solve a singular problem: the friction between business growth and manual operations. We bridge that gap with intelligent systems.
          </motion.p>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-20 left-10 hidden md:block"
          >
            <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#FF6B00] rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-32 right-16 hidden md:block"
          >
            <div className="w-12 h-12 bg-[#0A0A0A]/10 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-[#0A0A0A] rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-32 left-20 hidden md:block"
          >
            <div className="w-20 h-20 bg-[#E5E5E5] rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-[#FF6B00] rounded-full opacity-50"></div>
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
          <span className="text-[#0A0A0A]/60 text-sm font-mono">SCROLL_TO_EXPLORE</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#0A0A0A]/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#FF6B00] rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
