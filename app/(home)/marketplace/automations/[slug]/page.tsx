// app/marketplace/automations/[slug]/page.tsx
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getAutomationBySlug, getAllAutomations } from "@/lib/marketplace-action";
import { getDbUser } from "@/lib/auth-action";
import { getPendingInvoiceForProduct } from "@/lib/billing-actions";
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

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    const dbUser = user ? await getDbUser(user.id) : null;
    const pending = await getPendingInvoiceForProduct({
        userId: dbUser?.id,
        email: email ?? undefined,
        productType: "automation",
        productSlug: params.slug,
    });

    return (
        <AutomationDetailClient
            automation={res.data as any}
            pendingInvoice={pending.success ? (pending.data as any) : null}
        />
    );
}
