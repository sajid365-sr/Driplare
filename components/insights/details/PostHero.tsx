import { BlogPost } from "@/app/(admin)/admin/BlogManager";
import { Clock, Cpu, Calendar, ShieldCheck } from "lucide-react";

interface PostHeroProps {
  post: BlogPost;
}

export function PostHero({ post }: PostHeroProps) {
  const wordCount = post.content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <section className="pt-8 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono text-[12px] font-black text-primary uppercase tracking-[0.2em]">
                LIVE_DOCUMENT // {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[#0A0A0A] tracking-tighter leading-[0.95] uppercase">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0A0A0A]/70">
                <Calendar size={14} className="text-primary" />
                MODIFIED: {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0A0A0A]/70">
                <Clock size={14} className="text-primary" />
                READ_TIME: {readTime} MIN
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-70" />
            <div className="relative bg-[#0A0A0A] text-white p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="font-mono text-[12px] font-black tracking-widest text-white/40">
                  SYSTEM_SPECIFICATIONS_V1.0
                </span>
                <ShieldCheck size={20} className="text-primary" />
              </div>

              <div className="space-y-6">
                {[
                  { label: "ARCHITECT", val: "DRIPLARE_LABS" },
                  { label: "STABILITY", val: "PRODUCTION_READY" },
                  { label: "COMPUTE", val: "O1_ORCHESTRATION" },
                  { label: "LOGIC_FLOW", val: "RAG_ADAPTIVE" },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center group"
                  >
                    <span className="font-mono text-base text-white/30 group-hover:text-primary transition-colors">
                      {spec.label}
                    </span>
                    <span className="font-mono text-xs font-black tracking-widest">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[11px] font-mono leading-relaxed text-white/60">
                  {post.content.replace(/<[^>]+>/g, "").substring(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
