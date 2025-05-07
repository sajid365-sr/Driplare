import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden bg-gradient-to-br from-[#211c29] via-[#1a1f2c] to-[#14121b]">
      {/* OPTIONAL: Replace with a shader/video background if assets are available */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(30,174,219,0.10) 0%, rgba(20,17,27,0.5) 100%)",
        }}
      />
      <div className="absolute inset-0 z-10">
        {/* SQUARE-LINE GRID — already sits behind */}
      </div>
      <motion.div
        className="relative z-20 max-w-3xl mx-auto text-center px-4"
        initial={{ opacity: 0, scale: 0.98, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.08, type: "spring" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Intelligent Automation.
          <br className="hidden md:block" />
          <span className="text-[#1EAEDB] drop-shadow-lg">Real Results.</span>
        </h1>
        <motion.p
          className="text-lg md:text-2xl text-blue-100 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7 }}
        >
          Harness AI to elevate support, streamline workflows, and scale
          smarter.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7 }}
        >
          <Button
            className="bg-[#1EAEDB] hover:bg-[#13c6e8] px-10 py-4 text-lg shadow-xl tracking-tight font-bold transition-all"
            style={{ boxShadow: "0 4px 40px 0 #1eaedb66" }}
          >
            Explore AI Solutions
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
