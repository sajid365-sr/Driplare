import { motion } from "framer-motion";

export function MethodologyHero() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 rounded-none font-mono text-sm">
              DISCIPLINED EXECUTION
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-[#0A0A0A] mb-8 leading-tight font-montserrat"
          >
            We Don't Guess.{" "}
            <span className="text-[#FF6B00]">We Engineer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#0A0A0A]/70 max-w-3xl mx-auto leading-relaxed mb-12 font-inter font-light"
          >
            Every Driplare project follows a strict 4-phase architectural lifecycle. We combine software engineering rigors with AI innovation to ensure your systems are stable, scalable, and secure.
          </motion.p>

          {/* Technical Specs Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <div className="bg-[#F9F9F9] p-4 border border-[#E5E5E5] rounded-none">
              <div className="font-mono text-xs text-[#0A0A0A]/60 mb-1">[ PHASE_01 ]</div>
              <div className="font-montserrat font-bold text-[#0A0A0A]">Systems Audit</div>
            </div>
            <div className="bg-[#F9F9F9] p-4 border border-[#E5E5E5] rounded-none">
              <div className="font-mono text-xs text-[#0A0A0A]/60 mb-1">[ PHASE_02 ]</div>
              <div className="font-montserrat font-bold text-[#0A0A0A]">Logic Architecture</div>
            </div>
            <div className="bg-[#F9F9F9] p-4 border border-[#E5E5E5] rounded-none">
              <div className="font-mono text-xs text-[#0A0A0A]/60 mb-1">[ PHASE_03 ]</div>
              <div className="font-montserrat font-bold text-[#0A0A0A]">Deployment</div>
            </div>
            <div className="bg-[#F9F9F9] p-4 border border-[#E5E5E5] rounded-none">
              <div className="font-mono text-xs text-[#0A0A0A]/60 mb-1">[ PHASE_04 ]</div>
              <div className="font-montserrat font-bold text-[#0A0A0A]">Optimization</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
