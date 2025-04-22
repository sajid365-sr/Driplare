
import { useEffect, useState } from "react";
import { Typewriter } from "./Typewriter";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Driplare transformed our UX—bounce rate halved in 2 weeks.",
    author: "Ava McCarthy, Visionary Health"
  },
  {
    quote: "Load times dropped below 1s. Our team is blown away.",
    author: "Mason Lee, SyncWin SaaS"
  },
  {
    quote: "Pixel perfect and future-proof. Best web partner we've had.",
    author: "Natalie Song, EcoSites"
  }
];

export default function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const [typedDone, setTypedDone] = useState(false);

  useEffect(() => {
    if (typedDone) {
      const timeout = setTimeout(() => {
        setIdx((idx + 1) % testimonials.length);
        setTypedDone(false);
      }, 1900); // Fade after finish typing
      return () => clearTimeout(timeout);
    }
  }, [typedDone, idx]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center min-h-[92px] text-lg md:text-2xl font-semibold text-foreground relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <Typewriter text={`“${testimonials[idx].quote}”`} onDone={() => setTypedDone(true)} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 text-muted-foreground text-sm">{testimonials[idx].author}</div>
    </div>
  );
}
