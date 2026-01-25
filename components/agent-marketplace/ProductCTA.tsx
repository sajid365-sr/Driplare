"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones } from "lucide-react";
import { Agent, AgentContent } from "@/types/agent-marketplace";
import LeadModal from "@/components/LeadModal";

interface ProductCTAProps {
  agent: Agent;
  langContent: AgentContent;
}

export default function ProductCTA({ agent, langContent }: ProductCTAProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const ctaText = {
    en: {
      title: "Ready to Automate Your Sales?",
      description: `Join ${agent.totalSales}+ businesses already using AI to handle customer inquiries 24/7. Setup takes just 15 minutes, and you get 1 month of free support.`,
      oneTime: "One-time payment",
      noFees: "No monthly fees",
      getStarted: "Get Started Now",
      talkExpert: "Talk to an Expert",
      moneyBack: "7-Day Money Back",
      freeSupport: "1 Month Free Support"
    },
    bn: {
      title: "আপনার সেলস অটোমেট করতে প্রস্তুত?",
      description: `${agent.totalSales}+ ব্যবসার সাথে যোগ দিন যারা ইতিমধ্যে ২৪/৭ কাস্টমার অনুসন্ধান পরিচালনা করতে AI ব্যবহার করছে। সেটআপে মাত্র ১৫ মিনিট সময় লাগে এবং আপনি ১ মাসের বিনামূল্যে সহায়তা পাবেন।`,
      oneTime: "একবারের পেমেন্ট",
      noFees: "কোন মাসিক ফি নেই",
      getStarted: "এখনই শুরু করুন",
      talkExpert: "বিশেষজ্ঞের সাথে কথা বলুন",
      moneyBack: "৭ দিনের টাকা ফেরত",
      freeSupport: "১ মাস ফ্রি সাপোর্ট"
    }
  };

  const currentLang = langContent.name === agent.en.name ? "en" : "bn";
  const text = ctaText[currentLang];

  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-driplare to-driplare/80 rounded-2xl p-8 md:p-12 text-white text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {text.title}
            </h2>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {text.description}
            </p>

            {/* Price Highlight */}
            <div className="py-6">
              <div className="inline-block bg-white/10 backdrop-blur rounded-lg px-6 py-3">
                <div className="text-sm text-white/80 mb-1">{text.oneTime}</div>
                <div className="text-4xl font-bold">${agent.price}</div>
                <div className="text-sm text-white/80 mt-1">{text.noFees}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-driplare hover:bg-white/90 font-semibold"
                onClick={() => setIsLeadModalOpen(true)}
              >
                {text.getStarted}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => setIsLeadModalOpen(true)}
              >
                {text.talkExpert}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">{text.moneyBack}</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                <span className="text-sm">{text.freeSupport}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        agentSlug={agent.slug}
        agentName={langContent.name}
      />
    </>
  );
}