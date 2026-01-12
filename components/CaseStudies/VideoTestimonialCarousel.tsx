"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

// Media data (Images & Video URLs)
const mediaData: Record<string, { video: string; img: string }> = {
  "1": {
    video: "https://www.youtube.com/embed/jfKfPfyJRdk",
    img: "/lovable-uploads/12aceeaf-8272-46e5-9f9d-1638e57cba9a.png",
  },
  "2": {
    video: "https://www.youtube.com/watch?v=p5bUzGaqDh8",
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop",
  },
  "3": {
    video: "https://www.youtube.com/embed/jfKfPfyJRdk",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
  },
};

export function VideoTestimonialCarousel() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rawData = t("case_studies.testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(rawData) ? rawData : [];

  useEffect(() => {
    if (!isPaused && testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <div className="py-20 bg-[#0A0A0A] text-center text-white/20 font-mono">
        Loading Testimonials... (Check Path: case_studies.testimonials)
      </div>
    );
  }

  const activeTestimonial = testimonials[activeIndex];
  const currentMedia = mediaData[activeTestimonial?.id] || {
    video: "",
    img: "",
  };

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section
      className="py-20 bg-[#0A0A0A] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#FF6B00] mb-4">
            {t("case_studies.testimonials.heading")}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t("case_studies.testimonials.description")}
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video & Image Display */}
            <div className="lg:col-span-2">
              <div className="relative bg-[#1F1F1F] rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                <div className="aspect-video relative">
                  {currentMedia.img && (
                    <img
                      src={currentMedia.img}
                      alt={activeTestimonial?.name || "Client"}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {currentMedia.video && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="absolute inset-0 flex items-center justify-center group">
                          <div className="relative">
                            <motion.div
                              className="absolute inset-0 bg-[#FF6B00]/30 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <div className="bg-[#FF6B00] rounded-full p-6 relative z-10 group-hover:scale-110 transition-transform shadow-xl">
                              <Play className="w-8 h-8 text-white fill-current" />
                            </div>
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-4xl p-0 bg-black border-none overflow-hidden aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={
                            currentMedia.video.includes("watch?v=")
                              ? currentMedia.video.replace("watch?v=", "embed/")
                              : currentMedia.video
                          }
                          title="Testimonial Video"
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

            {/* Technical Info Panel */}
            <div className="space-y-6">
              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">
                  {t("case_studies.testimonials.technical_profile")}
                </h3>
                <div className="space-y-5 font-mono text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-white/30 text-[10px] uppercase tracking-widest">
                      {t("case_studies.testimonials.labels.project_type")}
                    </span>
                    <span className="text-[#FF6B00] font-bold text-base">
                      {activeTestimonial?.projectType}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/30 text-[10px] uppercase tracking-widest">
                      {t("case_studies.testimonials.labels.client_location")}
                    </span>
                    <span className="text-white font-bold text-base">
                      {activeTestimonial?.clientLocation}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/30 text-[10px] uppercase tracking-widest">
                      {t("case_studies.testimonials.labels.status")}
                    </span>
                    <span className="text-green-400 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      {t("case_studies.testimonials.labels.verified")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Name Card */}
              <div className="bg-[#1F1F1F] rounded-xl p-6 border border-white/5">
                <h4 className="font-bold text-white text-lg mb-1 italic">
                  {activeTestimonial?.name}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {activeTestimonial?.title}, <br />
                  <span className="text-white/80">
                    {activeTestimonial?.company}
                  </span>
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  className="flex-1 bg-white/5 hover:bg-[#FF6B00] border border-white/10 text-white p-4 rounded-xl transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 mx-auto" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex-1 bg-white/5 hover:bg-[#FF6B00] border border-white/10 text-white p-4 rounded-xl transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((item: any, index: number) => {
              const thumbMedia = mediaData[item?.id] || { img: "" };
              return (
                <button
                  key={item?.id || index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-500 ${
                    index === activeIndex
                      ? "border-[#FF6B00] scale-110 shadow-lg"
                      : "border-white/10 opacity-30 hover:opacity-100"
                  }`}
                >
                  {thumbMedia.img && (
                    <img
                      src={thumbMedia.img}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
