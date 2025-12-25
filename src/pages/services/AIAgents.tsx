import { motion } from "framer-motion";
import { Bot, Zap, Brain, Clock, Shield, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "Human-Like Intelligence",
    description: "AI agents that understand context, learn from interactions, and make intelligent decisions autonomously."
  },
  {
    icon: Clock,
    title: "24/7 Operation",
    description: "Your digital workforce never sleeps. Handle customer inquiries, process data, and execute tasks around the clock."
  },
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Complete hours of manual work in seconds with optimized AI processing and parallel task handling."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance standards to protect your sensitive business data."
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage customers with natural language processing that feels human and builds trust."
  },
  {
    icon: Bot,
    title: "Custom Training",
    description: "Agents trained specifically on your business processes, products, and brand voice."
  }
];

const useCases = [
  {
    title: "Customer Support Agent",
    description: "Handle tier-1 support tickets, answer FAQs, and escalate complex issues intelligently.",
    metric: "80% ticket resolution without human intervention"
  },
  {
    title: "Sales Development Rep",
    description: "Qualify leads, schedule meetings, and nurture prospects through personalized outreach.",
    metric: "3x increase in qualified meetings"
  },
  {
    title: "Data Analysis Agent",
    description: "Process large datasets, generate insights, and create automated reports on demand.",
    metric: "10+ hours saved per week"
  },
  {
    title: "Content Creation Agent",
    description: "Generate blog posts, social media content, and marketing copy aligned with your brand.",
    metric: "50% reduction in content production time"
  }
];

export default function AIAgents() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-6">
              <Bot className="h-5 w-5" />
              <span className="text-sm font-medium">Custom AI Agents</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Autonomous Digital Workers
              <span className="block text-primary">That Never Sleep</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deploy intelligent AI agents that handle complex tasks, engage customers,
              and drive results—all while you focus on strategic growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Get Your Custom Agent
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our AI Agents?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology and customized for your specific business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Agents for Every Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From customer support to sales automation, our agents are transforming businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={useCase.title}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{useCase.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Deploy Your AI Workforce?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let's build a custom AI agent that transforms how your business operates.
              Schedule a free consultation today.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/contact">
                Schedule Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
