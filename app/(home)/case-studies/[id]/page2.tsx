"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  XCircle,
  Lightbulb,
  Code,
  BarChart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getCaseStudyById } from "@/lib/case-study-action";

export default function CaseStudyDetailPage() {
  const { i18n } = useTranslation();
  const params = useParams();
  const id = params?.id as string; // এটি এখন URL থেকে ID নেবে

  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudy() {
      if (!id) return;
      setLoading(true);
      const res = await getCaseStudyById(id); // আইডি দিয়ে কল
      if (res.success) {
        setDbData(res.data);
      }
      setLoading(false);
    }
    fetchStudy();
  }, [id]);

  const caseStudy = useMemo(() => {
    if (!dbData) return null;
    const lang = i18n.language.split("-")[0] as "en" | "bn";
    const content = dbData[lang] || dbData.en;

    return {
      ...dbData,
      title: content.title,
      context: content.context,
      problem: content.problem,
      solution: content.solution,
      result: content.result,
      metric: content.metric,
      techStack: dbData.techTags || [],
    };
  }, [dbData, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-2xl font-bold">Case study not found!</h1>
      </div>
    );
  }

  // ল্যাঙ্গুয়েজ অনুযায়ী লেবেল সেট করা (ট্রান্সলেশন ফাইল ছাড়া সমাধান)
  const isBn = i18n.language.startsWith("bn");
  const labels = {
    back: isBn ? "সব কেস স্টাডি দেখুন" : "Back to all Case Studies",
    problem: isBn ? "সমস্যা (Problem)" : "The Challenge",
    solution: isBn ? "সমাধান (Solution)" : "The Solution",
    impact: isBn ? "প্রভাব (Impact)" : "Verifiable Impact",
    ctaTitle: isBn
      ? "আপনার ব্যবসার জন্য এআই সমাধান চান?"
      : "Ready for your own AI Solution?",
    ctaBtn: isBn ? "কল বুক করুন" : "Book Architecture Call",
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {labels.back}
        </Link>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative h-64 md:h-80 bg-neutral-900">
            {/* এখানে আমরা মক ইমেজের বদলে একটি ডার্ক গ্রেডিয়েন্ট দিচ্ছি যেহেতু ডাটাবেজে ইমেজ নেই */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
              <Badge
                variant="outline"
                className="text-primary border-primary/30 uppercase mb-3"
              >
                {caseStudy.context}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                {caseStudy.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                  <XCircle size={14} /> {labels.problem}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>
              <div className="space-y-4 lg:border-l lg:pl-10">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                  <Lightbulb size={14} /> {labels.solution}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Impact Grid */}
        <section className="py-16">
          <h2 className="text-center text-3xl font-black mb-12 uppercase">
            {labels.impact}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-accent/10 p-10 rounded-2xl border border-border/50 text-center">
              <BarChart size={40} className="text-primary mx-auto mb-4" />
              <h3 className="text-5xl font-black text-primary mb-2">
                {caseStudy.metric}
              </h3>
              <p className="text-muted-foreground uppercase text-xs tracking-widest font-bold">
                Key Performance Metric
              </p>
            </div>
            <div className="bg-accent/10 p-10 rounded-2xl border border-border/50 text-center">
              <CheckCircle2 size={40} className="text-primary mx-auto mb-4" />
              <h3 className="text-3xl font-black text-primary mb-2">
                {caseStudy.result}
              </h3>
              <p className="text-muted-foreground uppercase text-xs tracking-widest font-bold">
                Project Outcome
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <div className="space-y-6 mb-20">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <Code className="text-primary" /> Tech Infrastructure
          </h3>
          <div className="flex flex-wrap gap-3">
            {caseStudy.techStack.map((tech: string, i: number) => (
              <Badge
                key={i}
                className="px-5 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-primary rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">
            {labels.ctaTitle}
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-7 text-lg font-bold"
          >
            <Link href="/contact">
              {labels.ctaBtn} <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
