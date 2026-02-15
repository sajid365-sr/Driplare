/**
 * app/case-studies/page.tsx  (Server Component)
 *
 * Fetches data server-side, passes to client orchestrator.
 * The CaseStudiesClient component owns filter state so the
 * Hero filter tabs and Grid react to each other.
 */

import { CaseStudiesClient } from "@/components/CaseStudies/CaseStudiesClient";
import { getAllCaseStudies, getCaseStudyCategories } from "@/lib/case-study-action";


export const metadata = {
    title: "Case Studies | Driplare",
    description:
        "Real problems, real AI, real results. Deep-dive investigations into how we've helped businesses automate, grow, and save time with AI.",
};

export default async function CaseStudiesPage() {
    // Fetch in parallel
    const [studiesResult, categories] = await Promise.all([
        getAllCaseStudies(),
        getCaseStudyCategories(),
    ]);



    const studies = studiesResult.success ? studiesResult.data : [];

    // Aggregate stats — computed server-side from real data
    const stats = [
        { value: `${studies.length}+`, label: "Projects Delivered" },
        { value: `${new Set(studies.map((s: any) => s.clientLocation)).size}+`, label: "Countries Served" },
        { value: `${new Set(studies.map((s: any) => s.category)).size}`, label: "Service Categories" },
    ];

    return (
        <CaseStudiesClient
            studies={studies}
            categories={categories}
            stats={stats}
        />
    );
}