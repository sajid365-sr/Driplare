"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      q: t("services.aiAgents.faq.questions.accuracy.q"),
      a: t("services.aiAgents.faq.questions.accuracy.a"),
    },
    {
      q: t("services.aiAgents.faq.questions.legacy.q"),
      a: t("services.aiAgents.faq.questions.legacy.a"),
    },
    {
      q: t("services.aiAgents.faq.questions.timeline.q"),
      a: t("services.aiAgents.faq.questions.timeline.a"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0A0A0A] dark:text-white transition-colors">
            {t("services.aiAgents.faq.title")}
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-[#F9F9F9] dark:bg-white/5 rounded-[2rem] border border-border/40 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all"
            >
              <h3 className="flex items-center gap-4 text-lg font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white">
                <span className="text-primary font-mono text-sm">Q//</span>{" "}
                {faq.q}
              </h3>
              <p className="mt-4 text-[#0A0A0A]/60 dark:text-white/60 font-medium leading-relaxed pl-10 border-l-2 border-primary/20">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
