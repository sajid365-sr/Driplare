import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Zap, Database, Cpu, Network } from "lucide-react";

const logicFlows = [
  {
    project: "Competitor Pricing Monitor",
    steps: [
      {
        icon: Network,
        title: "Data Collection Layer",
        description: "Puppeteer scrapers navigate competitor websites every 60 seconds, collecting real-time pricing data across 15+ sources.",
        tech: ["Node.js", "Puppeteer", "Cron Jobs"]
      },
      {
        icon: Cpu,
        title: "AI Analysis Engine",
        description: "OpenAI GPT-4 analyzes pricing patterns, market trends, and competitive positioning to generate actionable insights.",
        tech: ["OpenAI API", "Python", "Natural Language Processing"]
      },
      {
        icon: Database,
        title: "Data Storage & Processing",
        description: "MongoDB stores historical pricing data while Express APIs serve real-time updates to the React dashboard.",
        tech: ["MongoDB", "Express.js", "Mongoose ODM"]
      },
      {
        icon: Zap,
        title: "Alert & Automation System",
        description: "n8n workflows trigger automated alerts and price adjustment recommendations based on predefined business rules.",
        tech: ["n8n", "Webhook APIs", "Email/SMS Integration"]
      }
    ]
  }
];

export function LogicAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Inside the Logic
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            We believe in transparency. Click any project to see the technical architecture behind the efficiency.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-[#0A0A0A] text-white p-6 rounded-xl hover:bg-[#1F1F1F] transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">View Technical Architecture</h3>
                <p className="text-white/70 font-mono text-sm">
                  PROJECT: {logicFlows[selectedProject].project} | STATUS: {isOpen ? 'EXPANDED' : 'COLLAPSED'}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-[#FF6B00]" />
              </motion.div>
            </div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <div className="bg-[#F9F9F9] rounded-xl p-8 border border-[#E5E5E5]">
                  <div className="space-y-8">
                    {logicFlows[selectedProject].steps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {/* Step Number and Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold font-mono">
                            {index + 1}
                          </div>
                          <div className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white mt-4">
                            <step.icon className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-[#0A0A0A] mb-2">{step.title}</h4>
                          <p className="text-[#0A0A0A]/70 mb-4 leading-relaxed">{step.description}</p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {step.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-white text-[#0A0A0A] text-xs font-mono rounded-full border border-[#E5E5E5]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Connection Line */}
                        {index < logicFlows[selectedProject].steps.length - 1 && (
                          <div className="flex-shrink-0 w-px h-24 bg-gradient-to-b from-[#FF6B00] to-[#E5E5E5] mt-8"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* System Status Footer */}
                  <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span className="text-[#0A0A0A]/60">SYSTEM_STATUS:</span>
                      <span className="text-green-600 font-bold">OPERATIONAL</span>
                      <span className="text-[#0A0A0A]/60">LAST_AUDIT:</span>
                      <span className="text-[#0A0A0A]">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
