"use client";
import { motion } from "framer-motion";
import { Shield, Eye, AlertTriangle } from "lucide-react";

export function TransparencyNote() {
  return (
    <section className="py-16 bg-[#F9F9F9]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#FF6B00]" />
              <h2 className="text-2xl font-bold text-[#0A0A0A]">
                Transparency & Running Costs
              </h2>
            </div>

            {/* Main Note */}
            <div className="bg-[#F5F5F5] border-l-4 border-[#FF6B00] p-6 mb-6">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-[#0A0A0A] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2 font-mono">
                    API_COST_TRANSPARENCY
                  </h3>
                  <p className="text-[#0A0A0A]/80 leading-relaxed">
                    Our setup fees cover the architecture. Third-party API costs
                    (OpenAI, Anthropic) and hosting are billed directly based on
                    your usage to ensure no hidden markups.
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F5F5F5] p-6 rounded-lg">
                <h4 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6B00] rounded-full"></span>
                  Included in Setup Fee
                </h4>
                <ul className="space-y-2 text-sm text-[#0A0A0A]/70">
                  <li>• System architecture & design</li>
                  <li>• Custom AI agent development</li>
                  <li>• Integration & deployment</li>
                  <li>• Initial training & documentation</li>
                  <li>• 30-day optimization period</li>
                </ul>
              </div>

              <div className="bg-[#F5F5F5] p-6 rounded-lg">
                <h4 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#0A0A0A] rounded-full"></span>
                  Ongoing Costs (Variable)
                </h4>
                <ul className="space-y-2 text-sm text-[#0A0A0A]/70">
                  <li>• AI API usage (per request)</li>
                  <li>• Cloud hosting & storage</li>
                  <li>• System monitoring (optional)</li>
                  <li>• Maintenance & updates</li>
                </ul>
              </div>
            </div>

            {/* Warning Note */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-yellow-800 mb-1">
                    Cost Estimation Notice
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    API costs vary based on usage volume and complexity. We
                    provide detailed cost projections during your technical
                    discovery call.
                  </p>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6 pt-6 border-t border-[#E5E5E5] text-center">
              <div className="inline-flex items-center gap-3 bg-[#F5F5F5] px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-mono text-sm text-[#0A0A0A]/70">
                  TRANSPARENCY_LEVEL: MAXIMUM | LAST_AUDIT:{" "}
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
