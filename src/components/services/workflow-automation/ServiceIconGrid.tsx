import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const automationServices = [
  {
    icon: "📇",
    title: "CRM & Lead Management",
    copy: "Automatically route leads from any source into your CRM, assign them to the right team member, and trigger instant \"thank you\" sequences without lifting a finger."
  },
  {
    icon: "💳",
    title: "Financial & Invoicing Pipelines",
    copy: "Bridge the gap between your payment gateways (Stripe/PayPal) and your accounting software. Automate invoice generation, payment tracking, and late-fee reminders."
  },
  {
    icon: "🔄",
    title: "Data Synchronization",
    copy: "Ensure your Google Sheets, MongoDB databases, and Project Management tools (Asana/Trello) are always in perfect sync. No more outdated information."
  },
  {
    icon: "📊",
    title: "Automated Reporting & Alerts",
    copy: "Get daily summaries of your key business metrics delivered to Slack or Email. Stay informed without having to log into five different dashboards."
  }
];

export const ServiceIconGrid = () => {
  return (
    <section className="py-20 bg-white text-black">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core Automation Services: The "What"
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just build chatbots; we engineer intelligent agents for specific business functions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {automationServices.map((service, idx) => (
            <motion.div
              key={service.title}
              className="bg-card rounded-xl p-6 border border-border hover:border-orange-500 transition-all hover:shadow-lg text-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl text-orange-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
