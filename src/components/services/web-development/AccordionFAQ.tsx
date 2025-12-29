import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why choose MERN over WordPress or No-Code?",
    answer: "MERN is for businesses that have outgrown \"off-the-shelf\" solutions. It offers total freedom, better security, and significantly higher performance for complex data tasks."
  },
  {
    question: "How do you handle security?",
    answer: "We implement industry-standard JWT authentication, data encryption, and secure API practices to ensure your business data remains your business data."
  },
  {
    question: "Can you build mobile apps with this stack?",
    answer: "Yes. Using React Native, we can leverage your MERN backend to launch native iOS and Android apps with shared logic, saving you time and money."
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
            Clear answers to your most pressing questions about MERN stack development.
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
