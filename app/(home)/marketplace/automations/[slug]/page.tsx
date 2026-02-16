// app/marketplace/automations/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAutomationBySlug, getAllAutomations } from "@/lib/marketplace-action";
import { AutomationDetailClient } from "./automation-detail-client";

export async function generateStaticParams() {
    const res = await getAllAutomations();
    if (!res.success || !res.data) return [];
    return res.data.map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {


    const res = await getAutomationBySlug(params.slug);
    if (!res.success || !res.data) return { title: "Not Found" };
    const item = res.data as any;
    return {
        title: `${item.en.name} | Driplare Marketplace`,
        description: item.en.description,
    };
}

export default async function AutomationDetailPage({ params }: { params: { slug: string } }) {
    const res = await getAutomationBySlug(params.slug);
    if (!res.success || !res.data) notFound();
    return <AutomationDetailClient automation={res.data as any} />;
}