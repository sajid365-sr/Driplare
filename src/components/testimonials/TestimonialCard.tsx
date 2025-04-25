// src/pages/Testimonials.tsx
import React from "react";
import ClientReviewCard from "./ClientReviewCard";

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ClientReviewCard
            name="Jane Doe"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            rating={4.8}
            shortReview="Driplare transformed our business with their AI solutions..."
            fullReview="Driplare transformed our business with their AI solutions. Their team was professional, responsive, and delivered beyond our expectations. We saw a significant increase in efficiency and customer satisfaction."
          />
          {/* Add more ClientReviewCard components as needed */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
