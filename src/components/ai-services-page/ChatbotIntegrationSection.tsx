
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function ChatbotIntegrationSection() {
  const [demoMode, setDemoMode] = useState(false);
  
  const handleShowDemo = () => {
    setDemoMode(true);
  };

  return (
    <section id="chatbot" className="relative py-20 md:py-28 bg-transparent flex flex-col md:flex-row items-center container mx-auto gap-10 md:gap-2">
      {/* Left column: text */}
      <motion.div
        className="flex-1 max-w-xl"
        initial={{ opacity: 0, x: -64 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <h3 className="text-2xl md:text-3xl font-extrabold mb-5">AI Chatbot Integration</h3>
        <p className="text-lg text-blue-100 mb-5">
          Deploy chatbots that understand context with NLP.<br /> <span className="text-[#1eaedb]">Quick replies</span>, FAQ automation, omni-channel support.
        </p>
        <div className="text-base text-blue-200 opacity-90 mb-3">
          {demoMode ? "Chat with our demo bot below:" : "See it in action"}
        </div>
        {/* Interactive demo button */}
        {!demoMode && (
          <button 
            onClick={handleShowDemo}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white transition-colors mx-auto block"
          >
            Try Demo Chatbot
          </button>
        )}
        {demoMode && (
          <div className="bg-[#212134] rounded-xl w-full p-4 shadow-lg">
            <div className="p-2 bg-blue-500/10 text-blue-300 rounded mb-2 text-sm">
              Type a message below to chat with our AI assistant.
            </div>
            <DemoChatInterface />
          </div>
        )}
      </motion.div>
      {/* Right column: chatbot mockup */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.62, type: "spring", delay: 0.12 }}
      >
        <div className="bg-[#212134] rounded-xl md:w-[370px] w-full p-6 py-7 shadow-2xl border border-white/10 relative overflow-hidden">
          {/* Avatar wave animation */}
          <motion.div className="mb-2 flex items-center gap-2">
            <motion.div
              className="rounded-full bg-[#1eaedb] flex items-center justify-center w-12 h-12 shadow-2xl border-4 border-[#fff2]"
              animate={{ boxShadow: ["0 0 0 0 #1eaedb88", "0 0 0 20px #1eaedb00", "0 0 0 0 #1eaedb00"] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <MessageCircle size={28} className="text-white" />
            </motion.div>
            <span className="font-bold text-white/90 text-lg tracking-tight">AvaBot</span>
          </motion.div>
          {/* Chat bubble mock */}
          <div className="mt-5 bg-[#1eaedb]/20 text-white px-4 py-3 rounded-2xl w-4/5 mb-3">Hi! I can answer FAQs in seconds.</div>
          <div className="bg-[#fff]/10 text-white/60 px-4 py-3 rounded-2xl w-3/4 ml-auto">What's my order status?</div>
          <div className="bg-[#fff]/10 text-white/60 px-4 py-3 rounded-2xl w-2/4 mt-2">Support, please!</div>
        </div>
      </motion.div>
    </section>
  );
}

// Demo chat interface component
function DemoChatInterface() {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi, I'm AvaBot! How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages([...messages, { text: inputText, isBot: false }]);
    const userMessage = inputText;
    setInputText("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = "Hello! How can I assist you with our AI services today?";
      } else if (lowerInput.includes("chatbot") || lowerInput.includes("bot")) {
        botResponse = "Our chatbots are designed to provide 24/7 customer support with natural language understanding.";
      } else if (lowerInput.includes("price") || lowerInput.includes("cost")) {
        botResponse = "Our pricing depends on your specific needs. Would you like to speak with a sales representative?";
      } else {
        botResponse = "That's an interesting question. Our AI solutions are tailored to meet various business needs including customer support, data analysis, and process automation.";
      }
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-3">
      <div className="max-h-[200px] overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`${
              msg.isBot 
                ? "bg-blue-500/20 text-blue-100 rounded-lg p-2 inline-block max-w-[80%]" 
                : "bg-blue-600 text-white rounded-lg p-2 inline-block ml-auto max-w-[80%]"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="bg-blue-500/20 text-blue-100 rounded-lg p-2 inline-block">
            <span className="flex space-x-1">
              <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </span>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border border-blue-500/30 rounded-l p-2 text-white text-sm focus:outline-none"
        />
        <button 
          type="submit" 
          disabled={!inputText.trim() || isTyping}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-r disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
