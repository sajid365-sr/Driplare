import React from "react";
import { motion } from "framer-motion";
import { Zap, Volume2, StopCircle, Sparkles } from "lucide-react";

interface ChatMessageProps {
    message: {
        role: string;
        content: string;
        time: string;
    };
    isSpeaking: boolean;
    onSpeak: (text: string) => void;
    ctaConfig?: {
        content: string;
        buttonText: string;
        link: string;
    };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
    isSpeaking,
    onSpeak,
    ctaConfig,
}) => {
    // CTA Message
    if (message.role === "cta" && ctaConfig) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-lg"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold text-sm">Driplare</span>
                </div>
                <p className="font-bold mb-2">{message.content}</p>
                <a
                    href={ctaConfig.link}
                    className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors mt-3"
                >
                    {ctaConfig.buttonText}
                </a>
            </motion.div>
        );
    }

    // Regular Message
    return (
        <div
            className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
        >
            {message?.role === "assistant" && (
                <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                    <Zap size={12} className="text-primary fill-primary" />
                    <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">
                        Driplare
                    </span>
                </div>
            )}

            <div
                className={`relative max-w-[90%] p-3.5 text-[14px] leading-relaxed shadow-sm ${message.role === "user"
                    ? "bg-primary text-white rounded-2xl rounded-tr-none shadow-primary/10"
                    : "text-gray-700 bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none"
                    }`}
            >
                {message?.content
                    .split(/(\*\*.*?\*\*)/g)
                    .map((part, index) =>
                        part.startsWith("**") ? (
                            <strong key={index}>{part.slice(2, -2)}</strong>
                        ) : (
                            part
                        )
                    )}
            </div>

            {message.role === "assistant" && (
                <button
                    onClick={() => onSpeak(message.content)}
                    className="mt-1.5 ml-1 text-gray-600 hover:text-primary transition-colors flex items-center gap-1 text-[10px] font-medium"
                >
                    {isSpeaking ? (
                        <>
                            <StopCircle size={12} /> Stop
                        </>
                    ) : (
                        <>
                            <Volume2 size={12} /> Listen
                        </>
                    )}
                </button>
            )}
        </div>
    );
};