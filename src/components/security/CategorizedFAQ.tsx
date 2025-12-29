import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Brain, Zap, Code } from "lucide-react";

const categories = [
  {
    id: "ai",
    title: "AI & Intelligence",
    icon: Brain,
    color: "#FF6B00",
    questions: [
      {
        question: "Will the AI hallucinate or give wrong info to my customers?",
        answer: "We prevent this by grounding the AI in a 'Private Knowledge Base.' The agent is instructed to only answer based on your specific documentation. If it doesn't know, it escalates to a human."
      },
      {
        question: "Who owns the AI Agent's logic?",
        answer: "You do. Upon project completion, all custom prompts, n8n workflows, and MERN code are handed over to your organization."
      }
    ]
  },
  {
    id: "automation",
    title: "Automation & Integration",
    icon: Zap,
    color: "#0A0A0A",
    questions: [
      {
        question: "What happens if an automation breaks?",
        answer: "Our systems include 'Error-Handling Logic.' If a workflow fails, the system sends an instant alert to our team (or yours) and attempts a graceful restart."
      },
      {
        question: "Does this replace my current staff?",
        answer: "No. Our systems are designed to 'Augment' your staff by removing repetitive 30-second tasks, allowing your team to focus on high-value strategy."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical & MERN",
    icon: Code,
    color: "#FF6B00",
    questions: [
      {
        question: "Can you integrate with my legacy software?",
        answer: "If your software has an API or a database we can access, we can integrate it. We specialize in building 'MERN Bridges' for older systems."
      }
    ]
  }
];

export function CategorizedFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-20 bg-[#F9F9F9] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            The Knowledge Base
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            Answers to the most common questions about AI integration and automation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon
                    className="w-6 h-6"
                    style={{ color: category.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A]">{category.title}</h3>
                  <div className="text-sm font-mono text-[#0A0A0A]/60">
                    CATEGORY_{category.id.toUpperCase()} | {category.questions.length} QUESTIONS
                  </div>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const itemId = `${category.id}-${itemIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <motion.div
                      key={itemId}
                      className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#FF6B00] transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.1 }}
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full text-left p-6 hover:bg-[#F9F9F9] transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold text-[#0A0A0A] pr-4">
                            {item.question}
                          </h4>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-shrink-0"
                          >
                            <Plus className="w-5 h-5 text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Answer - Heavy slide-down animation */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.3, delay: 0.1 }
                              }
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.2 }
                              }
                            }}
                            className="border-t border-[#E5E5E5] overflow-hidden"
                          >
                            <div className="p-6 pt-4">
                              <p className="text-[#0A0A0A]/80 leading-relaxed">
                                {item.answer}
                              </p>

                              {/* Technical Details */}
                              <div className="mt-4 pt-4 border-t border-[#E5E5E5]/50">
                                <div className="text-xs font-mono text-[#0A0A0A]/60">
                                  {item.question.includes("hallucinate") && "METHOD: RAG_GROUNDING | ACCURACY: 99.7% | ESCALATION: HUMAN"}
                                  {item.question.includes("owns the AI") && "OWNERSHIP: FULL_TRANSFER | FORMAT: SOURCE_CODE | LICENSE: PERPETUAL"}
                                  {item.question.includes("automation breaks") && "PROTOCOL: ERROR_HANDLING | ALERT_TIME: <30s | RECOVERY: AUTO"}
                                  {item.question.includes("replace my current staff") && "DESIGN: AUGMENTATION | IMPACT: 70%_EFFICIENCY | FOCUS: STRATEGY"}
                                  {item.question.includes("legacy software") && "METHOD: API_BRIDGE | SUPPORT: ALL_MAJOR | COMPATIBILITY: 95%"}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Knowledge Base Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-white border border-[#E5E5E5] rounded-xl px-8 py-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">8</div>
                <div className="text-sm text-[#0A0A0A]/60">Questions Answered</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">100%</div>
                <div className="text-sm text-[#0A0A0A]/60">Transparency Level</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">24/7</div>
                <div className="text-sm text-[#0A0A0A]/60">Support Available</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
