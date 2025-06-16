import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
}

interface InfiniteProjectCarouselProps {
  projects: Project[];
}

export function InfiniteProjectCarousel({
  projects,
}: InfiniteProjectCarouselProps) {
  // Double the items to create the infinite effect
  const doubledProjects = [...projects, ...projects];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollAnimation = () => {
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

    const animationInterval = setInterval(scrollAnimation, 30);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-hidden whitespace-nowrap cursor-grab active:cursor-grabbing"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <motion.div
        className="inline-flex gap-6 py-8 select-none"
        whileTap={{ cursor: "grabbing" }}
      >
        {doubledProjects.map((project, idx) => (
          <motion.div
            key={`${project.title}-${idx}`}
            className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <span className="text-primary text-sm font-medium mb-2">
                {project.category}
              </span>
              <h3 className="text-white text-xl font-bold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
