"use client";

import dynamic from "next/dynamic";

export interface AIAvatar3DProps {
  isSpeaking?: boolean;
  currentMessage?: string;
}

const AIAvatar3D = dynamic<AIAvatar3DProps>(() => import("./AIAvatar3DClient"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#FF6B00]/10 to-[#FF6B00]/5 rounded-lg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#0A0A0A]/70 font-mono">Loading Avatar...</p>
      </div>
    </div>
  ),
});

export default AIAvatar3D;
