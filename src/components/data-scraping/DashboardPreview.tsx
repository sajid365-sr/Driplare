import { motion } from "framer-motion";
import { BarChart, TrendingUp, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DashboardPreview() {
  // Mock data for charts
  const priceData = [45, 52, 48, 61, 55, 67, 63, 58, 72, 68, 75, 71];
  const volumeData = [
    120, 135, 142, 158, 145, 162, 175, 168, 185, 178, 192, 188,
  ];

  return (
    <section className="py-20 bg-[#1A1F2C] text-white relative overflow-hidden">
      {/* Dashboard Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
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
                strokeWidth="0.2"
                opacity="0.3"
              />
            </pattern>
          </defs>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
            Your Command Center
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-inter">
            We don't just give you a CSV file. We build custom MERN-stack
            dashboards where you can visualize market shifts as they happen.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2A2F3C] rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="bg-[#1A1F2C] p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-montserrat">
                      Data Intelligence Dashboard
                    </h3>
                    <p className="text-white/60 font-mono text-sm">
                      LIVE_DATA • AUTO_REFRESH
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    <Activity className="w-4 h-4" />
                    <span className="font-mono text-xs">SYSTEM_ACTIVE</span>
                  </div>
                  <div className="text-white/60 font-mono text-sm">
                    LAST_UPDATE:{" "}
                    <span className="text-[#FF6B00]">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Charts */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Price Tracking Chart */}
                  <div className="bg-[#1F242F] rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-bold text-white font-montserrat">
                        Competitor Price Tracking
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
                        <span className="text-[#FF6B00] font-mono text-sm">
                          LIVE
                        </span>
                      </div>
                    </div>

                    {/* Price Chart */}
                    <div className="h-48 flex items-end justify-between gap-1 mb-4">
                      {priceData.map((price, index) => (
                        <motion.div
                          key={index}
                          className="bg-[#FF6B00] rounded-t flex-1 relative group"
                          style={{ height: `${(price / 80) * 100}%` }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(price / 80) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            ${price}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-between text-xs text-white/60 font-mono">
                      <span>Jan</span>
                      <span>Dec</span>
                    </div>
                  </div>

                  {/* Volume Chart */}
                  <div className="bg-[#1F242F] rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-bold text-white font-montserrat">
                        Data Volume Trends
                      </h4>
                      <div className="text-white/60 font-mono text-sm">
                        <span className="text-[#FF6B00] font-mono">100K+</span>{" "}
                        records/day
                      </div>
                    </div>

                    {/* Volume Chart */}
                    <div className="h-32 flex items-end justify-between gap-1 mb-4">
                      {volumeData.slice(0, 8).map((volume, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-t from-[#FF6B00] to-[#FF8533] rounded-t flex-1 relative"
                          style={{ height: `${(volume / 200) * 100}%` }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(volume / 200) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + 0.5,
                            duration: 0.5,
                          }}
                        >
                          {/* Optionally add a tooltip or value */}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-between text-xs text-white/60 font-mono">
                      <span>Mon</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats & Controls */}
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="bg-[#1F242F] rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-6 font-montserrat">
                      Key Metrics
                    </h4>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Active Sources</span>
                        <span className="text-[#FF6B00] font-mono font-bold">
                          47
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Success Rate</span>
                        <span className="text-[#FF6B00] font-mono font-bold">
                          99.7%
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Avg Response</span>
                        <span className="text-[#FF6B00] font-mono font-bold">
                          &lt;2s
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Data Freshness</span>
                        <span className="text-[#FF6B00] font-mono font-bold">
                          REAL_TIME
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-[#1F242F] rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-6 font-montserrat">
                      Quick Actions
                    </h4>

                    <div className="space-y-3">
                      <button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors">
                        Generate Report
                      </button>

                      <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg text-sm transition-colors">
                        Set Alert
                      </button>

                      <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg text-sm transition-colors">
                        Export Data
                      </button>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-[#1F242F] rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4 font-montserrat">
                      System Status
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Scrapers</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-mono text-xs">
                            ACTIVE
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">API</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-mono text-xs">
                            ONLINE
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Database</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-mono text-xs">
                            SYNCED
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12"
          >
            <div className="bg-white text-[#0A0A0A] p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 font-montserrat">
                Build Your Dashboard
              </h3>
              <p className="text-[#0A0A0A]/70 mb-6 font-inter">
                Custom data visualization and real-time monitoring tailored to
                your business needs.
              </p>
              <Button
                asChild
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
              >
                <Link to="/contact">
                  Request Dashboard Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
