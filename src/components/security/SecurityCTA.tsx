import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function SecurityCTA() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="cta-security" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="20" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="30" cy="30" r="15" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2"/>
              <circle cx="30" cy="30" r="10" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-security)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Shield Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-10 h-10 text-[#FF6B00]" />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Still have technical questions?
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Our Lead Architect is available for a deep-dive security call.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-2xl"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-3">
                  Book a Technical Discovery
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Security Assurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#22C55E]" />
              <div className="text-sm text-white/60">Zero Security Incidents</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#22C55E]" />
              <div className="text-sm text-white/60">SOC 2 Compliant</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#22C55E]" />
              <div className="text-sm text-white/60">GDPR Ready</div>
            </div>
          </motion.div>

          {/* Technical Footer */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
              <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-white/70">
                SECURITY_READINESS: MAXIMUM | ARCHITECT_AVAILABLE: TRUE | RESPONSE_TIME: &lt;2HRS&gt;
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
