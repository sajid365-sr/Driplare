"use client";

/**
 * AI Vibe Background Components
 * ─────────────────────────────────────────────────────────────────
 * Individual, fully-dynamic background primitives.
 * Import only what you need in each section.
 *
 * Available exports:
 *   <GridLayer />       — SVG grid lines
 *   <DarkGridBoost />   — Extra grid visibility in dark mode
 *   <GlowBlob />        — Single positioned glow orb
 *   <Particles />       — Floating animated dots
 *
 * Quick example:
 *   import { GridLayer, GlowBlob, Particles } from "@/components/ui/bg-effects";
 *
 *   <section className="relative overflow-hidden">
 *     <GridLayer color="#7c3aed" opacity={0.05} />
 *     <GlowBlob color="#7c3aed" position="top-left" opacity={0.12} size={500} />
 *     <GlowBlob color="#10b981" position="bottom-right" opacity={0.08} size={400} />
 *     <Particles colors={["#7c3aed", "#3b82f6"]} count={16} />
 *     <div className="relative z-10"> ...content... </div>
 *   </section>
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   BRAND COLOR TOKENS — use these as defaults across the app
   ═══════════════════════════════════════════════════════════════ */
export const BRAND = {
    violet: "#7c3aed",
    blue: "#3b82f6",
    emerald: "#10b981",
    red: "#ef4444",
    amber: "#f59e0b",
} as const;

/* ═══════════════════════════════════════════════════════════════
   1. GridLayer
   ═══════════════════════════════════════════════════════════════
   Props:
     color        — grid line color          default: BRAND.violet
     opacity      — light mode opacity       default: 0.04
     cellSize     — grid cell size in px     default: 48
     strokeWidth  — line thickness in px     default: 0.7
     style        — "lines" | "dots"         default: "lines"
   ═══════════════════════════════════════════════════════════════ */

interface GridLayerProps {
    color?: string;
    opacity?: number;
    cellSize?: number;
    strokeWidth?: number;
    style?: "lines" | "dots";
}

