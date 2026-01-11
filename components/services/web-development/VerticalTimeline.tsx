"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const VerticalTimeline = () => {
  const { t } = useTranslation();

  const lifecycleSteps = [
    {
      id: "01",
      title: t("services.webDev.lifecycle.steps.arch.title"),
      desc: t("services.webDev.lifecycle.steps.arch.desc"),
    },
    {
      id: "02",
      title: t("services.webDev.lifecycle.steps.agile.title"),
      desc: t("services.webDev.lifecycle.steps.agile.desc"),
    },
    {
      id: "03",
      title: t("services.webDev.lifecycle.steps.stress.title"),
      desc: t("services.webDev.lifecycle.steps.stress.desc"),
    },
    {
      id: "04",
      title: t("services.webDev.lifecycle.steps.cloud.title"),
      desc: t("services.webDev.lifecycle.steps.cloud.desc"),
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-white/5 transition-colors duration-300">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0A0A0A] dark:text-white transition-colors">
            {t("services.webDev.lifecycle.header")}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/60 dark:bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {lifecycleSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 text-center md:text-left w-full">
                  <div
                    className={`p-8 bg-white dark:bg-[#0A0A0A] border border-border/40 dark:border-white/10 rounded-[2rem] shadow-sm hover:border-primary/40 transition-all group ${
                      idx % 2 !== 0 && "md:text-right"
                    }`}
                  >
                    <span className="font-mono text-xs font-black text-primary tracking-widest">
                      {step.id}
                    </span>
                    <h3 className="text-xl font-black uppercase mt-2 mb-3 text-[#0A0A0A] dark:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#0A0A0A]/50 dark:text-white/50 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="w-4 h-4 bg-primary rounded-full relative z-10 hidden md:block shadow-[0_0_15px_rgba(255,107,0,0.5)] group-hover:scale-150 transition-transform" />

                {/* Empty Space for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
