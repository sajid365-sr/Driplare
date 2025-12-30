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
import { Link } from "react-router-dom";
import { useState } from "react";

const capabilities = [
  {
    icon: DollarSign,
    title: "Market Arbiter",
    focus: "E-Commerce Intelligence",
    description:
      "Real-time monitoring of competitor price-drops and SKU movements. We convert market volatility into your competitive edge.",
    features: [
      "Dynamic Pricing Flow",
      "Inventory Leak Detection",
      "Competitor Heatmaps",
      "Stock-Out Alerts",
    ],
    protocol: "PRICE_EXTRACTION_01",
  },
  {
    icon: Users,
    title: "Lead Catalyst",
    focus: "B2B Neural Growth",
    description:
      "Automated extraction from LinkedIn, Google Maps, and niche directories. High-velocity pipeline feeding for modern sales teams.",
    features: [
      "Identity Verification",
      "Company Data Cleansing",
      "Lead Scoring Logic",
      "Verified Contact Matrix",
    ],
    protocol: "LEAD_GEN_PROTO_02",
  },
  {
    icon: TrendingUp,
    title: "Sentiment Pulse",
    focus: "Fin-Tech & Analytics",
    description:
      "Deep-scraping news and social signals. We quantify the 'mood' of the market before the charts reflect the movement.",
    features: [
      "Trend Velocity Tracking",
      "News Aggregation Nodes",
      "Crypto Social Scans",
      "Volatility Forecasting",
    ],
    protocol: "FINANCIAL_SENTIMENT_03",
  },
  {
    icon: FileText,
    title: "Core Insight Engine",
    focus: "Research & Media",
    description:
      "Mass aggregation of articles and reviews processed through AI summarizing agents to extract raw, actionable intelligence.",
    features: [
      "Academic Scraper Nodes",
      "Review Sentiment Sync",
      "Insight Distillation",
      "Media Trend Synthesis",
    ],
    protocol: "CONTENT_AGGREGATOR_04",
  },
];

export function CapabilityGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white text-[#0A0A0B] relative overflow-hidden">
      {/* Subtle Blueprint Grid - Light Mode */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
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
              stroke="#000"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#light-grid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Status Bar - Refined for White Background */}
          <div className="flex justify-center gap-3 mb-6 font-mono text-[10px] tracking-widest uppercase">
            <span className="px-3 py-1 border border-black/10 rounded-full text-black/40">
              Manual_Input
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full text-[#FF6B00] font-bold">
              <Zap className="w-3 h-3 fill-[#FF6B00]" />
              Driplare_Hub
            </div>
            <span className="px-3 py-1 border border-black/10 rounded-full text-black/40">
              Auto_Output
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 font-montserrat tracking-tighter uppercase">
            Specialized <span className="text-[#FF6B00]">Nodes</span>
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-inter">
            Architecting the bridge between raw web data and executive
            decision-making.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-white border border-black/5 rounded-3xl p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-[#FF6B00]/30 transition-all duration-500"
            >
              {/* Technical Header */}
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-black text-white rounded-2xl group-hover:bg-[#FF6B00] transition-colors duration-500">
                  <capability.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-black/30 font-bold uppercase tracking-widest mb-1">
                    Protocol_Registry
                  </div>
                  <div className="text-xs font-mono font-bold text-[#FF6B00]">
                    {capability.protocol}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-montserrat tracking-tight">
                  {capability.title}
                </h3>
                <div className="inline-block px-3 py-1 rounded bg-black/[0.03] text-[10px] font-mono font-bold uppercase text-black/40 tracking-wider">
                  Target_Sector: {capability.focus}
                </div>
                <p className="text-black/60 leading-relaxed font-inter py-2">
                  {capability.description}
                </p>

                {/* Neo-bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {capability.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                      <span className="text-xs font-medium text-black/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Button className="w-full bg-black hover:bg-[#FF6B00] text-white rounded-xl h-14 font-bold transition-all group-hover:shadow-lg group-hover:shadow-[#FF6B00]/20">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrated Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-1 bg-[#0A0A0B] rounded-[2rem] overflow-hidden"
        >
          <div className="bg-white rounded-[1.8rem] p-12 text-center relative overflow-hidden">
            {/* Design Element: Abstract data flow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center"
                    >
                      <Cpu className="w-4 h-4 text-[#FF6B00]" />
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-3xl font-black font-montserrat mb-4 uppercase tracking-tighter">
                Custom Neural Architectures
              </h3>
              <p className="text-black/50 mb-8 font-inter">
                Need a specific extraction engine? We build bespoke MERN
                interfaces to handle any data complexity or volume.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF6B00] hover:bg-black text-white px-10 h-14 rounded-xl font-bold shadow-xl shadow-[#FF6B00]/10 transition-all"
                >
                  <Link to="/contact">
                    Discuss Custom Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-black/30">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
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
