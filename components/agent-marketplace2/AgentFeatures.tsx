"use client";

import React from "react";
import { CheckCircle2, Cpu, Sparkles, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AgentFeatures = ({ features, techStack }: any) => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl h-14 w-full md:w-auto">
          <TabsTrigger value="features" className="rounded-xl px-8 h-full font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Main Capabilities
          </TabsTrigger>
          <TabsTrigger value="tech" className="rounded-xl px-8 h-full font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Technical Specs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature: string, i: number) => (
              <div 
                key={i} 
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-lg"
              >
                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 italic uppercase tracking-tight">Feature {i+1}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-snug">{feature}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tech" className="mt-8">
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-blue-500" />
              <h3 className="text-xl font-bold italic uppercase">Engineered With</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech: string) => (
                <span key={tech} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold border border-white/10 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentFeatures;