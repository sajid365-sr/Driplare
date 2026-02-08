"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    MessageSquare,
    RotateCcw,
    ChevronDown,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { getChatConfig } from "./chatbot-config";
import { ChatMessage } from "./ChatMessage";
import { ChatEmpty } from "./ChatEmpty";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

interface Message {
    role: string;
    content: string;
    time: string;
}

export default function ChatWidget() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [inputPlaceholder, setInputPlaceholder] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Get context-aware configuration
    const config = getChatConfig(pathname);

    // Set initial placeholder
    useEffect(() => {
        setInputPlaceholder(config.defaultPlaceholder);
    }, [config.defaultPlaceholder]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    // Focus Input
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Check if CTA should be shown
    const shouldShowCTA =
        config.ctaMessage &&
        messages.filter((m) => m.role === "user").length >= config.ctaMessage.trigger &&
        !messages.some((m) => m.content.includes(config.ctaMessage!.content));

    const downloadChat = () => {
        let content = "";
        messages.forEach((msg) => {
            content += `[${msg.role === "user" ? "User" : "Driplare AI"}]\n${msg.content}\n(${msg.time})\n\n`;
        });

        const element = document.createElement("a");
        const file = new Blob([content], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `driplare_chat_${Date.now()}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const clearChat = () => {
        setMessages([]);
        setShowClearConfirm(false);
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const handleSpeak = (text: string) => {
        window.speechSynthesis.cancel();
        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }
        const cleanText = text.replace(/\*/g, "").replace(/#/g, "");
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = "en-US";
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;
        const now = new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        const userMsg: Message = { role: "user", content: text, time: now };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setInputPlaceholder("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    message: text,
                    userId: "guest_user",
                    context: config.mode,
                    pathname: pathname,
                }),
            });
            const data = await res.json();
            const aiMsg: Message = { role: "assistant", content: data.text, time: now };
            setMessages((prev) => [...prev, aiMsg]);

            // Show CTA after threshold
            if (shouldShowCTA && config.ctaMessage) {
                setTimeout(() => {
                    const ctaMsg: Message = {
                        role: "cta",
                        content: config.ctaMessage!.content,
                        time: now,
                    };
                    setMessages((prev) => [...prev, ctaMsg]);
                }, 1500);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(input);
        }
    };

    // Expose method to open chat (for LiveDemoSection)
    useEffect(() => {
        // @ts-expect-error - window.openDriplareChat is not typed
        window.openDriplareChat = () => setIsOpen(true);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-20 fixed bottom-0 right-6 bg-white w-[360px] sm:w-[380px] h-[min(600px,80vh)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 z-40"
                    >


                        <ChatHeader
                            mode={config.mode}
                            hasMessages={messages.length > 0}
                            onDownload={downloadChat}
                            onClear={clearChat}
                            onClose={() => setIsOpen(false)}
                        />

                        {/* Context Banner */}
                        {config.bannerText && (
                            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-primary/20 px-4 py-2">
                                <p className="text-xs font-semibold text-center text-primary">
                                    {config.bannerText}
                                </p>
                            </div>
                        )}

                        {/* Clear Confirmation Modal */}
                        {showClearConfirm && (
                            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                    <RotateCcw className="text-primary" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Start fresh?</h3>
                                <p className="text-gray-500 mb-6 text-sm">
                                    This will clear your current conversation history.
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setShowClearConfirm(false)}
                                        className="flex-1 py-2.5 font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={clearChat}
                                        className="flex-1 py-2.5 font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 text-sm"
                                    >
                                        Clear Chat
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 bg-white"
                        >
                            {messages.length === 0 ? (
                                <ChatEmpty
                                    config={config}
                                    onQuestionClick={handleSendMessage}
                                    onQuestionHover={setInputPlaceholder}
                                    onQuestionLeave={() => setInputPlaceholder(config.defaultPlaceholder)}
                                />
                            ) : (
                                messages.map((msg, i) => (
                                    <ChatMessage
                                        key={i}
                                        message={msg}
                                        isSpeaking={isSpeaking}
                                        onSpeak={handleSpeak}
                                        ctaConfig={config.ctaMessage || undefined}
                                    />
                                ))
                            )}

                            {loading && (
                                <div className="flex items-center gap-2 text-gray-400 ml-1">
                                    <div className="flex space-x-1">
                                        {[0, 0.1, 0.2].map((delay, i) => (
                                            <div
                                                key={i}
                                                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                                style={{ animationDelay: `${delay}s` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <ChatInput

                            value={input}
                            placeholder={inputPlaceholder}
                            isListening={isListening}
                            onChange={setInput}
                            onSend={() => handleSendMessage(input)}
                            onKeyDown={handleKeyDown}
                            onToggleListening={() => setIsListening(!isListening)}
                            inputRef={inputRef}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-4 right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl z-50 group"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse opacity-80 blur-sm group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white/20"></div>

                <div className="relative z-10 text-white">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <ChevronDown size={32} strokeWidth={2.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <MessageSquare size={28} fill="currentColor" className="opacity-100" />
                                <Sparkles size={14} className="absolute -top-1 -right-1 text-yellow-200 animate-ping" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>
        </div>
    );
}