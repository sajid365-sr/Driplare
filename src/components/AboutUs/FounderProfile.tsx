import { motion } from "framer-motion";

export function FounderProfile() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Placeholder for founder image - high contrast professional */}
              <div className="w-full max-w-md mx-auto bg-gradient-to-br from-[#F5F5F5] to-[#E5E5E5] rounded-2xl p-8 border border-[#E5E5E5] shadow-lg">
                <div className="aspect-square bg-[#0A0A0A]/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Technical silhouette */}
                  <div className="text-8xl text-[#0A0A0A]/20">👨‍💻</div>

                  {/* Orange accent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/10 to-transparent rounded-xl"></div>

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10 rounded-xl"
                    style={{
                      backgroundImage: `
                        linear-gradient(#E5E5E5 1px, transparent 1px),
                        linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 bg-[#FF6B00] rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2">
                [Founder Name] — Founder & Lead Architect
              </h2>
              <p className="text-xl text-[#0A0A0A]/70 leading-relaxed">
                With a background in MERN Stack Architecture and a passion for automation, [Founder Name] leads the technical direction of Driplare. He believes that every line of code should either save a business time or make it money.
              </p>
            </div>

            {/* Tech Credentials */}
            <div className="bg-[#F9F9F9] p-6 rounded-xl border border-[#E5E5E5]">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Technical Credentials</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                  <span className="font-mono text-[#0A0A0A] text-sm">
                    EXPERT_IN: <span className="text-[#FF6B00]">MERN_STACK_ARCHITECTURE</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                  <span className="font-mono text-[#0A0A0A] text-sm">
                    SPECIALIZATION: <span className="text-[#FF6B00]">AI_AGENT_LOGIC</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                  <span className="font-mono text-[#0A0A0A] text-sm">
                    MISSION: <span className="text-[#FF6B00]">100%_OPERATIONAL_EFFICIENCY</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "MERN Stack",
                "AI Integration",
                "System Architecture",
                "Workflow Automation",
                "API Design",
                "Database Optimization",
                "Performance Engineering",
                "Technical Leadership"
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-[#E5E5E5] rounded-lg p-3 text-center hover:border-[#FF6B00] transition-colors"
                >
                  <span className="text-xs font-mono text-[#0A0A0A]/70">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
