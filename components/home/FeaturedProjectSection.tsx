"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function FeaturedProjectSection() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);

  // লগের টেক্সটগুলো সবসময় ইংরেজি ভার্সন থেকে নেওয়ার জন্য
  const sampleLogs = [
    "[SYSTEM]: Competitor analysis complete. 1,247 products scanned.",
    "[SYSTEM]: Data synchronization complete.",
    "[SYSTEM]: Real-time monitoring active. 2,000+ SKUs tracked.",
    "[SYSTEM]: Daily report generated. 23 price changes logged.",
    "[SYSTEM]: Alert triggered: Price drop detected on Product-X",
    "[SYSTEM]: Notification sent to sales team.",
    "[SYSTEM]: SKU-789 Updated. Price Change: +2%",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev];
        const randomLog =
          sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        newLogs.push(randomLog);
        return newLogs.slice(-8); // আগের ডিজাইন অনুযায়ী ৮টি লগ রাখা
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("featured.title")}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t("featured.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Terminal Box (ডিজাইন হুবহু image_08bc50.png এর মতো) */}
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg overflow-hidden shadow-2xl">
            {/* Terminal Header Bar */}
            <div className="bg-[#1F1F1F] px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                <div className="w-3 h-3 bg-[#27C93F] rounded-full"></div>
              </div>
              <span className="text-white/40 text-xs font-mono ml-4">
                pricing-monitor:~$
              </span>
            </div>

            {/* Terminal Content Area */}
            <div className="p-8 font-mono text-sm min-h-[400px]">
              {/* Status Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mb-10">
                <div className="flex gap-2">
                  <span className="text-[#27C93F]">
                    Competitor Pricing Monitor v2.1
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#4DA6FF]">
                    {t("featured.terminal.statusLabel")}
                  </span>
                  <span className="text-[#27C93F]">
                    {t("featured.terminal.statusValue")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#FFBD2E]">
                    {t("featured.terminal.skusLabel")}
                  </span>
                  <span className="text-white">
                    {t("featured.terminal.skusValue")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#A370FF]">
                    {t("featured.terminal.freqLabel")}
                  </span>
                  <span className="text-white">
                    {t("featured.terminal.freqValue")}
                  </span>
                </div>
              </div>

              {/* Real-time Logs (সর্বদা ইংরেজিতে) */}
              <div className="space-y-1 mb-8">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#27C93F]"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              {/* Locked Preview Area */}
              <div className="relative mt-12 rounded-md overflow-hidden border border-white/5 bg-[#141414] p-8">
                {/* Mock Chart behind blur */}
                <div className="h-20 flex items-end gap-1 opacity-20 blur-sm">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#FF6B00] flex-1"
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    ></div>
                  ))}
                </div>

                {/* Lock Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <div className="text-[#FFBD2E] text-2xl mb-2">🔒</div>
                  <h4 className="text-white font-bold tracking-widest text-xs uppercase">
                    {t("featured.terminal.preview")}
                  </h4>
                  <p className="text-white/40 text-[10px] mt-1">
                    {t("featured.terminal.contact")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
