import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { BlogPost, getBlogPosts } from "@/utils/blog-utils";
import { Link } from "react-router-dom";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { SearchInterface } from "@/components/insights/SearchInterface";
import { FeaturedPost } from "@/components/insights/FeaturedPost";
import { PostGrid } from "@/components/insights/PostGrid";

const Insights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayedInsights, setDisplayedInsights] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await getBlogPosts(1, 20, {
          status: "published",
        });

        const blogs = response.data;
        // console.log('Blogs: ===========================',blogs);

        if (blogs.length > 0) {
          // Set the most recent post as featured
          const featured = blogs[0];
          setFeaturedPost(featured);

          // Use the rest for the grid
          setDisplayedInsights(blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  

  // Handle search and filtering
  useEffect(() => {
    if (!featuredPost) return;

    // Get all posts except featured
    const allPosts = featuredPost ? [featuredPost] : [];
    // Note: In a real app, you'd have all posts stored separately
    // For now, we'll work with the current structure

    let filtered = allPosts.filter((post) => post.id !== featuredPost.id);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }else if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category.toLowerCase().replace(/\s+/g, '_') === selectedCategory
      );
    }else{
      return filtered;
    }


    setDisplayedInsights(filtered);
  }, [searchTerm, selectedCategory, featuredPost]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00] mx-auto mb-4" />
            <div className="font-mono text-sm text-[#0A0A0A]/60">[ LOADING_DATABASE ]</div>
          </div>
        </div>
      </div>
    );
  }
  console.log('Displayed Insights: ===========================',displayedInsights);
// 
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      {/* 1. Hero Section: The "Live Scan" */}
      <InsightsHero featuredTitle={featuredPost?.title} />

      {/* 2. The Search & Filter Bridge */}
      <SearchInterface
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 3. Featured Insight (The "Master File") */}
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* 4. The Intelligence Grid (The "Logs") */}
      <PostGrid posts={displayedInsights} />

      {/* Newsletter Signup - Updated styling */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-[#0A0A0A] text-white"
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat">
              Join the Technical Circle
            </h3>
            <p className="text-white/70 mb-8 font-inter leading-relaxed">
              Subscribe to receive cutting-edge insights on AI agents, MERN architecture, and automated market intelligence directly to your terminal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="> Enter_Email_Address..."
                className="h-12 bg-white text-[#0A0A0A] border border-[#0A0A0A] rounded-none font-mono"
              />
              <Button className="h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-none font-bold">
                <ArrowRight className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
            <div className="mt-4 font-mono text-xs text-white/60">
              [ SUBSCRIPTION_MODE: TECHNICAL_UPDATES | FREQUENCY: WEEKLY ]
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Insights;
