import { motion } from "framer-motion";
import { Bot, Zap, Brain, Clock, Shield, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/services/custom-AI-Agent/HeroSection";
import { ProblemSolutionSection } from "@/components/services/custom-AI-Agent/ProblemSolutionSection";
import { CoreCapabilitiesSection } from "@/components/services/custom-AI-Agent/CoreCapabilitiesSection";
import { TechnicalEdgeSection } from "@/components/services/custom-AI-Agent/TechnicalEdgeSection";



export default function AIAgents() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <ProblemSolutionSection />

      <CoreCapabilitiesSection />

      <TechnicalEdgeSection />

      {/* Driplare Roadmap (The Process) */}
      <section className="py-20 bg-gray-100 text-black">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Driplare Roadmap: Your Path to Automation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From initial concept to continuous optimization, our structured approach ensures success.
            </p>
          </motion.div>

          <div className="relative space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {/* Line connecting steps for larger screens */}
            <div className="absolute inset-0 flex justify-center md:hidden">
              <div className="w-1 bg-gray-300 h-full" />
            </div>

            {/* Step 1 */}
            <motion.div
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Discovery (The Audit)</h3>
              <p className="text-muted-foreground">
                We map your current manual workflows and identify the highest-impact automation opportunities.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Architecture (The Design)</h3>
              <p className="text-muted-foreground">
                We design the agent's personality, knowledge base, and integration points with your current tools.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Deployment (The Launch)</h3>
              <p className="text-muted-foreground">
                We train the agent on your specific data and deploy it within your secure ecosystem.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Optimization (The Growth)</h3>
              <p className="text-muted-foreground">
                We provide continuous monitoring and logic updates to ensure your agent evolves with your business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-white text-black">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clear answers to your most pressing questions about custom AI agents.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <motion.div
              className="border border-gray-200 rounded-xl p-6 bg-gray-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-2">Q: Will the AI give wrong information to my customers?</h3>
              <p className="text-muted-foreground">
                <span className="font-bold">A:</span> No. We use Retrieval-Augmented Generation (RAG). This limits the AI to only using your approved documents and data, ensuring accuracy and brand consistency.
              </p>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              className="border border-gray-200 rounded-xl p-6 bg-gray-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-lg mb-2">Q: Can this replace my current CRM or Chat tools?</h3>
              <p className="text-muted-foreground">
                <span className="font-bold">A:</span> It doesn't replace them—it supercharges them. Our agents act as a layer that sits on top of your current tools to automate the "thinking" and "doing."
              </p>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              className="border border-gray-200 rounded-xl p-6 bg-gray-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg mb-2">Q: How long does a custom deployment take?</h3>
              <p className="text-muted-foreground">
                <span className="font-bold">A:</span> Depending on complexity, most custom agents are fully integrated and operational within 2 to 4 weeks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Trading Hours for Tasks.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              You’re one agent away from a business that works while you sleep. Let's engineer your efficiency.
            </p>
            <Button size="lg" variant="secondary" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <Link to="/contact">
                Start Your AI Transformation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
