// src/components/ClientReviewCard.tsx
import React, { useState } from "react";

interface ClientReviewCardProps {
  name: string;
  avatarUrl: string;
  rating: number; // e.g., 4.8
  shortReview: string;
  fullReview: string;
}

const ClientReviewCard: React.FC<ClientReviewCardProps> = ({
  name,
  avatarUrl,
  rating,
  shortReview,
  fullReview,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={avatarUrl}
            alt={`${name}'s avatar`}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {rating} ★
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {expanded ? fullReview : shortReview}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
};

export default ClientReviewCard;
