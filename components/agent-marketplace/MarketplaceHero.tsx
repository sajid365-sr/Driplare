'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";

const MarketplaceHero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="py-16 px-4 bg-white border-b border-black">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Montserrat']">
          [ ARCHIVE: AI_SOLUTIONS ]
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-['Montserrat']">
          Battle-tested automation systems designed to be integrated by our engineers into your existing infrastructure. No technical configuration required from your side.
        </p>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="> Filter_by_Function..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-black rounded-none bg-white font-['JetBrains_Mono'] placeholder-gray-500 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHero;
