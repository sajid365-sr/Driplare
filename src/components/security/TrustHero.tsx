import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

export function TrustHero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Security Shield Overlay */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="shield-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="100" cy="100" r="20" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shield-pattern)" />
        </svg>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-mono text-sm">
              <Shield className="w-5 h-5 text-[#22C55E]" />
              <span>SECURITY_VERIFIED</span>
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-[#0A0A0A] mb-8 leading-tight"
          >
            Engineered for{" "}
            <span className="text-[#FF6B00]">Reliability.</span>{" "}
            Built for{" "}
            <span className="text-[#FF6B00]">Security.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Transparency is the foundation of our architecture. Explore our security protocols and find answers to the most common questions about AI integration and automation.
          </motion.p>

          {/* System Status Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-block"
          >
            <div className="bg-[#FF6B00] text-white px-8 py-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
                <span className="font-mono font-bold text-lg tracking-wider">
                  [ SYSTEM_STATUS: SECURE_AND_OPERATIONAL ]
                </span>
              </div>
            </div>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="text-3xl font-mono font-bold text-[#FF6B00] mb-2">100%</div>
              <div className="text-sm text-[#0A0A0A]/60">Data Sovereignty</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="text-3xl font-mono font-bold text-[#FF6B00] mb-2">256-bit</div>
              <div className="text-sm text-[#0A0A0A]/60">AES Encryption</div>
            </div>
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="text-3xl font-mono font-bold text-[#FF6B00] mb-2">0</div>
              <div className="text-sm text-[#0A0A0A]/60">Security Incidents</div>
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
          <span className="text-[#0A0A0A]/60 text-sm font-mono">EXPLORE_SECURITY</span>
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
    </section>
  );
}
