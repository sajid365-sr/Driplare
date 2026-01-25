"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Award } from "lucide-react";

interface MarketplaceStatsProps {
  totalAgents: number;
}

export default function MarketplaceStats({ totalAgents }: MarketplaceStatsProps) {
  const stats = [
    { 
      icon: Users, 
      label: "Active Customers", 
      value: "127+",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: DollarSign, 
      label: "Revenue Generated", 
      value: "$2.4M+",
      color: "from-green-500 to-green-600"
    },
    { 
      icon: TrendingUp, 
      label: "Sales Automated", 
      value: "10K+",
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: Award, 
      label: "AI Solutions", 
      value: totalAgents.toString(),
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Results That Speak for Themselves
          </h2>
          <p className="text-muted-foreground text-lg">
            Join hundreds of businesses automating their way to success
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Value */}
                <div className="text-3xl md:text-4xl font-black text-foreground mb-2">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-trust/10 border border-trust/20 rounded-full px-6 py-3">
            <Award className="h-5 w-5 text-trust" />
            <span className="font-semibold text-foreground">
              Rated 4.9/5 by 100+ verified customers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}