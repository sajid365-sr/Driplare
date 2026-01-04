"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/form-action";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const result = await subscribeNewsletter(email);
      if (result.success) {
        toast.success("Subscribed successfully! Welcome to the sync.");
        setEmail("");
      } else {
        toast.error(result.error || "Subscription failed.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-black text-[#0A0A0A] tracking-tighter mb-1 uppercase">
          STAY_SYNCED
        </h3>
        <div className="h-0.5 w-6 bg-primary/30 rounded-full" />
        <p className="font-mono text-[10px] font-bold text-[#0A0A0A]/30 mt-2 tracking-widest uppercase">
          (Newsletter_Intake)
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
        <div className="relative group">
          <Input
            type="email"
            placeholder="your.email@sync.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-[#0A0A0A]/10 focus:border-primary/50 text-xs font-mono rounded-none border-t-0 border-l-0 border-r-0 border-b-2 px-0 placeholder:text-[#0A0A0A]/20 h-10"
            required
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full" />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#0A0A0A] hover:bg-primary text-white text-[10px] font-mono h-9 px-4 rounded-none uppercase flex items-center justify-between group"
        >
          {isSubmitting ? (
            <Loader2 className="w-3 h-3 animate-spin mx-auto" />
          ) : (
            <>
              Subscribe_Protocol
              <Send className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
