
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Sample brand logos, you can easily extend or change these
const brands = [
  {
    name: "Microsoft",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Netflix",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  },
  {
    name: "IBM",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
  },
  {
    name: "Adobe",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Adobe_Corporate_logo.svg"
  },
  {
    name: "Meta",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Logo.png"
  },
  {
    name: "Spotify",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
  },
  {
    name: "Google",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
  }
];

export function InfiniteBrandsSlider() {
  const doubled = [...brands, ...brands]; // Infinite effect
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        if (
          scrollRef.current.scrollLeft >=
          (scrollRef.current.scrollWidth - scrollRef.current.clientWidth) / 2
        ) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    };
    const interval = setInterval(scroll, 22);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-hidden w-full max-w-6xl mx-auto"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <motion.div
        className="inline-flex gap-12 py-4 items-center min-w-full"
        whileTap={{ cursor: "grabbing" }}
      >
        {doubled.map((brand, i) => (
          <motion.div
            key={brand.name + i}
            className="flex flex-col items-center px-6 group"
            initial={{ scale: 1, opacity: 0.65 }}
            whileHover={{ scale: 1.13, opacity: 1, filter: "drop-shadow(0 0 20px #8F5CFF88)" }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.31, delay: i * 0.04 }}
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="h-12 md:h-16 w-auto transition-all mb-2 saturate-150"
              style={{ filter: "drop-shadow(0 3px 22px #8F5CFF30)" }}
            />
            <span className="text-xs mt-1 text-muted-foreground opacity-70 tracking-wide">
              {brand.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
