"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content:
      "Hello! I'm your AI Architect Assistant. I can help you book a technical discovery call. What type of project are you interested in?",
    timestamp: new Date(),
  },
];

const qualifyingQuestions = [
  "What's your industry or niche?",
  "What's your estimated budget range?",
  "What's your preferred timeline?",
];

export function AIAgentInteractive() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setAnswers((prev) => [...prev, inputValue]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      if (currentStep < qualifyingQuestions.length) {
        // Ask next question
        const nextQuestion = qualifyingQuestions[currentStep];
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: nextQuestion,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setCurrentStep((prev) => prev + 1);
      } else {
        // All questions answered, provide booking link
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Perfect! Based on your responses, I think we'd be a great fit. Would you like to book a technical discovery call?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setShowBooking(true);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-20 bg-[#F9F9F9] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #FF6B00 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #FF6B00 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-full font-mono text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              THE_INNOVATION_ZONE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4 font-montserrat">
              Meet Your AI Architect Assistant
            </h2>
            <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto font-montserrat">
              Our intelligent concierge will qualify your project and schedule a
              discovery call instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* AI Avatar Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#E5E5E5] shadow-xl">
                {/* Holographic Avatar with Breathing Animation */}
                <div className="relative mb-8">
                  <motion.div
                    className="w-32 h-32 mx-auto bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/5 rounded-full flex items-center justify-center relative overflow-hidden"
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 20px rgba(255, 107, 0, 0.3)",
                        "0 0 30px rgba(255, 107, 0, 0.5)",
                        "0 0 20px rgba(255, 107, 0, 0.3)",
                      ],
                    }}
                    transition={{
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      boxShadow: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {/* Animated rings */}
                    <motion.div
                      className="absolute inset-0 border-2 border-[#FF6B00]/30 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3],
                        rotate: 360,
                      }}
                      transition={{
                        scale: { duration: 3, repeat: Infinity },
                        opacity: { duration: 3, repeat: Infinity },
                        rotate: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                    <motion.div
                      className="absolute inset-2 border border-[#FF6B00]/20 rounded-full"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.05, 0.2],
                        rotate: -360,
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: 0.5 },
                        opacity: { duration: 2, repeat: Infinity, delay: 0.5 },
                        rotate: {
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />

                    {/* AI Icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Bot className="w-16 h-16 text-[#FF6B00]" />
                    </motion.div>
                  </motion.div>

                  {/* Status Indicator */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-[#0A0A0A] text-white px-3 py-1 rounded-full text-xs font-mono">
                      <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse"></div>
                      <span>ONLINE</span>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#0A0A0A] text-center mb-4">
                    Capabilities
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Project Qualification",
                      "Instant Scheduling",
                      "Technical Assessment",
                      "Email Integration",
                    ].map((capability, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                        <span className="text-sm text-[#0A0A0A]/70 font-mono">
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chat Interface - 3D Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
              style={{
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Chat Header */}
              <div className="bg-[#0A0A0A] text-white p-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-[#FF6B00]" />
                  <span className="font-bold">AI Architect Assistant</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                        message.type === "user"
                          ? "bg-[#FF6B00] text-white"
                          : "bg-[#F5F5F5] text-[#0A0A0A]"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block font-mono">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-[#F5F5F5] px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#0A0A0A]/40 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#0A0A0A]/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#0A0A0A]/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {!showBooking && (
                <div className="p-4 border-t border-[#E5E5E5]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your response..."
                      className="flex-1 px-4 py-2 border border-[#E5E5E5] rounded-full focus:outline-none focus:border-[#FF6B00] text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-full p-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-[#0A0A0A]/50 mt-2 font-mono">
                    Step {currentStep + 1} of {qualifyingQuestions.length + 1}
                  </p>
                </div>
              )}

              {/* Booking CTA */}
              {showBooking && (
                <div className="p-4 border-t border-[#E5E5E5] bg-gradient-to-r from-[#FF6B00]/5 to-[#FF6B00]/10">
                  <div className="text-center">
                    <h3 className="font-bold text-[#0A0A0A] mb-2">
                      Ready to Book Your Discovery Call?
                    </h3>
                    <p className="text-sm text-[#0A0A0A]/70 mb-4">
                      Based on your project details, we'd love to schedule a
                      technical discussion.
                    </p>
                    <Button
                      asChild
                      className="bg-[#FF6B00] hover:bg-[#FF6B00]/90"
                    >
                      <Link to="/contact" className="flex items-center gap-2">
                        Book Discovery Call
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
