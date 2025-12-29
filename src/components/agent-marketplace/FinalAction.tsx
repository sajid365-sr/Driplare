import { Button } from "@/components/ui/button";

interface FinalActionProps {
  headline: string;
  subText: string;
  onInitiateSetup: () => void;
}

const FinalAction = ({ headline, subText, onInitiateSetup }: FinalActionProps) => {
  return (
    <section className="py-16 px-4 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-['Montserrat'] font-bold text-3xl mb-6">
          {headline}
        </h2>

        <Button
          onClick={onInitiateSetup}
          className="bg-[#FF6B00] hover:bg-white hover:text-[#FF6B00] hover:border-[#FF6B00] text-white px-8 py-4 text-lg rounded-none border border-[#FF6B00] font-['JetBrains_Mono'] mb-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onInitiateSetup();
            }
          }}
          tabIndex={0}
          aria-label="Initiate setup conference"
        >
          [ INITIATE_SETUP_CONFERENCE ]
        </Button>

        <p className="text-gray-600 font-['JetBrains_Mono'] text-sm">
          {subText}
        </p>
      </div>
    </section>
  );
};

export default FinalAction;
