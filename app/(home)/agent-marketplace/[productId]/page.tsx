"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Cpu, Globe, Zap,
  PlayCircle, Sparkles, BarChart3, Rocket,
  Star, Users, Clock, ExternalLink, Heart,
  Share2, Bookmark, ChevronRight, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { getAgentBySlug } from "@/lib/agent-marketplace-action";
import { Agent } from "@/types/agent-marketplace";

export default function AgentDetailsPage() {
  const { i18n } = useTranslation();
  const params = useParams();
  const slug = params?.productId as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
  if (!agent) return <NotFound />;

  // Get language-specific content (like CaseStudy page)
  const currentLang = i18n.language.split("-")[0] as "en" | "bn";
  const langContent = agent[currentLang] || agent.en;

  const allImages = [agent.mainImage, ...agent.gallery];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-6">
          <Link
            href="/agent-marketplace"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Marketplace
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
                  {agent.category}
                </Badge>
                <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                  <BarChart3 size={12} className="mr-1" />
                  {agent.totalSales}+ Deployed
                </Badge>
                <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                  <Star size={12} className="mr-1 text-yellow-500 fill-yellow-500" />
                  {agent.rating.toFixed(1)}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-tight">
                {langContent?.name || "Unnamed Agent"}
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-3xl">
                {langContent?.fullDescription || "No description available"}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl px-8 py-4 text-lg font-bold"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="px-6 py-4">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`px-6 py-4 ${isBookmarked ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="lg" className="px-6 py-4">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Media Gallery */}
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="relative">
                {agent.videoUrl ? (
                  <div className="aspect-video bg-black relative">
                    <iframe
                      className="w-full h-full"
                      src={agent.videoUrl}
                      title="Demo Video"
                      allowFullScreen
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white border-0">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Demo Video
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={allImages[activeImage]}
                      alt={langContent?.name || "Agent preview"}
                      className="w-full h-full object-cover"
                    />
                    {allImages.length > 1 && (
                      <>
                        {/* Navigation arrows */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                          aria-label="Previous image"
                        >
                          <ChevronRight className="h-4 w-4 rotate-180" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={() => setActiveImage((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>

                        {/* Thumbnail indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {allImages.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all ${index === activeImage ? 'bg-white' : 'bg-white/50'
                                }`}
                              onClick={() => setActiveImage(index)}
                              aria-label={`View image ${index + 1} of ${allImages.length}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Thumbnail strip for multiple images */}
                {allImages.length > 1 && !agent.videoUrl && (
                  <div className="flex gap-2 p-4 bg-slate-50 dark:bg-slate-800">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === activeImage ? 'border-blue-500 scale-105' : 'border-slate-200'
                          }`}
                        onClick={() => setActiveImage(index)}
                      >
                        <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="features" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Sparkles className="h-6 w-6 text-blue-500" />
                      Key Features & Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {langContent?.features?.map((feature: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
                          <CheckCircle2 className="text-green-500 shrink-0 mt-1 h-5 w-5" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tech" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Layers className="h-6 w-6 text-purple-500" />
                      Technology Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {agent.techStack.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm font-medium">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Star className="h-6 w-6 text-yellow-500" />
                      User Reviews & Ratings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Overview */}
                    <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-slate-900 dark:text-white">{agent.rating.toFixed(1)}</div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Based on {agent.totalSales} deployments
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-3">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <Progress value={rating === 5 ? 80 : rating === 4 ? 15 : 3} className="flex-1 h-2" />
                            <span className="text-sm text-slate-600 w-8">{rating === 5 ? '80%' : rating === 4 ? '15%' : '3%'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[
                        { name: "Sarah Johnson", rating: 5, comment: "This agent transformed our workflow completely!", time: "2 weeks ago" },
                        { name: "Mike Chen", rating: 5, comment: "Easy to set up and incredibly powerful.", time: "1 month ago" },
                        { name: "Emma Davis", rating: 4, comment: "Great performance, minor learning curve but worth it.", time: "3 weeks ago" }
                      ].map((review, index) => (
                        <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {review.name.charAt(0)}
                              </div>
                              <span className="font-medium">{review.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mb-2">{review.comment}</p>
                          <span className="text-sm text-slate-500">{review.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="docs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Globe className="h-6 w-6 text-green-500" />
                      Documentation & Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <ExternalLink className="h-6 w-6" />
                        Setup Guide
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <PlayCircle className="h-6 w-6" />
                        Video Tutorials
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <BarChart3 className="h-6 w-6" />
                        API Documentation
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Users className="h-6 w-6" />
                        Community Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div>
                      <div className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-2">
                        Starting Price
                      </div>
                      <div className="text-5xl font-black flex items-baseline justify-center">
                        <span className="text-2xl mr-1">$</span>
                        {agent.price}
                        <span className="text-lg font-normal text-blue-200 ml-1">/month</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center py-2 border-t border-white/20">
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Setup Time
                        </span>
                        <span className="font-bold">{agent.setupTime || "Quick"}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-white/20">
                        <span className="flex items-center gap-2">
                          <Cpu className="h-4 w-4" />
                          Difficulty
                        </span>
                        <span className="font-bold">{agent.difficulty}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-white/20">
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Deployments
                        </span>
                        <span className="font-bold">{agent.totalSales}+</span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 text-lg shadow-xl"
                    >
                      <Rocket className="mr-2 h-5 w-5" />
                      Get Started Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{agent.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Deployments</span>
                      <span className="font-bold">{agent.totalSales}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
                      <span className="text-sm">{new Date(agent.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="space-y-8 w-full max-w-4xl mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
          <Globe className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Agent Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          The AI agent you're looking for doesn't exist or may have been removed.
        </p>
        <Link href="/agent-marketplace">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    </div>
  );
}