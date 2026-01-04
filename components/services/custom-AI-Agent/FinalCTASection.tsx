import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FinalCTASection = () => (
  <section className="py-24 bg-white">
    <div className="container">
      <div className="bg-[#0A0A0A] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-colors" />

        <h2 className="text-4xl md:text-7xl font-black text-white tracking-[0.02em] uppercase mb-8 relative z-10 leading-tight">
          Stop Trading Hours <br />{" "}
          <span className="text-primary italic font-serif lowercase">for</span>{" "}
          Tasks.
        </h2>

        <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-mono uppercase tracking-[0.2em] text-[10px] font-bold">
          [ STATUS: READY_FOR_ORCHESTRATION ]
        </p>

        <Link href="/contact">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105"
          >
            Engineer Your Efficiency
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
