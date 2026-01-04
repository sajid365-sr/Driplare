"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Terminal, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// Server Action
import { getBlogPostDetails } from "@/lib/blog-actions";

// Component Imports
import { BreadcrumbNav } from "@/components/insights/details/BreadcrumbNav";
import { PostHero } from "@/components/insights/details/PostHero";
import { PostSidebar } from "@/components/insights/details/PostSidebar";
import { PostNavigation } from "@/components/insights/details/PostNavigation";
import { PostFooterCTA } from "@/components/insights/details/PostFooterCTA";

export default function InsightDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getBlogPostDetails(id);
      setData(result);
      setLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <div className="font-mono text-[10px] font-black text-[#0A0A0A] tracking-[0.3em] uppercase">
          Decrypting_Technical_Payload...
        </div>
      </div>
    );
  }

  if (!data || !data.post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4 ">
        <div className="text-center max-w-md">
          <div className="font-mono text-primary text-5xl font-black mb-6 italic">
            404
          </div>
          <h1 className="text-2xl font-black text-[#0A0A0A] mb-4 uppercase tracking-tighter">
            Documentation_Not_Found
          </h1>
          <Link href="/insights">
            <button className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-primary transition-all">
              <ArrowLeft size={18} />
              Return to Database
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { post, relatedPosts, prevPost, nextPost } = data;

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white mt-32">
      <div className="bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40">
        <BreadcrumbNav postTitle={post.title} />
      </div>

      <PostHero post={post} />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          <div className="lg:col-span-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-none"
            >
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-[#0A0A0A] prose-headings:uppercase
                  prose-p:text-[#0A0A0A]/80 prose-p:leading-[1.8] prose-p:font-medium
                  prose-strong:text-[#0A0A0A] prose-strong:font-black
                  prose-code:font-mono prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                  prose-pre:bg-[#0A0A0A] prose-pre:rounded-[1.5rem] prose-pre:border prose-pre:border-white/10 prose-pre:p-8
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl prose-blockquote:p-8
                  prose-img:rounded-[2rem] prose-img:shadow-2xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-16 p-8 bg-[#0A0A0A] rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Terminal size={120} className="text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] font-black text-primary tracking-[.4em] uppercase">
                      Architecture_Validation
                    </span>
                  </div>
                  <h4 className="text-white font-black text-xl mb-4 italic tracking-tight">
                    Executive Summary & Technical Validation
                  </h4>
                  <p className="text-white/60 font-medium leading-relaxed italic">
                    All technical implementations discussed in this report have
                    been stress-tested. The transition to MongoDB with Prisma
                    ensures high scalability.
                  </p>
                </div>
              </div>
            </motion.article>

            <div className="mt-20">
              <PostNavigation previousPost={prevPost} nextPost={nextPost} />
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <PostSidebar
                tocItems={["Phase_01", "Phase_02", "Phase_03"]} // আপনি চাইলে এটি কন্টেন্ট থেকে ডায়নামিক করতে পারেন
                relatedPosts={relatedPosts}
              />

              <div className="mt-8 p-6 border border-border/60 rounded-3xl bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="text-green-500 w-4 h-4" />
                  <span className="font-mono text-[12px] font-black uppercase tracking-widest text-[#0A0A0A]/40">
                    Security_Clearance: Verified
                  </span>
                </div>
                <p className="text-[12px] text-[#0A0A0A]/60 leading-normal">
                  Verified by Driplare Engine v2.0
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="bg-[#F9F9F9] border-t border-border/50">
        <PostFooterCTA post={post} />
      </div>

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
