"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const TechLogosSection = () => {
  const { t } = useTranslation();

  const logos = [
    "n8n",
    "Zapier",
    "Slack",
    "Stripe",
    "HubSpot",
    "Shopify",
    "Typeform",
    "Airtable",
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A] border-y border-border/40 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="container text-center mb-12">
        <p className="font-mono text-[10px] font-black text-[#0A0A0A]/30 dark:text-white/30 tracking-[0.4em] uppercase">
          {t("services.workflow.integrations.tagline")}
        </p>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="flex overflow-hidden select-none">
        <motion.div
          className="flex flex-nowrap shrink-0 items-center gap-16 min-w-full"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* লুপ ডাবল করা হয়েছে যাতে বিরামহীন মনে হয় */}
          {[...logos, ...logos].map((logo, idx) => (
            <span
              key={idx}
              className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#0A0A0A]/20 dark:text-white/20 hover:text-primary dark:hover:text-primary transition-colors cursor-default whitespace-nowrap"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
