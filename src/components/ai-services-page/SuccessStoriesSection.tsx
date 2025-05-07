
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap } from "lucide-react";

const STORIES = [
  {
    id: "one",
    front: {
      icon: Users,
      headline: "Our AI agent cut support tickets by 40%",
      desc: "Client A",
    },
    back: {
      metric: 40,
      unit: "%",
      result: "Fewer support tickets/month"
    }
  },
  {
    id: "two",
    front: {
      icon: Zap,
      headline: "Automated reports saved 20 hours/month",
      desc: "Client B",
    },
    back: {
      metric: 20,
      unit: "hr",
      result: "saved per month"
    }
  }
];

export function SuccessStoriesSection() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-32 px-4 bg-transparent relative flex flex-col items-center">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-12 text-center">Success Stories</h3>
      <div className="flex flex-col md:flex-row gap-14 md:gap-12 justify-center items-center">
        {STORIES.map((story, idx) => (
          <div
            key={story.id}
            className="perspective-1000 w-[320px] h-[220px] cursor-pointer group"
            onClick={() => setFlipped(flipped === story.id ? null : story.id)}
          >
            <AnimatePresence initial={false}>
              <motion.div
                className="w-full h-full relative"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.66s ease",
                  transform: flipped === story.id
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)"
                }}
              >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#232544]/70 to-[#1EAEDB]/40 rounded-3xl flex flex-col items-center justify-center p-8 shadow-xl text-white z-20" style={{backfaceVisibility:"hidden"}}>
                  <story.front.icon size={48} className="mb-4 text-[#F88220]" />
                  <div className="font-bold text-lg mb-1 text-center">{story.front.headline}</div>
                  <div className="text-blue-100 text-base text-center">{story.front.desc}</div>
                  <span className="block mt-4 text-xs text-[#1eaedb] opacity-50">(click to see result)</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1EAEDB]/70 to-[#F88220]/60 rounded-3xl flex flex-col items-center justify-center text-white px-8 py-10 shadow-2xl z-30" style={{transform: "rotateY(180deg)", backfaceVisibility: "hidden"}}>
                  <div className="text-4xl font-extrabold text-[#fff] mb-2">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.18 }}
                    >
                      +{story.back.metric}{story.back.unit}
                    </motion.span>
                  </div>
                  <div className="font-semibold text-lg mb-1 text-white">{story.back.result}</div>
                  <span className="block mt-2 text-xs text-[#1EAEDB]">Client-reported impact</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
