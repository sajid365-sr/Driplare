'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FeaturedProjectSection() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const sampleLogs = [
    "[SYSTEM]: SKU-502 Updated. Price Change: -5%",
    "[SYSTEM]: Competitor analysis complete. 1,247 products scanned.",
    "[SYSTEM]: Alert triggered: Price drop detected on Product-X",
    "[SYSTEM]: Daily report generated. 23 price changes logged.",
    "[SYSTEM]: SKU-789 Updated. Price Change: +2%",
    "[SYSTEM]: Real-time monitoring active. 2,000+ SKUs tracked.",
    "[SYSTEM]: Notification sent to sales team.",
    "[SYSTEM]: Data synchronization complete.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev];
        newLogs.push(sampleLogs[Math.floor(Math.random() * sampleLogs.length)]);
        return newLogs.slice(-8); // Keep last 8 logs
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#0A0A0A] text-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-4">
            Intelligence in Action
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            A teaser of your Competitor Pricing Monitor.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Terminal-like interface */}
          <div className="bg-black/50 border border-[#E5E5E5]/20 rounded-xl overflow-hidden">
            {/* Terminal header */}
            <div className="bg-[#1F1F1F] px-4 py-2 border-b border-[#E5E5E5]/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white/60 text-sm font-mono ml-4">
                  pricing-monitor:~$
                </span>
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm">
              {/* Static header */}
              <div className="mb-6">
                <div className="text-green-400 mb-2">Competitor Pricing Monitor v2.1</div>
                <div className="text-blue-400">Status: <span className="text-green-400">ACTIVE</span></div>
                <div className="text-yellow-400">Monitored SKUs: <span className="text-white">2,000+</span></div>
                <div className="text-purple-400">Update Frequency: <span className="text-white">60 seconds</span></div>
              </div>

              {/* Live logs */}
              <div className="space-y-1 mb-4">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-green-400"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              {/* Blurred dashboard preview */}
              <div className="relative bg-[#1F1F1F] rounded-lg p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent animate-pulse"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Price Change Alerts</h3>
                    <span className="text-[#FF6B00] font-mono text-sm">Live</span>
                  </div>

                  {/* Mock chart */}
                  <div className="h-32 flex items-end justify-between gap-1 mb-4">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-[#FF6B00] flex-1 rounded-t"
                        style={{ height: `${20 + Math.random() * 60}%` }}
                        animate={{ height: `${20 + Math.random() * 60}%` }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                    ))}
                  </div>

                  <div className="text-center text-white/60 text-sm">
                    2,000+ Competitor SKU's monitored every 60 seconds. 100% Automated.
                  </div>
                </div>

                {/* Blur overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#FF6B00] text-2xl mb-2">🔒</div>
                    <p className="text-white/60 font-mono text-sm">Dashboard Preview</p>
                    <p className="text-white/40 text-xs">Contact for full access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
