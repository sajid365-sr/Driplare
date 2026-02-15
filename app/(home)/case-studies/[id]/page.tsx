/**
 * app/case-studies/[slug]/page.tsx  (Server Component)
 */

import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/case-study-action";
import { CaseStudyDetailClient } from "@/components/CaseStudies/CaseStudyDetailClient";
import { CaseStudy } from "@/types/case-study-types";

interface Props {
  params: { slug: string };
}

/* Pre-generate paths for all published studies */
export async function generateStaticParams() {
  const result = await getAllCaseStudies();
  if (!result.success) return [];
  return result.data.map((s: CaseStudy) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const result = await getCaseStudyBySlug(params.slug);
  if (!result.success || !result.data) return {};
  const study: CaseStudy = result.data;
  return {
    title: `${study.en.title} | Case Study — Driplare`,
    description: study.en.context,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const result = await getCaseStudyBySlug(params.slug);
  if (!result.success || !result.data) return notFound();
  return <CaseStudyDetailClient study={result.data} />;
}