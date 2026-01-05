"use client";

import { motion } from "framer-motion";
import { Star, Users, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface AgentProps {
  name: string;
  role: string;
  rating: number;
  users: string;
  image: string;
  category: string;
}

export const AgentCard = ({
  name,
  role,
  rating,
  users,
  image,
  category,
}: AgentProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-[#121212] border border-white/10 rounded-2xl p-4 transition-all hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
    >
      {/* Category Tag */}
      <div className="absolute top-6 right-6 z-10">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium uppercase tracking-wider text-purple-400">
          {category}
        </span>
      </div>

      {/* Agent Image */}
      <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-1">{role}</p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <Star size={14} fill="currentColor" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Users size={14} />
              <span>{users}</span>
            </div>
          </div>

          <button className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500 group-hover:text-white transition-all">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
