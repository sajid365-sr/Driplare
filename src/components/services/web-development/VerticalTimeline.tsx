import { motion } from "framer-motion";

const lifecycleSteps = [
  {
    id: "01",
    title: "REQUIREMENT_ARCH",
    desc: "Ensuring every line of code serves a specific business purpose.",
  },
  {
    id: "02",
    title: "AGILE_DEVELOPMENT",
    desc: "Sprint-based builds with real-time progress tracking.",
  },
  {
    id: "03",
    title: "STRESS_TESTING",
    desc: "Rigorous performance and load testing before deployment.",
  },
  {
    id: "04",
    title: "CLOUD_ORCHESTRATION",
    desc: "High-performance hosting on AWS or Google Cloud.",
  },
];

export const VerticalTimeline = () => (
  <section className="py-24 bg-[#F9F9F9]">
    <div className="container">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-black uppercase tracking-tighter">
          Project_Lifecycle
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/60 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {lifecycleSteps.map((step, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="flex-1 text-center md:text-left">
                <div
                  className={`p-8 bg-white border border-border/40 rounded-[2rem] shadow-sm ${idx % 2 !== 0 && "md:text-right"}`}
                >
                  <span className="font-mono text-xs font-black text-primary tracking-widest">
                    {step.id}
                  </span>
                  <h3 className="text-xl font-black uppercase mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#0A0A0A]/50 font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-primary rounded-full relative z-10 hidden md:block shadow-[0_0_15px_rgba(255,107,0,0.5)]" />
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
