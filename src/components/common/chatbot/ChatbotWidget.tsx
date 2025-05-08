
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadCapture, setLeadCapture] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your API
    console.log("Submitting lead:", formData);
    setSubmitted(true);
  };

  // Simulating Botpress chat flow for demo
  const handleStartLeadCapture = () => {
    setLeadCapture(true);
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
                <p className="text-xs text-white/80">Powered by Botpress</p>
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
                <div className="flex-1 p-4 flex flex-col">
                  <div className="bg-muted/30 p-3 rounded-lg inline-block mb-4 max-w-[80%]">
                    <p className="text-sm">
                      Hi, I'm Driplare's AI assistant. How can I help you today?
                    </p>
                  </div>

                  <div className="space-y-2 mt-auto">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleStartLeadCapture}
                    >
                      Tell me about Web Design services
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleStartLeadCapture}
                    >
                      I need help with Digital Marketing
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleStartLeadCapture}
                    >
                      What AI Services do you offer?
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleStartLeadCapture}
                    >
                      I'd like to see your portfolio
                    </Button>
                  </div>
                </div>
              )}

              {/* Chat Footer */}
              {!leadCapture && !submitted && (
                <div className="border-t border-border p-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-background border border-border rounded-l-md p-2 focus:outline-none"
                    />
                    <button className="bg-[#F88220] text-white p-2 rounded-r-md">
                      <MessageSquare size={20} />
                    </button>
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
