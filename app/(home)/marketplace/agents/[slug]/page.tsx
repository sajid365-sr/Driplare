// app/marketplace/agents/[slug]/page.tsx
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getAgentBySlug, getAllAgents } from "@/lib/agent-marketplace-action";
import { getDbUser } from "@/lib/auth-action";
import { getPendingInvoiceForProduct } from "@/lib/billing-actions";
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

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    const dbUser = user ? await getDbUser(user.id) : null;
    const pending = await getPendingInvoiceForProduct({
        userId: dbUser?.id,
        email: email ?? undefined,
        productType: "agent",
        productSlug: params.slug,
    });

    return (
        <AgentDetailClient
            agent={res.data as any}
            pendingInvoice={pending.success ? (pending.data as any) : null}
        />
    );
}
