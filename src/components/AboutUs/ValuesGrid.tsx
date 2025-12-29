import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Ruler, Building, Search } from "lucide-react";

const values = [
  {
    icon: Ruler,
    title: "Precision First",
    description: "We don't guess. We audit. Every automation we build is based on hard data and mapped workflows.",
    color: "#FF6B00"
  },
  {
    icon: Building,
    title: "Scalability by Design",
    description: "We build for the future. Our MERN-based systems are designed to grow as your user base and data requirements expand.",
    color: "#0A0A0A"
  },
  {
    icon: Search,
    title: "Radical Transparency",
    description: "No black boxes. We explain the 'How' and 'Why' behind our AI logic so you always stay in control of your digital workers.",
    color: "#FF6B00"
  }
];

export function ValuesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate1 = useTransform(scrollYProgress, [0, 0.5], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0.2, 0.7], [0, 360]);
  const rotate3 = useTransform(scrollYProgress, [0.4, 0.9], [0, 360]);

  const rotations = [rotate1, rotate2, rotate3];

  return (
    <section ref={containerRef} className="py-20 bg-white relative overflow-hidden">
      {/* Blueprint Grid Background */}
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            The Driplare Philosophy
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            Core values that guide every system we architect and every automation we deploy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group bg-white border border-[#E5E5E5] rounded-xl p-8 hover:border-[#FF6B00] transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Icon with rotation animation */}
              <div className="mb-6 flex justify-center">
                <motion.div
                  className="w-16 h-16 bg-[#F9F9F9] rounded-full flex items-center justify-center group-hover:bg-[#FF6B00]/10 transition-colors"
                  style={{ rotate: rotations[index] }}
                >
                  <value.icon
                    className="w-8 h-8 text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 text-center">{value.title}</h3>
              <p className="text-[#0A0A0A]/70 leading-relaxed text-center">{value.description}</p>

              {/* Technical accent */}
              <div className="mt-6 pt-4 border-t border-[#E5E5E5]/50">
                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-[#E5E5E5] text-[#0A0A0A] text-xs font-mono rounded-full">
                    PHILOSOPHY_{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting Elements */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#FF6B00] to-[#0A0A0A]"></div>
            <div className="px-4 py-2 bg-[#0A0A0A] text-white font-mono text-sm rounded">
              ENGINEERING_EXCELLENCE
            </div>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#0A0A0A] to-[#FF6B00]"></div>
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
