import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => (
  <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
    <div className="container relative z-10">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 bg-[#F9F9F9] border border-border/60 px-4 py-2 rounded-full mb-8">
          <Activity size={14} className="text-primary" />
          <span className="font-mono text-[10px] font-black tracking-[0.2em] text-[#0A0A0A]/60 uppercase">
            STATUS // SYSTEMS_OPTIMIZATION_ACTIVE
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-[#0A0A0A] uppercase">
          Your Business, <br />
          <span className="text-primary italic">On Autopilot.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#0A0A0A]/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Stop losing hours to "copy-paste" tasks. We architect seamless
          automated pipelines that connect your stack and execute workflows
          while you sleep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/contact">
            <Button
              size="lg"
              className="h-16 px-10 bg-[#0A0A0A] hover:bg-primary text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl"
            >
              Start Automating Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link
            to="/portfolio"
            className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]/40 hover:text-primary transition-colors"
          >
            [ BROWSE_FLOW_EXAMPLES ]
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);
