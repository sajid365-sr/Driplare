import { motion } from "framer-motion";

const lifecycleSteps = [
  {
    step: "01",
    title: "Requirement Architecture",
    description: "We deep-dive into your business needs to ensure every line of code serves a purpose."
  },
  {
    step: "02",
    title: "Agile Development",
    description: "You see progress in real-time. We build in sprints, allowing for constant feedback and pivot-readiness."
  },
  {
    step: "03",
    title: "Rigorous Testing",
    description: "Performance, security, and load testing. We ensure your system is \"battle-ready\" before launch."
  },
  {
    step: "04",
    title: "Scalable Deployment",
    description: "We host and manage your system on high-performance cloud infrastructure (AWS/DigitalOcean/Google Cloud)."
  }
];

export const VerticalTimeline = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Our Development Lifecycle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven methodology for building scalable, future-ready systems.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-500"></div>

          <div className="space-y-12">
            {lifecycleSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                className="relative flex items-start gap-8"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-black">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
