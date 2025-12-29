import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Process Mapping",
    description: "We interview your team to find the \"hidden\" manual tasks that slow you down."
  },
  {
    step: "02",
    title: "Workflow Architecting",
    description: "We build a digital blueprint of your new, automated pipeline."
  },
  {
    step: "03",
    title: "Stress Testing",
    description: "We push the workflow to the limit to ensure it handles every edge case."
  },
  {
    step: "04",
    title: "Handover & Support",
    description: "We deploy the system and provide documentation so you stay in control."
  }
];

export const ProcessSteps = () => {
  return (
    <section className="py-20 bg-muted/30 text-black">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The "Engineered Efficiency" Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A proven methodology to transform your operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
              {idx < processSteps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-primary/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
