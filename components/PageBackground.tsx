"use client";

/**
 * PageBackground
 * ─────────────────────────────────────────────────────────────────
 * Unified AI-vibe background for service pages.
 * Wrap once in page.tsx — all sections inherit the design.
 *
 * Usage:
 *   <PageBackground variant="violet">
 *     <HeroSection />
 *     <ProblemSection />
 *     ...
 *   </PageBackground>
 *
 * Variants:
 *   "violet"   → AI Consulting, AI Agents
 *   "blue"     → Workflow Automation
 *   "emerald"  → Web Development
 */

import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

type Variant = "violet" | "blue" | "emerald";

// Inline styles — never purged by Tailwind, always applied correctly
const VARIANT_STYLES: Record<Variant, { a: string; b: string; c: string; grid: string }> = {
    violet: {
        a: "#7c3aed",
        b: "#3b82f6",
        c: "#10b981",
        grid: "hsl(262, 83%, 58%)",
    },
    blue: {
        a: "#3b82f6",
        b: "#10b981",
        c: "#7c3aed",
        grid: "hsl(217, 91%, 60%)",
    },
    emerald: {
        a: "#10b981",
        b: "#7c3aed",
        c: "#3b82f6",
        grid: "hsl(160, 84%, 39%)",
    },
};

/* ─── SVG Grid — absolute, not fixed ─── */
function GridLayer({ colors }: { colors: typeof VARIANT_STYLES[Variant] }) {
    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.5 }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="page-bg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path
                            d="M 48 0 L 0 0 0 48"
                            fill="none"
                            stroke={colors.grid}
                            strokeWidth="0.7"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#page-bg-grid)" />
            </svg>

            {/* Subtle vertical accent lines */}
            <div
                className="absolute top-0 left-[22%] w-px h-full"
                style={{
                    background: `linear-gradient(to bottom, transparent, ${colors.a}18, transparent)`,
                }}
            />
            <div
                className="absolute top-0 right-[18%] w-px h-full"
                style={{
                    background: `linear-gradient(to bottom, transparent, ${colors.b}14, transparent)`,
                }}
            />
        </div>
    );
}

/* ─── Glow blobs — absolute, using inline styles for color ─── */
function GlowBlobs({ colors }: { colors: typeof VARIANT_STYLES[Variant] }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {/* Top-left */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    top: "-200px",
                    left: "-200px",
                    width: "600px",
                    height: "600px",
                    background: colors.a,
                    opacity: 0.5,
                    filter: "blur(130px)",
                }}
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Bottom-right */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    bottom: "-180px",
                    right: "-180px",
                    width: "550px",
                    height: "550px",
                    background: colors.b,
                    opacity: 0.06,
                    filter: "blur(120px)",
                }}
                animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />

            {/* Center — very subtle */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "500px",
                    height: "500px",
                    background: colors.c,
                    opacity: 0.04,
                    filter: "blur(110px)",
                }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 7 }}
            />
        </div>
    );
}

/* ─── Floating particles — client-only (avoids SSR hydration mismatch) ─── */
function Particles({ colors }: { colors: typeof VARIANT_STYLES[Variant] }) {
    const [dots, setDots] = useState<
        Array<{
            x: number; y: number;
            size: number; delay: number; duration: number;
            color: string;
        }>
    >([]);

    useEffect(() => {
        const palette = [colors.a, colors.b, colors.c];
        setDots(
            Array.from({ length: 20 }, (_, i) => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2.5 + 1.2,
                delay: Math.random() * 6,
                duration: Math.random() * 8 + 7,
                color: palette[i % 3],
            }))
        );
    }, []);

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
                    animate={{ y: [-12, 12, -12], opacity: [0.12, 0.4, 0.12] }}
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

/* ─── Dark mode grid opacity booster ─── */
function DarkGridBoost({ colors }: { colors: typeof VARIANT_STYLES[Variant] }) {
    return (
        <div className="absolute inset-0 pointer-events-none hidden dark:block" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.045 }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="page-bg-grid-dark" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path
                            d="M 48 0 L 0 0 0 48"
                            fill="none"
                            stroke={colors.grid}
                            strokeWidth="0.8"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#page-bg-grid-dark)" />
            </svg>
        </div>
    );
}

/* ─── Main export ─── */
interface PageBackgroundProps {
    children: ReactNode;
    variant?: Variant;
    className?: string;
}

export function PageBackground({
    children,
    variant = "violet",
    className = "",
}: PageBackgroundProps) {
    const colors = VARIANT_STYLES[variant];

    return (
        <div
            className={`relative bg-background dark:bg-[#0a0a12] ${className}`}
            style={{ isolation: "isolate" }}
        >
            {/* ── Background layers (absolute, scroll with page) ── */}
            <GridLayer colors={colors} />
            <DarkGridBoost colors={colors} />
            <GlowBlobs colors={colors} />
            <Particles colors={colors} />

            {/* ── Page content ── */}
            <div className="relative" style={{ zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}