'use client'

import { motion } from "framer-motion";
import { useState } from "react";

const techStack = [
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    description: "NoSQL Document Database"
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    description: "JavaScript Runtime"
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    description: "Frontend Framework"
  },
  {
    name: "n8n",
    logo: "🤖",
    color: "#FF6B00",
    description: "Workflow Automation"
  },
  {
    name: "OpenAI",
    logo: "🧠",
    color: "#412991",
    description: "AI & Machine Learning"
  },
  {
    name: "Stripe",
    logo: "💳",
    color: "#635BFF",
    description: "Payment Processing"
  },
  {
    name: "AWS",
    logo: "☁️",
    color: "#FF9900",
    description: "Cloud Infrastructure"
  }
];

export function TechStackSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Machine room grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#E5E5E5" opacity="0.3"/>
              <circle cx="18" cy="18" r="1" fill="#E5E5E5" opacity="0.3"/>
              <line x1="2" y1="2" x2="18" y2="18" stroke="#E5E5E5" strokeWidth="0.5" opacity="0.3"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="#E5E5E5" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            The Machine Room
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-mono">
            Built on enterprise-grade infrastructure. No wrappers. Just raw power.
          </p>
        </motion.div>

        {/* Tech stack grid - Branded silhouettes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 mb-12">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="relative group cursor-pointer"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl p-4 h-24 flex flex-col items-center justify-center transition-all duration-500 group-hover:shadow-lg">
                {/* Logo/Icon */}
                <div className="mb-2">
                  {tech.logo.startsWith('http') ? (
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className={`w-8 h-8 transition-all duration-500 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-30 filter grayscale'
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-2xl transition-all duration-500 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      {tech.logo}
                    </span>
                  )}
                </div>

                {/* Name */}
                <span className="text-xs font-bold font-mono text-[#0A0A0A] text-center leading-tight">
                  {tech.name}
                </span>

                {/* Hover overlay with brand color */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: tech.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Description tooltip */}
                <motion.div
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  {tech.description}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0A0A0A]"></div>
                </motion.div>
              </div>

              {/* Connection lines effect */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {techStack.map((_, i) => {
                    if (i === index) return null;
                    const angle = ((i - index) * 360) / techStack.length;
                    return (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-px bg-[#FF6B00] origin-bottom"
                        style={{
                          height: '60px',
                          transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Authority statement */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block bg-[#0A0A0A] text-white px-8 py-4 rounded-xl border border-[#E5E5E5]/20">
            <p className="font-bold text-lg mb-2 font-mono">Enterprise-Grade Architecture</p>
            <p className="text-white/80 text-sm font-mono">
              [MongoDB] [Node.js] [React] [n8n] [OpenAI] [Stripe] [AWS]
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
