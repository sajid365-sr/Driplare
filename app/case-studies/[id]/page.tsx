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
  Play,
  ExternalLink,
  Clock,
  MapPin,
  Building2,
  Workflow,
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
  const id = params?.id as string;

  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudy() {
      if (!id) return;
      const res = await getCaseStudyById(id);
      if (res.success) setDbData(res.data);
      setLoading(false);
    }
    fetchStudy();
  }, [id]);

  const caseStudy = useMemo(() => {
    if (!dbData) return null;
    const lang = i18n.language.split("-")[0] as "en" | "bn";
    const content = dbData[lang] || dbData.en;
    return { ...dbData, ...content };
  }, [dbData, i18n.language]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!caseStudy)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Data not found.
      </div>
    );

  const isBn = i18n.language.startsWith("bn");

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Navigation */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={18} />{" "}
          {isBn ? "সব কেস স্টাডি" : "Back to Case Studies"}
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex gap-1 items-center">
                <Building2 size={14} /> {caseStudy.industry}
              </Badge>
              <Badge variant="secondary" className="flex gap-1 items-center">
                <MapPin size={14} /> {caseStudy.clientLocation}
              </Badge>
              <Badge variant="secondary" className="flex gap-1 items-center">
                <Clock size={14} /> {caseStudy.projectDuration}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {caseStudy.context}
            </p>
          </div>

          {/* Quick Result Card */}
          <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
            <BarChart size={48} className="text-primary mb-4" />
            <span className="text-5xl font-black text-primary">
              {caseStudy.metric}
            </span>
            <p className="text-sm font-bold uppercase tracking-wider mt-2 opacity-70">
              Project Impact
            </p>
          </div>
        </div>

        {/* Video Review Section (If available) */}
        {caseStudy.videoReviewUrl && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Play className="text-primary" fill="currentColor" />{" "}
              {isBn ? "ক্লায়েন্ট রিভিউ" : "Client Video Review"}
            </h2>
            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-border shadow-2xl">
              <iframe
                className="w-full h-full"
                src={caseStudy.videoReviewUrl
                  .replace("youtu.be/", "www.youtube.com/embed/")
                  .replace("watch?v=", "embed/")}
                title="Client Review"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {/* Before & After Comparison */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-4 right-4 text-red-500 opacity-20">
              <XCircle size={60} />
            </div>
            <h3 className="text-xl font-bold text-red-500 mb-4">
              {isBn ? "আগের সমস্যা" : "The Challenge"}
            </h3>
            <p className="text-lg leading-relaxed">{caseStudy.problem}</p>
            {caseStudy.beforeMetricValue && (
              <div className="mt-6 text-3xl font-black text-red-500/80">
                {caseStudy.beforeMetricValue} {caseStudy.metricUnit}
              </div>
            )}
          </div>
          <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-4 right-4 text-green-500 opacity-20">
              <CheckCircle2 size={60} />
            </div>
            <h3 className="text-xl font-bold text-green-500 mb-4">
              {isBn ? "আধুনিক সমাধান" : "The Driplare Solution"}
            </h3>
            <p className="text-lg leading-relaxed">{caseStudy.solution}</p>
            {caseStudy.afterMetricValue && (
              <div className="mt-6 text-3xl font-black text-green-500/80">
                {caseStudy.afterMetricValue} {caseStudy.metricUnit}
              </div>
            )}
          </div>
        </section>

        {/* The Story / Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Workflow className="text-primary" />{" "}
                {isBn ? "আমার কর্মপদ্ধতি" : "The Strategic Approach"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {caseStudy.myApproach}
              </p>
            </section>

            {caseStudy.failedAttempts && (
              <section className="bg-muted/30 p-8 rounded-2xl border-l-4 border-orange-400">
                <h3 className="text-xl font-bold mb-3">
                  {isBn
                    ? "চ্যালেঞ্জ এবং শিক্ষা"
                    : "Technical Challenges & Pivot"}
                </h3>
                <p className="text-muted-foreground italic">
                  {caseStudy.failedAttempts}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar Tech Info */}
          <div className="space-y-8">
            <div className="bg-card border p-8 rounded-3xl shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Code size={18} className="text-primary" /> Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.techTags.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-3 py-1 bg-background"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {caseStudy.n8nDiagramUrl && (
              <div className="space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Workflow size={18} className="text-primary" /> Workflow
                  Diagram
                </h3>
                <img
                  src={caseStudy.n8nDiagramUrl}
                  alt="Logic Workflow"
                  className="rounded-xl border shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results & Testimonial */}
        <section className="bg-neutral-900 text-white rounded-[3rem] p-12 md:p-16 mb-20 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                {isBn ? "অর্জিত ফলাফল" : "The Outcome"}
              </h2>
              <p className="text-white/70 text-lg mb-8">{caseStudy.result}</p>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xl italic font-medium mb-4">
                  "{caseStudy.testimonial}"
                </p>
                <div>
                  <p className="font-bold text-primary">
                    {caseStudy.clientName}
                  </p>
                  <p className="text-sm text-white/50">
                    {caseStudy.testimonialRole}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              {/* ROI Visualization Placeholder */}
              <div className="relative h-64 w-full bg-gradient-to-br from-primary/20 to-transparent rounded-full flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <p className="text-6xl font-black text-primary">
                    {caseStudy.metric}
                  </p>
                  <p className="uppercase tracking-widest text-xs mt-2">
                    Efficiency Gained
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <div className="text-center space-y-8 py-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            {isBn
              ? "আপনার ব্যবসা কি অটোমেশনের জন্য প্রস্তুত?"
              : "Ready to Automate Your Success?"}
          </h2>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 py-8 text-xl font-bold"
          >
            <Link href="/contact">
              {isBn ? "ফ্রি কনসালটেশন নিন" : "Start Your Transformation"}{" "}
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
