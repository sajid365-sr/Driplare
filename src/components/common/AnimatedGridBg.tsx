import { motion } from "framer-motion";

export default function AnimatedGridBg() {
  // Grid size and animation
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "none" }}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        className="w-full h-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Horizontal lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.line
            key={"h" + i}
            x1="0"
            y1={i * 8.5}
            x2="100"
            y2={i * 8.5}
            stroke="#F88220"
            strokeOpacity={0.07}
            strokeWidth="0.5"
            animate={{
              y1: [i * 8.5, i * 8.5 + 2, i * 8.5],
              y2: [i * 8.5, i * 8.5 + 2, i * 8.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 18 + i * 0.5,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.line
            key={"v" + i}
            y1="0"
            x1={i * 8.5}
            y2="100"
            x2={i * 8.5}
            stroke="#F88220"
            strokeOpacity={0.07}
            strokeWidth="0.5"
            animate={{
              x1: [i * 8.5, i * 8.5 + 2, i * 8.5],
              x2: [i * 8.5, i * 8.5 + 2, i * 8.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 20 + i * 0.6,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
