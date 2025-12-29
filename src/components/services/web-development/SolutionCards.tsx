import { motion } from "framer-motion";

const solutions = [
  {
    icon: "📊",
    title: "Custom Business Dashboards",
    description: "Stop logging into ten different tools. We build centralized MERN dashboards that pull data from your AI agents and automation workflows into one beautiful, real-time control center."
  },
  {
    icon: "🛠️",
    title: "Internal Operations Tools",
    description: "Standard SaaS doesn't always fit. We build bespoke internal tools—inventory systems, project trackers, or client portals—designed specifically for your team's unique workflow."
  },
  {
    icon: "🔌",
    title: "API Development & Integration",
    description: "We build the \"bridges\" that allow your systems to talk to each other. Robust, secure, and lightning-fast APIs that serve as the nervous system of your business."
  },
  {
    icon: "🚀",
    title: "Legacy Modernization",
    description: "Is your old software holding you back? We migrate slow, outdated systems into modern MERN environments, increasing speed, security, and mobile responsiveness."
  }
];

export const SolutionCards = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Custom Solutions We Build
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The "What"
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, idx) => (
            <motion.div
              key={solution.title}
              className="bg-card rounded-xl p-6 border border-border hover:border-orange-500 transition-all hover:shadow-lg text-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl text-orange-500 mb-4">{solution.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
              <p className="text-muted-foreground">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
