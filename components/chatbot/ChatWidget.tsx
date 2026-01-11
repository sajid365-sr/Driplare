"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Mic,
  FileText,
  RotateCcw,
  ChevronDown,
  Sparkles,
  Volume2,
  StopCircle,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; content: string; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState(
    "Ask Driplare anything..."
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const starterQuestions = [
    {
      id: 1,
      label: "I want to create a custom AI chatbot",
      prompt:
        "Hi! I want to create a custom AI chatbot (for Customer Support or Sales) for my website. Can you guide me on the best way to deploy an agent with Driplare?",
    },
    {
      id: 2,
      label: "Automate my business workflows",
      prompt:
        "I want to replace manual processes with AI automation. How can Driplare help me implement workflow automation using tools like n8n or custom integrations?",
    },
    {
      id: 3,
      label: "I need AI consultancy for my company",
      prompt:
        "I am looking for strategic advice on AI adoption. Can you tell me about your AI Consultancy services and Readiness Assessments?",
    },
  ];
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

    const userMsg = { role: "user", content: text, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setInputPlaceholder("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text, userId: "guest_user" }),
      });
      const data = await res.json();
      const aiMsg = { role: "assistant", content: data.text, time: now };
      setMessages((prev) => [...prev, aiMsg]);
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // Height Fix: max-h-[80vh] ensures it never touches the header on small screens
            className="mb-20 fixed bottom-0 right-6 bg-white w-[360px] sm:w-[380px] h-[min(600px,80vh)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 z-40"
          >
            {/* --- HEADER --- */}
            <div className="px-5 py-3 flex justify-between items-center bg-white border-b border-gray-50">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800">Driplare</h2>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <>
                    <button
                      onClick={downloadChat}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download Chat"
                    >
                      <FileText size={18} />
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="New Chat"
                    >
                      <RotateCcw size={18} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            {/* --- CLEAR CONFIRM --- */}
            {showClearConfirm && (
              <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <RotateCcw className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Start fresh?
                </h3>
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
                    className="flex-1 py-2.5 font-semibold text-white bg-orange-600 rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-200 text-sm"
                  >
                    Clear Chat
                  </button>
                </div>
              </div>
            )}

            {/* --- CHAT BODY --- */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-2 
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 bg-white"
            >
              {/* Empty State */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center mt-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-orange-200 shadow-lg"
                  >
                    <Sparkles className="text-white" size={20} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Hello! 👋
                  </h3>
                  <p className="text-gray-500 text-center mb-6 text-sm px-4 leading-relaxed">
                    I'm ready to automate your workflow. How can I help?
                  </p>

                  <div className="w-full space-y-0">
                    {starterQuestions.map((q) => (
                      <button
                        onMouseEnter={() => setInputPlaceholder(q.prompt)}
                        onMouseLeave={() =>
                          setInputPlaceholder("Ask Driplare anything...")
                        }
                        key={q.id}
                        onClick={() => handleSendMessage(q.prompt)}
                        className="w-full flex items-center  gap-3 p-3.5 bg-white hover:bg-gray-100  rounded-sm text-left border-b-2 text-[13px] font-medium text-gray-700 transition-all group"
                      >
                        <ArrowUpRight />
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Bubbles */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  {msg?.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                      <Zap
                        size={12}
                        className="text-orange-500 fill-orange-500"
                      />
                      <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">
                        Driplare
                      </span>
                    </div>
                  )}

                  <div
                    className={`relative max-w-[90%] p-3.5 text-[14px] leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#FF6B2C] text-white rounded-2xl rounded-tr-none shadow-orange-100"
                        : "text-gray-700 bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none"
                    }`}
                  >
                    {msg?.content
                      .split(/(\*\*.*?\*\*)/g)
                      .map((part, index) =>
                        part.startsWith("**") ? (
                          <strong key={index}>{part.slice(2, -2)}</strong>
                        ) : (
                          part
                        )
                      )}
                  </div>

                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className="mt-1.5 ml-1 text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-1 text-[10px] font-medium"
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
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-gray-400 ml-1">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* --- INPUT AREA  --- */}
            <div className="p-5 pt-2 bg-white">
              {/* Outer Container for Border Effect */}
              <div className="relative bg-[#F9F9FB] rounded-[24px] px-4 py-3 border-2 border-gray-300 hover:border-gray-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-700  focus-within:hover:border-transparent focus-within:border-transparent transition-all duration-200 ease-in-out">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={inputPlaceholder}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-[14px] text-gray-800 placeholder-gray-500 resize-none h-[50px] p-0 custom-scrollbar leading-relaxed"
                />

                <div className="flex justify-between items-center mt-2">
                  {/* Left: Hint or Empty space */}
                  <span className="text-[10px] text-gray-400 font-medium">
                    Driplare AI
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Voice Button */}
                    <button
                      onClick={() => setIsListening(!isListening)}
                      className={`p-1.5 rounded-full transition-all ${isListening ? "text-red-500 bg-red-100 animate-pulse" : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"}`}
                    >
                      <Mic size={18} />
                    </button>

                    {/* Send Button */}
                    <button
                      onClick={() => handleSendMessage(input)}
                      disabled={!input.trim()}
                      className={`p-1.5 rounded-lg transition-all ${
                        input.trim()
                          ? "text-orange-600 hover:bg-orange-50"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-center text-[11px] text-gray-600 mt-2 font-medium">
                Driplare AI can make mistakes. Double-check replies.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FUTURISTIC TOGGLE BUTTON --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl z-50 group"
      >
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-600 animate-pulse opacity-80 blur-sm group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-white/20"></div>

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
                {/* Custom AI Icon combination */}
                <MessageSquare
                  size={28}
                  fill="currentColor"
                  className="opacity-100"
                />

                <Sparkles
                  size={14}
                  className="absolute -top-1 -right-1 text-yellow-200 animate-ping"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
