// app/marketplace/websites/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getWebsiteProductBySlug, getAllWebsiteProducts } from "@/lib/marketplace-action";
import { WebsiteDetailClient } from "./website-detail-client";

export async function generateStaticParams() {
    const res = await getAllWebsiteProducts();
    if (!res.success || !res.data) return [];
    return res.data.map((w: { slug: string }) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const res = await getWebsiteProductBySlug(params.slug);
    if (!res.success || !res.data) return { title: "Not Found" };
    const item = res.data as any;
    return {
        title: `${item.en.name} | Driplare Marketplace`,
        description: item.en.description,
    };
}

export default async function WebsiteDetailPage({ params }: { params: { slug: string } }) {
    const res = await getWebsiteProductBySlug(params.slug);
    if (!res.success || !res.data) notFound();
    return <WebsiteDetailClient website={res.data as any} />;
}