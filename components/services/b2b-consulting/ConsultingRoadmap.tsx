"use client";

import { motion } from "framer-motion";
import { Search, FileText, Cog, CheckCircle, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ConsultingRoadmap() {
  const { t } = useTranslation();

  const phases = [
    {
      phase: "01",
      title: t("services.consulting.roadmap.phases.p1.title"),
      status: "DISCOVERY_MODE",
      description: t("services.consulting.roadmap.phases.p1.desc"),
      deliverables: t("services.consulting.roadmap.phases.p1.items", {
        returnObjects: true,
      }) as string[],
      icon: Search,
    },
    {
      phase: "02",
      title: t("services.consulting.roadmap.phases.p2.title"),
      status: "ARCHITECT_MODE",
      description: t("services.consulting.roadmap.phases.p2.desc"),
      deliverables: t("services.consulting.roadmap.phases.p2.items", {
        returnObjects: true,
      }) as string[],
      icon: FileText,
    },
    {
      phase: "03",
      title: t("services.consulting.roadmap.phases.p3.title"),
      status: "ENGINEERING_MODE",
      description: t("services.consulting.roadmap.phases.p3.desc"),
      deliverables: t("services.consulting.roadmap.phases.p3.items", {
        returnObjects: true,
      }) as string[],
      icon: Cog,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container relative z-10 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black font-montserrat tracking-tighter uppercase mb-6 italic">
            {t("services.consulting.roadmap.title")}{" "}
            <span className="text-primary not-italic">Pathway</span>
          </h2>
          <p className="text-lg md:text-xl text-black/50 font-medium max-w-2xl mx-auto">
            {t("services.consulting.roadmap.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central Connecting Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-black/5 hidden md:block" />

          <div className="space-y-32">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Visual Icon Node */}
                <div className="flex-1 flex justify-center z-10">
                  <div className="relative group">
                    <div className="w-28 h-28 bg-[#0A0A0B] rounded-[2.5rem] rotate-12 flex items-center justify-center group-hover:rotate-0 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                      <phase.icon className="w-10 h-10 text-white -rotate-12 group-hover:rotate-0 transition-transform" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-black font-mono shadow-xl border-4 border-white">
                      {phase.phase}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div className="bg-[#F9F9F9] border border-black/5 p-8 md:p-12 rounded-[3rem] hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] font-mono font-black text-primary tracking-widest bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                        {phase.status}
                      </span>
                      <ArrowDown className="w-5 h-5 text-black/10 group-hover:text-primary/30 transition-colors" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black font-montserrat mb-4 uppercase tracking-tight">
                      {phase.title}
                    </h3>
                    <p className="text-black/60 font-medium leading-relaxed mb-10">
                      {phase.description}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {phase.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 text-xs font-mono font-bold text-black/50 bg-white border border-black/5 p-4 rounded-2xl hover:border-primary/20 transition-all"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
