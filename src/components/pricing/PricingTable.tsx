import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Crown } from "lucide-react";

const tiers = [
  {
    name: "Starter Agent",
    price: "$2,500",
    period: "Setup",
    description: "Perfect for your first AI implementation",
    tier: 1,
    features: [
      "1 Custom AI Agent",
      "Basic Knowledge Base (RAG)",
      "7-Day Deployment",
      "Email Support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Efficiency Pro",
    price: "$7,500",
    period: "Setup",
    description: "Most businesses start here for maximum value generation",
    tier: 2,
    features: [
      "3 Interconnected Agents",
      "Deep Integration (CRM/Docs)",
      "14-Day Deployment",
      "Priority Slack Support",
      "Performance Analytics",
      "Monthly Optimization Calls"
    ],
    cta: "Engineer My Business",
    popular: true
  },
  {
    name: "Enterprise Architect",
    price: "Custom",
    period: "Quote",
    description: "Full AI workforce with custom MERN infrastructure",
    tier: 3,
    features: [
      "Full AI Workforce",
      "Custom MERN Dashboard",
      "Priority Architecture",
      "24/7 System Monitoring",
      "Dedicated Success Manager",
      "Unlimited Optimization"
    ],
    cta: "Book Consultation",
    popular: false
  }
];

export function PricingTable() {
  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            The Core AI Agent Tiers
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            Productized solutions for predictable value generation. Each tier is designed for specific business scales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B00]/20 hover:-translate-y-2 ${
                tier.tier === 1
                  ? 'border-[#E5E5E5] hover:border-[#FF6B00]'
                  : tier.tier === 2
                  ? 'border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20'
                  : 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#FF6B00] text-white px-4 py-2 rounded-full text-sm font-mono font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Efficient
                  </div>
                </div>
              )}

              {/* Enterprise Badge */}
              {tier.tier === 3 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-white text-[#0A0A0A] px-4 py-2 rounded-full text-sm font-mono font-bold flex items-center gap-2 border-2 border-[#0A0A0A]">
                    <Crown className="w-4 h-4" />
                    Enterprise Elite
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  tier.tier === 3 ? 'text-white' : 'text-[#0A0A0A]'
                }`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  tier.tier === 3 ? 'text-white/70' : 'text-[#0A0A0A]/70'
                }`}>
                  {tier.description}
                </p>

                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className={`text-4xl font-mono font-bold ${
                    tier.tier === 3 ? 'text-[#FF6B00]' : 'text-[#FF6B00]'
                  }`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm font-mono ${
                    tier.tier === 3 ? 'text-white/60' : 'text-[#0A0A0A]/60'
                  }`}>
                    / {tier.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      tier.tier === 1
                        ? 'text-[#0A0A0A]'
                        : tier.tier === 2
                        ? 'text-[#FF6B00]'
                        : 'text-[#FF6B00]'
                    }`} />
                    <span className={`text-sm leading-relaxed ${
                      tier.tier === 3 ? 'text-white/90' : 'text-[#0A0A0A]/80'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full font-mono font-bold ${
                  tier.tier === 1
                    ? 'bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white'
                    : tier.tier === 2
                    ? 'bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white'
                    : 'bg-white hover:bg-white/90 text-[#0A0A0A] border-2 border-white'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Value Indicator */}
              <div className={`mt-6 text-center ${
                tier.tier === 3 ? 'text-white/60' : 'text-[#0A0A0A]/60'
              }`}>
                <div className="text-xs font-mono">
                  VALUE_GENERATION: {tier.tier === 1 ? 'HIGH' : tier.tier === 2 ? 'MAXIMUM' : 'ENTERPRISE'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-[#0A0A0A]/60 font-mono text-sm">
            All investments include system architecture, deployment, and initial training.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
