"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ProblemSolutionSection = () => {
  const { t } = useTranslation();

  const points = [
    {
      id: "latency",
      label: t("services.aiAgents.problemSolution.points.latency.label"),
      old: t("services.aiAgents.problemSolution.points.latency.old"),
      new: t("services.aiAgents.problemSolution.points.latency.new"),
    },
    {
      id: "capacity",
      label: t("services.aiAgents.problemSolution.points.capacity.label"),
      old: t("services.aiAgents.problemSolution.points.capacity.old"),
      new: t("services.aiAgents.problemSolution.points.capacity.new"),
    },
    {
      id: "precision",
      label: t("services.aiAgents.problemSolution.points.precision.label"),
      old: t("services.aiAgents.problemSolution.points.precision.old"),
      new: t("services.aiAgents.problemSolution.points.precision.new"),
    },
  ];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-black/5 transition-colors duration-300">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Manual Burden Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-white/5 border border-border/60 dark:border-white/10 p-10 rounded-[2.5rem] transition-colors"
          >
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="text-red-500" size={24} />
              <h3 className="font-black text-xl uppercase tracking-tighter text-[#0A0A0A] dark:text-white">
                {t("services.aiAgents.problemSolution.manualTitle")}
              </h3>
            </div>
            <div className="space-y-8">
              {points.map((p) => (
                <div key={p.id} className="group">
                  <span className="font-mono text-[9px] text-[#0A0A0A]/30 dark:text-white/30 font-bold uppercase tracking-[0.2em]">
                    {p.label}
                  </span>
                  <p className="text-[#0A0A0A]/60 dark:text-white/60 font-medium mt-1">
                    {p.old}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Advantage Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] dark:bg-[#0A0A0A] border-transparent dark:border dark:border-white/20 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CheckCircle2 size={120} className="text-primary" />
            </div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <CheckCircle2 size={24} className="text-primary" />
              <h3 className="font-black text-xl uppercase tracking-tighter">
                {t("services.aiAgents.problemSolution.advantageTitle")}
              </h3>
            </div>
            <div className="space-y-8 relative z-10">
              {points.map((p) => (
                <div key={p.id}>
                  <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.2em]">
                    {p.label}_SOLVED [Image of automated workflow]
                  </span>
                  <p className="text-white font-black text-lg mt-1 tracking-tight">
                    {p.new}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
