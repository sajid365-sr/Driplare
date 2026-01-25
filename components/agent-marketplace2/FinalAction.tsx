import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FinalActionProps {
  productId: string;
}

const FinalAction = ({ productId }: FinalActionProps) => {
  return (
    <section className="py-16 px-4 bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Implement?</h2>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          Our team of engineers will handle the complete setup and integration process.
          You'll receive a fully operational system with ongoing support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#FF6B00] hover:bg-[#FF6B00]/90">
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
          <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black">
            <Link href="/case-studies">View Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalAction;
