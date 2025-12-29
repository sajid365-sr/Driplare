import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my data secure during automation?",
    answer: "Absolutely. We prioritize end-to-end encryption and often use self-hosted tools like n8n for clients who require maximum data privacy."
  },
  {
    question: "What if an automation breaks?",
    answer: "We build \"Error Handling\" into every workflow. If a connection fails, you (and we) get an instant alert, and the system attempts a graceful recovery."
  },
  {
    question: "Can you automate legacy software with no API?",
    answer: "Often, yes. We use various \"hooks\" and custom scripts to bridge even the most stubborn software into a modern workflow."
  }
];

export const AccordionFAQ = () => {
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
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clear answers to your most pressing questions about workflow automation.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
