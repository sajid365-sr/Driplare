import { motion } from "framer-motion";

export const SynergyGraphic = () => (
  <section className="py-24 bg-[#0A0A0A] text-white">
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            The_Driplare_Edge
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mt-4 mb-8 leading-none">
            Built for <br />
            <span className="text-primary italic">Intelligence.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            Most developers just build the app. We build the app to be{" "}
            <strong>Automation-Ready</strong>. Every system we engineer includes
            native API hooks for our AI Agents and n8n Workflows.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-black">
              !
            </div>
            <p className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
              Integration: Native // Logic: Unified
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 w-full aspect-square relative flex items-center justify-center">
          {/* Venn Diagram Visual */}
          <div className="absolute w-64 h-64 border border-primary/30 rounded-full -translate-x-12 animate-pulse" />
          <div className="absolute w-64 h-64 border border-white/10 rounded-full translate-x-12" />
          <div className="absolute w-64 h-64 border border-white/10 rounded-full -translate-y-12" />
          <div className="z-10 bg-[#0A0A0A] p-8 rounded-full border-2 border-primary shadow-[0_0_50px_rgba(255,107,0,0.2)] text-center">
            <span className="font-black text-primary text-xl uppercase tracking-tighter">
              SYNERGY
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
