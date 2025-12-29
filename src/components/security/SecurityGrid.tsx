import { motion } from "framer-motion";
import { Shield, Key, TestTube } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Data Sovereignty",
    description: "Your data belongs to you. We use Retrieval-Augmented Generation (RAG) to ensure AI agents only access approved information without training public models on your private data.",
    color: "#FF6B00",
    status: "VERIFIED"
  },
  {
    icon: Key,
    title: "End-to-End Encryption",
    description: "All communications between your AI Agents, MERN databases, and third-party APIs (via n8n) are encrypted using industry-standard protocols.",
    color: "#0A0A0A",
    status: "ACTIVE"
  },
  {
    icon: TestTube,
    title: "Sandbox Testing",
    description: "Every automation is rigorously tested in a 'Sandbox' environment before going live. We ensure 0% interference with your existing production systems.",
    color: "#FF6B00",
    status: "ENABLED"
  }
];

export function SecurityGrid() {
  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Shield Pattern Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="security-shield" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50,5 L90,25 L90,75 L50,95 L10,75 L10,25 Z" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3"/>
              <path d="M50,15 L75,30 L75,65 L50,80 L25,65 L25,30 Z" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2"/>
              <path d="M50,25 L60,35 L60,55 L50,65 L40,55 L40,35 Z" fill="none" stroke="#FF6B00" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#security-shield)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Security Pillars
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            The Tech Defense. Three fundamental principles that protect your business and data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-[#FF6B00]/50 transition-all duration-300"
            >
              {/* Shield Border Effect */}
              <div className="absolute inset-0 rounded-xl border border-[#FF6B00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon */}
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <pillar.icon
                    className="w-8 h-8"
                    style={{ color: pillar.color }}
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>

              {/* Description */}
              <p className="text-white/80 leading-relaxed mb-6">{pillar.description}</p>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-[#22C55E]">{pillar.status}</span>
                </div>
                <div className="text-xs font-mono text-white/40">
                  PILLAR_{index + 1}
                </div>
              </div>

              {/* Technical Details */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-white/60">
                  {pillar.title === "Data Sovereignty" && "PROTOCOL: RAG_ENCRYPTION | STATUS: PRIVATE"}
                  {pillar.title === "End-to-End Encryption" && "STANDARD: AES-256 | COMPLIANCE: SOC2"}
                  {pillar.title === "Sandbox Testing" && "METHOD: ISOLATED_ENV | SUCCESS_RATE: 100%"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-8 py-6">
            <div className="flex items-center gap-4 text-sm font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                <span className="text-[#22C55E]">SECURITY_ACTIVE</span>
              </div>
              <span className="text-white/40">|</span>
              <span className="text-white/60">ENCRYPTION_LEVEL: MAXIMUM</span>
              <span className="text-white/40">|</span>
              <span className="text-white/60">COMPLIANCE: ENTERPRISE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
