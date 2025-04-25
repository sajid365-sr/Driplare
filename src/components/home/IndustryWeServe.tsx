// src/components/ui/IndustryWeServe.tsx
import React from "react";

const industries = [
  "AI",
  "Healthcare",
  "Finance",
  "eCommerce",
  "Education",
  "SaaS",
  "Real Estate",
  "Logistics",
  "Travel & Hospitality",
  "Legal",
  "Airlines",
  "Telecom",
  "Agritech",
];

export default function IndustryWeServe() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 bg-gradient-to-br from-purple-600 to-purple-400 rounded-3xl p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
          Industries We Are Serving
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <span
              key={industry}
              className="px-4 py-2 text-white bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm sm:text-base hover:bg-opacity-30 transition"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
