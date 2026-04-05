"use client";

export function AIAgentChatDemo() {
    return (
        <svg
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            <defs>
                {/* Gradients */}
                <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>

                <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>

                <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                {/* Filters */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="dropShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                    <feOffset dx="0" dy="8" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.25" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background Particles */}
            <g opacity="0.3">
                {[...Array(15)].map((_, i) => (
                    <circle
                        key={i}
                        cx={50 + i * 40}
                        cy={50 + (i % 4) * 150}
                        r="2"
                        fill="#7c3aed"
                    >
                        <animate
                            attributeName="opacity"
                            values="0.2;0.8;0.2"
                            dur={`${2 + i * 0.3}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}
            </g>

            {/* Phone/Chat Window - 3D Isometric */}
            <g transform="translate(150, 50)" filter="url(#dropShadow)">
                {/* Phone body - 3D depth */}
                <path
                    d="M 0 30 L 10 20 L 310 20 L 300 30 Z"
                    fill="#0f172a"
                    opacity="0.4"
                />
                <path
                    d="M 310 20 L 310 520 L 300 530 L 300 30 Z"
                    fill="#1e293b"
                    opacity="0.6"
                />

                {/* Main phone face */}
                <rect
                    width="300"
                    height="500"
                    rx="30"
                    fill="url(#phoneGradient)"
                    stroke="#334155"
                    strokeWidth="2"
                />

                {/* Screen glow */}
                <rect
                    x="10"
                    y="60"
                    width="280"
                    height="420"
                    rx="20"
                    fill="#1e293b"
                    opacity="0.5"
                    filter="url(#glow)"
                />

                {/* Status Bar */}
                <g opacity="0.6">
                    <text x="20" y="35" fontSize="10" fill="#94a3b8" fontWeight="600">
                        9:41
                    </text>
                    <circle cx="260" cy="32" r="3" fill="#10b981" />
                    <rect x="265" y="28" width="15" height="8" rx="2" fill="#94a3b8" />
                </g>

                {/* Chat Header */}
                <rect x="10" y="50" width="280" height="50" rx="20" fill="#1e293b" />
                <circle cx="30" cy="75" r="12" fill="url(#primaryGradient)" />
                <text x="50" y="73" fontSize="14" fill="white" fontWeight="700">
                    Driplare AI
                </text>
                <text x="50" y="87" fontSize="10" fill="#10b981" fontWeight="600">
                    ● Online
                </text>

                {/* Chat Messages Container */}
                <g>
                    {/* Customer Message 1 */}
                    <g opacity="0">
                        <rect
                            x="150"
                            y="120"
                            width="130"
                            height="50"
                            rx="16"
                            fill="#334155"
                        />
                        <text x="160" y="140" fontSize="11" fill="white">
                            Do you have the
                        </text>
                        <text x="160" y="155" fontSize="11" fill="white">
                            red sneakers in
                        </text>
                        <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.5s"
                            begin="0.5s"
                            fill="freeze"
                        />
                    </g>

                    {/* Customer Message 2 */}
                    <g opacity="0">
                        <rect
                            x="200"
                            y="180"
                            width="80"
                            height="35"
                            rx="16"
                            fill="#334155"
                        />
                        <text x="210" y="200" fontSize="11" fill="white">
                            size 42?
                        </text>
                        <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.5s"
                            begin="1s"
                            fill="freeze"
                        />
                    </g>

                    {/* Typing Indicator */}
                    <g opacity="0">
                        <rect
                            x="20"
                            y="230"
                            width="70"
                            height="35"
                            rx="16"
                            fill="url(#primaryGradient)"
                        />
                        <circle cx="40" cy="247.5" r="3" fill="white">
                            <animate
                                attributeName="opacity"
                                values="0.3;1;0.3"
                                dur="1s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle cx="55" cy="247.5" r="3" fill="white">
                            <animate
                                attributeName="opacity"
                                values="0.3;1;0.3"
                                dur="1s"
                                begin="0.2s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle cx="70" cy="247.5" r="3" fill="white">
                            <animate
                                attributeName="opacity"
                                values="0.3;1;0.3"
                                dur="1s"
                                begin="0.4s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.3s"
                            begin="1.5s"
                            fill="freeze"
                        />
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            dur="0.3s"
                            begin="3.5s"
                            fill="freeze"
                        />
                    </g>

                    {/* AI Response Message */}
                    <g opacity="0">
                        <rect
                            x="20"
                            y="230"
                            width="190"
                            height="80"
                            rx="16"
                            fill="url(#primaryGradient)"
                        />
                        <text x="30" y="250" fontSize="11" fill="white" fontWeight="600">
                            Yes! We have them in
                        </text>
                        <text x="30" y="265" fontSize="11" fill="white" fontWeight="600">
                            stock. Here's the product:
                        </text>

                        {/* Product Card */}
                        <rect
                            x="30"
                            y="275"
                            width="170"
                            height="25"
                            rx="8"
                            fill="white"
                            opacity="0.15"
                        />
                        <rect x="35" y="280" width="15" height="15" rx="4" fill="#ef4444" />
                        <text x="55" y="290" fontSize="9" fill="white" fontWeight="600">
                            Red Sneakers - ৳2,499
                        </text>
                        <text x="155" y="290" fontSize="8" fill="#10b981" fontWeight="700">
                            In Stock
                        </text>

                        <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.5s"
                            begin="4s"
                            fill="freeze"
                        />
                    </g>

                    {/* Customer Confirmation */}
                    <g opacity="0">
                        <rect
                            x="180"
                            y="325"
                            width="100"
                            height="35"
                            rx="16"
                            fill="#334155"
                        />
                        <text x="190" y="345" fontSize="11" fill="white">
                            Perfect! I'll take it
                        </text>
                        <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.5s"
                            begin="5s"
                            fill="freeze"
                        />
                    </g>

                    {/* AI Order Confirmation */}
                    <g opacity="0">
                        <rect
                            x="20"
                            y="375"
                            width="180"
                            height="90"
                            rx="16"
                            fill="url(#accentGradient)"
                        />

                        {/* Checkmark icon */}
                        <circle cx="40" cy="395" r="10" fill="white" opacity="0.3" />
                        <path
                            d="M 35 395 L 38 398 L 45 391"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />

                        <text x="55" y="398" fontSize="11" fill="white" fontWeight="700">
                            Order Confirmed! ✓
                        </text>
                        <text x="30" y="418" fontSize="9" fill="white" opacity="0.9">
                            Red Sneakers - Size 42
                        </text>
                        <text x="30" y="432" fontSize="9" fill="white" opacity="0.9">
                            Total: ৳2,499
                        </text>
                        <text x="30" y="446" fontSize="9" fill="white" opacity="0.9">
                            Delivery: 2-3 business days
                        </text>
                        <text x="30" y="458" fontSize="8" fill="white" opacity="0.7">
                            Saved to Google Sheets
                        </text>

                        <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.5s"
                            begin="6s"
                            fill="freeze"
                        />
                    </g>
                </g>

                {/* Input Field */}
                <rect
                    x="10"
                    y="480"
                    width="280"
                    height="40"
                    rx="20"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="1"
                />
                <text x="25" y="505" fontSize="12" fill="#64748b">
                    Type a message...
                </text>
                <circle cx="270" cy="500" r="12" fill="url(#primaryGradient)">
                    <animate
                        attributeName="opacity"
                        values="1;0.6;1"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>
                <path
                    d="M 267 500 L 273 500 L 270 496 Z"
                    fill="white"
                />
            </g>

            {/* Floating Feature Badges */}

            {/* Badge 1: AI Powered */}
            <g transform="translate(50, 150)" opacity="0">
                <rect
                    width="100"
                    height="40"
                    rx="12"
                    fill="#1e293b"
                    stroke="url(#primaryGradient)"
                    strokeWidth="2"
                />
                <circle cx="20" cy="20" r="8" fill="url(#primaryGradient)" />
                <path d="M 17 20 L 19 22 L 24 17" stroke="white" strokeWidth="1.5" fill="none" />
                <text x="32" y="18" fontSize="10" fill="white" fontWeight="700">
                    AI-Powered
                </text>
                <text x="32" y="28" fontSize="8" fill="#94a3b8">
                    Smart Replies
                </text>
                <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.5s"
                    begin="7s"
                    fill="freeze"
                />
            </g>

            {/* Badge 2: Auto-Save */}
            <g transform="translate(470, 200)" opacity="0">
                <rect
                    width="90"
                    height="40"
                    rx="12"
                    fill="#1e293b"
                    stroke="url(#accentGradient)"
                    strokeWidth="2"
                />
                <rect x="15" y="15" width="10" height="10" rx="2" fill="url(#accentGradient)" />
                <text x="30" y="23" fontSize="8" fill="white" fontWeight="700">
                    Auto-Save
                </text>
                <text x="30" y="32" fontSize="7" fill="#94a3b8">
                    To Sheets
                </text>
                <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.5s"
                    begin="7.5s"
                    fill="freeze"
                />
            </g>

            {/* Badge 3: 24/7 Active */}
            <g transform="translate(60, 450)" opacity="0">
                <rect
                    width="85"
                    height="40"
                    rx="12"
                    fill="#1e293b"
                    stroke="url(#secondaryGradient)"
                    strokeWidth="2"
                />
                <circle cx="20" cy="20" r="8" fill="url(#secondaryGradient)">
                    <animate
                        attributeName="opacity"
                        values="1;0.5;1"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>
                <text x="32" y="18" fontSize="8" fill="white" fontWeight="700">
                    24/7 Active
                </text>
                <text x="32" y="28" fontSize="7" fill="#10b981">
                    ● Online Now
                </text>
                <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.5s"
                    begin="8s"
                    fill="freeze"
                />
            </g>

            {/* Success Particles */}
            <g opacity="0">
                {[...Array(8)].map((_, i) => {
                    const angle = (i * 360) / 8;
                    const x = 300 + Math.cos((angle * Math.PI) / 180) * 60;
                    const y = 350 + Math.sin((angle * Math.PI) / 180) * 60;
                    return (
                        <circle key={i} cx={x} cy={y} r="3" fill="#10b981">
                            <animate
                                attributeName="r"
                                values="3;6;3"
                                dur="1s"
                                begin={`${6 + i * 0.1}s`}
                                fill="freeze"
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur="1s"
                                begin={`${6 + i * 0.1}s`}
                                fill="freeze"
                            />
                        </circle>
                    );
                })}
                <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.1s"
                    begin="6s"
                    fill="freeze"
                />
            </g>

            {/* Pulsing Glow Effect around phone */}
            <ellipse
                cx="300"
                cy="300"
                rx="180"
                ry="280"
                fill="none"
                stroke="url(#primaryGradient)"
                strokeWidth="2"
                opacity="0.1"
            >
                <animate
                    attributeName="opacity"
                    values="0.1;0.3;0.1"
                    dur="3s"
                    repeatCount="indefinite"
                />
            </ellipse>
        </svg>
    );
}