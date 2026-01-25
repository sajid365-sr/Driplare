"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, TrendingUp, Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProcessedAgent } from "@/types/agent-marketplace";

interface AgentCardProps {
  agent: ProcessedAgent;
  index: number;
  viewMode: "grid" | "list";
}

export function AgentCard({ agent, index, viewMode }: AgentCardProps) {
  const router = useRouter();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4
      }
    },
  };

  const handleClick = () => {
    router.push(`/agent-marketplace/${agent.slug}`);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className="bg-card border-2 border-border rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={handleClick}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
            <Image
              src={agent.mainImage}
              alt={agent.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-driplare text-white border-0 shadow-lg">
                {agent.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1 shadow-lg">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">{agent.rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground group-hover:text-driplare transition-colors">
                {agent.name}
              </h3>
              
              <p className="text-muted-foreground mb-6 line-clamp-2 text-base">
                {agent.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-trust" />
                  <span className="font-semibold">{agent.totalSales} sales</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-ai" />
                  <span>{agent.setupTime}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${
                    agent.difficulty === "Easy" 
                      ? "border-green-500 text-green-700 dark:text-green-400" 
                      : agent.difficulty === "Medium"
                      ? "border-yellow-500 text-yellow-700 dark:text-yellow-400"
                      : "border-red-500 text-red-700 dark:text-red-400"
                  }`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {agent.difficulty}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-foreground">
                    ${agent.price}
                  </span>
                  <span className="text-muted-foreground text-sm line-through">
                    ${Math.round(agent.price * 1.5)}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  One-time setup fee
                </span>
              </div>
              <Button 
                size="lg"
                className="bg-driplare hover:bg-driplare/90 text-white font-semibold group-hover:translate-x-1 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                View Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View - Premium Design
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      className="bg-card border-2 border-border rounded-2xl shadow-md hover:shadow-2xl hover:border-driplare/50 transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        <Image
          src={agent.mainImage}
          alt={agent.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <Badge className="bg-driplare text-white border-0 shadow-lg">
            {agent.category}
          </Badge>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1 shadow-lg">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm">{agent.rating}</span>
          </div>
        </div>

        {/* Popular Badge */}
        {agent.totalSales > 50 && (
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-trust text-white border-0 shadow-lg">
              🔥 Popular
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-1 group-hover:text-driplare transition-colors">
          {agent.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {agent.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-trust" />
            <span className="font-semibold">{agent.totalSales}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4 text-ai" />
            <span>{agent.setupTime}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <Badge 
            variant="outline" 
            className={`${
              agent.difficulty === "Easy" 
                ? "border-green-500 text-green-700 dark:text-green-400 bg-green-500/5" 
                : agent.difficulty === "Medium"
                ? "border-yellow-500 text-yellow-700 dark:text-yellow-400 bg-yellow-500/5"
                : "border-red-500 text-red-700 dark:text-red-400 bg-red-500/5"
            }`}
          >
            <Zap className="h-3 w-3 mr-1" />
            {agent.difficulty} Setup
          </Badge>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-border">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground">
                ${agent.price}
              </span>
              <span className="text-muted-foreground text-xs line-through">
                ${Math.round(agent.price * 1.5)}
              </span>
            </div>
            <span className="text-muted-foreground text-xs">
              one-time
            </span>
          </div>
          <Button 
            size="sm"
            className="bg-driplare hover:bg-driplare/90 text-white font-semibold group-hover:translate-x-1 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}