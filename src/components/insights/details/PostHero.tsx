import { BlogPost } from "@/utils/blog-utils";
import { Clock } from "lucide-react";

interface PostHeroProps {
  post: BlogPost;
}

export function PostHero({ post }: PostHeroProps) {
  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = post.content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <section className="py-12 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Category Tag */}
            <div className="inline-block">
              <span className="font-mono text-sm bg-[#FF6B00] text-white px-4 py-2 rounded-none">
                [{post.category.toUpperCase()}]
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] font-montserrat leading-tight">
              {post.title}
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-[#0A0A0A]/70 font-inter leading-relaxed">
              {post.content.replace(/<[^>]+>/g, "").substring(0, 150)}...
            </p>

            {/* Technical Outcome Summary */}
            <div className="bg-white p-6 border border-[#E5E5E5] rounded-none">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-[#FF6B00]" />
                <span className="font-mono text-sm text-[#0A0A0A]/60">TECHNICAL_OUTCOME</span>
              </div>
              <p className="text-[#0A0A0A]/80 font-inter">
                Implementation of advanced AI logic resulting in automated workflow efficiency and intelligent decision-making capabilities.
              </p>
            </div>
          </div>

          {/* Right Column - Specs */}
          <div className="lg:pl-8">
            <div className="bg-white border border-[#0A0A0A] p-8 rounded-none max-w-sm">
              <h3 className="font-montserrat font-bold text-lg text-[#0A0A0A] mb-6 uppercase tracking-wide">
                Technical Specs
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-[#E5E5E5]/50">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">ARCHITECT:</span>
                  <span className="font-mono text-sm font-bold text-[#0A0A0A]">DRIPLARE_LABS</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-[#E5E5E5]/50">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">READ_TIME:</span>
                  <span className="font-mono text-sm font-bold text-[#FF6B00]">{readTime}_MIN</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-[#E5E5E5]/50">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">VERSION:</span>
                  <span className="font-mono text-sm font-bold text-[#0A0A0A]">1.0.{Math.floor(Math.random() * 9) + 1}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="font-mono text-sm text-[#0A0A0A]/60">STACK:</span>
                  <span className="font-mono text-xs font-bold text-[#0A0A0A] leading-tight">
                    N8N, OPENAI,<br />MONGODB, NODE.JS
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs text-[#0A0A0A]/60">DOCUMENT_VERIFIED | READY_FOR_IMPLEMENTATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
