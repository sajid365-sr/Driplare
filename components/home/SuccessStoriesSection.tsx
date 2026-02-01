"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Star,
    TrendingUp,
    Clock,
    ChevronLeft,
    ChevronRight,
    Quote,
    Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getReviews, type Testimonial } from "@/lib/review-action";
import Image from "next/image";

export function SuccessStoriesSection() {
    const { t } = useTranslation();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    useEffect(() => {
        if (testimonials.length > 0) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, 6000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [testimonials.length, activeIndex]);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        resetInterval();
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
        resetInterval();
    };

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 6000);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    if (loading) {
        return (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-center h-96">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("success.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("success.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("success.subtitle")}
                    </p>
                </motion.div>

                {/* Main Carousel */}
                <div className="max-w-6xl mx-auto relative">
                    <div className="relative min-h-[600px] md:min-h-[500px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                className="absolute inset-0"
                            >
                                <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
                                    {/* Left: Video/Image */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="relative"
                                    >
                                        <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl overflow-hidden border-2 border-border shadow-2xl">
                                            {/* Image */}
                                            <Image
                                                src={currentTestimonial.imageUrl}
                                                alt={currentTestimonial.name}
                                                fill
                                                className="object-cover"
                                                priority
                                            />

                                            {/* Video Play Button Overlay */}
                                            {currentTestimonial.videoUrl && (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm group cursor-pointer"
                                                        >
                                                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-primary/50 transition-all">
                                                                <Play
                                                                    className="w-10 h-10 text-primary-foreground ml-1"
                                                                    fill="currentColor"
                                                                />
                                                            </div>
                                                        </motion.button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden aspect-video border-none">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={
                                                                currentTestimonial.videoUrl.includes("watch?v=")
                                                                    ? currentTestimonial.videoUrl.replace(
                                                                        "watch?v=",
                                                                        "embed/"
                                                                    )
                                                                    : currentTestimonial.videoUrl.replace(
                                                                        "share/",
                                                                        "embed/"
                                                                    )
                                                            }
                                                            title={t("success.videoTitle")}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="w-full h-full"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            )}

                                            {/* Stats Badge (if no video) */}
                                            {!currentTestimonial.videoUrl && (
                                                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(currentTestimonial.rating || 5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="w-4 h-4 fill-current"
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Metrics Bar (Top of Image) */}
                                        {(currentTestimonial.timeSaved ||
                                            currentTestimonial.efficiencyGain) && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="absolute -top-6 left-0 right-0 flex justify-center gap-4"
                                                >
                                                    {currentTestimonial.timeSaved && (
                                                        <div className="bg-card border-2 border-border rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm">
                                                            <div className="flex items-center gap-2 text-primary">
                                                                <Clock className="w-4 h-4" />
                                                                <span className="text-sm font-bold">
                                                                    {currentTestimonial.timeSaved}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentTestimonial.efficiencyGain && (
                                                        <div className="bg-card border-2 border-border rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm">
                                                            <div className="flex items-center gap-2 text-accent">
                                                                <TrendingUp className="w-4 h-4" />
                                                                <span className="text-sm font-bold">
                                                                    {currentTestimonial.efficiencyGain}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                    </motion.div>

                                    {/* Right: Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Quote Icon */}
                                        <Quote className="w-12 h-12 text-primary/20" />

                                        {/* Testimonial Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                                            {currentTestimonial.testimonialTitle}
                                        </h3>

                                        {/* Testimonial Text */}
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            "{currentTestimonial.complement || currentTestimonial.testimonial}"
                                        </p>

                                        {/* Client Info */}
                                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                                                {currentTestimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">
                                                    {currentTestimonial.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {currentTestimonial.designation || currentTestimonial.title}
                                                    {" • "}
                                                    {currentTestimonial.company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 pt-2">
                                            {[...Array(currentTestimonial.rating || 5)].map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-5 h-5 text-accent fill-accent"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrev}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center hover:border-primary/50 transition-all shadow-lg"
                        >
                            <ChevronLeft className="w-6 h-6 text-foreground" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNext}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center hover:border-primary/50 transition-all shadow-lg"
                        >
                            <ChevronRight className="w-6 h-6 text-foreground" />
                        </motion.button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                title="button"
                                key={index}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                    resetInterval();
                                }}
                                className={`h-2 rounded-full transition-all ${index === activeIndex
                                    ? "bg-primary w-8"
                                    : "bg-border w-2 hover:bg-border/60"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mt-16"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        {(t("success.stats", { returnObjects: true }) as Array<{
                            value: string;
                            label: string;
                        }>).map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center bg-card border border-border rounded-2xl p-6"
                            >
                                <div className="text-3xl md:text-4xl font-black text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}