import { motion } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blog-utils";
import { formatDate } from "@/lib/utils";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-[#0A0A0A]/20"
        >
          {/* Blueprint Grid Overlay (Subtle) */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[length:30px_30px] bg-[image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" />

          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Side: Content & Data Architecture */}
            <div className="p-10 md:p-16 flex flex-col justify-center relative z-10 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="bg-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  Featured_Report
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  <Clock size={14} className="text-primary" />
                  {formatDate(post.published_at || post.created_at)}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8 group-hover:text-primary transition-colors duration-500">
                {post.title}
              </h2>

              <p className="text-white/60 text-lg leading-relaxed mb-10 font-medium max-w-xl">
                {post.content.replace(/<[^>]+>/g, "").substring(0, 220)}...
              </p>

              {/* Technical Metadata Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="space-y-1">
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-black">Category</p>
                  <p className="text-white font-bold text-sm tracking-tight italic uppercase">{post.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-black">Impact_Level</p>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Zap size={14} fill="currentColor" />
                    CRITICAL_ALPHA
                  </div>
                </div>
              </div>

              <Link to={`/insights/${post.id}`}>
                <Button className="bg-white hover:bg-primary text-[#0A0A0A] hover:text-white px-10 py-7 rounded-2xl font-black text-base transition-all active:scale-95 group/btn">
                  Access Intelligence
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Right Side: Visual Schematic */}
            <div className="relative bg-[#111] overflow-hidden flex items-center justify-center p-8">
              {/* Image with Viewfinder Brackets */}
              <div className="relative w-full max-w-md aspect-square">
                {/* Corner Brackets */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary rounded-tl-lg z-20"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-primary rounded-tr-lg z-20"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-primary rounded-bl-lg z-20"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary rounded-br-lg z-20"></div>

                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors duration-700">
                  <img
                    src={post.cover_image || "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[1.5s]"
                  />
                  
                  {/* Scanning Line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(255,107,0,0.8)] z-30"
                    animate={{ y: [0, 450, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Tech HUD Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                     <div className="font-mono text-[8px] text-white/40 space-y-1">
                        <p>X: 142.09 // Y: 88.11</p>
                        <p>SCAN_MODE: ACTIVE</p>
                     </div>
                     <ShieldCheck className="text-primary w-6 h-6 opacity-50" />
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-8 flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono text-[9px] font-black text-white/70 uppercase tracking-widest">
                  Live_Data_Stream: Stable
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}