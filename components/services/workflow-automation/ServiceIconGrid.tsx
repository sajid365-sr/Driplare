"use client";

import { motion } from "framer-motion";
import { Users, CreditCard, RefreshCw, BarChart } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ServiceIconGrid = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Users />,
      title: t("services.workflow.modules.items.crm.title"),
      copy: t("services.workflow.modules.items.crm.copy"),
    },
    {
      icon: <CreditCard />,
      title: t("services.workflow.modules.items.finance.title"),
      copy: t("services.workflow.modules.items.finance.copy"),
    },
    {
      icon: <RefreshCw />,
      title: t("services.workflow.modules.items.data.title"),
      copy: t("services.workflow.modules.items.data.copy"),
    },
    {
      icon: <BarChart />,
      title: t("services.workflow.modules.items.reporting.title"),
      copy: t("services.workflow.modules.items.reporting.copy"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
            {t("services.workflow.modules.tagline")}
          </span>
          <h2 className="text-4xl font-black text-[#0A0A0A] dark:text-white tracking-tighter uppercase mt-4 transition-colors">
            {t("services.workflow.modules.title")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-[#F9F9F9] dark:bg-white/5 border border-border/40 dark:border-white/10 rounded-[2rem] group hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 bg-white dark:bg-black rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-3 text-[#0A0A0A] dark:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/50 dark:text-white/50 font-medium leading-relaxed transition-colors">
                {service.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
