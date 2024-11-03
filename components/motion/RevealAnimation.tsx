"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { fadeIn } from "./variants";

export default function RevealAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -50% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  // Scale and opacity animations controlled by scroll position and visibility
  const scale = useTransform(scrollYProgress, [0, 1], [isInView ? 1 : 0, 20]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, isInView ? 1 : 0]
  );

  return (
    <div ref={containerRef} className="relative   max-w-screen-xl ">
      <div className="grid place-items-center  ">
        <motion.div
          style={{ scale }}
          className="h-52 w-52 bg-black z-40 absolute rounded-full"
        />
      </div>
      <div className="z-50  lg:container px-5 ">
        <h1 className="  text-orange-300   text-4xl lg:text-8xl">
          At Driplare, we are committed to pushing the boundaries of what is
          possible.
        </h1>
      </div>
    </div>
  );
}
