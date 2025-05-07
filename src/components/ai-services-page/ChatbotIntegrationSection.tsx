
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ChatbotIntegrationSection() {
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
        <div className="text-base text-blue-200 opacity-90 mb-3">"See it in action"</div>
        {/* Placeholder for gif/embed */}
        <div className="h-10 w-36 rounded-xl bg-gradient-to-r from-blue-900/60 to-blue-400/10 blur-[2px] opacity-60 mb-2 mx-auto" />
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
