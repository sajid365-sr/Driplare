"use client";

export function EcosystemDiagram() {
    return (
        <svg
            viewBox="0 0 1200 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <defs>
                {/* Enhanced gradients for 3D depth */}
                <linearGradient id="purpleGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>

                <linearGradient id="blueGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>

                <linearGradient id="greenGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                <linearGradient id="cyanGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>

                {/* AI Center holographic gradient */}
                <radialGradient id="aiHolographic" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c4b5fd" stopOpacity="1" />
                    <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
                </radialGradient>

                {/* Animated pulse gradient */}
                <linearGradient id="pulseGradient3D">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0">
                        <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="30%" stopColor="#c4b5fd" stopOpacity="1">
                        <animate attributeName="offset" values="0.3;1.3" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="60%" stopColor="#a78bfa" stopOpacity="0">
                        <animate attributeName="offset" values="0.6;1.6" dur="2s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>

                {/* Glow filters */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Drop shadow for 3D depth */}
                <filter id="dropShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
                    <feOffset dx="0" dy="10" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Card reflection effect */}
                <linearGradient id="reflection" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Animated background particles */}
            <g opacity="0.15">
                {[...Array(20)].map((_, i) => (
                    <circle
                        key={i}
                        cx={150 + i * 50}
                        cy={100 + (i % 3) * 200}
                        r="2"
                        fill="#a78bfa"
                    >
                        <animate
                            attributeName="opacity"
                            values="0.1;0.6;0.1"
                            dur={`${2 + i * 0.3}s`}
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="cy"
                            values={`${100 + (i % 3) * 200};${80 + (i % 3) * 200};${100 + (i % 3) * 200}`}
                            dur={`${3 + i * 0.2}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}
            </g>

            {/* Connection Lines - Base Layer with Depth */}
            <g opacity="0.15">
                <path d="M 300 200 Q 420 260, 540 300" stroke="#7c3aed" strokeWidth="3" fill="none" />
                <path d="M 900 200 Q 780 260, 660 300" stroke="#3b82f6" strokeWidth="3" fill="none" />
                <path d="M 300 500 Q 420 440, 540 400" stroke="#10b981" strokeWidth="3" fill="none" />
                <path d="M 900 500 Q 780 440, 660 400" stroke="#06b6d4" strokeWidth="3" fill="none" />
            </g>

            {/* Animated Electric Pulses */}
            <g filter="url(#glow)">
                {/* Pulse 1: Top-left to center */}
                <path d="M 300 200 Q 420 260, 540 300" stroke="url(#pulseGradient3D)" strokeWidth="4" fill="none" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" values="0 400; 400 0" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" values="400; 0" dur="2.5s" repeatCount="indefinite" />
                </path>

                {/* Pulse 2: Top-right to center */}
                <path d="M 900 200 Q 780 260, 660 300" stroke="url(#pulseGradient3D)" strokeWidth="4" fill="none" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" values="0 400; 400 0" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" values="400; 0" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
                </path>

                {/* Pulse 3: Bottom-left to center */}
                <path d="M 300 500 Q 420 440, 540 400" stroke="url(#pulseGradient3D)" strokeWidth="4" fill="none" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" values="0 400; 400 0" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" values="400; 0" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                </path>

                {/* Pulse 4: Bottom-right to center */}
                <path d="M 900 500 Q 780 440, 660 400" stroke="url(#pulseGradient3D)" strokeWidth="4" fill="none" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" values="0 400; 400 0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-dashoffset" values="400; 0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                </path>
            </g>

            {/* 3D Isometric Cards - ENLARGED */}

            {/* AI Agents Card - Top Left */}
            <g transform="translate(140, 80)" filter="url(#dropShadow)">
                {/* Card back face (for 3D depth) */}
                <path d="M 0 25 L 12 12 L 237 12 L 225 25 Z" fill="#7c3aed" opacity="0.3" />
                <path d="M 237 12 L 237 192 L 225 205 L 225 25 Z" fill="#6d28d9" opacity="0.5" />

                {/* Main card face */}
                <rect width="225" height="180" rx="24" fill="url(#purpleGradient3D)" />

                {/* Reflection overlay */}
                <rect width="225" height="90" rx="24" fill="url(#reflection)" />

                {/* Icon container with glow */}
                <circle cx="112" cy="60" r="32" fill="white" opacity="0.2" filter="url(#glow)" />

                {/* Robot Icon - Enhanced */}
                <g transform="translate(92, 40)">
                    <rect x="10" y="15" width="24" height="30" rx="7" fill="white" opacity="0.95" />
                    <circle cx="17" cy="26" r="3" fill="#9333ea" />
                    <circle cx="27" cy="26" r="3" fill="#9333ea" />
                    <rect x="18" y="34" width="10" height="4" rx="2" fill="#9333ea" />
                    <rect x="14" y="10" width="4" height="7" rx="2" fill="white" opacity="0.95" />
                    <rect x="26" y="10" width="4" height="7" rx="2" fill="white" opacity="0.95" />
                </g>

                <text x="112" y="130" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">AI Agents</text>
            </g>

            {/* Workflow Automation Card - Top Right */}
            <g transform="translate(835, 80)" filter="url(#dropShadow)">
                <path d="M 0 25 L 12 12 L 237 12 L 225 25 Z" fill="#2563eb" opacity="0.3" />
                <path d="M 237 12 L 237 192 L 225 205 L 225 25 Z" fill="#1d4ed8" opacity="0.5" />

                <rect width="225" height="180" rx="24" fill="url(#blueGradient3D)" />
                <rect width="225" height="90" rx="24" fill="url(#reflection)" />

                <circle cx="112" cy="60" r="32" fill="white" opacity="0.2" filter="url(#glow)" />

                {/* Workflow network icon */}
                <g transform="translate(88, 42)" stroke="white" strokeWidth="3.5" fill="none" opacity="0.95">
                    <circle cx="0" cy="0" r="6" fill="white" />
                    <circle cx="24" cy="-10" r="6" fill="white" />
                    <circle cx="24" cy="10" r="6" fill="white" />
                    <circle cx="48" cy="0" r="6" fill="white" />
                    <line x1="6" y1="0" x2="18" y2="-10" strokeWidth="2.5" />
                    <line x1="6" y1="0" x2="18" y2="10" strokeWidth="2.5" />
                    <line x1="30" y1="-10" x2="42" y2="0" strokeWidth="2.5" />
                    <line x1="30" y1="10" x2="42" y2="0" strokeWidth="2.5" />
                </g>

                <text x="112" y="120" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">Workflow</text>
                <text x="112" y="140" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">Automation</text>
            </g>

            {/* Custom Dashboards Card - Bottom Left */}
            <g transform="translate(140, 440)" filter="url(#dropShadow)">
                <path d="M 0 25 L 12 12 L 237 12 L 225 25 Z" fill="#059669" opacity="0.3" />
                <path d="M 237 12 L 237 192 L 225 205 L 225 25 Z" fill="#047857" opacity="0.5" />

                <rect width="225" height="180" rx="24" fill="url(#greenGradient3D)" />
                <rect width="225" height="90" rx="24" fill="url(#reflection)" />

                <circle cx="112" cy="60" r="32" fill="white" opacity="0.2" filter="url(#glow)" />

                {/* Dashboard grid icon */}
                <g transform="translate(88, 38)" fill="white" opacity="0.95">
                    <rect x="0" y="0" width="20" height="20" rx="4" />
                    <rect x="25" y="0" width="20" height="20" rx="4" />
                    <rect x="0" y="25" width="20" height="20" rx="4" />
                    <rect x="25" y="25" width="20" height="20" rx="4" />
                </g>

                <text x="112" y="120" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">Custom</text>
                <text x="112" y="140" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">Dashboards</text>
            </g>

            {/* Tech Consulting Card - Bottom Right */}
            <g transform="translate(835, 440)" filter="url(#dropShadow)">
                <path d="M 0 25 L 12 12 L 237 12 L 225 25 Z" fill="#0891b2" opacity="0.3" />
                <path d="M 237 12 L 237 192 L 225 205 L 225 25 Z" fill="#0e7490" opacity="0.5" />

                <rect width="225" height="180" rx="24" fill="url(#cyanGradient3D)" />
                <rect width="225" height="90" rx="24" fill="url(#reflection)" />

                <circle cx="112" cy="60" r="32" fill="white" opacity="0.2" filter="url(#glow)" />

                {/* Lightbulb icon */}
                <g transform="translate(107, 38)">
                    <circle cx="0" cy="0" r="12" fill="white" opacity="0.95" />
                    <rect x="-4" y="12" width="8" height="10" rx="2" fill="white" opacity="0.95" />
                    <line x1="-14" y1="-5" x2="-18" y2="-5" stroke="white" strokeWidth="2.5" opacity="0.8" />
                    <line x1="14" y1="-5" x2="18" y2="-5" stroke="white" strokeWidth="2.5" opacity="0.8" />
                    <line x1="-10" y1="-12" x2="-13" y2="-16" stroke="white" strokeWidth="2.5" opacity="0.8" />
                    <line x1="10" y1="-12" x2="13" y2="-16" stroke="white" strokeWidth="2.5" opacity="0.8" />
                    <circle cx="0" cy="0" r="7" fill="#06b6d4" opacity="0.6" />
                </g>

                <text x="112" y="120" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">Tech</text>
                <text x="112" y="140" textAnchor="middle" fill="white" fontSize="17" fontWeight="700">Consulting</text>
            </g>

            {/* Center AI Hub - Enhanced 3D */}
            <g transform="translate(600, 350)">
                {/* Outer rotating ring */}
                <circle cx="0" cy="0" r="100" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.2" strokeDasharray="10 5">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 0 0"
                        to="360 0 0"
                        dur="20s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Pulsing glow layers */}
                <circle cx="0" cy="0" r="85" fill="url(#aiHolographic)" opacity="0.2" filter="url(#strongGlow)">
                    <animate attributeName="r" values="85;95;85" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
                </circle>

                <circle cx="0" cy="0" r="75" fill="url(#aiHolographic)" opacity="0.4" filter="url(#glow)">
                    <animate attributeName="r" values="75;80;75" dur="2.5s" repeatCount="indefinite" />
                </circle>

                {/* Main sphere - 3D effect with gradient */}
                <circle cx="0" cy="0" r="65" fill="url(#aiHolographic)" filter="url(#dropShadow)" />

                {/* Highlight for sphere depth */}
                <ellipse cx="-15" cy="-15" rx="25" ry="20" fill="white" opacity="0.3" />

                {/* Holographic scan lines */}
                <g opacity="0.2">
                    {[...Array(8)].map((_, i) => (
                        <line
                            key={i}
                            x1="-60"
                            y1={-50 + i * 15}
                            x2="60"
                            y2={-50 + i * 15}
                            stroke="white"
                            strokeWidth="0.5"
                        >
                            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                        </line>
                    ))}
                </g>

                {/* Floating particles around sphere */}
                <g>
                    {[0, 72, 144, 216, 288].map((angle, i) => {
                        const x = Math.cos((angle * Math.PI) / 180) * 50;
                        const y = Math.sin((angle * Math.PI) / 180) * 50;
                        return (
                            <circle key={i} cx={x} cy={y} r="3" fill="white" opacity="0.6">
                                <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from={`0 0 0`}
                                    to={`360 0 0`}
                                    dur="15s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        );
                    })}
                </g>

                {/* Speech bubble tail with 3D effect */}
                <path d="M 0 50 L -12 70 L 8 58 Z" fill="#a78bfa" opacity="0.95" />
                <path d="M 0 50 L -12 70 L -10 71 L 0 52 Z" fill="#8b5cf6" opacity="0.7" />

                {/* AI Text with enhanced glow */}
                <text
                    x="0"
                    y="18"
                    textAnchor="middle"
                    fill="white"
                    fontSize="52"
                    fontWeight="900"
                    filter="url(#strongGlow)"
                >
                    AI
                    <animate attributeName="opacity" values="1;0.75;1" dur="2s" repeatCount="indefinite" />
                </text>

                {/* Orbiting energy particles */}
                <g>
                    <circle cx="0" cy="-70" r="4" fill="#c4b5fd" filter="url(#glow)">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="0" cy="-70" r="4" fill="#a78bfa" filter="url(#glow)">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="180 0 0"
                            to="540 0 0"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </g>
        </svg>
    );
}