import { Button } from "@/components/ui/button";

interface ProcurementSidebarProps {
  productName: string;
  price: string;
  technicalSummary: string;
  coreSpecs: {
    input: string;
    logic: string;
    output: string;
  };
  onDeploy: () => void;
}

const ProcurementSidebar = ({ productName, price, technicalSummary, coreSpecs, onDeploy }: ProcurementSidebarProps) => {
  return (
    <div className="bg-white border border-black rounded-none p-6 sticky top-8">
      <h2 className="font-['JetBrains_Mono'] text-xl font-bold mb-4">
        {productName}
      </h2>

      <div className="font-['JetBrains_Mono'] text-2xl font-bold mb-6">
        ${price}
      </div>

      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        {technicalSummary}
      </p>

      <div className="space-y-3 mb-8">
        <div className="font-['JetBrains_Mono'] text-xs">
          INPUT: {coreSpecs.input}
        </div>
        <div className="font-['JetBrains_Mono'] text-xs">
          LOGIC: {coreSpecs.logic}
        </div>
        <div className="font-['JetBrains_Mono'] text-xs">
          OUTPUT: {coreSpecs.output}
        </div>
      </div>

      <Button
        onClick={onDeploy}
        className="w-full bg-[#FF6B00] hover:bg-white hover:text-[#FF6B00] hover:border-[#FF6B00] text-white px-6 py-3 text-lg rounded-none border border-[#FF6B00] font-['JetBrains_Mono'] mb-4"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onDeploy();
          }
        }}
        tabIndex={0}
        aria-label="Initiate deployment"
      >
        [ INITIATE_DEPLOYMENT ]
      </Button>

      <div className="space-y-2">
        <div className="font-['JetBrains_Mono'] text-xs text-center bg-[#F9F9F9] p-2 border border-black rounded-none">
          [ 1X_CONFIG_CALL ]
        </div>
        <div className="font-['JetBrains_Mono'] text-xs text-center bg-[#F9F9F9] p-2 border border-black rounded-none">
          [ LOGIC_HANDOVER ]
        </div>
      </div>
    </div>
  );
};

export default ProcurementSidebar;
