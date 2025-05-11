import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogPost, getBlogPosts } from "@/utils/blog-utils";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export function InsightsPreviewSection() {
  const [displayedInsights, setDisplayedInsights] = useState<BlogPost[]>([]);
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
          // Use the rest for the grid
          setDisplayedInsights(blogs.slice(0, 2));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">
            Insight Hub
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Expert insights and analysis on the latest digital trends and
            innovations.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
                      {post.content.replace(/<[^>]+>/g, "").substring(0, 100)}
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
        )}

        <div className="text-center mt-10">
          <Link to="/insights">
            <Button variant="outline" className="group">
              <span>View All Insights</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
