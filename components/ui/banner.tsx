"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useDarkMode from "@/hooks/use-dark-mode";

export default function Banner() {
  const isDarkMode = useDarkMode();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-90 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 dark:bg-neutral dark:bg- "
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? "#222831" : "#eee"}  1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? "#222831" : "#eee"} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold  mb-10 leading-tight"
          >
            Empowering Your Digital Presence.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-200  mb-8 max-w-5xl mx-auto"
          >
            Driplare delivers innovative web solutions and striking visuals to
            elevate your brand in the digital landscape.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button size="lg" className="bg-primary text-neutral">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
