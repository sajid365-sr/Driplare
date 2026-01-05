"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle, Clock, TrendingUp, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "../../hooks/use-media-query";
import { getReviews, type Testimonial } from "@/lib/review-action";

export function SocialProofSection() {
  // Initial value [] দেয়ায় 'possibly undefined' এরর সমাধান হবে
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // ডাটা ফেচিং সিস্টেম
  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await getReviews(1, 10);
        if (response?.data && response.data.length > 0) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (!isPaused && testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);

  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex(index);
    setIsPaused(false);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || testimonials.length === 0) return;
    const clientX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
      }
    }
    setIsDragging(false);
  };

  const getCardStyle = (index: number) => {
    if (isMobile) {
      return {
        x: index === activeIndex ? "0%" : "100%",
        opacity: index === activeIndex ? 1 : 0,
        scale: 1,
        visible: index === activeIndex,
      };
    }

    const position = index - activeIndex;
    let xValue = position * 80;
    if (position > 1) xValue = 160;
    if (position < -1) xValue = -160;

    return {
      zIndex: index === activeIndex ? 30 : 10,
      opacity: index === activeIndex ? 1 : 0.5,
      scale: index === activeIndex ? 1 : 0.85,
      x: `${xValue}%`,
      rotateY: position * 30,
      visible: Math.abs(position) <= 1,
    };
  };

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-[#121212]">
        <Loader2 className="w-8 h-8 text-[#FF6B00] animate-spin" />
      </div>
    );
  }

  // যদি কোন রিভিউ না থাকে
  // if (testimonials.length === 0) return null;

  return (
    <section
      className="py-20 overflow-hidden bg-[#121212] text-white relative"
      tabIndex={0}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 opacity-10">
          <CheckCircle className="w-32 h-32 text-[#FF6B00]" />
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block border border-[#E5E5E5]/30 rounded-lg px-6 py-2 mb-6 font-mono text-sm">
            VERIFIED_ROI_DOCUMENTATION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-4">
            Verified ROI from Global Business Leaders
          </h2>
        </motion.div>

        <div
          ref={carouselRef}
          className="relative h-[600px] md:h-[650px] mx-auto perspective-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className="absolute w-full h-full flex justify-center items-center">
            {testimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              if (!style.visible && !isMobile) return null;

              return (
                <motion.div
                  key={testimonial.id || `testi-${index}`}
                  className={`absolute cursor-pointer bg-[#1F1F1F] border border-[#E5E5E5]/20 rounded-xl overflow-hidden shadow-2xl ${isActive ? "z-30" : "z-10"}`}
                  style={{
                    width: isMobile ? "100%" : "700px",
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotateY: style.rotateY,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => !isActive && goToSlide(index)}
                >
                  {isActive && (
                    <div className="bg-[#0A0A0A] px-6 py-3 border-b border-[#E5E5E5]/20 flex justify-center gap-8">
                      <div className="flex items-center gap-2 text-[#FF6B00]">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono text-xs">
                          {testimonial.timeSaved || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#FF6B00]">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-mono text-xs">
                          {testimonial.efficiencyGain || "N/A"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="relative aspect-video">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    {isActive && testimonial.videoUrl && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            title="Play Video"
                            className="absolute inset-0 flex items-center justify-center group"
                          >
                            <div className="bg-[#FF6B00] rounded-full p-4 group-hover:scale-110 transition-transform shadow-xl">
                              <Play className="w-8 h-8 text-white fill-current" />
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden aspect-video border-none">
                          <iframe
                            width="100%"
                            height="100%"
                            src={
                              testimonial.videoUrl.includes("watch?v=")
                                ? testimonial.videoUrl.replace(
                                    "watch?v=",
                                    "embed/"
                                  )
                                : testimonial.videoUrl
                            }
                            title="Video Testimonial"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <p className="font-bold text-[#E5E5E5] font-mono">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-[#E5E5E5]/50 font-mono">
                        {testimonial.designation || testimonial.title},{" "}
                        {testimonial.company}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#FF6B00]">
                      {testimonial.testimonialTitle}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#E5E5E5]/80 font-mono text-sm leading-relaxed"
                      >
                        {testimonial.complement || testimonial.testimonial}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
            {testimonials.map((_, i) => (
              <button
                key={`dot-${i}`}
                title={`Go to slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-[#FF6B00] w-6" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
