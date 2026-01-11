"use client";

import { motion } from "framer-motion";
import {
  Target,
  Settings,
  Workflow,
  Plus,
  ShieldCheck,
  Database,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function AdvisoryGrid() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Target,
      title: t("services.consulting.advisory.pillars.ai.title"),
      focus: t("services.consulting.advisory.pillars.ai.focus"),
      description: t("services.consulting.advisory.pillars.ai.desc"),
      protocol: "PROTO_AI_09",
      stats: t("services.consulting.advisory.pillars.ai.stats", {
        returnObjects: true,
      }) as string[],
    },
    {
      icon: Settings,
      title: t("services.consulting.advisory.pillars.stack.title"),
      focus: t("services.consulting.advisory.pillars.stack.focus"),
      description: t("services.consulting.advisory.pillars.stack.desc"),
      protocol: "PROTO_STACK_12",
      stats: t("services.consulting.advisory.pillars.stack.stats", {
        returnObjects: true,
      }) as string[],
    },
    {
      icon: Workflow,
      title: t("services.consulting.advisory.pillars.automation.title"),
      focus: t("services.consulting.advisory.pillars.automation.focus"),
      description: t("services.consulting.advisory.pillars.automation.desc"),
      protocol: "PROTO_AUTO_04",
      stats: t("services.consulting.advisory.pillars.automation.stats", {
        returnObjects: true,
      }) as string[],
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-black/5 relative overflow-hidden">
      <div className="container relative z-10 px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1 bg-[#0A0A0B] text-white text-[10px] font-mono font-bold mb-4 rounded-full uppercase tracking-widest">
            {t("services.consulting.advisory.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0B] mb-6 font-montserrat tracking-tighter uppercase italic">
            {t("services.consulting.advisory.title")}
          </h2>
          <p className="text-lg text-black/50 max-w-2xl mx-auto font-medium">
            {t("services.consulting.advisory.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-black/10 rounded-3xl p-8 hover:border-primary transition-all duration-500 flex flex-col h-full hover:shadow-[0_30px_60px_-15px_rgba(255,107,0,0.1)]"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-[#F5F5F7] rounded-2xl text-black group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div className="text-right font-mono text-[9px] font-black text-black/20 group-hover:text-primary/40">
                  REF: {pillar.protocol}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-primary font-mono text-[10px] font-black uppercase tracking-widest">
                  {pillar.focus}
                </span>
                <h3 className="text-2xl font-black text-[#0A0A0B] mt-2 font-montserrat tracking-tight">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-black/60 text-sm leading-relaxed mb-8 flex-grow font-medium">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {pillar.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 bg-black/[0.03] rounded-full border border-black/5 text-[9px] font-mono font-bold uppercase"
                  >
                    + {stat}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <div className="text-[10px] font-mono font-bold text-black/30">
                  AUDIT_STATUS: READY
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono font-black text-primary group-hover:gap-2 transition-all cursor-pointer">
                  INITIATE <Plus className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center px-4"
        >
          <div className="bg-[#0A0A0B] text-white p-2 rounded-[2rem] flex flex-col md:flex-row items-center gap-1 shadow-2xl border border-white/5">
            {[
              {
                icon: ShieldCheck,
                label: "DATA_GOVERNANCE",
                val: "ENCRYPTED_ADVISORY",
                color: "text-green-500",
              },
              {
                icon: Zap,
                label: "SYSTEM_SUCCESS",
                val: "95%_ADOPTION_RATE",
                color: "text-primary",
              },
              {
                icon: Database,
                label: "NETWORK_SCALE",
                val: "MULTI_CLOUD_READY",
                color: "text-blue-400",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-4 px-8 py-4">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <div className="text-left">
                    <div className="text-[9px] font-mono text-white/40 tracking-tighter">
                      {item.label}
                    </div>
                    <div className="text-xs font-bold font-mono tracking-tight">
                      {item.val}
                    </div>
                  </div>
                </div>
                {i < 2 && (
                  <div className="hidden md:block w-px h-8 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
