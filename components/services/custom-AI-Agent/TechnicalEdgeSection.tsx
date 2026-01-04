'use client'

import { motion } from "framer-motion";
import { Cpu, Zap, Database } from "lucide-react";

export const TechnicalEdgeSection = () => (
  <section className="py-24 bg-[#0A0A0A] text-white">
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            The_Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mt-4 mb-8">
            Native Integration, <br />
            <span className="text-primary italic">Not Just a Wrapper.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            We don't build "GPT-wrappers." Driplare agents are architected into
            your MERN stack and n8n workflows for deep-level autonomy.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: <Database />,
                title: "RAG Architecture",
                desc: "Mathematically grounded in your specific data.",
              },
              {
                icon: <Cpu />,
                title: "MERN Native",
                desc: "Seamless Node.js and MongoDB integration.",
              },
              {
                icon: <Zap />,
                title: "Workflow Logic",
                desc: "Powered by n8n for 400+ third-party connections.",
              },
            ].map((tech, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"
              >
                <div className="text-primary">{tech.icon}</div>
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
          <div className="relative border border-white/10 bg-white/5 p-8 rounded-[3rem] backdrop-blur-sm">
            <pre className="font-mono text-[10px] text-primary/60 leading-tight">
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
