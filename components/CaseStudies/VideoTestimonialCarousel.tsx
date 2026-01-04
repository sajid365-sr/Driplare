'use client'

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  videoUrl?: string;
  imageUrl: string;
  projectType: string;
  clientLocation: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Md. Farid Uddin Sarker (Shawon)",
    title: "HR & Admin",
    company: "Spark Infrastructure",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    imageUrl: "/lovable-uploads/12aceeaf-8272-46e5-9f9d-1638e57cba9a.png",
    projectType: "AI_IMPLEMENTATION",
    clientLocation: "BANGLADESH"
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "CTO",
    company: "TechFlow",
    videoUrl: "https://www.youtube.com/watch?v=p5bUzGaqDh8",
    imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop",
    projectType: "WORKFLOW_AUTOMATION",
    clientLocation: "GLOBAL"
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    title: "Marketing Director",
    company: "InnovateNow",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    projectType: "MERN_INFRASTRUCTURE",
    clientLocation: "GLOBAL"
  }
];

export function VideoTestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="py-20 bg-[#0A0A0A] text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-4">
            Direct Feedback from the Field
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Hear directly from our partners about the impact of our engineered solutions.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Video Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="relative bg-[#1F1F1F] rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={testimonials[activeIndex].imageUrl}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                  {testimonials[activeIndex].videoUrl && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="absolute inset-0 flex items-center justify-center group">
                          <div className="relative">
                            <motion.div
                              className="absolute inset-0 bg-[#FF6B00]/30 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <div className="bg-[#FF6B00] rounded-full p-6 relative z-10 group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-4xl p-0 h-auto aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={testimonials[activeIndex].videoUrl}
                          title={`${testimonials[activeIndex].name} testimonial video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Metadata */}
            <div className="space-y-6">
              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#E5E5E5]/20">
                <h3 className="text-xl font-bold text-white mb-4">Technical Profile</h3>
                <div className="space-y-3 font-mono text-sm">
                  <div>
                    <span className="text-[#E5E5E5]/60">PROJECT_TYPE:</span>
                    <span className="text-[#FF6B00] ml-2">{testimonials[activeIndex].projectType}</span>
                  </div>
                  <div>
                    <span className="text-[#E5E5E5]/60">CLIENT_LOCATION:</span>
                    <span className="text-white ml-2">{testimonials[activeIndex].clientLocation}</span>
                  </div>
                  <div>
                    <span className="text-[#E5E5E5]/60">STATUS:</span>
                    <span className="text-green-400 ml-2">VERIFIED</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-[#E5E5E5]/20">
                <h4 className="font-bold text-white mb-2">{testimonials[activeIndex].name}</h4>
                <p className="text-[#E5E5E5]/60 text-sm">
                  {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  className="flex-1 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white p-3 rounded-lg transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex-1 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white p-3 rounded-lg transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === activeIndex
                    ? "border-[#FF6B00] shadow-lg"
                    : "border-[#E5E5E5]/30 hover:border-[#FF6B00]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <img
                  src={testimonials[index].imageUrl}
                  alt={`Testimonial ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-[#FF6B00]/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
