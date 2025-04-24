import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/common/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import AnimatedGridBg from "@/components/common/AnimatedGridBg";

const insightPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt:
      "Explore how artificial intelligence is transforming the way websites are built and maintained.",
    date: "April 15, 2025",
    category: "AI Technology",
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Maximizing ROI with Data-Driven Marketing",
    excerpt:
      "Learn how to leverage customer data to create targeted marketing campaigns that deliver results.",
    date: "April 10, 2025",
    category: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "5 UX Trends That Will Dominate 2025",
    excerpt:
      "Stay ahead of the curve with these emerging user experience design trends.",
    date: "April 5, 2025",
    category: "Web Design",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Building Chatbots That Actually Help Users",
    excerpt:
      "Best practices for creating conversational AI that enhances rather than frustrates the user experience.",
    date: "March 28, 2025",
    category: "AI Technology",
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Optimizing Website Performance for Core Web Vitals",
    excerpt:
      "Technical strategies to improve your site's loading speed, interactivity, and visual stability.",
    date: "March 21, 2025",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Ethics of AI: Considerations for Developers",
    excerpt:
      "Navigating the complex ethical landscape when implementing AI solutions for clients.",
    date: "March 15, 2025",
    category: "AI Technology",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
];

const featuredPost = {
  id: 7,
  title: "How AI-Driven Design Tools Are Revolutionizing the Creative Process",
  excerpt:
    "Artificial intelligence is no longer just a buzzword—it's fundamentally changing how designers work. From automated layout suggestions to intelligent image generation and content recommendations, AI-powered tools are augmenting human creativity in unprecedented ways.",
  date: "April 22, 2025",
  category: "AI Technology",
  image:
    "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop",
  readTime: "8 min read",
};

const Insights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedInsights, setDisplayedInsights] = useState(insightPosts);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  // Handle search
  useEffect(() => {
    if (searchTerm === "") {
      setDisplayedInsights(insightPosts);
    } else {
      const filtered = insightPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedInsights(filtered);
    }
  }, [searchTerm]);

  // Typewriter effect for featured post
  useEffect(() => {
    const text = featuredPost.title;

    if (typingIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypingText((prev) => prev + text[typingIndex]);
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [typingIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedGridBg />
      <Navbar />
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

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              <div className="relative p-8 md:p-12 lg:p-16 flex flex-col h-full min-h-[400px] justify-end">
                <span className="text-primary font-medium mb-3">
                  {featuredPost.category} • {featuredPost.date} •{" "}
                  {featuredPost.readTime}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 h-[120px] md:h-[80px]">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </h2>
                <p className="text-white/80 mb-6 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <Button className="self-start bg-primary hover:bg-primary/90">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

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
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-primary text-sm font-medium">
                      {post.category} • {post.date}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button
                      variant="ghost"
                      className="p-0 hover:bg-transparent text-primary hover:text-primary/80"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {displayedInsights.length === 0 && (
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
