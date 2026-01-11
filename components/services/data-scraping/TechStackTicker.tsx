"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const techStack = [
  "PUPPETEER",
  "PLAYWRIGHT",
  "RESIDENTIAL_PROXIES",
  "CAPTCHA_SOLVING",
  "CLOUDFLARE_BYPASS",
  "ROTATING_IPS",
  "HEADLESS_BROWSERS",
  "RATE_LIMITING",
  "ANTI_DETECTION",
  "DATA_VALIDATION",
];

export function TechStackTicker() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#F9F9F9] dark:bg-black/20 border-y border-border dark:border-white/5 transition-colors">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#0A0A0A] dark:text-white mb-4 uppercase tracking-tighter">
            {t("services.scraping.tech.title")}
          </h2>
          <p className="text-[#0A0A0A]/60 dark:text-white/50 max-w-2xl mx-auto font-medium">
            {t("services.scraping.tech.description")}
          </p>
        </motion.div>

        {/* Scrolling Ticker Container */}
        <div className="relative overflow-hidden bg-white dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl p-8 shadow-sm">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent z-10"></div>

          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -120 * techStack.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="flex items-center gap-3 bg-[#F5F5F5] dark:bg-white/5 px-6 py-3 rounded-xl border border-border dark:border-white/10 hover:border-primary/50 transition-colors group cursor-default"
              >
                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)] group-hover:scale-150 transition-transform"></div>
                <span className="font-mono text-sm font-black text-[#0A0A0A] dark:text-white tracking-widest">
                  [{tech}]
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              v: "99%",
              l: t("services.scraping.tech.metrics.success.label"),
              s: t("services.scraping.tech.metrics.success.sub"),
            },
            {
              v: "24/7",
              l: t("services.scraping.tech.metrics.uptime.label"),
              s: t("services.scraping.tech.metrics.uptime.sub"),
            },
            {
              v: "50+",
              l: t("services.scraping.tech.metrics.sources.label"),
              s: t("services.scraping.tech.metrics.sources.sub"),
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-border dark:border-white/10 text-center hover:border-primary/30 transition-all"
            >
              <div className="text-4xl font-black text-primary mb-2 tracking-tighter italic">
                {stat.v}
              </div>
              <div className="text-sm font-bold text-[#0A0A0A] dark:text-white uppercase tracking-tight">
                {stat.l}
              </div>
              <div className="text-[10px] font-mono text-[#0A0A0A]/40 dark:text-white/30 mt-3 font-bold">
                {stat.s}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Console-Style Status Note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="inline-flex items-center gap-4 bg-[#0A0A0A] dark:bg-primary/10 text-white dark:text-primary px-8 py-4 rounded-full border border-white/10 dark:border-primary/20 shadow-2xl shadow-primary/5">
            <div className="w-2 h-2 bg-primary dark:bg-primary rounded-full animate-ping"></div>
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.1em]">
              {t("services.scraping.tech.status")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
