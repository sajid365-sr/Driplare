import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function InfrastructureGapSection() {
  const [manualCost, setManualCost] = useState(0);
  const [aiCost, setAiCost] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setManualCost(prev => (prev + 1) % 121); // Max 120
      setAiCost(prev => (prev + 0.5) % 31); // Max 30
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            The Infrastructure Gap
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-3xl mx-auto">
            The hidden tax on your business isn't your software—it's the manual effort required to run it. We bridge the gap between fragmented apps and a unified, intelligent ecosystem.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Comparison Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Manual Cost */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E5E5E5]">
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-6">Manual Labor Cost</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#0A0A0A]/70">Monthly Cost</span>
                  <span className="font-mono font-bold text-[#0A0A0A]">${manualCost * 100}</span>
                </div>
                <div className="w-full bg-[#E5E5E5] rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#E5E5E5] to-[#1F1F1F]"
                    initial={{ width: 0 }}
                    animate={{ width: `${manualCost}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #E5E5E5, #E5E5E5 10px, #1F1F1F 10px, #1F1F1F 20px)'
                    }}
                  />
                </div>
                <p className="text-sm text-[#0A0A0A]/60">Inefficient, unpredictable, costly</p>
              </div>
            </div>

            {/* AI Cost */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E5E5E5]">
              <h3 className="text-xl font-bold text-[#FF6B00] mb-6">AI Automation Cost</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#0A0A0A]/70">Monthly Cost</span>
                  <span className="font-mono font-bold text-[#FF6B00]">${aiCost * 10}</span>
                </div>
                <div className="w-full bg-[#E5E5E5] rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FF6B00]"
                    initial={{ width: 0 }}
                    animate={{ width: `${aiCost * 3.33}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      boxShadow: '0 0 10px rgba(255, 107, 0, 0.5)',
                      background: 'linear-gradient(90deg, #FF6B00, #FF8533)'
                    }}
                  />
                </div>
                <p className="text-sm text-[#0A0A0A]/60">Efficient, predictable, scalable</p>
              </div>
            </div>
          </div>

          {/* Savings Indicator */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-block bg-[#0A0A0A] text-white px-8 py-4 rounded-full">
              <div className="flex items-center gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-bold">Potential Monthly Savings</p>
                  <p className="text-[#FF6B00] font-mono text-xl">${(manualCost - aiCost) * 90}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

