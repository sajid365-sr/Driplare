import { motion } from "framer-motion";

const advantages = [
  {
    title: "Speed of Innovation",
    description: "JavaScript from top to bottom means faster development cycles and lower costs for you.",
    icon: "⚡"
  },
  {
    title: "Infinite Scalability",
    description: "Built to handle thousands of concurrent users and massive datasets without breaking a sweat.",
    icon: "📈"
  },
  {
    title: "Future-Proof",
    description: "Powered by the technologies that run the world's largest platforms (Meta, Netflix, Airbnb).",
    icon: "🔮"
  }
];

export const TechAdvantageRow = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Why the MERN Stack?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Efficiency Argument
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {advantages.map((advantage, idx) => (
            <motion.div
              key={advantage.title}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl text-orange-500 mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-black">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </motion.div>
          ))}
        </div>

        {/* MERN Stack Icons */}
        <motion.div
          className="flex justify-center items-center gap-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">M</div>
            <span className="text-sm font-medium">MongoDB</span>
          </div>
          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">E</div>
            <span className="text-sm font-medium">Express</span>
          </div>
          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">R</div>
            <span className="text-sm font-medium">React</span>
          </div>
          <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">N</div>
            <span className="text-sm font-medium">Node.js</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
