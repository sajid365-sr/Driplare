import { motion } from "framer-motion";
import { Workflow, Database, Code, ArrowRight, Check } from "lucide-react";
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Specialist <span className="text-primary">Services.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The "Starting From" Grid. Services that require custom architectural approaches.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-10 hover:border-primary transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(var(--primary),0.15)] flex flex-col"
            >
              {/* Blueprint Grid Background Overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] rounded-[2.5rem] pointer-events-none group-hover:opacity-[0.07] transition-opacity"
                style={{
                  backgroundImage: `
                    linear-gradient(var(--border) 1px, transparent 1px),
                    linear-gradient(90deg, var(--border) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className="mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon 
                      className="w-8 h-8" 
                      style={{ color: service.color === "#0A0A0A" ? "var(--foreground)" : service.color }} 
                    />
                  </div>
                </div>

                {/* Title & Price */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black tracking-tight mb-2">{service.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Starting at</span>
                    <span className="text-2xl font-black text-primary">
                      {service.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button className="w-full py-7 rounded-2xl font-bold text-lg bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300">
                  Get Quote
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Technical Meta Footer */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <div className="text-[10px] font-mono font-bold text-center uppercase tracking-[0.2em] text-muted-foreground/40">
                    CAPITAL_ALLOCATION: PROJECT_BASED
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Solution CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="bg-primary rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Decorative Background Text */}
            <div className="absolute top-0 right-0 text-[8rem] font-black opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
              CUSTOM
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 relative z-10">
              Need a Custom <br className="hidden md:block" /> Architectural Solution?
            </h3>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 relative z-10">
              Every business is unique. Let's design a system investment plan that perfectly matches your specific requirements.
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 font-black py-8 px-10 rounded-2xl text-xl shadow-xl transition-transform hover:scale-105 relative z-10">
              Request Custom Quote
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}