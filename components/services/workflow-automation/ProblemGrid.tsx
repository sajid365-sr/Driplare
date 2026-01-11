"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ProblemGrid = () => {
  const { t } = useTranslation();

  const painPoints = [
    {
      id: "stack",
      code: "ERR_SILOED_DATA",
      title: t("services.workflow.problems.points.stack.title"),
      desc: t("services.workflow.problems.points.stack.desc"),
    },
    {
      id: "manual",
      code: "ERR_LOW_ROI",
      title: t("services.workflow.problems.points.manual.title"),
      desc: t("services.workflow.problems.points.manual.desc"),
    },
    {
      id: "drift",
      code: "ERR_LOGIC_FAIL",
      title: t("services.workflow.problems.points.drift.title"),
      desc: t("services.workflow.problems.points.drift.desc"),
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden transition-colors duration-300">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            {t("services.workflow.problems.tagline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mt-4 mb-6 transition-colors">
            {t("services.workflow.problems.title")}{" "}
            <span className="text-primary italic">
              {t("services.workflow.problems.titleHighlight")}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, idx) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent relative group transition-all"
              whileHover={{ borderColor: "rgba(255, 107, 0, 0.3)" }}
            >
              <AlertTriangle
                className="text-primary/40 group-hover:text-primary transition-colors mb-6"
                size={24}
              />
              <span className="font-mono text-[10px] text-primary font-black tracking-widest uppercase">
                {point.code}
              </span>
              <h3 className="text-xl font-black uppercase mt-2 mb-4 tracking-tight text-white transition-colors">
                {point.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-medium transition-colors">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
