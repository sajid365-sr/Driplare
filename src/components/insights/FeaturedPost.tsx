import { motion } from "framer-motion";
import { ArrowRight, Clock, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blog-utils";
import { formatDate } from "@/lib/utils";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="py-16 bg-[#F9F9F9]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
              The "Master File"
            </h2>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed max-w-2xl mx-auto">
              Instead of a full-image background, use a "Split Schematic" view.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Data */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Meta Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">[ CATEGORY ]</span>
                  <span className="font-montserrat font-bold text-[#0A0A0A]">{post.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">[ PUBLISHED ]</span>
                  <span className="font-montserrat font-bold text-[#0A0A0A]">
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">[ READ_TIME ]</span>
                  <span className="font-montserrat font-bold text-[#0A0A0A]">5_MIN</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">[ IMPACT_SCORE ]</span>
                  <span className="font-montserrat font-bold text-[#FF6B00]">HIGH</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-4 font-montserrat leading-tight">
                  {post.title}
                </h3>
                <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                  {post.content.replace(/<[^>]+>/g, "").substring(0, 200)}...
                </p>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <Link to={`/insights/${post.id}`}>
                  <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-4 font-bold rounded-none group">
                    Read Master File
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* Tech Stack */}
              <div className="pt-6 border-t border-[#0A0A0A]/20">
                <div className="font-mono text-sm text-[#0A0A0A]/60 mb-2">[ TECH_STACK ]</div>
                <div className="flex flex-wrap gap-2">
                  {["n8n", "OpenAI", "MongoDB", "Node.js"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#0A0A0A] text-white font-mono text-xs rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Image Container with Corner Brackets */}
              <div className="relative bg-white border border-[#0A0A0A] p-8 rounded-none">
                {/* Corner Brackets */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-[#FF6B00]"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-[#FF6B00]"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-[#FF6B00]"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-[#FF6B00]"></div>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.cover_image || "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-64 object-cover grayscale contrast-125"
                  />

                  {/* Scanning Line Animation */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF6B00] opacity-90"
                    animate={{
                      y: [0, 256, 0], // Move from top to bottom and back
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* View Finder Label */}
                <div className="mt-4 text-center">
                  <div className="font-mono text-xs text-[#0A0A0A]/60">[ TECHNICAL_VIEWFINDER ]</div>
                </div>
              </div>

              {/* Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 text-center"
              >
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 border border-[#0A0A0A] rounded-none">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs text-[#0A0A0A]">SCAN_COMPLETE | DATA_CAPTURED</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
