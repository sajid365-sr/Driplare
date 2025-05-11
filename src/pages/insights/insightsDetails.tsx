// src/pages/insights/InsightDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogPost, getBlogPost } from "@/utils/blog-utils";
import { formatDate } from "@/lib/utils";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getBlogPost(id)
      .then((b) => setPost(b))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background dark:bg-background-dark">
        <Loader2
          className="animate-spin text-primary dark:text-primary-light"
          size={32}
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-background dark:bg-background-dark">
        <p className="text-lg text-muted-foreground dark:text-muted-foreground-dark">
          Insight not found.
        </p>
        <Link to="/insights">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-96">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-4 left-4 md:left-8 text-white">
          <p className="text-sm uppercase tracking-wide">
            {post.category} • {formatDate(post.published_at || post.created_at)}
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-bold">{post.title}</h1>
        </div>
      </div>

      {/* Back Link */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/insights">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none mx-auto px-4 pb-12
                      dark:prose-invert
                      sm:px-6 lg:px-8"
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}
