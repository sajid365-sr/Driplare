"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Banner2() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-90 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 dark:bg-neutral dark:bg- "
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold  mb-10 leading-tight"
          >
            Your Partner in Digital Growth and Creative Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-200  mb-8 max-w-5xl mx-auto"
          >
            Driplare offers expert web development, digital marketing, graphic
            design, and content writing services. We create responsive websites,
            boost online presence through strategic marketing, and craft
            standout visuals and content. Our goal is to help your business
            succeed in the digital world with innovative and high-quality
            solutions.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
