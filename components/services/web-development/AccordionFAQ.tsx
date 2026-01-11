"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Code2, ShieldAlert, Cpu } from "lucide-react";

export const AccordionFAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      icon: <Code2 size={16} />,
      tag: t("services.webDev.faq.questions.stack.tag"),
      question: t("services.webDev.faq.questions.stack.q"),
      answer: t("services.webDev.faq.questions.stack.a"),
    },
    {
      icon: <ShieldAlert size={16} />,
      tag: t("services.webDev.faq.questions.security.tag"),
      question: t("services.webDev.faq.questions.security.q"),
      answer: t("services.webDev.faq.questions.security.a"),
    },
    {
      icon: <Cpu size={16} />,
      tag: t("services.webDev.faq.questions.integration.tag"),
      question: t("services.webDev.faq.questions.integration.q"),
      answer: t("services.webDev.faq.questions.integration.a"),
    },
    {
      icon: <HelpCircle size={16} />,
      tag: t("services.webDev.faq.questions.ownership.tag"),
      question: t("services.webDev.faq.questions.ownership.q"),
      answer: t("services.webDev.faq.questions.ownership.a"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white transition-colors duration-300">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column: Context */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase block mb-4">
              {t("services.webDev.faq.tagline")}
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              {t("services.webDev.faq.title")} <br />
              <span className="text-primary italic">
                {t("services.webDev.faq.titleHighlight")}
              </span>
            </h2>
            <p className="text-[#0A0A0A]/50 dark:text-white/40 text-sm font-medium leading-relaxed">
              {t("services.webDev.faq.description")}
            </p>
          </motion.div>

          {/* Right Column: FAQ */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${idx}`}
                    className="border border-border/60 dark:border-white/10 bg-[#F9F9F9] dark:bg-white/5 px-6 rounded-2xl overflow-hidden data-[state=open]:border-primary/40 transition-all shadow-sm"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 group">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-black border border-border dark:border-white/10 flex items-center justify-center text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                          {faq.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[9px] font-black text-primary/40 tracking-widest uppercase block mb-1">
                            {faq.tag}
                          </span>
                          <span className="text-base font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white">
                            {faq.question}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#0A0A0A]/60 dark:text-white/60 text-sm leading-relaxed pb-6 pl-12">
                      <div className="max-w-2xl border-l-2 border-primary/20 pl-6 py-2 italic font-medium">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
