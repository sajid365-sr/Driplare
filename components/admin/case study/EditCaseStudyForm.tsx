"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Save, FileText, ImageIcon, Info } from "lucide-react";
import { updateCaseStudy } from "@/lib/case-study-action";
import MetadataStep from "./MetadataStep";
import ContentStep from "./ContentStep";
import VisualsStep from "./VisualsStep";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { CaseStudy } from "@/types/case-study-types";
import {
    CaseStudyFormValues,
    caseStudyFormSchema,
} from "./caseStudyFormSchema";

interface EditCaseStudyFormProps {
    initialData: CaseStudy;
}

const EditCaseStudyForm = ({ initialData }: EditCaseStudyFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<CaseStudyFormValues>({
        resolver: zodResolver(caseStudyFormSchema),
        defaultValues: {
            category: initialData.category,
            techTags: initialData.techTags.join(", "),
            clientName: initialData.clientName ?? "",
            industry: initialData.industry ?? "",
            clientLocation: initialData.clientLocation ?? "",
            projectDuration: initialData.projectDuration ?? "",
            beforeMetricValue: initialData.beforeMetricValue,
            afterMetricValue: initialData.afterMetricValue,
            metricUnit: initialData.metricUnit ?? "",
            en: {
                title: initialData.en.title,
                context: initialData.en.context,
                problem: initialData.en.problem,
                solution: initialData.en.solution,
                myApproach: initialData.en.myApproach,
                result: initialData.en.result,
                metric: initialData.en.metric,
                testimonial: initialData.en.testimonial,
            },
            bn: {
                title: initialData.bn.title,
                context: initialData.bn.context,
                problem: initialData.bn.problem,
                solution: initialData.bn.solution,
                myApproach: initialData.bn.myApproach,
                result: initialData.bn.result,
                metric: initialData.bn.metric,
                testimonial: initialData.bn.testimonial,
            },
            videoReviewUrl: initialData.videoReviewUrl ?? "",
            dashboardVideoUrl: initialData.dashboardVideoUrl ?? "",
            n8nDiagramUrl: initialData.n8nDiagramUrl ?? "",
            gallery: initialData.gallery ?? [],
        },
    });

    const handleSubmitForm = async (data: CaseStudyFormValues) => {
        setIsSubmitting(true);

        console.log(data)

        try {
            const formattedData: CaseStudy = {
                // id: initialData.id,
                category: data.category,
                techTags: data.techTags.split(",").map((tag) => tag.trim()),
                clientName: data.clientName,
                clientLocation: data.clientLocation,
                industry: data.industry,
                projectDuration: data.projectDuration,
                heroImage: initialData.heroImage,
                videoReviewUrl: data.videoReviewUrl,
                dashboardVideoUrl: data.dashboardVideoUrl,
                n8nDiagramUrl: data.n8nDiagramUrl,
                gallery: data.gallery,
                beforeMetricValue: data.beforeMetricValue,
                afterMetricValue: data.afterMetricValue,
                metricUnit: data.metricUnit,
                en: data.en,
                bn: data.bn,
                createdAt: initialData.createdAt,
                updatedAt: new Date().toISOString(),
            };

            const result = await updateCaseStudy(initialData.id as string, formattedData);
            console.log(result)
            if (result.success) {
                toast.success("Case study updated successfully!");
                router.push("/admin/case-studies");
            } else {
                toast.error(result.error || "Failed to update");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormError = (errors: unknown) => {
        // eslint-disable-next-line no-console
        console.log("Form validation errors:", errors);
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit Case Study
                    </h1>
                    <p className="text-muted-foreground">
                        Update the details of this success story.
                    </p>
                </div>
                <Button
                    onClick={form.handleSubmit(handleSubmitForm, handleFormError)}
                    disabled={isSubmitting}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Update Case Study
                </Button>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmitForm, handleFormError)}
                    className="space-y-8"
                >
                    <Tabs defaultValue="metadata" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
                            <TabsTrigger value="metadata" className="text-base">
                                <Info className="w-4 h-4 mr-2" /> Metadata
                            </TabsTrigger>
                            <TabsTrigger value="english" className="text-base">
                                <FileText className="w-4 h-4 mr-2" /> English Content
                            </TabsTrigger>
                            <TabsTrigger value="bengali" className="text-base">
                                <FileText className="w-4 h-4 mr-2" /> Bengali Content
                            </TabsTrigger>
                            <TabsTrigger value="visuals" className="text-base">
                                <ImageIcon className="w-4 h-4 mr-2" /> Visuals & Media
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="metadata">
                            <MetadataStep form={form} />
                        </TabsContent>

                        <TabsContent value="english">
                            <ContentStep form={form} lang="en" title="English Presentation" />
                        </TabsContent>

                        <TabsContent value="bengali">
                            <ContentStep form={form} lang="bn" title="Bengali Presentation" />
                        </TabsContent>

                        <TabsContent value="visuals">
                            <VisualsStep form={form} />
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </div>
    );
};

export default EditCaseStudyForm;

