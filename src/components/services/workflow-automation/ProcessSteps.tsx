import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "MAPPING",
    desc: "We interview your team to find hidden manual tasks.",
  },
  {
    id: "02",
    title: "ARCHITECTING",
    desc: "We build a digital blueprint of your new pipeline.",
  },
  {
    id: "03",
    title: "STRESS TESTING",
    desc: "Ensuring the workflow handles every edge case.",
  },
  {
    id: "04",
    title: "HANDOVER",
    desc: "Deployment and documentation for your team.",
  },
];

export const ProcessSteps = () => (
  <section className="py-24 bg-[#F9F9F9]">
    <div className="container">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase tracking-tighter">
          The_Methodology
        </h2>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative p-8 bg-white border border-border/40 rounded-[2rem] text-center"
          >
            <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase bg-primary/5 px-3 py-1 rounded-full mb-6 inline-block">
              Step_{step.id}
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">
              {step.title}
            </h3>
            <p className="text-sm text-[#0A0A0A]/60 font-medium leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
