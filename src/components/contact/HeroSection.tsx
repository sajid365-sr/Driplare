
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden dark:bg-[#1A1F2C] bg-[#1A1F2C]">
      {/* Placeholder for a background video or animated nodes, replace if needed */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#211c29] via-[#1a1f2c] to-[#14121b]">
        {/* Could insert background video here */}
      </div>
      <div className="absolute inset-0 z-10" />
      <motion.div
        className="relative z-20 text-center px-4"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, type: "spring" }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, type: "spring" }}
        >
          Let&apos;s Build the Future Together
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.85 }}
        >
          Reach out for AI-driven web, marketing, and design solutions.
        </motion.p>
        <motion.a
          href="#contact-form"
          className="inline-block bg-[#F88220] hover:bg-[#fa973a] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl tracking-tight transition-all focus:ring-2 focus:ring-[#F88220] focus:outline-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 1 }}
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
}
