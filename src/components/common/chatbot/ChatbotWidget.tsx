
import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGeminiAPI } from "@/hooks/use-gemini-api";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadCapture, setLeadCapture] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi, I'm Driplare's AI assistant. How can I help you today?", isBot: true }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Get Gemini API key
  const { apiKey } = useGeminiAPI();
  const useGemini = Boolean(apiKey);

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
      data: formData
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
    
    // Clear input field
    const userQuery = userMessage;
    setUserMessage("");
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      let response: string;
      
      if (useGemini) {
        // Use Gemini API for response
        response = await getGeminiResponse(userQuery, messages);
      } else {
        // Use predefined responses as fallback
        response = getBotpressResponse(userQuery);
      }
      
      // Log the chat message
      const chatLog = {
        type: "message",
        timestamp: new Date().toISOString(),
        query: userQuery,
        response: response,
        useGemini
      };
      
      const logs = JSON.parse(localStorage.getItem("chat_logs") || "[]");
      logs.push(chatLog);
      localStorage.setItem("chat_logs", JSON.stringify(logs));
      
      // Add bot response with a slight delay to simulate typing
      setTimeout(() => {
        setMessages(prev => [...prev, { text: response, isBot: true }]);
        setIsTyping(false);
        
        // If this is a "default" response, trigger lead capture after 2 messages
        if (!useGemini && messages.filter(m => !m.isBot).length >= 1) {
          setTimeout(() => handleStartLeadCapture(), 1500);
        }
      }, 800);
    } catch (error) {
      console.error("Error getting bot response:", error);
      
      // Fallback to default response on error
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Sorry, I'm having trouble connecting. Let me take your contact info so someone can help you directly.", 
          isBot: true 
        }]);
        setIsTyping(false);
        setTimeout(() => handleStartLeadCapture(), 1500);
      }, 800);
    }
  };
  
  // Get response from Gemini API
  const getGeminiResponse = async (query: string, prevMessages: { text: string; isBot: boolean }[]): Promise<string> => {
    try {
      // In a real implementation, this would call the Gemini API
      // For now, we'll simulate a response with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Context-aware response simulation based on the query
      if (query.toLowerCase().includes("web design")) {
        return "Our web design services include responsive design, UX/UI optimization, and custom development. Would you like to see some examples of our work?";
      } else if (query.toLowerCase().includes("marketing")) {
        return "Driplare offers comprehensive digital marketing services including SEO, SEM, social media management, and content marketing. What specific marketing challenge are you facing?";
      } else if (query.toLowerCase().includes("ai") || query.toLowerCase().includes("artificial intelligence")) {
        return "Our AI services include chatbot development, natural language processing solutions, and AI integration with your existing systems. We specialize in making AI accessible and practical for businesses of all sizes.";
      } else if (query.toLowerCase().includes("price") || query.toLowerCase().includes("cost") || query.toLowerCase().includes("quote")) {
        return "Our pricing varies based on project scope and requirements. I'd be happy to collect your information so our team can prepare a custom quote for your specific needs.";
      } else {
        return "Thanks for your message. I can help with information about our web design, digital marketing, and AI services. Could you tell me more about what you're looking for?";
      }
      
      // In a real implementation:
      /*
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: query }]
            }
          ],
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        })
      });
      
      if (!response.ok) throw new Error('Gemini API call failed');
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
      */
    } catch (error) {
      console.error("Gemini API error:", error);
      // Fallback to default response
      return getBotpressResponse(query);
    }
  };
  
  // Get predefined response (simulating Botpress)
  const getBotpressResponse = (query: string): string => {
    // Simple pattern matching for demo purposes
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hello! How can I assist you with Driplare's services today?";
    } else if (lowerQuery.includes("web") || lowerQuery.includes("design")) {
      return "Our web design team creates beautiful, responsive websites tailored to your business needs. Would you like to know more?";
    } else if (lowerQuery.includes("marketing") || lowerQuery.includes("digital")) {
      return "Driplare offers full-service digital marketing solutions to help your business grow online.";
    } else if (lowerQuery.includes("ai") || lowerQuery.includes("artificial")) {
      return "We provide cutting-edge AI solutions including chatbots, automation, and data analysis.";
    } else if (lowerQuery.includes("pricing") || lowerQuery.includes("cost")) {
      return "Our pricing depends on your specific requirements. Would you like to speak with a team member about a quote?";
    } else {
      return "Thanks for your message. To better assist you, could you provide more details about what you're looking for?";
    }
  };
  
  // Handle predefined button clicks
  const handleQuickReply = (message: string) => {
    setUserMessage(message);
    handleSendMessage();
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-[#F88220] hover:bg-[#F88220]/90 p-0"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquare size={24} className="text-white" />
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
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <MessageSquare size={20} className="text-[#F88220]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Driplare Assistant</h3>
                <p className="text-xs text-white/80">
                  {useGemini ? "Powered by Google Gemini" : "Powered by Botpress"}
                </p>
              </div>
            </div>

            {/* Chat Content */}
            <div className="h-[400px] flex flex-col">
              {submitted ? (
                <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-bold mb-2">Thanks for chatting!</h3>
                  <p className="text-muted-foreground mb-6">
                    One of our representatives will get back to you soon.
                  </p>
                  <Button
                    onClick={() => {
                      setLeadCapture(false);
                      setSubmitted(false);
                      setMessages([{ text: "Hi, I'm Driplare's AI assistant. How can I help you today?", isBot: true }]);
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
                      <Button type="submit" className="w-full bg-[#F88220] hover:bg-[#F88220]/90">
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex-1 p-4 flex flex-col overflow-hidden">
                  <div className="overflow-y-auto flex-grow mb-4 space-y-3">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`${
                          msg.isBot
                            ? "bg-muted/30 text-foreground rounded-lg p-3 inline-block max-w-[80%]"
                            : "bg-[#F88220] text-white rounded-lg p-3 inline-block ml-auto max-w-[80%]"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="bg-muted/30 text-foreground rounded-lg p-3 inline-block max-w-[80%]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {messages.length === 1 && (
                    <div className="space-y-2 mb-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleQuickReply("Tell me about Web Design services")}
                      >
                        Tell me about Web Design services
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleQuickReply("I need help with Digital Marketing")}
                      >
                        I need help with Digital Marketing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleQuickReply("What AI Services do you offer?")}
                      >
                        What AI Services do you offer?
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleQuickReply("I'd like to see your portfolio")}
                      >
                        I'd like to see your portfolio
                      </Button>
                    </div>
                  )}

                  {/* Chat Input */}
                  <form onSubmit={handleSendMessage} className="mt-auto">
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
                        <MessageSquare size={20} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
