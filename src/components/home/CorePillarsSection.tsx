import { motion } from "framer-motion";
import { BrainCircuit, Workflow, Database, Check, ArrowRight } from "lucide-react";

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
    ],
    status: "READY_FOR_DEPLOY"
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
    ],
    status: "ACTIVE_NEXUS"
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
    ],
    status: "INFRA_STABLE"
  }
];

export function CorePillarsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0A0A0A] mb-8">
            The Core <span className="text-primary">Pillars.</span>
          </h2>
          <p className="text-xl text-[#0A0A0A]/60 leading-relaxed font-medium">
            From fragmented tasks to high-value architectural systems that transform how your business operates.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-[#E5E5E5] rounded-[2rem] p-10 md:p-12 hover:border-primary transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(var(--primary),0.15)] flex flex-col"
            >
              {/* Status Badge */}
              <div className="absolute top-8 right-8">
                <div className="bg-[#0A0A0A]/5 px-4 py-1.5 rounded-full border border-[#0A0A0A]/5 transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
                  <span className="text-[10px] font-mono font-bold text-[#0A0A0A]/40 group-hover:text-primary uppercase tracking-widest">
                    {pillar.status}
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div className="mb-10">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <pillar.icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-3xl font-black text-[#0A0A0A] mb-4 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[#0A0A0A]/60  leading-relaxed font-medium">
                  {pillar.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 border-t border-[#0A0A0A]/5 pt-10">
                  {pillar.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0A0A0A]/80 font-mono leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Meta */}
              <div className="mt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase">
                  Architecture_v4.0
                </span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}