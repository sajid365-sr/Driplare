"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Workflow,
  Database,
  Check,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function CorePillarsSection() {
  const { t } = useTranslation();

  // Pillars array moved inside component to access translations
  const pillars = [
    {
      icon: BrainCircuit,
      title: t("pillars.items.agents.title"),
      description: t("pillars.items.agents.description"),
      features: t("pillars.items.agents.features", {
        returnObjects: true,
      }) as string[],
      status: "READY_FOR_DEPLOY",
    },
    {
      icon: Workflow,
      title: t("pillars.items.workflow.title"),
      description: t("pillars.items.workflow.description"),
      features: t("pillars.items.workflow.features", {
        returnObjects: true,
      }) as string[],
      status: "ACTIVE_NEXUS",
    },
    {
      icon: Database,
      title: t("pillars.items.mern.title"),
      description: t("pillars.items.mern.description"),
      features: t("pillars.items.mern.features", {
        returnObjects: true,
      }) as string[],
      status: "INFRA_STABLE",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0A0A0A] mb-8">
            {t("pillars.title")}{" "}
            <span className="text-primary">{t("pillars.titleAccent")}</span>
          </h2>
          <p className="text-xl text-[#0A0A0A]/60 leading-relaxed font-medium">
            {t("pillars.subtitle")}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-[#E5E5E5] rounded-[2rem] p-10 md:p-12 hover:border-primary transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(var(--primary),0.15)] flex flex-col"
            >
              {/* Status Badge */}
              <div className="absolute top-8 right-8">
                <div className="bg-[#0A0A0A]/5 px-4 py-1.5 rounded-full border border-[#0A0A0A]/5 transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
                  <span className="text-[10px] font-mono font-bold text-[#0A0A0A]/40 group-hover:text-primary uppercase tracking-widest">
                    {pillar.status}
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div className="mb-10">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <pillar.icon
                    className="h-10 w-10 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-3xl font-black text-[#0A0A0A] mb-4 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[#0A0A0A]/60 leading-relaxed font-medium">
                  {pillar.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 border-t border-[#0A0A0A]/5 pt-10">
                  {pillar.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0A0A0A]/80 font-mono leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Meta */}
              <div className="mt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase">
                  Architecture_v4.0
                </span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
