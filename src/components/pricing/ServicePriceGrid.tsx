import { motion } from "framer-motion";
import { Workflow, Database, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation (n8n)",
    startingPrice: "$3,500",
    description: "Best for connecting fragmented apps and eliminating manual data transfers.",
    features: [
      "Multi-platform integration",
      "Conditional logic workflows",
      "Error handling & recovery",
      "Performance monitoring"
    ],
    color: "#FF6B00"
  },
  {
    icon: Database,
    title: "Data Scraping & Monitoring",
    startingPrice: "$450/mo",
    description: "Best for market intelligence and competitive analysis.",
    features: [
      "Real-time data collection",
      "Competitor price tracking",
      "Automated alerts",
      "Historical data storage"
    ],
    color: "#0A0A0A"
  },
  {
    icon: Code,
    title: "Custom MERN Development",
    startingPrice: "$5,000",
    description: "Best for unique business tools and specialized applications.",
    features: [
      "MongoDB database design",
      "Express API development",
      "React frontend components",
      "Node.js backend logic"
    ],
    color: "#FF6B00"
  }
];

export function ServicePriceGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Specialist Services
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            The "Starting From" Grid. Services that require custom architectural approaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group bg-white border border-[#E5E5E5] rounded-xl p-8 hover:border-[#FF6B00] hover:shadow-lg transition-all duration-300"
            >
              {/* Blueprint Grid Background */}
              <div
                className="absolute inset-0 opacity-5 rounded-xl pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(#E5E5E5 1px, transparent 1px),
                    linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon
                      className="w-8 h-8"
                      style={{ color: service.color }}
                    />
                  </div>
                </div>

                {/* Title & Price */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{service.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-bold text-[#FF6B00]">
                      Starting at {service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#0A0A0A]/70 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
                      <span className="text-sm text-[#0A0A0A]/70">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button className="w-full bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                  Get Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Investment Note */}
                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-[#0A0A0A]/50">
                    CAPITAL_ALLOCATION: PROJECT_BASED
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-[#FF6B00] text-white p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Architectural Solution?</h3>
            <p className="text-white/90 mb-6">
              Every business is unique. Let's design a system investment plan that perfectly matches your specific requirements.
            </p>
            <Button className="bg-white text-[#FF6B00] hover:bg-white/90 font-bold">
              Request Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
