"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Sheet, Clock } from "lucide-react";
import { Agent, AgentContent } from "@/types/agent-marketplace";

interface ProductFeaturesProps {
  agent: Agent;
  langContent: AgentContent;
}

const iconMap: Record<number, any> = {
  0: Bot,
  1: MessageSquare,
  2: Sheet,
  3: Clock,
};

export default function ProductFeatures({ agent, langContent }: ProductFeaturesProps) {
  // Default benefits if not in database
  const defaultBenefits = langContent.features.map(() => 
    "Save time and increase efficiency"
  );

  const benefits = langContent.benefits || defaultBenefits;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            {langContent.howItHelps || "Transform Your Business Operations"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {langContent.fullDescription}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {langContent.features.map((feature: string, idx: number) => {
            const Icon = iconMap[idx] || Bot;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-ai/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-ai/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-ai" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefits[idx] || "Improve your workflow and productivity"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section (if available) */}
        {langContent.benefits && langContent.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-ai/5 to-trust/5 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Why This Matters for Your Business
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {langContent.benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-trust flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{idx + 1}</span>
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        {agent.techStack && agent.techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Built With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {agent.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}