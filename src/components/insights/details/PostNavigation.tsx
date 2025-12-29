import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PostNavigationProps {
  previousPost?: { id: string; title: string };
  nextPost?: { id: string; title: string };
}

export function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 py-12 border-t border-border/50">
      {previousPost && (
        <Link to={`/insights/${previousPost.id}`} className="flex-1 group">
          <div className="h-full p-8 bg-white border border-border/50 rounded-[2.5rem] hover:border-primary/50 transition-all group-active:scale-[0.98]">
            <div className="flex items-center gap-2 mb-4">
               <ArrowLeft size={16} className="text-primary group-hover:-translate-x-1 transition-transform" />
               <span className="font-mono text-[10px] font-bold text-[#0A0A0A]/30 uppercase tracking-widest">PREV_POST</span>
            </div>
            <h4 className="font-black text-lg text-[#0A0A0A] uppercase leading-[1.1]">{previousPost.title}</h4>
          </div>
        </Link>
      )}
      {nextPost && (
        <Link to={`/insights/${nextPost.id}`} className="flex-1 group text-right">
          <div className="h-full p-8 bg-[#0A0A0A] rounded-[2.5rem] hover:bg-[#111111] transition-all group-active:scale-[0.98] shadow-xl">
            <div className="flex items-center gap-2 mb-4 justify-end">
               <span className="font-mono text-[10px] font-bold text-white/30 uppercase tracking-widest">NEXT_POST</span>
               <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="font-black text-lg text-white uppercase leading-[1.1]">{nextPost.title}</h4>
          </div>
        </Link>
      )}
    </div>
  );
}