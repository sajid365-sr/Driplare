import { motion } from "framer-motion";

const techStack = [
  "PUPPETEER",
  "PLAYWRIGHT",
  "RESIDENTIAL_PROXIES",
  "CAPTCHA_SOLVING",
  "CLOUDFLARE_BYPASS",
  "ROTATING_IPS",
  "HEADLESS_BROWSERS",
  "RATE_LIMITING",
  "ANTI_DETECTION",
  "DATA_VALIDATION"
];

export function TechStackTicker() {
  return (
    <section className="py-16 bg-[#F9F9F9] border-t border-[#E5E5E5]">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
            Technical Resilience
          </h2>
          <p className="text-[#0A0A0A]/70 max-w-2xl mx-auto font-inter">
            Anti-Bot & Scaling — We handle the complexity. Our scrapers are designed to bypass the most advanced anti-bot measures while maintaining 99% uptime.
          </p>
        </motion.div>

        {/* Scrolling Ticker */}
        <div className="relative overflow-hidden bg-white border border-[#E5E5E5] rounded-xl p-6">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>

          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrolling content */}
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [0, -100 * techStack.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <motion.div
                key={`${tech}-${index}`}
                className="flex items-center gap-3 bg-[#F5F5F5] px-4 py-2 rounded-full border border-[#E5E5E5]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse"></div>
                <span className="font-mono text-sm font-bold text-[#0A0A0A] tracking-wider">
                  [{tech}]
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] text-center">
            <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-2">99%</div>
            <div className="text-sm text-[#0A0A0A]/60">Success Rate</div>
            <div className="text-xs font-mono text-[#0A0A0A]/50 mt-2">ANTI_BOT_BYPASS</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] text-center">
            <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-2">24/7</div>
            <div className="text-sm text-[#0A0A0A]/60">Uptime</div>
            <div className="text-xs font-mono text-[#0A0A0A]/50 mt-2">SYSTEM_MONITORING</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] text-center">
            <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-2">50+</div>
            <div className="text-sm text-[#0A0A0A]/60">Sources</div>
            <div className="text-xs font-mono text-[#0A0A0A]/50 mt-2">DATA_INTEGRATION</div>
          </div>
        </motion.div>

        {/* Architecture Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-[#0A0A0A] text-white px-8 py-4 rounded-xl">
            <div className="flex items-center gap-3 font-mono text-sm">
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
              <span>ARCHITECTURE_STATUS: ENTERPRISE_GRADE | SCALING: AUTO | RELIABILITY: MAXIMUM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
