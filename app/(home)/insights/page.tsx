// app/insights/page.tsx  (Server Component)

import type { Metadata } from "next";
import { getAllPublishedBlogs, getBlogCategories } from "@/lib/blog-actions";
import { InsightsClient } from "./insights-client";

export const metadata: Metadata = {
  title: "Insights — AI Automation & Strategy | Driplare",
  description:
    "Practical guides, architecture deep-dives, and automation ideas from the Driplare team. Real lessons from building AI systems that actually work.",
};

export default async function InsightsPage() {
  // Fetch in parallel — no locale arg yet (added after migration)
  const [blogsResult, categories] = await Promise.all([
    getAllPublishedBlogs(),
    getBlogCategories(),
  ]);

  const posts = blogsResult.success ? blogsResult.data : [];

  return <InsightsClient posts={posts} categories={categories} />;
}