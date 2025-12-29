import { motion } from "framer-motion";

export const ProblemSolutionSection = () => {
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
            The Empathy Gap: Manual Burden vs. AI Advantage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understand the shift from tedious manual processes to intelligent automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 text-black">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-red-600">The Manual Burden (Old Way)</h3>
            <ul className="space-y-6">
              <li>
                <h4 className="font-semibold text-lg mb-1">Leads Lost:</h4>
                <p className="text-gray-700">Potential clients wait hours for a response after 5 PM.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg mb-1">Team Burnout:</h4>
                <p className="text-gray-700">Staff spent 40% of their day on repetitive data entry.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg mb-1">Human Error:</h4>
                <p className="text-gray-700">Manual tasks lead to inconsistent data and missed follow-ups.</p>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-green-600">The AI Advantage (Driplare Way)</h3>
            <ul className="space-y-6">
              <li>
                <h4 className="font-semibold text-lg mb-1">Instant Engagement:</h4>
                <p className="text-gray-700">AI qualifies and books leads the second they arrive.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg mb-1">Creative Freedom:</h4>
                <p className="text-gray-700">Agents handle the "busy work" while your team scales.</p>
              </li>
              <li>
                <h4 className="font-semibold text-lg mb-1">100% Precision:</h4>
                <p className="text-gray-700">Logic-driven agents execute tasks perfectly, every single time.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