export function GridLayer({
    color = BRAND.violet,
    opacity = 0.04,
    cellSize = 48,
    strokeWidth = 0.7,
    style = "lines",
}: GridLayerProps) {
    const patternId = `grid-${color.replace("#", "")}-${cellSize}`;

    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id={patternId}
                        width={cellSize}
                        height={cellSize}
                        patternUnits="userSpaceOnUse"
                    >
                        {style === "lines" ? (
                            <path
                                d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                                fill="none"
                                stroke={color}
                                strokeWidth={strokeWidth}
                            />
                        ) : (
                            <circle
                                cx={cellSize / 16}
                                cy={cellSize / 16}
                                r={strokeWidth * 1.2}
                                fill={color}
                            />
                        )}
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   2. DarkGridBoost
   ═══════════════════════════════════════════════════════════════
   Same as GridLayer but only visible in dark mode.
   Layer this on top of GridLayer for auto dark-mode enhancement.

   Props: same as GridLayer
   ═══════════════════════════════════════════════════════════════ */

// interface DarkGridBoostProps extends GridLayerProps { }

export function DarkGridBoost({
    color = BRAND.violet,
    opacity = 0.05,
    cellSize = 48,
    strokeWidth = 0.8,
    style = "lines",
}: GridLayerProps) {
    const patternId = `dark-grid-${color.replace("#", "")}-${cellSize}`;

    return (
        <div className="absolute inset-0 pointer-events-none hidden dark:block" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id={patternId}
                        width={cellSize}
                        height={cellSize}
                        patternUnits="userSpaceOnUse"
                    >
                        {style === "lines" ? (
                            <path
                                d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                                fill="none"
                                stroke={color}
                                strokeWidth={strokeWidth}
                            />
                        ) : (
                            <circle
                                cx={cellSize / 16}
                                cy={cellSize / 16}
                                r={strokeWidth * 1.2}
                                fill={color}
                            />
                        )}
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   3. GlowBlob
   ═══════════════════════════════════════════════════════════════
   A single animated glow orb. Use multiple for layered effect.

   Props:
     color       — blob color                default: BRAND.violet
     position    — preset anchor             default: "top-left"
                   "top-left" | "top-right" | "top-center"
                   "bottom-left" | "bottom-right" | "bottom-center"
                   "center" | "left-center" | "right-center"
     size        — diameter in px            default: 500
     blur        — blur radius in px         default: 120
     opacity     — blob opacity              default: 0.07
     animate     — enable drift animation   default: true
     duration    — animation duration (s)   default: 18
     delay       — animation delay (s)      default: 0
     drift       — drift amount in px       default: 25
   ═══════════════════════════════════════════════════════════════ */

type BlobPosition =
    | "top-left" | "top-right" | "top-center"
    | "bottom-left" | "bottom-right" | "bottom-center"
    | "center" | "left-center" | "right-center";

interface GlowBlobProps {
    color?: string;
    position?: BlobPosition;
    size?: number;
    blur?: number;
    opacity?: number;
    animate?: boolean;
    duration?: number;
    delay?: number;
    drift?: number;
    index?: number;
}

const BLOB_POSITION_STYLES: Record<BlobPosition, React.CSSProperties> = {
    "top-left": { top: "-25%", left: "-15%" },
    "top-right": { top: "-25%", right: "-15%" },
    "top-center": { top: "-20%", left: "50%", transform: "translateX(-50%)" },
    "bottom-left": { bottom: "-25%", left: "-15%" },
    "bottom-right": { bottom: "-25%", right: "-15%" },
    "bottom-center": { bottom: "-20%", left: "50%", transform: "translateX(-50%)" },
    "center": { top: "50%", left: "30%", transform: "translate(-50%, -50%)" },
    "left-center": { top: "50%", left: "-15%", transform: "translateY(-50%)" },
    "right-center": { top: "50%", right: "-15%", transform: "translateY(-50%)" },
};

const BLOB_ANIMATE_DIRECTION: Record<BlobPosition, { x: number[]; y: number[] }> = {
    "top-left": { x: [0, 30, 0], y: [0, 20, 0] },
    "top-right": { x: [0, -30, 0], y: [0, 20, 0] },
    "top-center": { x: [0, 15, 0], y: [0, 25, 0] },
    "bottom-left": { x: [0, 25, 0], y: [0, -20, 0] },
    "bottom-right": { x: [0, -25, 0], y: [0, -20, 0] },
    "bottom-center": { x: [0, -15, 0], y: [0, -25, 0] },
    "center": { x: [0, 10, 0], y: [0, 10, 0] },
    "left-center": { x: [0, 20, 0], y: [0, -10, 0] },
    "right-center": { x: [0, -20, 0], y: [0, 10, 0] },
};

export function GlowBlob({
    color = BRAND.violet,
    position = "top-left",
    size = 500,
    blur = 120,
    opacity = 0.07,
    animate = true,
    duration = 18,
    delay = 0,
    drift = 25,
    index = 1,
}: GlowBlobProps) {
    const posStyle = BLOB_POSITION_STYLES[position];
    const dir = BLOB_ANIMATE_DIRECTION[position];

    const scaledDir = {
        x: dir.x.map((v) => (v === 0 ? 0 : (v / 25) * drift)),
        y: dir.y.map((v) => (v === 0 ? 0 : (v / 25) * drift)),
    };

    const baseStyle: React.CSSProperties = {
        ...posStyle,
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
        zIndex: index
    };

    if (!animate) {
        return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                <div style={baseStyle} />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <motion.div
                style={baseStyle}
                animate={{ x: scaledDir.x, y: scaledDir.y }}
                transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   4. Particles
   ═══════════════════════════════════════════════════════════════
   Floating dots — client-only (avoids SSR hydration mismatch).

   Props:
     colors    — array of dot colors        default: [violet, blue, emerald]
     count     — number of particles        default: 18
     minSize   — min dot diameter (px)      default: 1.2
     maxSize   — max dot diameter (px)      default: 3.5
     minOpacity — min pulse opacity         default: 0.1
     maxOpacity — max pulse opacity         default: 0.45
     speed      — animation speed factor   default: 1
                  (lower = slower, higher = faster)
   ═══════════════════════════════════════════════════════════════ */

interface ParticlesProps {
    colors?: string[];
    count?: number;
    minSize?: number;
    maxSize?: number;
    minOpacity?: number;
    maxOpacity?: number;
    speed?: number;
}

export function Particles({
    colors = [BRAND.violet, BRAND.blue, BRAND.emerald],
    count = 18,
    minSize = 1.2,
    maxSize = 3.5,
    minOpacity = 0.1,
    maxOpacity = 0.45,
    speed = 1,
}: ParticlesProps) {
    const [dots, setDots] = useState<
        Array<{
            x: number; y: number;
            size: number; delay: number; duration: number;
            color: string;
        }>
    >([]);

    useEffect(() => {
        setDots(
            Array.from({ length: count }, (_, i) => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * (maxSize - minSize) + minSize,
                delay: Math.random() * 6,
                duration: (Math.random() * 8 + 6) / speed,
                color: colors[i % colors.length],
            }))
        );
    }, [count, minSize, maxSize, speed]);

    if (dots.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {dots.map((dot, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: dot.size,
                        height: dot.size,
                        background: dot.color,
                    }}
                    animate={{ y: [-12, 12, -12], opacity: [minOpacity, maxOpacity, minOpacity] }}
                    transition={{
                        duration: dot.duration,
                        delay: dot.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   5. AccentLine
   ═══════════════════════════════════════════════════════════════
   A single vertical or horizontal gradient accent line.

   Props:
     color       — line color               default: BRAND.violet
     direction   — "vertical" | "horizontal" default: "vertical"
     position    — css left/right/top/bottom default: "left-[22%]"
     opacity     — line opacity              default: 0.12
   ═══════════════════════════════════════════════════════════════ */

interface AccentLineProps {
    color?: string;
    direction?: "vertical" | "horizontal";
    position?: string;
    opacity?: number;
}

export function AccentLine({
    color = BRAND.violet,
    direction = "vertical",
    position = "left-[22%]",
    opacity = 0.12,
}: AccentLineProps) {
    const isVertical = direction === "vertical";

    return (
        <div
            className={`absolute pointer-events-none ${position} ${isVertical ? "top-0 w-px h-full" : "left-0 h-px w-full"
                }`}
            style={{
                background: isVertical
                    ? `linear-gradient(to bottom, transparent, ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}, transparent)`
                    : `linear-gradient(to right, transparent, ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}, transparent)`,
            }}
            aria-hidden
        />
    );
}