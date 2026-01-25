"use client";

import React from "react";
import Image from "next/image";
import { PlayCircle, ImageIcon } from "lucide-react";

interface MediaGalleryProps {
  videoUrl?: string;
  mainImage: string;
  gallery: string[];
  agentName: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ videoUrl, mainImage, gallery, agentName }) => {
  
  // YouTube ID Extract করার ফাংশন
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const allImages = [mainImage, ...gallery].filter(Boolean);

  return (
    <div className="space-y-12">
      {/* ১. ভিডিও সেকশন */}
      {videoUrl && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold italic uppercase tracking-wider">
            <PlayCircle className="text-blue-600" size={20} />
            <span>Agent Demo Video</span>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}`}
              title={`${agentName} Demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ২. ইমেজ গ্যালারি সেকশন */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold italic uppercase tracking-wider">
          <ImageIcon className="text-blue-600" size={20} />
          <span>Product Screenshots</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-shadow group ${
                idx === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-video"
              }`}
            >
              <Image
                src={img}
                alt={`${agentName} ${idx === 0 ? 'Main' : 'Gallery'} Image`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {idx === 0 && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;