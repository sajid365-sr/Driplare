import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Banner2() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-90 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
            Your Partner in Digital Growth and Creative Excellence
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Driplare offers expert web development, digital marketing, graphic
            design, and content writing services. We create responsive websites,
            boost online presence through strategic marketing, and craft
            standout visuals and content. Our goal is to help your business
            succeed in the digital world with innovative and high-quality
            solutions.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
