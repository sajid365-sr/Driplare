"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Calendar, ArrowRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Server Actions
import { getAllPublishedBlogs, getBlogCategories } from "@/lib/blog-actions";
import { BlogPost } from "@/types/blog-types";
import { Badge } from "@/components/ui/badge";

/**
 * Insights Main Page
 * Displays all published blog posts in a grid layout
 */
export default function InsightsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  /**
   * Fetch all published blogs
   */
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPublishedBlogs();
      if (response.success) {
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch blog categories
   */
  const fetchCategories = async () => {
    try {
      const cats = await getBlogCategories();
      setCategories(["All", ...cats]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  /**
   * Filter blogs by category
   */
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category === category));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <div className="font-mono text-[10px] font-black text-[#0A0A0A] tracking-[0.3em] uppercase">
          Loading_Insights...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-[10px] font-black text-primary tracking-[.4em] uppercase">
                Intelligence_Stream
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#0A0A0A] mb-6 uppercase tracking-tighter">
              Technical Insights
            </h1>
            <p className="text-xl text-[#0A0A0A]/60 font-medium max-w-2xl mx-auto">
              Deep dives into automation, AI architecture, and scalable system
              design.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-[#0A0A0A] hover:bg-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#0A0A0A]/40 font-mono text-sm">
              No posts found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/insights/${blog.id}`}>
                  <div className="group h-full bg-white border border-border/60 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    {/* Cover Image */}
                    <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                      <Image
                        src={blog.cover_image || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-white backdrop-blur-sm">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-3 h-3 text-[#0A0A0A]/40" />
                        <span className="text-xs font-mono text-[#0A0A0A]/40 uppercase">
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black text-[#0A0A0A] mb-3 line-clamp-2 group-hover:text-primary transition-colors uppercase tracking-tight">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="text-sm text-[#0A0A0A]/60 mb-4 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-xs font-mono text-[#0A0A0A]/40 bg-gray-100 px-2 py-1 rounded-md"
                            >
                              <Tag className="w-2 h-2" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
    </div>
  );
}
