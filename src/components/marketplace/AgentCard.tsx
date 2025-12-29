import { motion } from "framer-motion";
import { Star, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AgentCard({ agent }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Pricing Badge */}
      <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border/50 text-sm font-bold text-primary">
        ${agent.price}
      </div>

      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <img
          src={
            agent.image ||
            "https://images.unsplash.com/photo-1677442136019-21780ecad995"
          }
          alt={agent.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
            <Zap size={10} fill="currentColor" /> {agent.category}
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {agent.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
          "{agent.description}"
        </p>

        {/* Tech Stack Icons */}
        <div className="flex items-center gap-2 pt-2">
          {agent?.tools?.map((tool: string) => (
            <span
              key={tool}
              className="text-[10px] bg-accent px-2 py-1 rounded border border-border/50 text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-1 text-sm font-bold">
            <Star size={14} className="text-orange-400 fill-orange-400" />
            {agent.rating}
          </div>
          <Link to={`/agent-marketplace/${agent.id}`}>
            <Button size="sm" className="rounded-full gap-2 group/btn">
              Details{" "}
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
