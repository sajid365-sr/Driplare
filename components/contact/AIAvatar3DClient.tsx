"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import type { Mesh } from "three";

interface AIAvatar3DProps {
  isSpeaking?: boolean;
  currentMessage?: string;
}

const FemaleAvatar = ({ isSpeaking }: { isSpeaking: boolean }) => {
  const headRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const hairRef = useRef<Mesh>(null);
  const leftEyeRef = useRef<Mesh>(null);
  const rightEyeRef = useRef<Mesh>(null);
  const mouthRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Gentle breathing animation
    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(time * 0.5) * 0.02;
    }

    // Head slight movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      headRef.current.position.y = Math.sin(time * 0.4) * 0.05;
    }

    // Blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 2) > 0.9 ? 0.1 : 1;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
    }

    // Speaking animation - mouth movement
    if (mouthRef.current && isSpeaking) {
      mouthRef.current.scale.y = 0.3 + Math.sin(time * 8) * 0.2;
    } else if (mouthRef.current) {
      mouthRef.current.scale.y = 0.2;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Hair */}
      <mesh ref={hairRef} position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#2C1810" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#F4D1AE" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Left Eye */}
      <mesh ref={leftEyeRef} position={[-0.15, 1.6, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.15, 1.6, 0.45]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Right Eye */}
      <mesh ref={rightEyeRef} position={[0.15, 1.6, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.45]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, 1.4, 0.4]}>
        <boxGeometry args={[0.15, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Body/Torso */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#FF6B00" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.6, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#F4D1AE" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#F4D1AE" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Glow effect when speaking */}
      {isSpeaking && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#FF6B00"
            transparent
            opacity={0.2}
            emissive="#FF6B00"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

const AvatarScene = ({ isSpeaking }: { isSpeaking: boolean }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 3], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={50} />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#FF6B00" />
      <FemaleAvatar isSpeaking={isSpeaking} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="sunset" />
    </Canvas>
  );
};

const AIAvatar3DClient = ({
  isSpeaking = false,
  currentMessage,
}: AIAvatar3DProps) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMounted(true);
    synthRef.current = window.speechSynthesis;

    const loadVoices = () => {
      synthRef.current?.getVoices();
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (!currentMessage) return;
    if (!isVoiceEnabled) return;
    if (!synthRef.current) return;

    if (utteranceRef.current) synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(currentMessage);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    const voices = synthRef.current.getVoices();
    const femaleVoice =
      voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("samantha") ||
          voice.name.toLowerCase().includes("karen") ||
          voice.name.toLowerCase().includes("susan") ||
          voice.name.toLowerCase().includes("hazel")
      ) ?? voices.find((voice) => voice.lang.startsWith("en"));

    if (femaleVoice) utterance.voice = femaleVoice;

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);

    return () => {
      synthRef.current?.cancel();
    };
  }, [currentMessage, isMounted, isVoiceEnabled]);

  const handleToggleVoice = () => {
    setIsVoiceEnabled((prev) => !prev);
    if (synthRef.current && isVoiceEnabled) synthRef.current.cancel();
  };

  if (!isMounted) {
    return (
      <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#FF6B00]/10 to-[#FF6B00]/5 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#0A0A0A]/70 font-mono">Loading Avatar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF6B00]/10 to-[#FF6B00]/5 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#0A0A0A]/70 font-mono">Loading Avatar...</p>
            </div>
          </div>
        }
      >
        <AvatarScene isSpeaking={isSpeaking} />
      </Suspense>

      <button
        onClick={handleToggleVoice}
        className="absolute bottom-4 right-4 bg-[#0A0A0A] text-white px-3 py-2 rounded-full text-xs font-mono flex items-center gap-2 hover:bg-[#FF6B00] transition-colors z-10"
        aria-label={isVoiceEnabled ? "Disable voice" : "Enable voice"}
      >
        <span aria-hidden="true">{isVoiceEnabled ? "🔊" : "🔇"}</span>
        <span>{isVoiceEnabled ? "Voice ON" : "Voice OFF"}</span>
      </button>
    </div>
  );
};

export default AIAvatar3DClient;
