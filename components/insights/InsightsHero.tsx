import { motion } from "framer-motion";

export function InsightsHero() {
  return (
    <section className="pt-32 pb-16 bg-white border-b border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Intel_Stream_Live
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0A0A0A] mb-6 leading-[0.85]">
            SYSTEMS <br />
            <span className="text-primary italic">INTELLIGENCE.</span>
          </h1>
          <p className="text-xl text-[#0A0A0A]/60 max-w-2xl font-medium leading-relaxed">
            Technical breakdowns, automation roadmaps, and architectural insights for the modern autonomous enterprise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
