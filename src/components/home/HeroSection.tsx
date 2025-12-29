import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev + 1) % 101);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Scanning effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-[#FF6B00] z-10"
        style={{ y: `${scanProgress}%` }}
        animate={{ y: [`${scanProgress}%`, `${scanProgress + 1}%`] }}
        transition={{ duration: 0.05, repeat: Infinity }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-tight">
                Stop Trading Hours for Tasks.{" "}
                <span className="block text-[#FF6B00]">Engineer Your Efficiency.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl text-[#0A0A0A]/80 max-w-lg">
                We architect custom AI Agents and autonomous workflows that work 24/7, so your team can focus on growth. No manual grind. No human error. Just systems that scale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link to="/contact">Start Your Efficiency Audit</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A]/5 px-8 py-4 text-lg"
                asChild
              >
                <Link to="/ai-services">Explore AI Agents</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 text-sm text-[#0A0A0A]/60"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B00] rounded-full"></span>
                Powering 10k+ Automated Tasks Monthly
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B00] rounded-full"></span>
                4.8/5 Rated AI Solutions
              </div>
            </motion.div>
          </div>

          {/* Right Side - Glass Logic Flow */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative bg-[#0A0A0A]/5 backdrop-blur-lg rounded-2xl p-8 border border-[#E5E5E5]"
            >
              {/* Animated nodes */}
              <div className="relative h-80 flex items-center justify-center">
                {/* Central node */}
                <motion.div
                  className="w-16 h-16 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(255, 107, 0, 0.4)',
                      '0 0 0 20px rgba(255, 107, 0, 0)',
                      '0 0 0 0 rgba(255, 107, 0, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  AI
                </motion.div>

                {/* Connecting nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white text-xs font-mono"
                    style={{
                      top: `${30 + Math.sin((i * Math.PI) / 3) * 25}%`,
                      left: `${35 + Math.cos((i * Math.PI) / 3) * 35}%`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    {i + 1}
                  </motion.div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {[...Array(6)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + Math.cos((i * Math.PI) / 3) * 35}%`}
                      y2={`${50 + Math.sin((i * Math.PI) / 3) * 25}%`}
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                </svg>
              </div>

              <div className="text-center mt-6">
                <p className="text-[#0A0A0A] font-mono text-sm">System Status: <span className="text-[#FF6B00]">ACTIVE</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}