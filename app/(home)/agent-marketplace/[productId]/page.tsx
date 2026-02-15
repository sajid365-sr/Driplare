"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getAgentBySlug } from "@/lib/agent-marketplace-action";
import { Agent } from "@/types/agent-marketplace";
import ProductHero from "@/components/agent-marketplace/ProductHero";
import ProductFeatures from "@/components/agent-marketplace/ProductFeatures";
import ProductIncludes from "@/components/agent-marketplace/ProductIncludes";
import ProductVideo from "@/components/agent-marketplace/ProductVideo";
import ProductCTA from "@/components/agent-marketplace/ProductCTA";
import ProductTestimonial from "@/components/agent-marketplace/ProductTestimonial";
import ProductFAQ from "@/components/agent-marketplace/ProductFAQ";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsPage() {
  const { i18n } = useTranslation();
  const params = useParams();
  const slug = params?.productId as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgent() {
      setLoading(true);
      const res = await getAgentBySlug(slug);
      if (res.success && res.data) {
        setAgent(res.data as Agent);
      }

      setLoading(false);
    }
    loadAgent();
  }, [slug]);



  if (loading) return <LoadingSkeleton />;
  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Agent Not Found</h2>
          <p className="text-muted-foreground">The agent you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const currentLang = i18n.language.split("-")[0] as "en" | "bn";
  const langContent = agent[currentLang] || agent.en;

  return (
    <div className="min-h-screen mt-20 bg-background">
      {/* Hero Section with Image Gallery */}
      <ProductHero agent={agent} langContent={langContent} />

      {/* What You Get */}
      {agent.includes && agent.includes.length > 0 && (
        <ProductIncludes agent={agent} langContent={langContent} />
      )}

      {/* Features & Benefits */}
      <ProductFeatures agent={agent} langContent={langContent} />

      {/* Video Demo (if available) */}
      {agent.videoUrl && <ProductVideo videoUrl={agent.videoUrl} />}

      {/* Social Proof */}
      <ProductTestimonial currentLang={currentLang} />

      {/* FAQ */}
      <ProductFAQ currentLang={currentLang} />

      {/* Final CTA */}
      <ProductCTA agent={agent} langContent={langContent} />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Image skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Right side - Content skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}