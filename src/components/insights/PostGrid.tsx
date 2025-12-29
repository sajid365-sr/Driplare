import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blog-utils";
import { formatDate } from "@/lib/utils";

interface PostGridProps {
  posts: BlogPost[];
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
            The Intelligence Grid (The "Logs")
          </h2>
          <p className="text-[#0A0A0A]/70 font-inter leading-relaxed max-w-2xl mx-auto">
            Cards look like folders or technical documents. No rounded corners (square edges for an industrial look). 1px border.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden h-full border border-[#0A0A0A] rounded-none bg-white hover:border-[#FF6B00] transition-all duration-300 cursor-pointer group">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={post.cover_image || "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover border effect */}
                  <div className="absolute inset-0 border border-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardContent className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#0A0A0A]/60">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-[#0A0A0A]/60">
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-montserrat leading-tight">
                    {post.title}
                  </h3>

                  {/* Content Preview */}
                  <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-4 text-sm">
                    {post.content.replace(/<[^>]+>/g, "").substring(0, 120)}...
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="font-mono text-xs text-[#0A0A0A]/60 mb-2">STACK:</div>
                    <div className="flex flex-wrap gap-1">
                      {["n8n", "OpenAI", "MongoDB"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-[#F9F9F9] border border-[#0A0A0A]/20 font-mono text-xs text-[#0A0A0A] rounded-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read More */}
                  <Link to={`/insights/${post.id}`}>
                    <Button
                      variant="ghost"
                      className="p-0 hover:bg-transparent text-[#FF6B00] hover:text-[#FF6B00]/80 group/btn"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>

                {/* Document-style bottom border */}
                <div className="h-1 bg-[#0A0A0A] group-hover:bg-[#FF6B00] transition-colors duration-300"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FileText className="w-16 h-16 text-[#0A0A0A]/30 mx-auto mb-4" />
            <p className="text-[#0A0A0A]/60 font-inter">No intelligence logs found matching your criteria.</p>
            <div className="font-mono text-xs text-[#0A0A0A]/40 mt-2">[ DATABASE_EMPTY ]</div>
          </motion.div>
        )}

        {/* Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 bg-[#F9F9F9] px-6 py-3 border border-[#0A0A0A] rounded-none">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
            <span className="font-mono text-sm text-[#0A0A0A]">
              GRID_ACTIVE | CARDS_LOADED: {posts.length} | DISPLAY_MODE: TECHNICAL
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
