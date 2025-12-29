import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, Clock, TrendingUp } from "lucide-react";
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
  timeSaved?: string;
  efficiencyGain?: string;
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
    testimonial: "Driplare transformed our digital landscape completely. Their expertise in web solutions helped us modernize our entire infrastructure.",
    timeSaved: "40 hours/week",
    efficiencyGain: "85% faster processes"
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "CTO",
    company: "TechFlow",
    testimonialTitle: "AI Implementation — TechFlow",
    videoUrl: "https://www.youtube.com/watch?v=p5bUzGaqDh8",
    imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop",
    testimonial: "The seamless integration and robust features transformed our workflow completely. Their team's technical expertise was exceptional.",
    timeSaved: "25 hours/week",
    efficiencyGain: "60% cost reduction"
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    title: "Marketing Director",
    company: "InnovateNow",
    testimonialTitle: "Website Redesign — InnovateNow",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    testimonial: "Their attention to detail and technical expertise exceeded our expectations. The results have been transformative for our business.",
    timeSaved: "15 hours/week",
    efficiencyGain: "200% lead increase"
  }
];

export function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000);
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
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + testimonials.length) % testimonials.length
      );
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

    const clientX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      } else {
        setActiveIndex(
          (prevIndex) =>
            (prevIndex - 1 + testimonials.length) % testimonials.length
        );
      }
    }

    setIsDragging(false);
  };

  const getCardPosition = (index: number) => {
    if (isMobile) return 0;

    const current = activeIndex;
    const diff = index - current;

    if (diff > 1) return -1;
    if (diff < -1) return 1;

    return diff;
  };

  const getCardStyle = (index: number) => {
    const position = getCardPosition(index);
    const isActive = index === activeIndex;

    const style = {
      zIndex: isActive ? 30 : 10,
      opacity: isActive ? 1 : 0.6,
      scale: isActive ? 1 : 0.85,
      x: `${position * 80}%`,
      rotateY: position * 30,
      perspective: 1000,
      visible: true,
    };

    if (position !== 0) {
      if (Math.abs(position) > 1) {
        style.visible = false;
      }

      style.rotateY = position * 40;
      style.opacity = 0.5;
      style.scale = 0.7;
      style.x = `${position * 100}%`;
    }

    return style;
  };

  return (
    <section
      className="py-20 overflow-hidden bg-[#121212] text-white relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Security Seal Watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 opacity-10">
          <CheckCircle className="w-32 h-32 text-[#FF6B00]" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-5">
          <div className="text-[#FF6B00] font-mono text-xs transform -rotate-12">
            QUALITY ASSURANCE
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block border border-[#E5E5E5]/30 rounded-lg px-6 py-2 mb-6 font-mono text-sm text-[#E5E5E5]">
            VERIFIED DOCUMENTATION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-4">
            Verified ROI from Global Business Leaders
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-mono">
            Real results from real businesses. Every testimonial represents measurable efficiency gains and time savings.
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          className="relative h-[600px] md:h-[650px] mx-auto perspective-1000"
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
                  className={`absolute cursor-pointer bg-[#1F1F1F] border border-[#E5E5E5]/20 rounded-xl overflow-hidden shadow-2xl
                             ${isActive ? "z-30" : "z-10"} md:max-w-xl `}
                  style={{
                    width: isMobile ? "100%" : "85%",
                    maxWidth: isMobile ? "none" : "700px",
                    transformStyle: "preserve-3d",
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
                  whileHover={
                    !isActive && !isMobile ? { scale: 0.8, opacity: 0.7 } : {}
                  }
                >
                  {/* ROI Metrics */}
                  {isActive && (
                    <div className="bg-[#0A0A0A] px-6 py-3 border-b border-[#E5E5E5]/20">
                      <div className="flex justify-center gap-8">
                        <div className="flex items-center gap-2 text-[#FF6B00]">
                          <Clock className="w-4 h-4" />
                          <span className="font-mono text-sm">{testimonial.timeSaved}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#FF6B00]">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-mono text-sm">{testimonial.efficiencyGain}</span>
                        </div>
                      </div>
                    </div>
                  )}

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
                                className="absolute inset-0 bg-[#FF6B00]/30 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              />
                              <div className="bg-[#FF6B00] rounded-full p-4 relative z-10 group-hover:scale-110 transition-transform">
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
                      <p className="font-semibold text-sm text-[#E5E5E5] font-mono">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-[#E5E5E5]/60 font-mono">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#FF6B00]">
                      {testimonial.testimonialTitle}
                    </h3>
                    {isActive && (
                      <motion.p
                        className="text-[#E5E5E5]/80 font-mono text-sm leading-relaxed"
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
                className={`w-3 h-3 rounded-full border-2 border-[#FF6B00] ${
                  index === activeIndex ? "bg-[#FF6B00]" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}