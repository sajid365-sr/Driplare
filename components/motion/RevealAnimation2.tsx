"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedTextWord from "./AnimatedTextWord";

export default function RevealAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { scrollY } = useScroll();
  const [startScrollY, setStartScrollY] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const { top } = containerRef.current.getBoundingClientRect();
      setStartScrollY(window.scrollY + top);
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const scale = useTransform(
    scrollY,
    [startScrollY, startScrollY + containerHeight],
    [0, 100]
  );

  const opacity = useTransform(
    scrollY,
    [startScrollY, startScrollY + containerHeight * 0.6],
    [0, 1]
  );

  return (
    <div className="relative " ref={containerRef}>
      <motion.div
        className="fixed  inset-0 bg-neutral"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="fixed inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ scale }}
      >
        <div className="w-[100px] h-[100px] bg-white rounded-full" />
      </motion.div>
      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center"
        style={{ opacity }}
      >
        <AnimatedTextWord
          text="At Driplare, we are committed to pushing the boundaries of what's possible."
          className="lg:container px-5 my-20 text-4xl lg:text-8xl"
        />
      </motion.div>
    </div>
  );
}
