import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import { BlogPost, getBlogPosts } from "@/utils/blog-utils";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

const Insights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedInsights, setDisplayedInsights] = useState<BlogPost[]>([]);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
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

        if (blogs.length > 0) {
          // Set the most recent post as featured
          const featured = blogs[0];
          setFeaturedPost(featured);

          // Use the rest for the grid
          setDisplayedInsights(blogs.slice(1));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search
  useEffect(() => {
    if (!featuredPost) return;

    if (searchTerm === "") {
      setDisplayedInsights((prev) =>
        prev.filter((post) => post.id !== featuredPost.id)
      );
    } else {
      const filtered = displayedInsights.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedInsights(filtered);
    }
  }, [searchTerm, featuredPost]);

  // Typewriter effect for featured post
  useEffect(() => {
    if (!featuredPost) return;

    const text = featuredPost.title;

    if (typingIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypingText((prev) => prev + text[typingIndex]);
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [typingIndex, featuredPost]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay ahead with the latest trends, strategies, and insights in web
              development, digital marketing, and AI innovation.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-16">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search insights..."
              className="pl-10 h-12 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-16"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40">
                      <img
                        src={
                          featuredPost.cover_image ||
                          "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"
                        }
                        alt={featuredPost.title}
                        className="w-full h-full object-cover mix-blend-screen opacity-30"
                      />
                    </div>
                    <div className="relative p-8 md:p-12 lg:p-16 flex flex-col h-full min-h-[400px] justify-end">
                      <span className="text-primary font-medium mb-3">
                        {featuredPost.category} •{" "}
                        {formatDate(
                          featuredPost.published_at || featuredPost.created_at
                        )}
                      </span>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 h-[120px] md:h-[80px]">
                        {typingText}
                        <span className="animate-pulse">|</span>
                      </h2>
                      <p className="text-white/80 mb-6 max-w-2xl">
                        {featuredPost.content
                          .replace(/<[^>]+>/g, "")
                          .substring(0, 200)}
                        ...
                      </p>
                      <Link to={`/insights/${featuredPost.id}`}>
                        <Button className="self-start bg-primary hover:bg-primary/90">
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedInsights.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer border-0 bg-card">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={
                            post.cover_image ||
                            "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <span className="text-primary text-sm font-medium">
                          {post.category} •{" "}
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                        <h3 className="text-xl font-bold mt-2 mb-3">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {post.content
                            .replace(/<[^>]+>/g, "")
                            .substring(0, 100)}
                          ...
                        </p>

                        <Link to={`/insights/${post.id}`}>
                          <Button
                            variant="ghost"
                            className="p-0 hover:bg-transparent text-primary hover:text-primary/80"
                          >
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {displayedInsights.length === 0 && !featuredPost && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    No insights found matching your search.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-primary/10 rounded-xl p-8 md:p-12"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with Our Newsletter
              </h3>
              <p className="text-muted-foreground mb-8">
                Subscribe to receive the latest insights on AI, web design, and
                digital marketing directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter your email"
                  className="h-12 bg-background"
                />
                <Button className="h-12 bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Insights;
