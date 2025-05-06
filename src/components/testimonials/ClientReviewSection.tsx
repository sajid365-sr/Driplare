
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  testimonialTitle: string;
  videoUrl?: string;
  imageUrl: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Md. Farid Uddin Sarker (Shawon)",
    title: "HR & Admin",
    company: "Spark Infrastructure",
    testimonialTitle: "Digital Transformation — Spark Infrastructure",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    imageUrl: "/lovable-uploads/12aceeaf-8272-46e5-9f9d-1638e57cba9a.png",
    testimonial: "Driplare transformed our digital landscape completely. Their expertise in web solutions helped us modernize our entire infrastructure."
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "CTO",
    company: "TechFlow",
    testimonialTitle: "AI Implementation — TechFlow",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop",
    testimonial: "The seamless integration and robust features transformed our workflow completely. Their team's technical expertise was exceptional."
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    title: "Marketing Director",
    company: "InnovateNow",
    testimonialTitle: "Website Redesign — InnovateNow",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    testimonial: "Their attention to detail and technical expertise exceeded our expectations. The results have been transformative for our business."
  }
];

const ClientReviewSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Auto-rotate slides - changed from 7000ms to 5000ms (5 seconds)
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const goToSlide = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setActiveIndex(index);
    setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    } else if (e.key === "ArrowRight") {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      } else {
        // Swiped right
        setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      }
    }
    
    setIsDragging(false);
  };

  // Function to determine card position based on index
  const getCardPosition = (index: number) => {
    if (isMobile) return 0; // No horizontal offset on mobile
    
    const current = activeIndex;
    const diff = index - current;
    
    // Handle wrap-around
    if (diff > 1) return -1;
    if (diff < -1) return 1;
    
    return diff;
  };

  // Updated function to create the 3D perspective effect
  const getCardStyle = (index: number) => {
    const position = getCardPosition(index);
    const isActive = index === activeIndex;
    
    // Base style for all cards
    const style = {
      zIndex: isActive ? 30 : 10,
      opacity: isActive ? 1 : 0.6,
      scale: isActive ? 1 : 0.85,
      x: `${position * 80}%`,
      rotateY: position * 30, // Increase rotation for more pronounced effect
      perspective: 1000,
      visible: true
    };
    
    // For side cards, we want to make them partially visible
    if (position !== 0) {
      // Hide cards that aren't the immediate neighbors
      if (Math.abs(position) > 1) {
        style.visible = false;
      }
      
      // The side cards should appear to be at a vertical angle
      style.rotateY = position * 40; // More extreme rotation
      style.opacity = 0.5; // More transparent
      style.scale = 0.7; // Smaller size
      
      // Side cards are pulled back in the z-axis to create depth
      style.x = `${position * 100}%`; // Move them further out
    }
    
    return style;
  };

  return (
    <section 
      className="py-20 overflow-hidden bg-gray-900 dark:bg-gray-900 text-white"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in slide-up">Words from Our Clients</h2>
          <p className="text-lg text-gray-300 dark:text-gray-300 max-w-3xl mx-auto fade-in slide-up">
            As a strategic partner to our clients across different industries, we help them deliver their business goals and drive technology-led 
            transformations. Our clients worldwide have achieved significant business results using our world-class solutions and have recognized us 
            for our efforts. Know more about our client's experience with us and read our trusted{" "}
            <a href="#" className="text-primary hover:underline">clients' feedback</a>.
          </p>
        </div>

        <div 
          ref={carouselRef}
          className="relative h-[500px] md:h-[550px] mx-auto perspective-1000"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseMove={(e) => isDragging && e.preventDefault()} 
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* 3D Stage for Cards */}
          <div className="absolute w-full h-full flex justify-center items-center">
            {testimonials.map((testimonial, index) => {
              const cardStyle = getCardStyle(index);
              const isActive = index === activeIndex;
              
              if (!cardStyle.visible) return null;
              
              return (
                <motion.div
                  key={testimonial.id}
                  className={`absolute cursor-pointer bg-gray-800 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl
                             ${isActive ? 'z-30' : 'z-10'} md:max-w-xl`}
                  style={{ 
                    width: isMobile ? '100%' : '80%', 
                    maxWidth: isMobile ? 'none' : '640px',
                    transformStyle: "preserve-3d" 
                  }}
                  initial={false}
                  animate={{
                    x: cardStyle.x,
                    scale: cardStyle.scale,
                    opacity: cardStyle.opacity,
                    rotateY: cardStyle.rotateY,
                    zIndex: cardStyle.zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => !isActive && goToSlide(index)}
                  whileHover={!isActive && !isMobile ? { scale: 0.8, opacity: 0.7 } : {}}
                >
                  <div className="relative w-full aspect-video">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    {isActive && testimonial.videoUrl && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button 
                            aria-label="Play video testimonial"
                            className="absolute inset-0 flex items-center justify-center group"
                          >
                            <div className="relative">
                              <motion.div 
                                className="absolute inset-0 bg-primary/30 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              />
                              <div className="bg-primary rounded-full p-4 relative z-10 group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-4xl p-0 h-auto aspect-video">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={testimonial.videoUrl} 
                            title={`${testimonial.name} testimonial video`} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <p className="font-semibold text-sm text-gray-300">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">
                      {testimonial.testimonialTitle}
                    </h3>
                    {isActive && (
                      <motion.p 
                        className="text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {testimonial.testimonial}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-primary' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviewSection;
