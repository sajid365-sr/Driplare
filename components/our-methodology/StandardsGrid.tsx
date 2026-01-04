import { motion } from "framer-motion";
import { Code, Shield, TrendingUp } from "lucide-react";

const standards = [
  {
    code: "CODE_QUALITY",
    title: "Clean Code Standards",
    description: "We follow clean-code principles in TypeScript/Node.js to ensure easy maintenance.",
    icon: Code,
    details: ["TypeScript strict mode", "SOLID principles", "DRY methodology", "Comprehensive testing"]
  },
  {
    code: "SECURITY_BY_DESIGN",
    title: "Security First Architecture",
    description: "Encryption at rest and in transit is a non-negotiable standard for every API bridge.",
    icon: Shield,
    details: ["AES-256 encryption", "JWT authentication", "Rate limiting", "Input validation"]
  },
  {
    code: "SCALABILITY_PROOFS",
    title: "Horizontal Scaling Ready",
    description: "We build with horizontal scaling in mind, ensuring your MERN backend handles 10x traffic without a rewrite.",
    icon: TrendingUp,
    details: ["Load balancing", "Database sharding", "CDN integration", "Auto-scaling"]
  }
];

export function StandardsGrid() {
  return (
    <section className="py-20 bg-[#F9F9F9]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
            Technical Rigor (The Standards)
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 font-inter font-light max-w-2xl mx-auto">
            Small, sharp cards with Monospace headers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {standards.map((standard, index) => (
            <motion.div
              key={standard.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white border border-[#0A0A0A] rounded-none p-6 hover:border-[#FF6B00] transition-colors duration-300 h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#0A0A0A]/10 rounded-none border border-[#0A0A0A] flex items-center justify-center group-hover:border-[#FF6B00] group-hover:bg-[#FF6B00]/10 transition-colors">
                    <standard.icon className="w-5 h-5 text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-[#0A0A0A] mb-1">
                      [{standard.code}]
                    </div>
                    <h3 className="font-montserrat font-bold text-lg text-[#0A0A0A]">
                      {standard.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#0A0A0A]/70 font-inter font-light leading-relaxed mb-6">
                  {standard.description}
                </p>

                {/* Technical Details */}
                <div className="border-t border-[#E5E5E5] pt-4">
                  <div className="font-mono text-xs text-[#0A0A0A]/60 mb-3">IMPLEMENTATION_DETAILS:</div>
                  <div className="space-y-1">
                    {standard.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#FF6B00] rounded-full"></div>
                        <span className="text-xs text-[#0A0A0A]/70 font-inter font-light">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs text-[#0A0A0A]/60">STANDARD_ACTIVE | COMPLIANCE_VERIFIED</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-white border border-[#0A0A0A] p-6 rounded-none max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-[#22C55E]" />
              <span className="font-mono text-sm font-bold text-[#0A0A0A]">QUALITY_ASSURANCE</span>
            </div>
            <p className="text-[#0A0A0A]/80 font-inter font-light leading-relaxed">
              Every project undergoes rigorous quality checks against these standards before delivery.
              We don't just build systems—we build systems that last.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
