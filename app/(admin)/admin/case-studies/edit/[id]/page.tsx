import { getCaseStudyById } from "@/lib/case-study-action";
import EditCaseStudyForm from "@/components/admin/case study/EditCaseStudyForm";

interface EditCaseStudyPageProps {
  params: {
    id: string;
  };
}

const EditCaseStudyPage = async ({ params }: EditCaseStudyPageProps) => {
  const response = await getCaseStudyById(params.id);

  if (!response.success || !response.data) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <p className="text-lg font-semibold">Case study not found.</p>
      </div>
    );
  }

  return <EditCaseStudyForm initialData={response.data} />;
};

export default EditCaseStudyPage;
