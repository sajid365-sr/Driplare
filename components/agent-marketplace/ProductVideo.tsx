"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

interface ProductVideoProps {
  videoUrl: string;
}

export default function ProductVideo({ videoUrl }: ProductVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop()?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="bg-gradient-to-br from-ai/10 to-driplare/10 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-3">See It In Action</h2>
            <p className="text-muted-foreground">
              Watch how this AI agent transforms customer conversations into sales
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ai/20 to-driplare/20" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-8 h-8 text-driplare ml-1" fill="currentColor" />
                </motion.div>
              </div>
            ) : (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}