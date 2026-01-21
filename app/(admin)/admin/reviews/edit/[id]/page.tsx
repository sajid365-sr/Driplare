import { notFound } from "next/navigation";
import { getReview } from "@/lib/review-action";
import EditReviewForm from "@/components/admin/review/EditReviewForm";
import { Review } from "@/types/review-types";

/**
 * Edit Review Page
 * Admin page for editing existing client reviews
 * Fetches review data by ID and renders edit form
 */
export default async function EditReviewPage({
    params,
}: {
    params: { id: string };
}) {
    // Fetch review data from server
    const review = await getReview(params.id);

    // Handle case where review doesn't exist
    if (!review) {
        notFound();
    }

    return <EditReviewForm initialData={review as Review} />;
}