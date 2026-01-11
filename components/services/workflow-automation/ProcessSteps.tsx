"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const ProcessSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: "01",
      title: t("services.workflow.process.steps.mapping.title"),
      desc: t("services.workflow.process.steps.mapping.desc"),
    },
    {
      id: "02",
      title: t("services.workflow.process.steps.architecting.title"),
      desc: t("services.workflow.process.steps.architecting.desc"),
    },
    {
      id: "03",
      title: t("services.workflow.process.steps.testing.title"),
      desc: t("services.workflow.process.steps.testing.desc"),
    },
    {
      id: "04",
      title: t("services.workflow.process.steps.handover.title"),
      desc: t("services.workflow.process.steps.handover.desc"),
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-white/5 transition-colors duration-300">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0A0A0A] dark:text-white transition-colors">
            {t("services.workflow.process.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 bg-white dark:bg-[#0A0A0A] border border-border/40 dark:border-white/10 rounded-[2rem] text-center hover:border-primary/40 transition-all group"
            >
              <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-full mb-6 inline-block">
                {t("services.workflow.process.stepLabel")}_{step.id}
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-[#0A0A0A] dark:text-white transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/60 dark:text-white/60 font-medium leading-relaxed transition-colors">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
