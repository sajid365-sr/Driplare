import { motion } from "framer-motion";
import { ArrowRight, FileText, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/app/(admin)/admin/BlogManager";

interface PostGridProps {
  posts: BlogPost[];
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="group flex flex-col h-full bg-white border border-border/50 rounded-[2rem] overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(var(--primary),0.15)]"
            >
              {/* Image Header */}
              <div className="aspect-[16/10] overflow-hidden relative bg-[#F9F9F9]">
                <img
                  src={
                    post.cover_image ||
                    "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-[#0A0A0A] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-border/50">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Meta Bar */}
                <div className="flex items-center gap-4 mb-4 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-primary" />
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                  <span className="opacity-30">|</span>
                  <span className="flex items-center gap-1.5">
                    Intel_Report
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-[#0A0A0A] mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Content Preview */}
                <p className="text-[#0A0A0A]/60 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  {post.content.replace(/<[^>]+>/g, "").substring(0, 150)}...
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                  <Link
                    href={`/insights/${post.id}`}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0A0A0A] group/link"
                  >
                    Read Intelligence
                    <ArrowRight
                      size={16}
                      className="text-primary transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>

                  <div className="text-[9px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                    Log_{post.id.toString().substring(0, 4)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-[#F9F9F9] rounded-[3rem] border-2 border-dashed border-border/50"
          >
            <FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tighter mb-2">
              Database Empty.
            </h3>
            <p className="text-muted-foreground font-medium">
              No intelligence logs match your current query.
            </p>
            <div className="font-mono text-[10px] text-primary font-bold mt-6 tracking-[0.3em] uppercase">
              [ STATUS: WAITING_FOR_INPUT ]
            </div>
          </motion.div>
        )}

        {/* System Metadata Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-[#0A0A0A]/5 px-8 py-3 rounded-2xl border border-border/50">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="font-mono text-[10px] font-black text-[#0A0A0A]/60 uppercase tracking-[0.2em]">
              GRID_STATUS: ACTIVE | CACHE_REPORTS: {posts.length} | UI_MODE:
              ENGINEERED
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
