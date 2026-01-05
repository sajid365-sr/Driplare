"use client";

import { Bot, Sparkles } from "lucide-react";

export function MarketplaceHero() {
  return (
    <div className="relative text-center space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
        <Sparkles size={14} /> Ready-to-Deploy Intelligence
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
        Agent <span className="text-primary">Marketplace</span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Browse our catalog of pre-trained AI agents designed to handle specific
        business workflows. Select, customize, and deploy in hours, not weeks.
      </p>
    </div>
  );
}
