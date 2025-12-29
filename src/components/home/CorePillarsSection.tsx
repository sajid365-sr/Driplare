import { motion } from "framer-motion";
import { BrainCircuit, Workflow, Database } from "lucide-react";

const pillars = [
  {
    icon: BrainCircuit,
    title: "Autonomous AI Agents",
    description: "Digital workers trained on your business data to handle support, lead gen, and research. They learn your processes and execute them flawlessly.",
    features: [
      "Natural language processing for customer queries",
      "Automated data entry and validation",
      "Intelligent routing and prioritization",
      "24/7 availability without fatigue"
    ]
  },
  {
    icon: Workflow,
    title: "Workflow Architecture",
    description: "End-to-end automation using n8n to connect your entire stack (CRM, Finance, Operations). We build the nervous system of your business.",
    features: [
      "Seamless API integrations",
      "Conditional logic and triggers",
      "Error handling and recovery",
      "Real-time data synchronization"
    ]
  },
  {
    icon: Database,
    title: "MERN System Engineering",
    description: "Custom-built dashboards and secure backends to house your intelligent data. Built with MongoDB, Express, React, and Node.js for maximum performance.",
    features: [
      "Scalable database architecture",
      "Real-time data visualization",
      "Secure authentication systems",
      "Performance-optimized APIs"
    ]
  }
];

export function CorePillarsSection() {
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
            The Core Pillars
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            From 7 services to 3 "High-Value" Pillars that transform your business operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="group relative bg-white border border-[#E5E5E5] rounded-xl p-8 hover:border-[#FF6B00] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Status indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block px-2 py-1 bg-[#FF6B00] text-white text-xs font-mono rounded">
                  Status: Active
                </span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <pillar.icon className="h-16 w-16 text-[#FF6B00]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">{pillar.title}</h3>
              <p className="text-[#0A0A0A]/70 mb-6 leading-relaxed">{pillar.description}</p>

              {/* Features */}
              <ul className="space-y-3">
                {pillar.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-[#0A0A0A]/80 font-mono">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Technical schematic lines */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <defs>
                    <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E5E5" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

