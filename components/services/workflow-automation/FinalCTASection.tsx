import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FinalCTASection = () => (
  <section className="py-24 bg-white">
    <div className="container">
      <div className="bg-[#0A0A0A] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8 relative z-10 leading-none">
          Ready to stop the <br />{" "}
          <span className="text-primary italic">Manual Grind?</span>
        </h2>
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105"
          >
            Request Workflow Audit
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
