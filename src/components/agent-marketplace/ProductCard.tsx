import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SolutionCardProps {
  assetId: string;
  headline: string;
  keyBenefit: string;
  humanTouchLabel: string;
  price: string;
  onExploreCapabilities: () => void;
}

const SolutionCard = ({ assetId, headline, keyBenefit, humanTouchLabel, price, onExploreCapabilities }: SolutionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white border border-black rounded-none p-6 h-full flex flex-col relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scanner Effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-[#FF6B00] animate-pulse"></div>
        </div>
      )}

      {/* Asset Identifier */}
      <div className="mb-6">
        <div className="font-['JetBrains_Mono'] text-sm text-gray-600 mb-4">
          {assetId}
        </div>
        <h3 className="font-['JetBrains_Mono'] text-xl font-bold mb-4">
          {headline}
        </h3>
      </div>

      {/* Key Benefit */}
      <div className="flex-grow mb-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          {keyBenefit}
        </p>
      </div>

      {/* Human-Touch Label */}
      <div className="mb-6">
        <div className="inline-block bg-[#F9F9F9] border border-black rounded-none px-3 py-1">
          <span className="font-['JetBrains_Mono'] text-xs text-gray-800">
            {humanTouchLabel}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="font-['JetBrains_Mono'] text-lg font-bold">
          ${price} / Setup
        </div>
        <Button
          onClick={onExploreCapabilities}
          className="bg-[#FF6B00] hover:bg-white hover:text-[#FF6B00] hover:border-[#FF6B00] text-white rounded-none border border-[#FF6B00] px-4 py-2 font-['JetBrains_Mono'] text-xs"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onExploreCapabilities();
            }
          }}
          tabIndex={0}
          aria-label={`Explore capabilities for ${headline}`}
        >
          [ EXPLORE_CAPABILITIES ]
        </Button>
      </div>
    </div>
  );
};

export default SolutionCard;
