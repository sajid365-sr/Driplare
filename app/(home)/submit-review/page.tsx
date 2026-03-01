"use client"

import { ReviewSubmissionForm } from "@/components/reviews/ReviewSubmissionForm";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";
import { Star, CheckCircle, Clock } from "lucide-react";

// export const metadata = {
//     title: "Submit a Review | Driplare",
//     description: "Share your experience working with Driplare. We'd love to hear your feedback!",
// };

export default function SubmitReviewPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* bg-effects */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.03} cellSize={44} style="dots" />
                <DarkGridBoost color={BRAND.violet} opacity={0.055} cellSize={44} />
                <GlowBlob
                    color={BRAND.violet}
                    position="top-left"
                    size={500}
                    opacity={0.05}
                    duration={22}
                />
                <GlowBlob
                    color={BRAND.blue}
                    position="bottom-right"
                    size={420}
                    opacity={0.04}
                    duration={26}
                    delay={8}
                />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-28 pb-12">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                              rounded-full px-3 py-1.5 mb-6">
                                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                                <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                                    Client Feedback
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-4">
                                Share Your Experience{" "}
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    with Driplare
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                We'd love to hear how we helped your business! Your feedback helps us improve
                                and shows potential clients what it's like to work with us.
                            </p>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-foreground mb-1">
                                        Published Within 24 Hours
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        We'll review and approve your testimonial quickly
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-foreground mb-1">
                                        Your Privacy Protected
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        We'll never share your email address publicly
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-foreground mb-1">
                                        Optional Photo & Video
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Add a personal touch with your photo or video testimonial
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
                            <ReviewSubmissionForm />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}