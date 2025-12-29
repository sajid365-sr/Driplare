import { motion } from "framer-motion";

export const TechnicalEdgeSection = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-500">
            Native Integration, Not Just a Wrapper.
          </h2>
          <p className="text-lg mb-8 opacity-90">
            We don't just build "GPT-wrappers." Driplare agents are deeply integrated into your tech stack.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">RAG Architecture</h3>
              <p className="text-gray-400">Your AI stays grounded in your data, preventing hallucinations.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">MERN Compatibility</h3>
              <p className="text-gray-400">Seamlessly connects to your React dashboards and Node.js backends.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-xl">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">Workflow Logic</h3>
              <p className="text-gray-400">Powered by n8n to connect with 400+ third-party business apps.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
