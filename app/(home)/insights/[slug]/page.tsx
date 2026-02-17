// app/insights/[slug]/page.tsx  (Server Component)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog-actions";
import { BlogDetailClient } from "./blog-detail-client";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBlogPostBySlug(params.slug);
  if (!data) return { title: "Post Not Found | Driplare" };

  return {
    title: `${data.post.title} | Driplare Insights`,
    description: data.post.excerpt ?? data.post.title,
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt ?? "",
      images: data.post.cover_image ? [{ url: data.post.cover_image }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const data = await getBlogPostBySlug(params.slug);
  if (!data) notFound();

  return <BlogDetailClient data={data} />;
}