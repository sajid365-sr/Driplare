import React, { useState, useEffect, useRef } from "react";
import { BotMessageSquare, MessageSquareText, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGeminiAPI } from "@/hooks/use-gemini-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Volume2 } from "lucide-react";
import { useVoice } from "@/hooks/use-voice";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadCapture, setLeadCapture] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    {
      text: "Hi, I'm Driplare's AI assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Get Gemini API key
  const { apiKey, askGemini } = useGeminiAPI();
  const useGemini = Boolean(apiKey);

  // Auto-scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Automatically speak when a new bot message appears
  useEffect(() => {
    // Only speak the *newest* bot message
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.isBot && lastMsg.text && !isTyping) {
      speak(lastMsg.text);
    }
    // eslint-disable-next-line
  }, [messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your API
    console.log("Submitting lead:", formData);
    setSubmitted(true);

    // Log the lead capture
    const chatLog = {
      type: "lead",
      timestamp: new Date().toISOString(),
      data: formData,
    };

    const logs = JSON.parse(localStorage.getItem("chat_logs") || "[]");
    logs.push(chatLog);
    localStorage.setItem("chat_logs", JSON.stringify(logs));
  };

  // Simulating Botpress chat flow for demo
  const handleStartLeadCapture = () => {
    setLeadCapture(true);
  };

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: userMessage, isBot: false }]);
    const userQuery = userMessage;
    setUserMessage("");
    setIsTyping(true);

    try {
      // Always use Gemini API for response
      const response = await askGemini(userQuery, [...messages, { text: userQuery, isBot: false }]);
      // Log the chat message (unchanged storage logic)
      const chatLog = {
        type: "message",
        timestamp: new Date().toISOString(),
        query: userQuery,
        response: response,
        useGemini: true,
      };
      const logs = JSON.parse(localStorage.getItem("chat_logs") || "[]");
      logs.push(chatLog);
      localStorage.setItem("chat_logs", JSON.stringify(logs));

      setTimeout(() => {
        setMessages((prev) => [...prev, { text: response, isBot: true }]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Error getting bot response:", error);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I'm having trouble connecting. Please try again later.",
            isBot: true,
          },
        ]);
        setIsTyping(false);
      }, 800);
    }
  };

  // Handle predefined button clicks
  const handleQuickReply = (message: string) => {
    setUserMessage(message);
    handleSendMessage();
  };

  // Add voice input handler
  const { isListening, startListening, stopListening, isSpeaking, speak } = useVoice();
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        setUserMessage(transcript);
        // Optional: auto-send after capture; if required, call handleSendMessage()
      });
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={handleToggle}
        className="fixed bottom-10 right-5 z-40 rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-[#F88220] hover:bg-[#F88220]/90"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <BotMessageSquare size={30} className="text-white w-12 h-12" />
        )}
      </Button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[340px] md:w-[380px] bg-card shadow-xl rounded-xl overflow-hidden border border-border"
          >
            {/* Chat Header */}
            <div className="bg-[#F88220] p-4 flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <MessageSquareText size={20} className="text-[#F88220]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Driplare Assistant</h3>
                <p className="text-xs text-white/80">
                  {useGemini
                    ? "Powered by Google Gemini"
                    : "Powered by Botpress"}
                </p>
              </div>
            </div>

            {/* Chat Content */}
            <div className="h-[400px] flex flex-col">
              {submitted ? (
                <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-bold mb-2">
                    Thanks for chatting!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    One of our representatives will get back to you soon.
                  </p>
                  <Button
                    onClick={() => {
                      setLeadCapture(false);
                      setSubmitted(false);
                      setMessages([
                        {
                          text: "Hi, I'm Driplare's AI assistant. How can I help you today?",
                          isBot: true,
                        },
                      ]);
                    }}
                    variant="outline"
                  >
                    Start New Chat
                  </Button>
                </div>
              ) : leadCapture ? (
                <div className="flex-1 p-4">
                  <div className="bg-muted/30 p-3 rounded-lg inline-block mb-4 max-w-[80%]">
                    <p className="text-sm">
                      Great! To help you better, could you please provide your
                      name and email?
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full p-2 mt-1 bg-background border border-border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full p-2 mt-1 bg-background border border-border rounded-md"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#F88220] hover:bg-[#F88220]/90"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex-1 p-4 flex flex-col overflow-hidden">
                  <ScrollArea className="overflow-y-auto flex-grow mb-4 pr-2">
                    <div className="space-y-3">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`${
                            msg.isBot
                              ? "bg-muted/30 text-foreground rounded-lg p-3 inline-block max-w-[80%]"
                              : "bg-[#F88220] text-white rounded-lg p-3 inline-block ml-auto max-w-[80%]"
                          }`}
                          style={{ position: "relative" }}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="bg-muted/30 text-foreground rounded-lg p-3 inline-block max-w-[80%]">
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      )}
                      <div ref={messageEndRef} />
                    </div>
                  </ScrollArea>

                  {messages.length === 1 && (
                    <div className="space-y-2 mb-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleQuickReply("Tell me about Web Design services")
                        }
                      >
                        Tell me about Web Design services
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleQuickReply("I need help with Digital Marketing")
                        }
                      >
                        I need help with Digital Marketing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleQuickReply("What AI Services do you offer?")
                        }
                      >
                        What AI Services do you offer?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleQuickReply("I'd like to see your portfolio")
                        }
                      >
                        I'd like to see your portfolio
                      </Button>
                    </div>
                  )}

                  {/* Chat Input */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className={`rounded-full p-2 ${isListening ? "bg-primary text-white" : "bg-secondary text-primary"}`}
                      title={isListening ? "Stop Recording" : "Record Voice"}
                    >
                      <Mic size={20} />
                    </button>
                    <form onSubmit={handleSendMessage} className="flex-1">
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={userMessage}
                          onChange={(e) => setUserMessage(e.target.value)}
                          className="flex-1 bg-background border border-border rounded-l-md p-2 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-[#F88220] text-white p-2 rounded-r-md"
                          disabled={!userMessage.trim()}
                        >
                          <MessageSquareText size={20} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
