import { motion } from "framer-motion";

const logos = [
  {
    name: "OpenAI Enterprise",
    description: "Enterprise-grade AI security",
    status: "VERIFIED"
  },
  {
    name: "MongoDB Atlas",
    description: "Secure cloud database",
    status: "COMPLIANT"
  },
  {
    name: "AWS Security",
    description: "Enterprise cloud security",
    status: "CERTIFIED"
  },
  {
    name: "n8n Cloud",
    description: "Secure automation platform",
    status: "VALIDATED"
  }
];

export function ComplianceLogos() {
  return (
    <section className="py-16 bg-white border-t border-[#E5E5E5]">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-4">
            Compliance & Hosting
          </h2>
          <p className="text-[#0A0A0A]/70 max-w-2xl mx-auto">
            Industry-standard security technologies that protect your data.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-6 h-32 flex flex-col items-center justify-center group-hover:border-[#FF6B00] transition-all duration-300">
                  {/* Placeholder Logo */}
                  <div className="w-12 h-12 bg-[#0A0A0A]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#FF6B00]/10 transition-colors">
                    <div className="text-2xl font-mono text-[#0A0A0A]/60 group-hover:text-[#FF6B00] transition-colors">
                      {logo.name.split(' ')[0][0]}
                    </div>
                  </div>

                  <div className="text-sm font-bold text-[#0A0A0A] mb-1">{logo.name}</div>
                  <div className="text-xs text-[#0A0A0A]/60">{logo.description}</div>
                </div>

                {/* Status Badge */}
                <div className="mt-3">
                  <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 text-[#22C55E] px-3 py-1 rounded-full text-xs font-mono">
                    <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
                    {logo.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-3">Security Standards</h4>
                <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                  <div>• SOC 2 Type II Compliance</div>
                  <div>• GDPR Data Protection</div>
                  <div>• ISO 27001 Certified</div>
                  <div>• HIPAA Ready Architecture</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-3">Infrastructure Security</h4>
                <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                  <div>• End-to-End Encryption</div>
                  <div>• Multi-Factor Authentication</div>
                  <div>• Regular Security Audits</div>
                  <div>• 24/7 Monitoring</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-4 bg-[#0A0A0A] text-white px-8 py-4 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
                <span className="font-mono text-sm">COMPLIANCE_LEVEL: ENTERPRISE</span>
              </div>
              <span className="text-white/40">|</span>
              <span className="font-mono text-sm">AUDIT_STATUS: CURRENT</span>
              <span className="text-white/40">|</span>
              <span className="font-mono text-sm">CERTIFICATIONS: 4_ACTIVE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
