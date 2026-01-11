"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const expertise = [
  "MERN_STACK",
  "SYSTEM_ARCHITECTURE",
  "AI_AGENTS",
  "WORKFLOW_AUTOMATION",
  "AWS_INFRA",
  "API_GOVERNANCE",
  "NEURAL_NETS",
  "DATA_INTEGRITY",
  "SECURITY_AUDIT",
];

export function ExpertiseMarquee() {
  const { t } = useTranslation();

  const stats = [
    { label: t("services.consulting.marquee.stats.systems"), val: "150+" },
    { label: t("services.consulting.marquee.stats.audits"), val: "420+" },
    { label: t("services.consulting.marquee.stats.success"), val: "98%" },
    { label: t("services.consulting.marquee.stats.protocol"), val: "ELITE" },
  ];

  return (
    <section className="py-20 bg-white border-b border-black/5 relative overflow-hidden">
      <div className="container mb-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-black font-montserrat uppercase tracking-tight">
          {t("services.consulting.marquee.title")}{" "}
          <span className="text-primary">
            {t("services.consulting.marquee.titleSpan")}
          </span>{" "}
          {t("services.consulting.marquee.titleEnd")}
        </h2>
      </div>

      {/* Marquee Body */}
      <div className="flex overflow-hidden relative py-4">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...expertise, ...expertise, ...expertise].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#0A0A0B] px-8 py-5 rounded-2xl border border-white/5 group hover:border-primary transition-all duration-500"
            >
              <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
              <span className="font-mono text-sm font-bold text-white uppercase tracking-[0.2em]">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for Smooth Scroll Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      <div className="container mt-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 border border-black/5 rounded-3xl bg-[#F9F9F9]/50 hover:bg-white hover:shadow-xl transition-all duration-500 group"
            >
              <div className="text-3xl md:text-4xl font-black font-montserrat text-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.val}
              </div>
              <div className="text-[10px] font-mono font-black text-black/30 uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
