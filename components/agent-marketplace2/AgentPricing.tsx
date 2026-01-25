"use client";
import React from "react";
import { Rocket, Check, ShieldCheck, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AgentPricing = ({ price, setupTime, difficulty, onGetStarted }: any) => {
  const inclusions = [
    "Full AI Agent Integration",
    "Natural Language Processing",
    "24/7 Automated Support",
    "Custom Brand Voice",
    "Lifetime Updates"
  ];

  return (
    <Card className="border-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] dark:bg-slate-900 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-1 h-2" />
      <CardContent className="p-8">
        <div className="mb-6">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">One-Time Setup Fee</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black">${price}</span>
            <span className="text-slate-400 font-medium">/project</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {inclusions.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              {item}
            </div>
          ))}
        </div>

        <Button 
          onClick={onGetStarted}
          className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25"
        >
          <Rocket className="mr-2 h-6 w-6" />
          Deploy This Agent
        </Button>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={12}/> Setup Time</span>
            <span className="font-bold text-sm">{setupTime || "24-48 Hours"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 flex items-center gap-1"><Zap size={12}/> Difficulty</span>
            <span className="font-bold text-sm">{difficulty}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPricing;