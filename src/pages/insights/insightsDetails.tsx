import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogPost, getBlogPost, getBlogPosts } from "@/utils/blog-utils";
import { Loader2 } from "lucide-react";
import { BreadcrumbNav } from "@/components/insights/details/BreadcrumbNav";
import { PostHero } from "@/components/insights/details/PostHero";
import { PostSidebar } from "@/components/insights/details/PostSidebar";
import { PostNavigation } from "@/components/insights/details/PostNavigation";
import { PostFooterCTA } from "@/components/insights/details/PostFooterCTA";

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the current post
        const currentPost = await getBlogPost(id);
        setPost(currentPost);

        // Fetch all posts to find related and navigation
        const allPostsResponse = await getBlogPosts(1, 50, { status: "published" });
        const allPosts = allPostsResponse.data;

        // Find current post index
        const currentIndex = allPosts.findIndex(p => p.id === id);

        // Set related posts (excluding current)
        const related = allPosts
          .filter(p => p.id !== id)
          .slice(0, 2);
        setRelatedPosts(related);

        // Set navigation posts
        if (currentIndex > 0) {
          setPrevPost(allPosts[currentIndex - 1]);
        }
        if (currentIndex < allPosts.length - 1) {
          setNextPost(allPosts[currentIndex + 1]);
        }

      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00] mx-auto mb-4" />
            <div className="font-mono text-sm text-[#0A0A0A]/60">[ LOADING_DOCUMENTATION ]</div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-[#0A0A0A]/60 font-inter text-lg mb-6">
              Intelligence document not found.
            </div>
            <Link to="/insights">
              <button className="bg-[#0A0A0A] text-white px-6 py-3 rounded-none font-mono text-sm hover:bg-[#FF6B00] transition-colors">
                [ RETURN_TO_HUB ]
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* 1. Top Navigation: The Breadcrumb */}
      <BreadcrumbNav postTitle={post.title} />

      {/* 2. Hero Section: The Header & Spec-Sheet */}
      <PostHero post={post} />

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {/* 3. The Article Body: "The Logic Flow" */}
          <div className="lg:col-span-3">
            <article className="max-w-3xl">
              {/* Enhanced prose styling with technical theme */}
              <div
                className="prose prose-orange lg:prose-xl dark:prose-invert prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-[#0A0A0A] prose-p:font-inter prose-p:text-[18px] prose-p:leading-relaxed prose-p:text-[#0A0A0A] prose-strong:text-[#0A0A0A] prose-code:font-mono prose-code:text-[#0A0A0A] prose-code:bg-[#F9F9F9] prose-code:px-2 prose-code:py-1 prose-code:border prose-code:border-[#E5E5E5] prose-code:rounded-none prose-pre:bg-[#0A0A0A] prose-pre:text-white prose-pre:border prose-pre:border-[#0A0A0A] prose-blockquote:border-l-4 prose-blockquote:border-[#FF6B00] prose-blockquote:bg-[#FFF3E0]/50 prose-blockquote:p-6 prose-blockquote:my-8"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(
                    /<p>/g,
                    '<p class="text-[18px] leading-relaxed font-inter text-[#0A0A0A]">'
                  ).replace(
                    /<h[1-6]>/g,
                    (match) => match.replace('>', ' class="font-montserrat font-bold text-[#0A0A0A]">')
                  ).replace(
                    /<strong>/g,
                    '<strong class="text-[#0A0A0A]">'
                  )
                }}
              />

              {/* Engineer's Note Callout Example */}
              <div className="bg-[#F9F9F9]/50 border-l-4 border-[#FF6B00] p-6 my-8">
                <div className="font-mono text-sm text-[#0A0A0A]/60 mb-3">// ENGINEER'S_NOTE</div>
                <p className="text-[#0A0A0A] font-inter text-[18px] leading-relaxed">
                  This implementation uses RAG (Retrieval-Augmented Generation) to ensure AI responses are grounded in your specific business context. The vector database stores document embeddings, enabling semantic search rather than keyword matching.
                </p>
              </div>
            </article>
          </div>

          {/* 4. The Sidebar: "System Context" */}
          <PostSidebar
            tocItems={['The Problem', 'The Architecture', 'Implementation', 'The Results']}
            relatedPosts={relatedPosts.map(p => ({
              id: p.id,
              title: p.title,
              cover_image: p.cover_image
            }))}
          />
        </div>
      </div>

      {/* 5. Bottom Navigation: The Logic Loop */}
      <PostNavigation
        previousPost={prevPost ? { id: prevPost.id, title: prevPost.title } : undefined}
        nextPost={nextPost ? { id: nextPost.id, title: nextPost.title } : undefined}
      />

      {/* 6. Footer CTA: The Project Bridge */}
      <PostFooterCTA post={post} />
    </div>
  );
}
