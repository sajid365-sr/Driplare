import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do you offer maintenance?",
    answer: "Yes. We offer 'System Oversight' retainers to ensure your AI stays updated as your business evolves. This includes performance monitoring, updates, and quarterly optimization sessions."
  },
  {
    question: "What if I need a custom stack?",
    answer: "We specialize in MERN. If your requirements exceed our tiers, we provide a detailed 'Technical Specification' and a custom quote. Our enterprise solutions can integrate with any tech stack you prefer."
  },
  {
    question: "How long does deployment take?",
    answer: "Our productized tiers have fixed timelines: Starter (7 days), Efficiency Pro (14 days). Enterprise deployments are scheduled based on complexity, typically 4-8 weeks for full implementation."
  },
  {
    question: "Can I upgrade from one tier to another?",
    answer: "Absolutely. We design our systems to be scalable. Upgrading typically involves additional agent development and deeper integrations, with prorated pricing based on your current investment."
  },
  {
    question: "What kind of support do you provide?",
    answer: "All tiers include initial training and documentation. Starter includes email support, Pro includes priority Slack support, and Enterprise includes 24/7 monitoring with dedicated success management."
  }
];

export function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-2 rounded-full font-mono text-sm mb-4">
            <HelpCircle className="w-4 h-4" />
            DECISION_CLOSER
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            Everything you need to know about investing in our AI systems.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 hover:bg-[#F9F9F9] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#0A0A0A] pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-[#0A0A0A]/60 flex-shrink-0" />
                    </motion.div>
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#E5E5E5]"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-[#0A0A0A]/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-[#FF6B00] text-white p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-white/90 mb-6">
                Our technical team is ready to provide detailed answers specific to your business needs.
              </p>
              <button className="bg-white text-[#FF6B00] px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
