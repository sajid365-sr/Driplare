"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AccordionFAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("services.workflow.faq.questions.security.q"),
      answer: t("services.workflow.faq.questions.security.a"),
    },
    {
      question: t("services.workflow.faq.questions.failure.q"),
      answer: t("services.workflow.faq.questions.failure.a"),
    },
    {
      question: t("services.workflow.faq.questions.legacy.q"),
      answer: t("services.workflow.faq.questions.legacy.a"),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-300">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
            {t("services.workflow.faq.title")}
          </h2>
          <p className="text-muted-foreground dark:text-white/40 max-w-2xl mx-auto font-medium">
            {t("services.workflow.faq.subtitle")}
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
                <AccordionItem
                  value={`item-${idx}`}
                  className="border-border/60 dark:border-white/10"
                >
                  <AccordionTrigger className="text-lg font-black uppercase tracking-tight text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground dark:text-white/60 text-base leading-relaxed">
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
