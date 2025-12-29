import { motion } from "framer-motion";
import { DollarSign, Users, TrendingUp, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const capabilities = [
  {
    icon: DollarSign,
    title: "Price Intelligence",
    focus: "E-commerce & Retail",
    description: "Track competitor price drops and stock levels every minute. Automate your own pricing strategy to stay ahead of the market.",
    features: ["Real-time price monitoring", "Automated alerts", "Dynamic pricing", "Stock level tracking"],
    color: "#FF6B00"
  },
  {
    icon: Users,
    title: "Lead Extraction",
    focus: "B2B Sales",
    description: "Automated monitoring of LinkedIn, Google Maps, and niche directories to feed your sales team with fresh, verified leads daily.",
    features: ["Contact database building", "Company profiling", "Lead scoring", "Email verification"],
    color: "#0A0A0A"
  },
  {
    icon: TrendingUp,
    title: "Financial Monitoring",
    focus: "Markets & Crypto",
    description: "Scrape real-time sentiment from news sites and social media to predict market movements before they happen.",
    features: ["Sentiment analysis", "News aggregation", "Crypto tracking", "Market prediction"],
    color: "#FF6B00"
  },
  {
    icon: FileText,
    title: "Content Aggregation",
    focus: "Research & Media",
    description: "Collect thousands of articles, reviews, or academic papers and use our AI agents to summarize the 'Core Insights' for your team.",
    features: ["Academic research", "Review aggregation", "Content summarization", "Trend analysis"],
    color: "#0A0A0A"
  }
];

export function CapabilityGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
            Specialized Solutions
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-inter">
            The "What" — 4-card grid with "Technical Specification" labels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white border border-[#E5E5E5] rounded-xl p-8 hover:border-[#FF6B00] transition-all duration-300 overflow-hidden"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Scrape Effect Line */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute left-0 top-0 w-1 bg-[#FF6B00] h-full origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}

              <div className="relative z-10">
                {/* Icon and Focus */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${capability.color}15` }}
                  >
                    <capability.icon
                      className="w-8 h-8"
                      style={{ color: capability.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] font-montserrat">{capability.title}</h3>
                    <span className="text-sm font-mono text-[#0A0A0A]/60 bg-[#F5F5F5] px-3 py-1 rounded">
                      {capability.focus}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#0A0A0A]/70 mb-6 leading-relaxed font-inter">{capability.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-bold text-[#0A0A0A] mb-3 font-montserrat">Key Capabilities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {capability.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                        <span className="text-sm text-[#0A0A0A]/70 font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className={`w-full group-hover:bg-[#FF6B00] group-hover:text-white transition-colors ${
                    capability.color === "#0A0A0A"
                      ? "bg-[#0A0A0A] hover:bg-[#FF6B00] text-white"
                      : "bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
                  }`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Technical Specs */}
                <div className="mt-4 pt-4 border-t border-[#E5E5E5]/50">
                  <div className="text-xs font-mono text-[#0A0A0A]/50">
                    TECHNICAL_SPEC: {capability.title.replace(/\s+/g, '_').toUpperCase()} |
                    IMPLEMENTATION: AUTOMATED |
                    SUCCESS_RATE: {Math.floor(95 + Math.random() * 5)}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-[#FF6B00] text-white p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 font-montserrat">Custom Data Solutions</h3>
            <p className="text-white/90 mb-6 font-inter">
              Don't see your use case? We build custom scraping solutions for any data requirement.
            </p>
            <Button asChild className="bg-white text-[#FF6B00] hover:bg-white/90 font-bold">
              <Link to="/contact">
                Discuss Your Needs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
