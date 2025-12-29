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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            The Core <span className="text-primary">AI Agent Tiers.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Productized solutions for predictable value generation. Each tier is designed for specific business scales.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 ${
                tier.popular 
                ? "bg-card border-primary shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] scale-105 z-10" 
                : tier.tier === 3
                ? "bg-[#0A0A0A] border-white/10 text-white"
                : "bg-card/50 border-border hover:border-primary/50 shadow-sm"
              }`}
            >
              {/* Specialized Badges */}
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  <span className="flex items-center gap-2 text-white">
                    <Zap className="w-3 h-3 fill-current" /> Most Efficient
                  </span>
                </div>
              )}
              {tier.tier === 3 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border border-black/10">
                  <span className="flex items-center gap-2">
                    <Crown className="w-3 h-3 fill-current" /> Enterprise Elite
                  </span>
                </div>
              )}

              {/* Title & Description */}
              <div className="mb-8">
                <h3 className={`text-2xl font-black mb-3 ${tier.tier === 3 ? 'text-white' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm leading-relaxed ${tier.tier === 3 ? 'text-white/60' : 'text-muted-foreground'}`}>
                  {tier.description}
                </p>
              </div>

              {/* Pricing Section */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-black tracking-tighter ${tier.tier === 3 ? 'text-primary' : 'text-foreground'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm font-medium uppercase tracking-widest ${tier.tier === 3 ? 'text-white/40' : 'text-muted-foreground'}`}>
                    / {tier.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${tier.tier === 3 ? 'text-primary' : 'text-primary'}`} />
                    <span className={`text-sm font-medium ${tier.tier === 3 ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                className={`w-full py-7 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  tier.popular 
                  ? "bg-primary text-white hover:opacity-90 shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)]" 
                  : tier.tier === 3
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-accent hover:bg-accent/80 text-foreground"
                }`}
              >
                {tier.cta} <ArrowRight className="w-5 h-5" />
              </Button>

              {/* System Metadata Footer */}
              <div className={`mt-8 pt-6 border-t ${tier.tier === 3 ? 'border-white/5' : 'border-border/50'}`}>
                <div className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-center ${tier.tier === 3 ? 'text-white/30' : 'text-muted-foreground/50'}`}>
                  VALUE_GENERATION: {tier.tier === 1 ? 'HIGH' : tier.tier === 2 ? 'MAXIMUM' : 'ENTERPRISE_INFRA'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Infrastructure Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground/60 font-mono text-xs uppercase tracking-widest">
            All deployments include core architecture, security protocols, and 0-latency optimization.
          </p>
        </motion.div>
      </div>
    </section>
  );
}