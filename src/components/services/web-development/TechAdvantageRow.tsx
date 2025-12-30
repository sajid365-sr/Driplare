import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu } from "lucide-react";

const advantages = [
  {
    icon: <Zap />,
    title: "Rapid Innovation",
    desc: "JavaScript end-to-end means unified logic and 40% faster deployment cycles.",
  },
  {
    icon: <Cpu />,
    title: "Infinite Scale",
    desc: "Native support for concurrent users and massive horizontal scaling.",
  },
  {
    icon: <ShieldCheck />,
    title: "Security Native",
    desc: "Encrypted data layers and enterprise-grade JWT authentication.",
  },
];

export const TechAdvantageRow = () => (
  <section className="py-24 bg-[#F9F9F9]">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {advantages.map((adv, idx) => (
          <motion.div
            key={idx}
            className="p-10 bg-white border border-border/40 rounded-[2.5rem] group hover:border-primary/40 transition-all shadow-sm"
          >
            <div className="w-12 h-12 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              {adv.icon}
            </div>
            <h3 className="font-black text-xl uppercase tracking-tighter mb-4">
              {adv.title}
            </h3>
            <p className="text-[#0A0A0A]/50 text-sm font-medium leading-relaxed">
              {adv.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-12">
        {["MongoDB", "Express", "React", "Node.js"].map((tech) => (
          <div key={tech} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-border/60 flex items-center justify-center bg-white shadow-inner mb-3">
              <span className="font-black text-2xl text-[#0A0A0A]">
                {tech[0]}
              </span>
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest opacity-40">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
