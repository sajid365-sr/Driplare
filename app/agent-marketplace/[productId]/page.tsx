"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Globe,
  Zap,
  Code2,
  PlayCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentCard } from "@/components/marketplace/AgentCard";
import { getAgentById, getAllAgents } from "@/lib/agent-marketplace-action";
import { useTranslation } from "react-i18next";

interface Agent {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  fullDescription?: string;
  features: string[];
  techStack?: string[];
  tools?: string[];
  image: string;
  rating: number;
}

export default function AgentDetailsPage() {
  const { t } = useTranslation();
  const params = useParams();
  const productId = params?.productId as string;

  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  // ক্যাটাগরি লেবেলের জন্য হেল্পার (আগের মতো)
  const getCategoryLabel = (cat: string) => {
    const key = cat?.toLowerCase().replace(/ & /g, "_").replace(/ /g, "_");
    const translated = t(`marketplace.filters.categories.${key}`);
    return translated.includes("marketplace.") ? cat : translated;
  };

  useEffect(() => {
    if (!productId) return;
    async function loadData() {
      try {
        setLoading(true);
        const agentRes = await getAgentById(productId);
        if (agentRes?.success && agentRes.data) {
          setCurrentAgent(agentRes.data as Agent);
        }
        const allRes = await getAllAgents();
        if (allRes?.success && allRes.data) {
          const filtered = (allRes.data as Agent[])
            .filter((a) => a.id !== productId)
            .slice(0, 3);
          setRelatedAgents(filtered);
        }
      } catch (error) {
        console.error("Failed to load agent:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentAgent) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold">
          {t("marketplace.agent_details.not_found")}
        </p>
        <Link href="/agent-marketplace" className="text-primary underline">
          {t("marketplace.agent_details.back_to_market")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-28 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header Navigation */}
        <Link
          href="/agent-marketplace"
          className="inline-flex items-center cursor-pointer gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t("marketplace.agent_details.back_to_market")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Content */}
          <div className="lg:col-span-2 space-y-12">
            <header className="space-y-4">
              <Badge
                variant="outline"
                className="text-primary border-primary/30 uppercase tracking-widest px-3 py-1"
              >
                {getCategoryLabel(currentAgent.category)}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight dark:text-white">
                {currentAgent.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl italic">
                {currentAgent.fullDescription || currentAgent.description}
              </p>
            </header>

            {/* Visual Demo Area */}
            <div className="group relative aspect-video bg-black rounded-3xl border border-border/50 overflow-hidden shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="p-5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <PlayCircle size={48} className="text-primary" />
                </div>
                <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {t("marketplace.agent_details.demo_label")}
                </span>
              </div>
              <div className="absolute bottom-4 left-6 font-mono text-[10px] text-primary/30 pointer-events-none hidden md:block select-none">
                {`> exec_agent_flow --id=${currentAgent.id}`} <br />
                {`> status: ready_for_deployment`} <br />
                {`> encryption: AES-256`}
              </div>
            </div>

            {/* Information Tabs */}
            <Tabs defaultValue="capabilities" className="w-full">
              <TabsList className="bg-accent/30 p-1 border border-border/50 w-full justify-start rounded-xl mb-6">
                <TabsTrigger value="capabilities" className="rounded-lg px-6">
                  {t("marketplace..tabs.capabilities")}
                </TabsTrigger>
                <TabsTrigger value="technical" className="rounded-lg px-6">
                  {t("marketplace.agent_details.tabs.architecture")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="capabilities" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(currentAgent.features || []).map(
                    (feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-5 bg-card border border-border/40 rounded-2xl hover:border-primary/30 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-primary" size={20} />
                        </div>
                        <span className="font-semibold dark:text-gray-200">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value="technical"
                className="bg-accent/20 p-8 rounded-3xl border border-border/50"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest">
                        <Layers size={14} />{" "}
                        {t("marketplace.agent_details.technical.core_stack")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(
                          currentAgent.techStack ||
                          currentAgent.tools ||
                          []
                        ).map((t: string) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-background border border-border/50 rounded-md text-xs font-mono dark:text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest">
                        <ShieldCheck size={14} />{" "}
                        {t(
                          "marketplace.agent_details.technical.security_title"
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        {t("marketplace.agent_details.technical.security_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-64 h-48 bg-background/50 rounded-2xl border border-dashed border-border/50 flex flex-col items-center justify-center p-4 text-center">
                    <Cpu size={32} className="text-primary/40 mb-3" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase leading-tight">
                      {t("marketplace.agent_details.technical.viz_label")}
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT: Action Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 rounded-3xl border border-border/50 bg-card shadow-2xl relative overflow-hidden dark:bg-card/40 dark:backdrop-blur-md">
                <div className="absolute top-0 right-0 p-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                </div>

                <div className="space-y-2 mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {t("marketplace.agent_details.sidebar.investment")}
                  </p>
                  <div className="text-6xl font-black text-primary flex items-baseline gap-1">
                    <span className="text-2xl">$</span>
                    {currentAgent.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <SidebarItem
                    icon={Zap}
                    label={t("marketplace.agent_details.sidebar.setup_time")}
                    value={t("marketplace.agent_details.sidebar.setup_value")}
                  />
                  <SidebarItem
                    icon={Code2}
                    label={t("marketplace.agent_details.sidebar.maintenance")}
                    value={t(
                      "marketplace.agent_details.sidebar.maintenance_value"
                    )}
                  />
                  <SidebarItem
                    icon={Globe}
                    label={t("marketplace.agent_details.sidebar.access")}
                    value={t("marketplace.agent_details.sidebar.access_value")}
                  />
                </div>

                <div className="space-y-3">
                  <Button className="w-full py-7 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    {t("marketplace.agent_details.sidebar.btn_deploy")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-7 rounded-2xl border-border/50 hover:bg-primary/5 dark:text-white"
                  >
                    {t("marketplace.agent_details.sidebar.btn_brief")}
                  </Button>
                </div>
              </div>

              {/* Support Card */}
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4 transition-colors hover:bg-primary/10">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Sparkles className="text-primary" size={20} />
                </div>
                <div className="text-sm">
                  <p className="font-bold dark:text-white">
                    {t("marketplace.agent_details.custom_card.title")}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {t("marketplace.agent_details.custom_card.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED AGENTS SECTION */}
        <div className="mt-32 pt-20 border-t border-border/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic dark:text-white">
                {t("marketplace.agent_details.synergy.title")}{" "}
                <span className="text-primary underline decoration-primary/20">
                  {t("marketplace.agent_details.synergy.accent")}
                </span>
              </h2>
              <p className="text-muted-foreground">
                {t("marketplace.agent_details.synergy.desc", {
                  name: currentAgent.name,
                })}
              </p>
            </div>
            <Link href="/agent-marketplace">
              <Button
                variant="link"
                className="text-primary p-0 h-auto font-bold uppercase tracking-widest text-xs"
              >
                {t("marketplace.agent_details.synergy.view_all")}{" "}
                <ArrowLeft size={14} className="rotate-180 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <Icon size={16} className="text-primary/70" /> {label}
      </div>
      <span className="text-sm font-bold dark:text-gray-200">{value}</span>
    </div>
  );
}
