"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Agent, AgentContent } from "@/types/agent-marketplace";
import LeadModal from "@/components/LeadModal";

interface ProductHeroProps {
  agent: Agent;
  langContent: AgentContent;
}

export default function ProductHero({ agent, langContent }: ProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(agent.mainImage);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  
  const allImages = [agent.mainImage, ...(agent.gallery || [])];

  return (
    <>
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={selectedImage}
                alt={langContent.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    title="button"
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-driplare scale-105"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <Badge variant="secondary" className="text-sm">
              {agent.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              {langContent.name}
            </h1>

            {/* Rating & Sales */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(agent.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({agent.totalSales} sales)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground">
              {langContent.description}
            </p>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-ai" />
                <span className="text-sm">{agent.setupTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-trust" />
                <span className="text-sm">{agent.difficulty} Setup</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b py-6 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  ${agent.price}
                </span>
                <span className="text-muted-foreground line-through">
                  ${Math.round(agent.price * 1.5)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                One-time setup fee. No monthly charges.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-driplare hover:bg-driplare/90 text-white font-semibold"
                onClick={() => setIsLeadModalOpen(true)}
              >
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full"
                onClick={() => setIsLeadModalOpen(true)}
              >
                Schedule a Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2">
              {agent.guarantee && (
                <div className="flex items-center gap-2 text-sm text-trust">
                  <CheckCircle className="w-5 h-5" />
                  <span>{agent.guarantee}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-trust">
                <CheckCircle className="w-5 h-5" />
                <span>Free 1-month support included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        agentSlug={agent.slug}
        agentName={langContent.name}
      />
    </>
  );
}