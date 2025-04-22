
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Pen, TrendingUp, Users } from "lucide-react";

const steps = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Discover",
    desc: "User research & wireframes"
  },
  {
    icon: <Pen className="w-6 h-6 text-primary" />,
    title: "Design",
    desc: "Hi-fi mocks & prototypes"
  },
  {
    icon: <Code className="w-6 h-6 text-primary" />,
    title: "Develop",
    desc: "Clean, modular code & integration"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Deploy & Support",
    desc: "Launch, monitor, iterate"
  }
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto px-2">
      <motion.div
        className="relative flex items-center justify-between"
        style={{ minHeight: 120 }}
      >
        {/* Animated line */}
        <motion.div
          className="absolute top-1/2 left-10 right-10 h-[3px] bg-primary rounded-full z-0"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
        {/* Steps */}
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="relative z-10 flex flex-col items-center group"
            initial={{ y: 30, opacity: 0, scale: 0.8 }}
            animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200"
              animate={
                inView
                  ? {
                      boxShadow:
                        "0px 0px 24px 0px #F8822080, 0px 1px 8px #F8822015"
                    }
                  : {}
              }
            >
              {step.icon}
            </motion.div>
            <div className="mt-2 text-base md:text-lg font-bold text-foreground text-center">{step.title}</div>
            <div className="text-sm text-muted-foreground text-center">{step.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
