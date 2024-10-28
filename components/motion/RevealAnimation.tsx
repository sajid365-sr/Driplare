"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedTextWord from "./AnimatedTextWord";

export default function RevealAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative  min-h-screen bg-white">
      <motion.div
        className="absolute inset-0 flex items-center overflow-hidden justify-center pointer-events-none "
        style={{ scale }}
      >
        <div className="w-[200px] h-[200px] bg-black rounded-full" />
      </motion.div>
      <motion.div
        className="relative  z-50 flex items-center justify-center"
        style={{ opacity }}
      >
        {/* <AnimatedTextWord
          text="At Driplare, we are committed to pushing the boundaries of what's possible."
          className="lg:container text-white px-5 my-20 text-4xl lg:text-8xl"
        /> */}
        <h1 className="lg:container text-white px-5 my-20 text-4xl lg:text-8xl">
          At Driplare, we are committed to pushing the boundaries of what is
          possible.
        </h1>
      </motion.div>
    </div>
  );
}
