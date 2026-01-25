"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface ProductTestimonialProps {
  currentLang: "en" | "bn";
}

export default function ProductTestimonial({ currentLang }: ProductTestimonialProps) {
  // Testimonials in both languages
  const testimonials = {
    en: {
      name: "Rafiq Ahmed",
      business: "Fashion Store Owner",
      review: "This AI agent changed everything for my business. I used to spend 6 hours daily just replying to Facebook messages. Now it handles everything automatically and I get all orders neatly organized in my Google Sheet. My sales increased by 40% in the first month!",
      image: "https://ui-avatars.com/api/?name=Rafiq+Ahmed&background=3b82f6&color=fff"
    },
    bn: {
      name: "রফিক আহমেদ",
      business: "ফ্যাশন স্টোর মালিক",
      review: "এই এআই এজেন্ট আমার ব্যবসায় সবকিছু বদলে দিয়েছে। আমি প্রতিদিন ৬ ঘণ্টা শুধু ফেসবুক মেসেজের উত্তর দিতাম। এখন এটি সব কিছু স্বয়ংক্রিয়ভাবে পরিচালনা করে এবং আমি আমার গুগল শিটে সুন্দরভাবে সাজানো সব অর্ডার পাই। প্রথম মাসেই আমার বিক্রয় ৪০% বৃদ্ধি পেয়েছে!",
      image: "https://ui-avatars.com/api/?name=Rafiq+Ahmed&background=3b82f6&color=fff"
    }
  };

  const testimonial = testimonials[currentLang];

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-trust/5 to-ai/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Quote */}
          <Quote className="absolute top-6 right-6 w-16 h-16 text-ai/10" />
          
          <div className="relative">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              "{testimonial.review}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.business}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}