import { motion } from "framer-motion";

export const TechLogosSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We Speak the Language of Every App.
          </h2>
          <p className="text-lg mb-8 opacity-90">
            We specialize in <span className="font-bold text-orange-500">n8n</span> and <span className="font-bold text-orange-500">Zapier</span> to build highly flexible, enterprise-grade automations. Whether you use legacy software or modern SaaS tools, if it has an API, we can automate it.
          </p>
        </motion.div>

        {/* Placeholder for grayscale slider of logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
          <div className="h-16 w-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">Zapier</div>
          <div className="h-16 w-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">n8n</div>
          <div className="h-16 w-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">Make</div>
          <div className="h-16 w-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">Slack</div>
          <div className="h-16 w-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">Shopify</div>
          <div className="h-16 w-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400">HubSpot</div>
        </div>
      </div>
    </section>
  );
};
