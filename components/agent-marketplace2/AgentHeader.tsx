"use client";

import React from "react";
import { ArrowLeft, Star, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AgentHeaderProps {
  category: string;
  totalSales: number;
  rating: number;
  name: string;
  description: string;
  onGetStarted: () => void;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({ 
  category, totalSales, rating, name, description, onGetStarted 
}) => {
  return (
    <div className="space-y-6">
      <Link href="/agent-marketplace" className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold">Back to Marketplace</span>
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-blue-600/10 text-blue-600 border-0 px-3 py-1 font-bold">{category}</Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded-full text-xs font-bold border border-amber-200/50">
            <Star size={14} className="fill-current" /> {rating.toFixed(1)} Rating
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold">
            <Users size={14} /> {totalSales}+ Deployed
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-tight">
          {name}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-medium">
          {description}
        </p>
      </div>

      <div className="flex pt-4">
        <Button onClick={onGetStarted} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20">
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default AgentHeader;