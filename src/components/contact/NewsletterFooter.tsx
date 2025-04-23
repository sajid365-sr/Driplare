
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-40 bg-[#1a1f2c] bg-opacity-95 backdrop-blur-xl shadow-[0_-4px_44px_0_rgba(248,130,32,0.10)]"
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 1 }}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg md:text-2xl font-bold mb-1">Stay Ahead with AI Insights</h3>
          <p className="text-gray-300 text-sm md:text-base">
            Monthly tips, case studies, and product updates.
          </p>
        </div>

        <form
          className="flex-1 flex flex-col sm:flex-row items-center md:justify-end gap-3"
          onSubmit={e => {
            e.preventDefault();
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2400);
            setEmail("");
          }}
        >
          <Input
            type="email"
            required
            autoComplete="off"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded-md w-full md:w-auto focus-visible:ring-2 focus-visible:ring-[#F88220] transition-all"
            disabled={submitted}
          />
          <Button
            type="submit"
            className="px-8 h-11 bg-[#F88220] hover:bg-[#fa973a] text-lg font-semibold rounded-md shadow-lg transition-transform transition-shadow focus:ring-2 focus:ring-[#F88220] focus:outline-none"
            style={{ boxShadow: submitted ? "0 4px 20px 0 #F8822099" : "0 2px 20px 0 #F8822066" }}
            disabled={submitted}
            animate={{ scale: submitted ? 1.08 : 1 }}
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
