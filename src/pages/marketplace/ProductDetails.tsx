import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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

// Mock Data (Ideally exported from a central /data/agents.ts)
const AGENTS = [
  {
    id: "1",
    name: "Social Concierge AI",
    category: "Customer Support",
    price: 499,
    fullDescription:
      "A sophisticated autonomous agent designed to sit at the front lines of your social media presence. It qualifies leads and schedules meetings in your CRM 24/7.",
    features: [
      "Instant 24/7 Response",
      "HubSpot Integration",
      "Multi-language",
      "Calendly Booking",
    ],
    techStack: ["OpenAI GPT-4o", "n8n", "Meta API"],
    image: "/agents/social-ai.png",
    rating: 4.9,
  },
  {
    id: "2",
    name: "LinkedIn Lead Ghost",
    category: "Lead Generation",
    price: 799,
    description:
      "Automated outbound agent that finds prospects and crafts personalized intros.",
    tools: ["PhantomBuster", "Claude 3.5", "Make"],
    image: "/agents/linkedin-ai.png",
    rating: 5.0,
  },
  {
    id: "3",
    name: "E-com Price Watcher",
    category: "Data & Scraping",
    price: 299,
    description:
      "Monitors competitor prices hourly and updates your Shopify store.",
    tools: ["BrightData", "Node.js", "Shopify"],
    image: "/agents/scraping-ai.png",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Email Outreach Bot",
    category: "Lead Generation",
    price: 550,
    description:
      "Cold email automation with AI-powered icebreakers and deliverability checks.",
    tools: ["Instantly", "GPT-4", "n8n"],
    image: "/agents/email-bot.png",
    rating: 4.7,
  },
];

export default function AgentDetailsPage() {
  const { id } = useParams();

  const currentAgent = useMemo(
    () => AGENTS.find((a) => a.id === id) || AGENTS[0],
    [id]
  );

  // Logic for Related Agents: Same category, excluding current
  const relatedAgents = useMemo(() => {
    return AGENTS.filter((a) => a.id !== currentAgent.id).slice(0, 3);
  }, [currentAgent]);

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="container mx-auto px-4">
        {/* Header Navigation */}
        <Link
          to="/agent-marketplace"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Content */}
          <div className="lg:col-span-2 space-y-12">
            <header className="space-y-4">
              <Badge
                variant="outline"
                className="text-primary border-primary/30 uppercase tracking-widest px-3 py-1"
              >
                {currentAgent.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {currentAgent.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
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
                  Initialize System Demo
                </span>
              </div>
              {/* Background "Code" decorative element */}
              <div className="absolute bottom-4 left-6 font-mono text-[10px] text-primary/30 pointer-events-none hidden md:block">
                {`> exec_agent_flow --id=${currentAgent.id}`}
                <br />
                {`> status: ready_for_deployment`}
                <br />
                {`> encryption: AES-256`}
              </div>
            </div>

            {/* Information Tabs */}
            <Tabs defaultValue="capabilities" className="w-full">
              <TabsList className="bg-accent/30 p-1 border border-border/50 w-full justify-start rounded-xl mb-6">
                <TabsTrigger value="capabilities" className="rounded-lg px-6">
                  Capabilities
                </TabsTrigger>
                <TabsTrigger value="technical" className="rounded-lg px-6">
                  System Architecture
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
                        <span className="font-semibold">{feature}</span>
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
                        <Layers size={14} /> Core Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(
                          currentAgent.techStack ||
                          currentAgent.tools ||
                          []
                        ).map((t: string) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-background border border-border/50 rounded-md text-xs font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest">
                        <ShieldCheck size={14} /> Security Protocol
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        Encrypted API handshakes with end-to-end data
                        obfuscation. No personal data is stored on external LLM
                        servers.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-64 h-48 bg-background/50 rounded-2xl border border-dashed border-border/50 flex flex-col items-center justify-center p-4 text-center">
                    <Cpu size={32} className="text-primary/40 mb-3" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      Neural Processing Visualization Hook
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT: Action Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 rounded-3xl border border-border/50 bg-card shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                </div>

                <div className="space-y-2 mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Investment
                  </p>
                  <div className="text-6xl font-black text-primary flex items-baseline gap-1">
                    <span className="text-2xl">$</span>
                    {currentAgent.price}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <SidebarItem
                    icon={Zap}
                    label="Setup Time"
                    value="48-72 Hours"
                  />
                  <SidebarItem
                    icon={Code2}
                    label="Maintenance"
                    value="Lifetime Logic"
                  />
                  <SidebarItem icon={Globe} label="Access" value="Global API" />
                </div>

                <div className="space-y-3">
                  <Button className="w-full py-7 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Deploy This Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-7 rounded-2xl border-border/50 hover:bg-primary/5"
                  >
                    Schedule Technical Brief
                  </Button>
                </div>
              </div>

              {/* Support Card */}
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Sparkles className="text-primary" size={20} />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Need Customization?</p>
                  <p className="text-muted-foreground text-xs">
                    We can tweak this agent's logic for your specific CRM.
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
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
                Cross-System{" "}
                <span className="text-primary underline decoration-primary/20">
                  Synergy
                </span>
              </h2>
              <p className="text-muted-foreground">
                Other agents frequently deployed alongside {currentAgent.name}.
              </p>
            </div>
            <Link to="/agent-marketplace">
              <Button
                variant="link"
                className="text-primary p-0 h-auto font-bold uppercase tracking-widest text-xs"
              >
                View Full Catalog{" "}
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

// Helper Sidebar Component
function SidebarItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <Icon size={16} className="text-primary/70" /> {label}
      </div>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}
