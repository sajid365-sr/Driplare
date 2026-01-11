"use client";

import { motion } from "framer-motion";
import { BarChart, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function DashboardPreview() {
  const { t } = useTranslation();

  const priceData = [45, 52, 48, 61, 55, 67, 63, 58, 72, 68, 75, 71];
  const volumeData = [120, 135, 142, 158, 145, 162, 175, 168];

  return (
    <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden transition-colors duration-500">
      {/* Dashboard Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern
            id="dashboard-grid"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="0.1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dashboard-grid)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            {t("services.scraping.dashboard.title")}
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto italic font-medium">
            {t("services.scraping.dashboard.description")}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#111111] rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden"
          >
            {/* Mockup Header */}
            <div className="bg-white/5 p-6 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    {t("services.scraping.dashboard.ui.header")}
                  </h3>
                  <p className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">
                    LIVE_DATA • AUTO_REFRESH
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span className="font-mono text-[10px] font-bold">
                    {t("services.scraping.dashboard.ui.status")}
                  </span>
                </div>
                <div className="text-white/40 font-mono text-[10px] uppercase">
                  {t("services.scraping.dashboard.ui.lastUpdate")}:{" "}
                  <span className="text-primary">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Mockup Content */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Charts Side */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      {t("services.scraping.dashboard.ui.charts.price")}
                    </h4>
                    <span className="text-primary font-mono text-[10px] font-black animate-pulse">
                      ● LIVE
                    </span>
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {priceData.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${p}%` }}
                        className="flex-1 bg-primary rounded-t-sm relative group"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          ${p}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-8">
                    {t("services.scraping.dashboard.ui.charts.volume")}
                  </h4>
                  <div className="h-24 flex items-end gap-1">
                    {volumeData.map((v, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${v / 2}%` }}
                        className="flex-1 bg-white/10 hover:bg-primary/50 transition-colors"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Side */}
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h4 className="text-sm font-bold uppercase mb-6 text-primary">
                    {t("services.scraping.dashboard.ui.metrics.title")}
                  </h4>
                  <div className="space-y-4 font-mono text-xs">
                    {[
                      {
                        l: t("services.scraping.dashboard.ui.metrics.sources"),
                        v: "47",
                        c: "text-white",
                      },
                      {
                        l: t("services.scraping.dashboard.ui.metrics.success"),
                        v: "99.7%",
                        c: "text-green-400",
                      },
                      {
                        l: t("services.scraping.dashboard.ui.metrics.response"),
                        v: "<2s",
                        c: "text-white",
                      },
                      {
                        l: t(
                          "services.scraping.dashboard.ui.metrics.freshness"
                        ),
                        v: "REAL_TIME",
                        c: "text-primary",
                      },
                    ].map((m, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-white/5 pb-2"
                      >
                        <span className="text-white/40">{m.l}</span>
                        <span className={`font-black ${m.c}`}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary p-6 rounded-2xl">
                  <h4 className="text-sm font-bold uppercase mb-4 text-black">
                    {t("services.scraping.dashboard.ui.actions.title")}
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black/80 transition-all">
                      {t("services.scraping.dashboard.ui.actions.report")}
                    </button>
                    <button className="w-full bg-white/20 text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all">
                      {t("services.scraping.dashboard.ui.actions.alert")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white dark:bg-white/5 p-12 rounded-[2rem] border border-white/10 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase mb-4">
              {t("services.scraping.dashboard.footer.title")}
            </h3>
            <p className="text-black/50 dark:text-white/40 mb-8 max-w-xl mx-auto font-medium">
              {t("services.scraping.dashboard.footer.desc")}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white h-14 px-10 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
            >
              <Link href="/contact">
                {t("services.scraping.dashboard.footer.button")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
