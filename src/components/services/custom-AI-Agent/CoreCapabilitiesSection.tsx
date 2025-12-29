import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "Lead Qualification Agents",
    description: "Instantly vet and score leads from WhatsApp, Email, or Web Forms. Our agents ensure only high-value prospects reach your CRM, saving your sales team hours of filtering."
  },
  {
    icon: "🤖",
    title: "Customer Support Agents",
    description: "Move beyond basic chatbots. We build agents that access your internal knowledge base (RAG) to solve complex queries and only escalate to humans when absolutely necessary."
  },
  {
    icon: "📈",
    title: "Research & Data Agents",
    description: "Autonomous agents that scrape, summarize, and deliver market insights or competitor pricing directly to your dashboard. Stay ahead of the market on autopilot."
  },
  {
    icon: "⚙️",
    title: "Operations Agents",
    description: "Connect your entire stack. These agents trigger n8n workflows, update MongoDB databases, and send Slack notifications the moment a specific business event occurs."
  }
];

export const CoreCapabilitiesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core Capabilities: The "What"
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just build chatbots; we engineer intelligent agents for specific business functions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className="bg-card rounded-xl p-6 border border-border hover:border-orange-500 transition-all hover:shadow-lg text-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl text-orange-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
