"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Database } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TechnicalEdgeSection = () => {
  const { t } = useTranslation();

  const techStack = [
    {
      icon: <Database />,
      title: t("services.aiAgents.technical.stack.rag.title"),
      desc: t("services.aiAgents.technical.stack.rag.desc"),
    },
    {
      icon: <Cpu />,
      title: t("services.aiAgents.technical.stack.mern.title"),
      desc: t("services.aiAgents.technical.stack.mern.desc"),
    },
    {
      icon: <Zap />,
      title: t("services.aiAgents.technical.stack.workflow.title"),
      desc: t("services.aiAgents.technical.stack.workflow.desc"),
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] text-white transition-colors duration-300 overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
              {t("services.aiAgents.technical.tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mt-4 mb-8 leading-tight transition-colors">
              {t("services.aiAgents.technical.title")} <br />
              <span className="text-primary italic">
                {t("services.aiAgents.technical.titleHighlight")}
              </span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10 transition-colors">
              {t("services.aiAgents.technical.description")}
            </p>

            <div className="space-y-4">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-sm">
                      {tech.title}
                    </h4>
                    <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-widest">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-primary/20 blur-[120px] absolute inset-0 rounded-full" />
            <div className="relative border border-white/10 bg-white/5 p-8 rounded-[3rem] backdrop-blur-sm shadow-2xl">
              <pre className="font-mono text-[10px] sm:text-[12px] text-primary/60 leading-tight">
                {`
{
  "agent_id": "DRIPLARE_01",
  "logic_engine": "O1_PRO_ORCHESTRATION",
  "knowledge_base": "VECTOR_SYNC_RAG",
  "status": "READY_FOR_DEPLOY",
  "connections": [
    "MONGODB_PRODUCTION",
    "WHATSAPP_API_CLOUD",
    "N8N_CORE_SERVER"
  ]
}
                `}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
