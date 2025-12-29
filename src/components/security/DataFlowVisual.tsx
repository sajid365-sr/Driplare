import { motion } from "framer-motion";
import { Database, Bot, Lock, Server, User, ArrowRight, Shield } from "lucide-react";

const flowSteps = [
  {
    icon: User,
    title: "Client Data",
    description: "Your private information",
    position: { x: 10, y: 50 }
  },
  {
    icon: Shield,
    title: "Encryption Layer",
    description: "AES-256 protection",
    position: { x: 25, y: 50 }
  },
  {
    icon: Database,
    title: "Secure Database",
    description: "MERN/MongoDB",
    position: { x: 40, y: 50 }
  },
  {
    icon: Bot,
    title: "AI Processing",
    description: "RAG-based analysis",
    position: { x: 55, y: 50 }
  },
  {
    icon: Lock,
    title: "Response Encryption",
    description: "Secure output",
    position: { x: 70, y: 50 }
  },
  {
    icon: Server,
    title: "Client Systems",
    description: "Your applications",
    position: { x: 85, y: 50 }
  }
];

export function DataFlowVisual() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Visualizing the Secure Flow
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            A minimalist logic diagram showing how data is processed securely between the client and the AI.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <svg className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 opacity-20">
              <defs>
                <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="url(#flow-gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Animated Flow Indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF6B00] rounded-full shadow-lg"
              animate={{ x: ["0%", "100%"] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute inset-0 w-4 h-4 bg-[#FF6B00] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Flow Steps */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-[#F9F9F9] border-2 border-[#E5E5E5] rounded-xl flex items-center justify-center mx-auto group hover:border-[#FF6B00] transition-colors">
                      <step.icon className="w-8 h-8 text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors" strokeWidth={1.5} />
                    </div>

                    {/* Security Indicator */}
                    <div className="absolute -top-2 -right-2">
                      <div className="w-4 h-4 bg-[#22C55E] rounded-full flex items-center justify-center">
                        <Shield className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-[#0A0A0A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#0A0A0A]/60 font-mono">{step.description}</p>

                  {/* Step Number */}
                  <div className="mt-2 text-xs font-mono text-[#FF6B00]">
                    STEP_{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <h4 className="font-bold text-[#0A0A0A] mb-3">Encryption Standards</h4>
              <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                <div>• AES-256: Data at rest</div>
                <div>• TLS 1.3: Data in transit</div>
                <div>• SHA-256: Hash functions</div>
                <div>• SOC 2 Type II: Compliance</div>
              </div>
            </div>

            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <h4 className="font-bold text-[#0A0A0A] mb-3">Security Protocols</h4>
              <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                <div>• RAG: Private knowledge only</div>
                <div>• Sandbox: Isolated testing</div>
                <div>• Audit logs: Full traceability</div>
                <div>• Zero-trust: Continuous verification</div>
              </div>
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-4 bg-[#0A0A0A] text-white px-6 py-3 rounded-full">
              <div className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm">FLOW_STATUS: SECURE | ENCRYPTION: ACTIVE | MONITORING: ENABLED</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
