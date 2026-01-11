"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const RoadmapSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: "01",
      title: t("services.aiAgents.roadmap.steps.step1.title"),
      desc: t("services.aiAgents.roadmap.steps.step1.desc"),
      tag: t("services.aiAgents.roadmap.steps.step1.tag"),
    },
    {
      id: "02",
      title: t("services.aiAgents.roadmap.steps.step2.title"),
      desc: t("services.aiAgents.roadmap.steps.step2.desc"),
      tag: t("services.aiAgents.roadmap.steps.step2.tag"),
    },
    {
      id: "03",
      title: t("services.aiAgents.roadmap.steps.step3.title"),
      desc: t("services.aiAgents.roadmap.steps.step3.desc"),
      tag: t("services.aiAgents.roadmap.steps.step3.tag"),
    },
    {
      id: "04",
      title: t("services.aiAgents.roadmap.steps.step4.title"),
      desc: t("services.aiAgents.roadmap.steps.step4.desc"),
      tag: t("services.aiAgents.roadmap.steps.step4.tag"),
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-black/5 transition-colors duration-300">
      <div className="container">
        <div className="max-w-4xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            {t("services.aiAgents.roadmap.tagline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] dark:text-white tracking-tighter uppercase mt-4 transition-colors">
            {t("services.aiAgents.roadmap.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-border/60 dark:border-white/10 shadow-sm group hover:border-primary transition-all"
            >
              <span className="font-mono text-4xl font-black text-primary/10 dark:text-primary/20">
                {step.id}
              </span>
              <div className="mt-4">
                <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 dark:bg-primary/10 px-2 py-1 rounded-md">
                  {step.tag}
                </span>
                <h3 className="text-xl font-black text-[#0A0A0A] dark:text-white mt-4 mb-3 uppercase tracking-tighter transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[#0A0A0A]/60 dark:text-white/60 font-medium leading-relaxed transition-colors">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
