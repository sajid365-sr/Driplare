'use client'

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Accuracy & Hallucinations?",
    a: "We utilize RAG (Retrieval-Augmented Generation). Your agent is mathematically grounded in your approved documentation, not general internet knowledge.",
  },
  {
    q: "Legacy Integration?",
    a: "Our agents connect via n8n or custom APIs to your existing CRM, ERP, and internal databases without replacing them.",
  },
  {
    q: "Deployment Timeline?",
    a: "An enterprise-grade agent typically moves from architecture to production in 14 to 28 days.",
  },
];

export const FAQSection = () => (
  <section className="py-24 bg-white">
    <div className="container max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          System_Clarifications
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            className="p-8 bg-[#F9F9F9] rounded-[2rem] border border-border/40 hover:border-primary/30 transition-colors"
          >
            <h3 className="flex items-center gap-4 text-lg font-black uppercase tracking-tight">
              <span className="text-primary font-mono text-sm">Q//</span>{" "}
              {faq.q}
            </h3>
            <p className="mt-4 text-[#0A0A0A]/60 font-medium leading-relaxed pl-10 border-l-2 border-primary/20">
              {faq.a}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
