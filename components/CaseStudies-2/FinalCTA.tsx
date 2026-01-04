import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-24 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          {/* Decorative background text */}
          <div className="absolute top-0 left-0 text-[10rem] font-black opacity-5 pointer-events-none -translate-x-1/4 -translate-y-1/4">
            RESULTS
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Ready for your own <br /> Case Study?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg font-medium">
            Let's identify the manual labor in your business and replace it with
            intelligent, autonomous infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-8 text-xl font-bold shadow-2xl"
            >
              <Link href="/contact">
                Book Architecture Call <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
