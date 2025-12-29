import { motion } from "framer-motion";

const painPoints = [
  {
    title: "The Fragmented Stack",
    description: "Your CRM doesn't talk to your Billing, and your Billing doesn't talk to your Support. We fix the silence."
  },
  {
    title: "The Manual Tax",
    description: "Every hour spent on manual data entry is an hour stolen from growth. We buy your time back."
  },
  {
    title: "The Human Error",
    description: "Manual processes eventually fail. Automated workflows are 100% consistent, 100% of the time."
  }
];

export const ProblemGrid = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Cost of Doing Nothing
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Understanding the pain points of un-automated workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, idx) => (
            <motion.div
              key={point.title}
              className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <h3 className="text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-gray-400">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
