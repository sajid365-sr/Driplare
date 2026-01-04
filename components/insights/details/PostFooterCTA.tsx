import { BlogPost } from "@/app/admin/BlogManager";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PostFooterCTAProps {
  post: BlogPost;
}

export function PostFooterCTA({ post }: PostFooterCTAProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto bg-white border border-border/60 p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
          {/* Decorative Blueprint elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-primary/20 rounded-tl-[3rem]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-primary/20 rounded-br-[3rem]" />

          <h2 className="text-3xl md:text-5xl font-black text-[#0A0A0A] mb-8 tracking-tighter uppercase">
            Deploy this framework <br />
            <span className="text-primary italic">In your infrastructure</span>
          </h2>

          <p className="text-lg text-[#0A0A0A]/60 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Ready to implement {post.category.replace("_", " ")} logic? Get our
            full deployment schematic and technical brief within 24 hours.
          </p>

          <Link href="/contact">
            <Button className="bg-[#0A0A0A] hover:bg-primary text-white h-16 px-12 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1">
              REQUEST_TECHNICAL_BRIEF_V.1
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>

          <div className="mt-12 flex justify-center gap-8 opacity-70">
            <div className="text-center font-mono text-[12px] font-bold uppercase">
              FILE: PDF_BLUEPRINT
            </div>
            <div className="text-center font-mono text-[12px] font-bold uppercase">
              AUTH: VERIFIED_LABS
            </div>
            <div className="text-center font-mono text-[12px] font-bold uppercase">
              CODE: MERN_AGENT_FLOW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
