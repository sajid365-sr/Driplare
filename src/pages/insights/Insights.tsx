import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// Component Imports
import { InsightsHero } from "@/components/insights/InsightsHero";
import { SearchInterface } from "@/components/insights/SearchInterface";
import { FeaturedPost } from "@/components/insights/FeaturedPost";
import { PostGrid } from "@/components/insights/PostGrid";
import { Newsletter } from "@/components/insights/NewsLetter";

// Utils
import { BlogPost, getBlogPosts } from "@/utils/blog-utils";

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [displayedInsights, setDisplayedInsights] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // 1. Initial Data Fetch
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await getBlogPosts(1, 100, { status: "published" }); // Fetch a larger set for client-side pagination
        const blogs = response.data;

        if (blogs.length > 0) {
          setFeaturedPost(blogs[0]);
          setAllPosts(blogs);
          setDisplayedInsights(blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  // 2. Client-side Search, Filtering, and Reset Pagination
  useEffect(() => {
    let filtered = [...allPosts];

    if (searchTerm || (selectedCategory && selectedCategory !== "all_reports")) {
      if (searchTerm) {
        filtered = filtered.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory && selectedCategory !== "all_reports") {
        filtered = filtered.filter(
          (post) => post.category.toLowerCase().replace(/\s+/g, '_') === selectedCategory
        );
      }
    }

    setDisplayedInsights(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, selectedCategory, allPosts]);

  // 3. Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayedInsights.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(displayedInsights.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to grid top
    const gridElement = document.getElementById("intelligence-grid");
    gridElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <div className="font-mono text-xs font-black text-[#0A0A0A] tracking-[0.3em] uppercase">
          Initializing_Systems_Database...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <InsightsHero />

      <SearchInterface 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="container mx-auto px-4">
        {!searchTerm && !selectedCategory && featuredPost && currentPage === 1 && (
          <>
            <div className="pt-12 flex items-center gap-4">
              <div className="h-px flex-grow bg-border/50" />
              <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
                Master_File_Featured
              </span>
              <div className="h-px flex-grow bg-border/50" />
            </div>
            <FeaturedPost post={featuredPost} />
          </>
        )}

        <div id="intelligence-grid" className="pt-20 pb-12 flex items-center gap-4">
          <div className="h-px flex-grow bg-border/50" />
          <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
            {searchTerm || selectedCategory ? "Query_Results" : "Intelligence_Archive"}
          </span>
          <div className="h-px flex-grow bg-border/50" />
        </div>

        {/* Intelligence Grid */}
        <PostGrid posts={currentPosts} />

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-20 mb-12 gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-3 border border-border/50 rounded-xl hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-12 h-12 font-mono text-xs font-bold rounded-xl border transition-all ${
                      currentPage === i + 1
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                        : "border-border/50 hover:border-primary text-muted-foreground"
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-3 border border-border/50 rounded-xl hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Showing_Index: {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, displayedInsights.length)} _of_ {displayedInsights.length}
            </div>
          </div>
        )}
      </div>

      <Newsletter />
    </main>
  );
}