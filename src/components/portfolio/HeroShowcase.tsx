
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/Typewriter";

// Demo project images
const images = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
  "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=600",
  "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=600"
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % images.length), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[58vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-[#1A1F2C]">
      {/* Animated square grid, behind - re-use grid SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedGridBg />
      </div>
      {/* Split: left image, right text */}
      <div className="relative z-10 container flex flex-col md:flex-row items-center justify-center gap-10 h-full">
        {/* Left: cycling images */}
        <div className="flex-1 flex items-center justify-center min-w-[210px]">
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl">
            {images.map((img, i) => (
              <motion.img
                key={img}
                src={img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.7 }}
                style={{ filter: active === i ? "brightness(1)" : "brightness(0.7)" }}
              />
            ))}
          </div>
        </div>
        {/* Right: Typewriter + text */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typewriter text="Our Creations in Motion" speed={30} />
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-blue-100 mb-5 max-w-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Typewriter text="Cutting-edge projects powered by AI and innovation." speed={20} />
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// AnimatedGridBg is reused from the existing component
import AnimatedGridBg from "@/components/AnimatedGridBg";
