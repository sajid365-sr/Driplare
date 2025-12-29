import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const metrics = [
  { label: "TOTAL_TIME_SAVED", value: 45000, suffix: "+ HOURS" },
  { label: "SYSTEM_UPTIME", value: 99.9, suffix: "%" },
  { label: "TASK_ACCURACY", value: 100, suffix: "%" }
];

export function ResultsHero() {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev =>
        prev.map((val, index) => {
          const target = metrics[index].value;
          const increment = target / 100; // Animate over 100 steps
          return val < target ? Math.min(val + increment, target) : target;
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
            Real Problems.{" "}
            <span className="text-[#FF6B00]">Engineered Solutions.</span>
          </h1>

          <p className="text-xl text-[#0A0A0A]/70 mb-12 max-w-3xl mx-auto">
            We don't just build software; we architect business growth. Explore how our AI Agents and Automated Workflows generate measurable ROI for our global partners.
          </p>

          {/* Live Metrics Bar */}
          <div className="bg-[#0A0A0A] rounded-xl p-8 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-[#E5E5E5] text-sm font-mono mb-2 tracking-wider">
                    {metric.label}:
                  </div>
                  <div className="text-[#FF6B00] text-3xl md:text-4xl font-mono font-bold">
                    {Math.floor(animatedValues[index])}
                    <span className="text-[#E5E5E5] text-xl">{metric.suffix}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated progress bar */}
            <motion.div
              className="mt-6 h-1 bg-[#FF6B00]/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-[#FF6B00]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="mt-4 text-[#E5E5E5]/60 text-xs font-mono text-center">
              SYSTEM_STATUS: ACTIVE | LAST_UPDATED: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
