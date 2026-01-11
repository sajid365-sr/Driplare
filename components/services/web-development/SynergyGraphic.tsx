"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const SynergyGraphic = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Content Column */}
          <div className="lg:w-1/2">
            <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
              {t("services.webDev.synergy.tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mt-4 mb-8 leading-none">
              {t("services.webDev.synergy.title")} <br />
              <span className="text-primary italic">
                {t("services.webDev.synergy.titleHighlight")}
              </span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10">
              {t("services.webDev.synergy.description")}
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-black animate-pulse">
                !
              </div>
              <p className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
                {t("services.webDev.synergy.status")}
              </p>
            </div>
          </div>

          {/* Graphic Column */}
          <div className="lg:w-1/2 w-full aspect-square relative flex items-center justify-center scale-75 md:scale-100">
            {/* Animated Venn-style Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="absolute w-64 h-64 border border-primary/30 rounded-full -translate-x-12 mix-blend-screen" />
              <div className="absolute w-64 h-64 border border-white/10 rounded-full translate-x-12 mix-blend-screen" />
              <div className="absolute w-64 h-64 border border-white/10 rounded-full -translate-y-12 mix-blend-screen" />
            </motion.div>

            {/* Central Core */}
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="z-10 bg-[#0A0A0A] p-10 rounded-full border-2 border-primary shadow-[0_0_60px_rgba(255,107,0,0.25)] text-center"
            >
              <span className="font-black text-primary text-2xl uppercase tracking-tighter block">
                {t("services.webDev.synergy.centerText")}
              </span>
              <div className="w-full h-[1px] bg-primary/30 mt-2 animate-width" />
            </motion.div>

            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0,transparent_70%)] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
