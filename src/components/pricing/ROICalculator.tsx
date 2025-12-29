import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Calculator, Users, Clock, DollarSign } from "lucide-react";

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [manualHours, setManualHours] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(25);

  // Calculate costs
  const weeklyCost = teamSize * manualHours * hourlyRate;
  const monthlyCost = weeklyCost * 4.33; // Average weeks per month
  const annualCost = monthlyCost * 12;

  // Potential savings with automation (assume 70% reduction)
  const weeklySavings = weeklyCost * 0.7;
  const monthlySavings = weeklySavings * 4.33;
  const annualSavings = monthlySavings * 12;

  // ROI calculation (assuming $7,500 investment for Efficiency Pro tier)
  const investmentCost = 7500;
  const paybackMonths = investmentCost / monthlySavings;
  const annualROI = (annualSavings / investmentCost) * 100;

  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #FF6B00 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #FF6B00 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-full font-mono text-sm mb-4">
            <Calculator className="w-4 h-4" />
            COST_ANALYSIS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Cost of Manual Work
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Calculate how much money your business is losing to inefficient manual processes. This tool reveals the true cost of staying manual.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Team Size */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-[#FF6B00]" />
                  <label className="font-bold text-white">Team Size</label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-orange"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>1</span>
                  <span className="font-mono font-bold text-[#FF6B00]">{teamSize}</span>
                  <span>50+</span>
                </div>
              </div>

              {/* Manual Hours */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[#FF6B00]" />
                  <label className="font-bold text-white">Weekly Manual Hours per Person</label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-orange"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>1h</span>
                  <span className="font-mono font-bold text-[#FF6B00]">{manualHours}h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-5 h-5 text-[#FF6B00]" />
                  <label className="font-bold text-white">Average Hourly Rate</label>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-orange"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>$15</span>
                  <span className="font-mono font-bold text-[#FF6B00]">${hourlyRate}</span>
                  <span>$100</span>
                </div>
              </div>
            </motion.div>

            {/* Results Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Current Cost */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Your Current Manual Cost</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Weekly Cost:</span>
                    <span className="font-mono font-bold text-red-400">${weeklyCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Monthly Cost:</span>
                    <span className="font-mono font-bold text-red-400">${monthlyCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-3">
                    <span className="text-white font-bold">Annual Cost:</span>
                    <span className="font-mono font-bold text-red-400 text-xl">${annualCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Potential Savings */}
              <div className="bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/10 backdrop-blur-lg rounded-xl p-6 border border-[#FF6B00]/30">
                <h3 className="text-xl font-bold text-[#FF6B00] mb-4">Potential Savings with Automation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Weekly Savings:</span>
                    <span className="font-mono font-bold text-green-400">${weeklySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Monthly Savings:</span>
                    <span className="font-mono font-bold text-green-400">${monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#FF6B00]/30 pt-3">
                    <span className="text-[#FF6B00] font-bold">Annual Savings:</span>
                    <span className="font-mono font-bold text-green-400 text-xl">${annualSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* ROI Calculation */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">ROI Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Investment Required:</span>
                    <span className="font-mono font-bold text-[#FF6B00]">${investmentCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Payback Period:</span>
                    <span className="font-mono font-bold text-green-400">{paybackMonths.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-3">
                    <span className="text-white font-bold">Annual ROI:</span>
                    <span className="font-mono font-bold text-green-400 text-xl">{annualROI.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#FF6B00] rounded-xl p-6 text-center">
                <h4 className="text-xl font-bold text-white mb-2">Stop Losing Money</h4>
                <p className="text-white/90 mb-4">
                  Your business is losing ${monthlyCost.toLocaleString()} monthly to manual processes.
                </p>
                <button className="bg-white text-[#FF6B00] px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors">
                  Start Saving Money Today
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FF6B00;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
        }

        .slider-orange::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #FF6B00;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 107, 0, 0.5);
        }
      `}</style>
    </section>
  );
}
