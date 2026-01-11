"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function CapabilityGrid() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const capabilities = [
    {
      icon: DollarSign,
      title: t("services.scraping.capabilities.nodes.market.title"),
      focus: t("services.scraping.capabilities.nodes.market.focus"),
      description: t("services.scraping.capabilities.nodes.market.desc"),
      protocol: "PRICE_EXTRACTION_01",
      features: [
        "Dynamic Pricing Flow",
        "Inventory Leak Detection",
        "Competitor Heatmaps",
        "Stock-Out Alerts",
      ],
    },
    {
      icon: Users,
      title: t("services.scraping.capabilities.nodes.leads.title"),
      focus: t("services.scraping.capabilities.nodes.leads.focus"),
      description: t("services.scraping.capabilities.nodes.leads.desc"),
      protocol: "LEAD_GEN_PROTO_02",
      features: [
        "Identity Verification",
        "Company Data Cleansing",
        "Lead Scoring Logic",
        "Verified Contact Matrix",
      ],
    },
    {
      icon: TrendingUp,
      title: t("services.scraping.capabilities.nodes.sentiment.title"),
      focus: t("services.scraping.capabilities.nodes.sentiment.focus"),
      description: t("services.scraping.capabilities.nodes.sentiment.desc"),
      protocol: "FINANCIAL_SENTIMENT_03",
      features: [
        "Trend Velocity Tracking",
        "News Aggregation Nodes",
        "Crypto Social Scans",
        "Volatility Forecasting",
      ],
    },
    {
      icon: FileText,
      title: t("services.scraping.capabilities.nodes.insight.title"),
      focus: t("services.scraping.capabilities.nodes.insight.focus"),
      description: t("services.scraping.capabilities.nodes.insight.desc"),
      protocol: "CONTENT_AGGREGATOR_04",
      features: [
        "Academic Scraper Nodes",
        "Review Sentiment Sync",
        "Insight Distillation",
        "Media Trend Synthesis",
      ],
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] text-[#0A0A0B] dark:text-white relative overflow-hidden transition-colors">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="light-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#light-grid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div className="text-center mb-20">
          <div className="flex justify-center gap-3 mb-6 font-mono text-[10px] tracking-widest uppercase">
            <span className="px-3 py-1 border border-black/10 dark:border-white/10 rounded-full">
              Manual_Input
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-bold">
              <Zap className="w-3 h-3 fill-primary" /> Driplare_Hub
            </div>
            <span className="px-3 py-1 border border-black/10 dark:border-white/10 rounded-full">
              Auto_Output
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">
            {t("services.scraping.capabilities.tagline").split(" ")[0]}{" "}
            <span className="text-primary">
              {t("services.scraping.capabilities.tagline").split(" ")[1]}
            </span>
          </h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto italic">
            {t("services.scraping.capabilities.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-black dark:bg-white/10 text-white rounded-2xl group-hover:bg-primary transition-colors">
                  <capability.icon className="w-6 h-6" />
                </div>
                <div className="text-right font-mono">
                  <div className="text-[10px] text-black/30 dark:text-white/30 font-bold uppercase tracking-widest mb-1">
                    Protocol_Registry
                  </div>
                  <div className="text-xs font-bold text-primary">
                    {capability.protocol}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight uppercase">
                  {capability.title}
                </h3>
                <div className="inline-block px-3 py-1 rounded bg-black/[0.03] dark:bg-white/[0.05] text-[10px] font-mono font-bold uppercase text-primary tracking-wider">
                  Target_Sector: {capability.focus}
                </div>
                <p className="text-black/60 dark:text-white/50 leading-relaxed min-h-[80px]">
                  {capability.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {capability.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[11px] font-bold text-black/70 dark:text-white/70 uppercase">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Button className="w-full bg-black dark:bg-white dark:text-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white text-white rounded-xl h-14 font-black uppercase tracking-widest transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrated Footer CTA */}
        <motion.div className="mt-20 p-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-[2rem]">
          <div className="bg-white dark:bg-[#0A0A0B] rounded-[1.8rem] p-12 text-center relative overflow-hidden border border-black/5 dark:border-white/5">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">
                {t("services.scraping.capabilities.footer.title")}
              </h3>
              <p className="text-black/50 dark:text-white/50 mb-8">
                {t("services.scraping.capabilities.footer.desc")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-black dark:hover:bg-white dark:hover:text-black text-white px-10 h-14 rounded-xl font-bold transition-all"
                >
                  <Link href="/contact">
                    {t("services.scraping.capabilities.footer.button")}{" "}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-black/30 dark:text-white/30">
                  <ShieldCheck className="w-4 h-4 text-green-500" />{" "}
                  DATA_INTEGRITY: VERIFIED
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
