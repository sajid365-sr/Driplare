"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFAQProps {
  currentLang: "en" | "bn";
}

export default function ProductFAQ({ currentLang }: ProductFAQProps) {
  const faqData = {
    en: [
      {
        question: "How long does setup take?",
        answer: "Setup takes just 15 minutes. We handle everything - you just need to provide your product list and Facebook/WhatsApp page access."
      },
      {
        question: "Do I need technical knowledge?",
        answer: "Not at all! We set everything up for you. You'll get a simple tutorial video, and we provide 1 month of free support if you need any help."
      },
      {
        question: "What if customers ask questions the AI doesn't know?",
        answer: "The AI is trained on your specific products and can handle 90%+ of common questions. For complex queries, it will notify you to respond personally."
      },
      {
        question: "Can I customize the AI's responses?",
        answer: "Yes! We train the AI with your preferred tone and style. You can also update responses anytime during the first month of support."
      },
      {
        question: "What happens after I order?",
        answer: "After ordering, we'll schedule a quick 15-minute call to understand your business, collect your product details, and set up everything within 24 hours."
      },
      {
        question: "Is there a refund policy?",
        answer: "Yes! We offer a 7-day money-back guarantee. If you're not satisfied with the setup, we'll refund your payment - no questions asked."
      }
    ],
    bn: [
      {
        question: "সেটআপ করতে কতক্ষণ লাগে?",
        answer: "সেটআপে মাত্র ১৫ মিনিট সময় লাগে। আমরা সবকিছু পরিচালনা করি - আপনাকে শুধু আপনার পণ্য তালিকা এবং ফেসবুক/হোয়াটসঅ্যাপ পেজ এক্সেস দিতে হবে।"
      },
      {
        question: "আমার কি টেকনিক্যাল জ্ঞান দরকার?",
        answer: "মোটেও না! আমরা আপনার জন্য সবকিছু সেটআপ করে দিই। আপনি একটি সহজ টিউটোরিয়াল ভিডিও পাবেন এবং প্রয়োজনে আমরা ১ মাসের বিনামূল্যে সহায়তা প্রদান করি।"
      },
      {
        question: "যদি কাস্টমাররা এমন প্রশ্ন করে যা এআই জানে না?",
        answer: "এআই আপনার নির্দিষ্ট পণ্যের উপর প্রশিক্ষিত এবং ৯০%+ সাধারণ প্রশ্নের উত্তর দিতে পারে। জটিল প্রশ্নের জন্য, এটি আপনাকে ব্যক্তিগতভাবে উত্তর দিতে জানাবে।"
      },
      {
        question: "আমি কি এআই এর উত্তর কাস্টমাইজ করতে পারি?",
        answer: "হ্যাঁ! আমরা আপনার পছন্দের টোন এবং স্টাইল দিয়ে এআই প্রশিক্ষণ দিই। প্রথম মাসের সহায়তার সময় আপনি যেকোনো সময় উত্তর আপডেট করতে পারবেন।"
      },
      {
        question: "অর্ডার করার পরে কী হয়?",
        answer: "অর্ডার করার পরে, আমরা আপনার ব্যবসা বুঝতে একটি দ্রুত ১৫ মিনিটের কল নির্ধারণ করব, আপনার পণ্যের বিবরণ সংগ্রহ করব এবং ২৪ ঘণ্টার মধ্যে সবকিছু সেটআপ করব।"
      },
      {
        question: "রিফান্ড নীতি আছে কি?",
        answer: "হ্যাঁ! আমরা ৭ দিনের টাকা ফেরত গ্যারান্টি দিই। যদি আপনি সেটআপে সন্তুষ্ট না হন, আমরা আপনার পেমেন্ট ফেরত দেব - কোন প্রশ্ন ছাড়াই।"
      }
    ]
  };

  const faqs = faqData[currentLang];

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            {currentLang === "en" ? "Common Questions" : "সাধারণ প্রশ্ন"}
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-background border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}