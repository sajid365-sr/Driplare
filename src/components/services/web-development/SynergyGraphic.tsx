import { motion } from "framer-motion";

export const SynergyGraphic = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">
            More Than Just Code.
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Most developers just build the app. We build the app to be <strong>Automation-Ready.</strong> Every MERN system we engineer is designed to integrate seamlessly with our <strong>Custom AI Agents</strong> and <strong>n8n Workflows</strong>. It's not just a tool; it's an intelligent asset.
          </p>
        </motion.div>

        {/* Venn Diagram Placeholder */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative aspect-square bg-gray-800 rounded-full p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-orange-500 mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-orange-400 mb-2">Driplare</h3>
              <p className="text-sm text-gray-400">Where Code, AI & Automation Unite</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
