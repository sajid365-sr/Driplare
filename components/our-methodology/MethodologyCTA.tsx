"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export function MethodologyCTA() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-[#FF6B00] text-white px-6 py-3 rounded-none font-mono text-sm mb-6">
              PHASE_01_INITIATION
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-montserrat">
              Ready to start Phase 01?
            </h2>

            <p className="text-xl text-white/70 font-inter font-light leading-relaxed max-w-2xl mx-auto">
              Let's begin with a Systems Audit to see where we can engineer your
              next 20% in efficiency.
            </p>
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-12"
          >
            <Link href="/contact">
              <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-4 text-lg font-bold rounded-none shadow-lg">
                <Search className="mr-3 h-5 w-5" />
                Book My Systems Audit
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Process Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 p-4 rounded-none border border-white/20">
              <div className="font-mono text-xs text-white/60 mb-2">
                [ PHASE_01 ]
              </div>
              <div className="font-montserrat font-bold text-white text-sm">
                Systems Audit
              </div>
              <div className="text-xs text-white/70 mt-1">1-2 weeks</div>
            </div>

            <div className="bg-white/10 p-4 rounded-none border border-white/20">
              <div className="font-mono text-xs text-white/60 mb-2">
                [ PHASE_02 ]
              </div>
              <div className="font-montserrat font-bold text-white text-sm">
                Architecture
              </div>
              <div className="text-xs text-white/70 mt-1">2-3 weeks</div>
            </div>

            <div className="bg-white/10 p-4 rounded-none border border-white/20">
              <div className="font-mono text-xs text-white/60 mb-2">
                [ PHASE_03 ]
              </div>
              <div className="font-montserrat font-bold text-white text-sm">
                Deployment
              </div>
              <div className="text-xs text-white/70 mt-1">3-6 weeks</div>
            </div>

            <div className="bg-white/10 p-4 rounded-none border border-white/20">
              <div className="font-mono text-xs text-white/60 mb-2">
                [ PHASE_04 ]
              </div>
              <div className="font-montserrat font-bold text-white text-sm">
                Optimization
              </div>
              <div className="text-xs text-white/70 mt-1">Ongoing</div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-white/10 p-6 rounded-none border border-white/20 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <div className="font-mono text-xs text-white/60 mb-1">
                  AUDIT_DELIVERABLES:
                </div>
                <ul className="text-sm text-white/70 font-inter font-light space-y-1">
                  <li>• Friction Report</li>
                  <li>• Efficiency Analysis</li>
                  <li>• ROI Projections</li>
                </ul>
              </div>

              <div>
                <div className="font-mono text-xs text-white/60 mb-1">
                  METHODOLOGY:
                </div>
                <ul className="text-sm text-white/70 font-inter font-light space-y-1">
                  <li>• Data-Driven Insights</li>
                  <li>• No Guesswork</li>
                  <li>• Actionable Results</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-none border border-white/20">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-white/70">
                METHODOLOGY_ACTIVE | AUDIT_READY |
                EFFICIENCY_ENGINEERING_AVAILABLE
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
