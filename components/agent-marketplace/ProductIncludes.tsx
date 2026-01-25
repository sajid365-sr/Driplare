"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Agent, AgentContent } from "@/types/agent-marketplace";

interface ProductIncludesProps {
  agent: Agent;
  langContent: AgentContent;
}

export default function ProductIncludes({ agent, langContent }: ProductIncludesProps) {
  // Default includes if not in database
  const defaultIncludes = [
    "Complete AI agent setup",
    "Custom training for your products",
    "Integration with your platforms",
    "1-month free support",
    "Video tutorial & documentation"
  ];

  const includes = agent.includes && agent.includes.length > 0 
    ? agent.includes 
    : defaultIncludes;

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl font-bold">What You Get</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {includes.map((item: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 text-left bg-background p-4 rounded-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-trust flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}