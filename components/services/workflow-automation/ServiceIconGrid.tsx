'use client'

import { motion } from "framer-motion";
import { Users, CreditCard, RefreshCw, BarChart } from "lucide-react";

const services = [
  {
    icon: <Users />,
    title: "CRM Pipelines",
    copy: "Automatically route leads and trigger 'thank you' sequences instantly.",
  },
  {
    icon: <CreditCard />,
    title: "Finance Sync",
    copy: "Bridge Stripe and PayPal to your accounting software automatically.",
  },
  {
    icon: <RefreshCw />,
    title: "Data Sync",
    copy: "Keep Google Sheets and Project tools in perfect, real-time sync.",
  },
  {
    icon: <BarChart />,
    title: "Auto-Reporting",
    copy: "Daily metrics delivered to Slack or Email without logging into dashboards.",
  },
];

export const ServiceIconGrid = () => (
  <section className="py-24 bg-white">
    <div className="container">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase">
          Core_Modules
        </span>
        <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase mt-4">
          Automation_Services
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="p-8 bg-[#F9F9F9] border border-border/40 rounded-[2rem] group hover:border-primary/40 transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="font-black text-lg uppercase tracking-tight mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-[#0A0A0A]/50 font-medium leading-relaxed">
              {service.copy}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
