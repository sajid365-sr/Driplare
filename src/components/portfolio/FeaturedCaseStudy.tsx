
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const challenge = [
  "Legacy healthcare portal lacked engagement",
  "Slow onboarding discouraged users",
  "Brand identity not cohesive"
];
const solution = [
  "Full UX/UI overhaul with mobile-first approach",
  "Integrated AI-driven onboarding",
  "Launched bold, accessible visual language"
];
const result = [
  "Conversions up 40%",
  "Bounce rate down 60%",
  "Avg. session up 32%"
];

export function FeaturedCaseStudy() {
  // Animated counter effect on metric
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (!inView) return;
    let frame: any;
    let start = 0;
    const end = 40;
    const step = () => {
      start += 1;
      setCount(start);
      if (start < end) {
        frame = setTimeout(step, 32);
      }
    };
    step();
    return () => clearTimeout(frame);
  }, [inView]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-12">
      {/* Left: text bullets */}
      <div className="flex-1 flex flex-col gap-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.h2 className="font-extrabold text-2xl md:text-3xl mb-4 text-[#F88220]" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65 }}>
            Visionary Health Portal
          </motion.h2>
          <div className="flex items-center mb-2 gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Logo" className="h-8" />
            <span className="font-medium text-base opacity-50">Healthcare</span>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2 text-blue-200">Challenge</div>
            <ul className="text-base ml-4 list-disc text-muted-foreground">
              {challenge.map(c => (
                <motion.li key={c}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >{c}</motion.li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2 text-blue-200">Solution</div>
            <ul className="text-base ml-4 list-disc text-muted-foreground">
              {solution.map(c => (
                <motion.li key={c}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.13 }}
                >{c}</motion.li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-blue-200">Result</div>
            <ul className="text-base ml-4 list-disc text-muted-foreground">
              {result.map(c => (
                <motion.li key={c}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >{c}</motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
        {/* Animated metric */}
        <div className="mt-8 text-2xl font-extrabold text-[#F88220] flex items-baseline gap-2" ref={ref}>
          Conversions up&nbsp;
          <motion.span
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={inView ? { scale: 1.14, opacity: 1 } : undefined}
            transition={{ repeat: inView ? Infinity : 0, duration: 1.4, repeatType: "reverse" }}
            className="font-bold text-5xl text-[#F88220]"
          >
            {count}%
          </motion.span>
        </div>
      </div>
      {/* Right: mockup image, scale/rotate in */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ scale: 0.9, rotate: -7, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600"
          alt="Health Portal Mockup"
          className="rounded-xl shadow-2xl max-w-xs md:max-w-md"
        />
      </motion.div>
    </div>
  );
}
