"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getAgentBySlug } from "@/lib/agent-marketplace-action";
import { Agent } from "@/types/agent-marketplace";
import LeadModal from "@/components/LeadModal";
import MediaGallery from "@/components/agent-marketplace2/MediaGallery";
import AgentHeader from "@/components/agent-marketplace2/AgentHeader";
import AgentFeatures from "@/components/agent-marketplace2/AgentFeatures";
import AgentPricing from "@/components/agent-marketplace2/AgentPricing";
import { Skeleton } from "@/components/ui/skeleton";

export default function AgentDetailsPage() {
  const { i18n } = useTranslation();
  const params = useParams();
  const slug = params?.productId as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    async function loadAgent() {
      const res = await getAgentBySlug(slug);
      if (res.success && res.data) {
        setAgent(res.data as unknown as Agent);
      }
      setLoading(false);
    }
    loadAgent();
  }, [slug]);


  if (loading) return <LoadingSkeleton />;
  if (!agent) return <div className="text-center py-20 text-2xl font-bold">Agent Not Found</div>;

  const currentLang = i18n.language.split("-")[0] as "en" | "bn";
  const langContent = agent[currentLang] || agent.en;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      {/* Premium Background Ambient Effect */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT CONTENT: Hero, Gallery, Features */}
          <div className="lg:col-span-8 space-y-12">
            <AgentHeader
            category={agent.category}
    totalSales={agent.totalSales}
    rating={agent.rating}
    name={langContent?.name}
    description={langContent?.fullDescription}
    onGetStarted={() => setIsLeadModalOpen(true)}
            />

            <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20">
              <MediaGallery
               videoUrl={agent.videoUrl}
    mainImage={agent.mainImage}
    gallery={agent.gallery}
    agentName={langContent?.name}
              />
            </div>

            <AgentFeatures
             features={langContent?.features || []}
    techStack={agent.techStack}
            />
          </div>

          {/* RIGHT SIDEBAR: Pricing & Sticky CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <AgentPricing
                price={agent.price}
                setupTime={agent.setupTime}
                difficulty={agent.difficulty}
                totalSales={agent.totalSales}
                rating={agent.rating}
                updatedAt={agent.updatedAt}
                onGetStarted={() => setIsLeadModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        agentSlug={agent.slug}
        agentName={langContent?.name}
      />
    </div>
  );
}

function LoadingSkeleton() {
    return <div className="container mx-auto p-12 space-y-8"><Skeleton className="h-[400px] w-full rounded-3xl" /></div>;
}