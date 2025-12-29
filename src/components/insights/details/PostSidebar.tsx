import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ListTree, Share2 } from "lucide-react";

interface PostSidebarProps {
  tocItems?: string[];
  relatedPosts?: Array<{ id: string; title: string; cover_image?: string }>;
}

export function PostSidebar({
  tocItems = [],
  relatedPosts = [],
}: PostSidebarProps) {
  return (
    <aside className="space-y-8">
      {/* 1. Table of Contents */}
      <div className="bg-white border border-border/60 p-8 rounded-[2.5rem] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <ListTree size={18} className="text-primary" />
          <h3 className="font-black text-sm uppercase tracking-tighter">
            Documentation_Path
          </h3>
        </div>
        <nav className="space-y-4">
          {tocItems.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                document
                  .getElementById(item.toLowerCase().replace(/\s+/g, "-"))
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-3 w-full text-left font-mono text-[12px] font-bold text-[#0A0A0A]/70 hover:text-primary transition-all"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                _0{index + 1}
              </span>
              {item.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* 2. Newsletter Widget - Architectural Theme */}
      <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-white font-black text-lg uppercase tracking-tighter mb-2">
            Sync_Intelligence
          </h3>
          <p className="text-white/40 text-sm mb-6 font-medium leading-relaxed italic">
            Weekly deep-dives into agentic frameworks and automation scaling.
          </p>
          <div className="space-y-3">
            <Input
              placeholder="YOUR_EMAIL_ADDRESS"
              className="h-12 bg-white/5 border-white/10 rounded-xl text-white font-mono text-xs placeholder:text-white/20 focus-visible:ring-primary/40"
            />
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
              ESTABLISH_CONNECTION
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
