'use client'

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  title: string;
  context: string;
  problem: string;
  solution: string;
  result: string;
  techTags: string[];
  imageUrl: string;
  category: string;
  delay?: number;
}

export function CaseStudyCard({
  title,
  context,
  problem,
  solution,
  result,
  techTags,
  imageUrl,
  category,
  delay = 0
}: CaseStudyCardProps) {
  return (
    <motion.div
      className="group bg-white/80 backdrop-blur-lg border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#FF6B00] transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Visual */}
        <div className="relative bg-[#F5F5F5] p-8 flex items-center justify-center min-h-[300px]">
          {/* Technical Schematic Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <pattern id={`grid-${title.replace(/\s+/g, '-').toLowerCase()}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E5E5" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${title.replace(/\s+/g, '-').toLowerCase()})`} />

              {/* Circuit paths */}
              <path
                d="M50,50 L150,50 L150,100 L250,100 L250,150 L350,150"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="2"
                opacity="0.6"
              />
              <circle cx="50" cy="50" r="4" fill="#FF6B00" opacity="0.8"/>
              <circle cx="150" cy="50" r="4" fill="#FF6B00" opacity="0.8"/>
              <circle cx="250" cy="100" r="4" fill="#FF6B00" opacity="0.8"/>
              <circle cx="350" cy="150" r="4" fill="#FF6B00" opacity="0.8"/>
            </svg>
          </div>

          {/* Project Image/Icon */}
          <div className="relative z-10">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-48 h-32 object-contain filter grayscale-[80%] contrast-125"
              />
            ) : (
              <div className="w-48 h-32 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                <div className="text-6xl text-[#FF6B00] opacity-50">⚡</div>
              </div>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-[#0A0A0A] text-white border-[#FF6B00] font-mono text-xs">
              {category}
            </Badge>
          </div>
        </div>

        {/* Right Side - Data */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">{title}</h3>
          <p className="text-[#0A0A0A]/60 font-mono text-sm mb-6">{context}</p>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-bold text-[#0A0A0A] mb-2">THE PROBLEM</h4>
              <p className="text-[#0A0A0A]/70 text-sm leading-relaxed">{problem}</p>
            </div>

            <div>
              <h4 className="font-bold text-[#0A0A0A] mb-2">THE SOLUTION</h4>
              <p className="text-[#0A0A0A]/70 text-sm leading-relaxed">{solution}</p>
            </div>

            <div className="bg-[#FF6B00]/5 border border-[#FF6B00]/20 rounded-lg p-4">
              <h4 className="font-bold text-[#FF6B00] mb-2">THE RESULT</h4>
              <p className="text-[#FF6B00] font-mono text-lg font-bold">{result}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-bold text-[#0A0A0A] mb-3">TECH_STACK</h4>
            <div className="flex flex-wrap gap-2">
              {techTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-[#E5E5E5] text-[#0A0A0A] font-mono text-xs hover:bg-[#FF6B00] hover:text-white transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
