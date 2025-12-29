import { motion } from "framer-motion";
import { Search, Download, Filter, Monitor, ArrowRight, Globe, Database, Zap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Targeting",
    description: "Identifying high-value data sources and anti-bot obstacles.",
    detail: "URL discovery, rate limit analysis, bot detection mapping"
  },
  {
    icon: Download,
    title: "Extraction",
    description: "High-speed scraping using residential proxies and headless browsers.",
    detail: "Puppeteer, Playwright, residential IP rotation"
  },
  {
    icon: Filter,
    title: "Refining",
    description: "Cleaning and structuring raw data into JSON/SQL formats.",
    detail: "Data validation, deduplication, format conversion"
  },
  {
    icon: Monitor,
    title: "Monitoring",
    description: "Feeding the data into custom MERN dashboards or AI analysis agents.",
    detail: "Real-time alerts, automated reporting, API integration"
  }
];

export function ExtractionFlow() {
  return (
    <section className="py-20 bg-[#F9F9F9] relative overflow-hidden">
      {/* Flow Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="flow-bg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#flow-bg)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
            The Extraction Lifecycle
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-inter">
            A horizontal step-by-step diagram showing data moving from "The Web" to "Your Dashboard."
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Start Point */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-[#0A0A0A] rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-bold text-[#0A0A0A] font-montserrat">The Web</span>
              </div>
            </motion.div>

            {/* End Point */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-[#FF6B00] rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-bold text-[#0A0A0A] font-montserrat">Your Dashboard</span>
              </div>
            </motion.div>

            {/* Main Flow Line */}
            <svg className="absolute top-1/2 left-16 right-16 w-[calc(100%-8rem)] h-0.5 -translate-y-1/2">
              <defs>
                <linearGradient id="main-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A0A0A" />
                  <stop offset="25%" stopColor="#FF6B00" />
                  <stop offset="75%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#0A0A0A" />
                </linearGradient>
              </defs>
              <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="url(#main-flow)" strokeWidth="3" />
            </svg>

            {/* Animated Data Flow */}
            <motion.div
              className="absolute top-1/2 left-16 w-4 h-4 bg-[#FF6B00] rounded-full shadow-lg -translate-y-1/2"
              animate={{ x: ["0%", "calc(100% - 2rem)"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 w-4 h-4 bg-[#FF6B00] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Steps */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 pt-32">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-white border-2 border-[#E5E5E5] rounded-xl flex items-center justify-center mx-auto shadow-lg">
                      <step.icon className="w-10 h-10 text-[#0A0A0A]" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold font-mono text-sm">{index + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 font-montserrat">{step.title}</h3>
                  <p className="text-[#0A0A0A]/70 mb-3 font-inter leading-relaxed">{step.description}</p>
                  <div className="text-xs font-mono text-[#0A0A0A]/50 bg-[#E5E5E5] px-3 py-2 rounded">
                    {step.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-white p-8 rounded-xl border border-[#E5E5E5] shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-3 font-montserrat">Infrastructure</h4>
                <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                  <div>• Residential Proxies</div>
                  <div>• Headless Browsers</div>
                  <div>• Rate Limit Management</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-3 font-montserrat">Processing</h4>
                <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                  <div>• Real-time Validation</div>
                  <div>• Data Normalization</div>
                  <div>• Error Recovery</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-3 font-montserrat">Delivery</h4>
                <div className="space-y-2 text-sm font-mono text-[#0A0A0A]/70">
                  <div>• RESTful APIs</div>
                  <div>• Webhook Integration</div>
                  <div>• Scheduled Reports</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
