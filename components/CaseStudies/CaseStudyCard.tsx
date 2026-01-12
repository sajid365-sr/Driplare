"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Target, Zap, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function CaseStudyCard({ study, index }: any) {
  const { t } = useTranslation();

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/pdfs/driplare-${study.id}-report.pdf`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card dark:bg-[#0D0D0E] border border-border/50 dark:border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Metric Sidebar - Visual Anchor */}
        <div className="lg:w-1/4 bg-primary p-8 flex flex-col justify-center items-center text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/grid-white.svg')] bg-center"></div>
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">
            {t("case_studies.case_study_card.roi_label")}
          </span>
          <div className="relative z-10 text-5xl font-black tracking-tighter">
            {study.metric}
          </div>
          <Zap className="relative z-10 mt-4 opacity-50" size={32} />
        </div>

        {/* Content Body */}
        <div className="flex-1 p-8 lg:p-12 space-y-8 bg-gradient-to-br from-card to-background dark:from-[#0D0D0E] dark:to-[#050505]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 dark:bg-primary/20 rounded-md">
                {t("case_studies.case_study_card.sector_label")}:{" "}
                {study.context}
              </span>
              <h3 className="text-2xl md:text-4xl font-black mt-2 tracking-tight dark:text-white">
                {study.title}
              </h3>
            </div>

            {/* Tech Stack - Badge Style */}
            <div className="flex flex-wrap gap-2 justify-start md:justify-end max-w-xs">
              {study.techTags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-accent/50 dark:bg-white/5 rounded border border-border/50 dark:border-white/10 text-[9px] font-mono font-bold uppercase tracking-tighter dark:text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-border/50 dark:border-white/5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground dark:text-white/40 uppercase tracking-widest">
                <Target size={14} className="text-red-500" />{" "}
                {t("case_studies.case_study_card.bottleneck_label")}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/60 font-medium italic">
                "{study.problem}"
              </p>
            </div>
            <div className="space-y-3 border-l border-border/30 dark:border-white/10 pl-8 hidden md:block">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground dark:text-white/40 uppercase tracking-widest">
                <Cpu size={14} className="text-primary" />{" "}
                {t("case_studies.case_study_card.architecture_label")}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/70">
                {study.solution}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground dark:text-white/40 uppercase tracking-widest">
                {t("case_studies.case_study_card.output_label")}
              </p>
              <div className="text-primary font-black text-2xl tracking-tighter uppercase italic">
                {study.result}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                className="rounded-xl border-border/50 dark:border-white/10 gap-2 hover:bg-primary/5 dark:hover:bg-white/5 transition-all hidden sm:flex dark:text-white"
              >
                <Download size={14} />{" "}
                {t("case_studies.case_study_card.pdf_btn")}
              </Button>

              <Link href={`/case-studies/${study.id}`}>
                <Button
                  size="sm"
                  className="rounded-xl gap-2 font-bold px-6 shadow-lg shadow-primary/10"
                >
                  {t("case_studies.case_study_card.read_btn")}{" "}
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
