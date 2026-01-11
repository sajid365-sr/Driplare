"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TechAdvantageRow = () => {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: <Zap />,
      title: t("services.webDev.advantages.rapid.title"),
      desc: t("services.webDev.advantages.rapid.desc"),
    },
    {
      icon: <Cpu />,
      title: t("services.webDev.advantages.scale.title"),
      desc: t("services.webDev.advantages.scale.desc"),
    },
    {
      icon: <ShieldCheck />,
      title: t("services.webDev.advantages.security.title"),
      desc: t("services.webDev.advantages.security.desc"),
    },
  ];

  const stack = ["MongoDB", "Express", "React", "Node.js"];

  return (
    <section className="py-24 bg-[#F9F9F9] dark:bg-white/5 transition-colors duration-300">
      <div className="container">
        {/* Advantage Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white dark:bg-[#0A0A0A] border border-border/40 dark:border-white/10 rounded-[2.5rem] group hover:border-primary/40 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-[#0A0A0A] dark:bg-primary rounded-xl flex items-center justify-center text-primary dark:text-white mb-6 group-hover:scale-110 transition-transform">
                {adv.icon}
              </div>
              <h3 className="font-black text-xl uppercase tracking-tighter mb-4 text-[#0A0A0A] dark:text-white">
                {adv.title}
              </h3>
              <p className="text-[#0A0A0A]/50 dark:text-white/50 text-sm font-medium leading-relaxed">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {stack.map((tech) => (
            <div key={tech} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full border border-border/60 dark:border-white/10 flex items-center justify-center bg-white dark:bg-[#0A0A0A] shadow-inner mb-3 group-hover:border-primary/60 transition-colors">
                <span className="font-black text-2xl text-[#0A0A0A] dark:text-white">
                  {tech[0]}
                </span>
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-widest opacity-40 dark:opacity-60 text-[#0A0A0A] dark:text-white">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
