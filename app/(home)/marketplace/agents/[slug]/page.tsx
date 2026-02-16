// app/marketplace/agents/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAgentBySlug, getAllAgents } from "@/lib/agent-marketplace-action";
import { AgentDetailClient } from "./agent-detail-client";

export async function generateStaticParams() {
    const res = await getAllAgents();
    if (!res.success || !res.data) return [];
    return res.data.map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const res = await getAgentBySlug(params.slug);
    if (!res.success || !res.data) return { title: "Agent Not Found" };
    const agent = res.data as any;
    return {
        title: `${agent.en.name} | Driplare Marketplace`,
        description: agent.en.description,
    };
}

export default async function AgentDetailPage({ params }: { params: { slug: string } }) {
    const res = await getAgentBySlug(params.slug);
    if (!res.success || !res.data) notFound();
    return <AgentDetailClient agent={res.data as any} />;
}