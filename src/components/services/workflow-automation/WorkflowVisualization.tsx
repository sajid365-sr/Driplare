import { motion } from "framer-motion";

export const WorkflowVisualization = () => {
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
            The Chaos vs. Order Visual
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A side-by-side diagram. Left side: Messy lines between app icons (The Chaos). Right side: Structured, clean lines flowing through a central Driplare hub (The Order).
          </p>
        </motion.div>
        {/* Placeholder for the visual */}
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          [Insert Workflow Visualization Here]
        </div>
      </div>
    </section>
  );
};
