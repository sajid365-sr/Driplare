"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, Zap, Users, Clock, TrendingUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ProcessedAgent, AgentCardProps } from "@/types/agent-marketplace";

interface ExtendedAgentCardProps extends Omit<AgentCardProps, 'agent'> {
  agent: ProcessedAgent;
  viewMode?: "grid" | "list";
}

export function AgentCard({ agent, index = 0, viewMode = "grid" }: ExtendedAgentCardProps) {
  // Language-specific data is already extracted in ProcessedAgent

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group"
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <img
                  src={agent.mainImage}
                  alt={agent.name || "AI Agent"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-white/90 text-slate-900 border-0 shadow-lg backdrop-blur-sm">
                    {agent.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-bold shadow-lg">
                    ${agent.price}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {agent.name || "Unnamed Agent"}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {agent.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {agent.description || "No description available"}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{agent.totalSales} deployed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{agent.setupTime || "Quick setup"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{agent.difficulty}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {agent.techStack.slice(0, 4).map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {agent.techStack.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{agent.techStack.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${agent.price}
                    </div>
                    {agent.videoUrl && (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </Button>
                    )}
                  </div>

                  <Link href={`/agent-marketplace/${agent.slug}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 h-full">
        <div className="relative">
          {/* Image */}
          <div className="aspect-[4/3] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img
              src={agent.mainImage}
              alt={agent.name || "AI Agent"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 z-20">
              <Badge className="bg-white/90 text-slate-900 border-0 shadow-lg backdrop-blur-sm">
                {agent.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-bold shadow-lg">
                ${agent.price}
              </div>
            </div>

            {/* Overlay Actions */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-2">
                <Link href={`/agent-marketplace/${agent.slug}`}>
                  <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white shadow-lg backdrop-blur-sm">
                    View Details
                  </Button>
                </Link>
                {agent.videoUrl && (
                  <Button size="sm" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-lg backdrop-blur-sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                  {agent.name || "Unnamed Agent"}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {agent.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                {agent.description || "No description available"}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{agent.totalSales}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{agent.setupTime || "Quick"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>{agent.difficulty}</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1">
              {agent.techStack.slice(0, 3).map((tech: string) => (
                <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                  {tech}
                </Badge>
              ))}
              {agent.techStack.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  +{agent.techStack.length - 3}
                </Badge>
              )}
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                ${agent.price}
              </div>

              <Link href={`/agent-marketplace/${agent.slug}`}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg group">
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
