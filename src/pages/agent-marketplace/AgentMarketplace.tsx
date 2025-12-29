import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MarketplaceHero from "@/components/agent-marketplace/MarketplaceHero";
import CategoryNavigation from "@/components/agent-marketplace/CategoryNavigation";
import SolutionCard from "@/components/agent-marketplace/ProductCard";
import TrustGrid from "@/components/agent-marketplace/TrustGrid";

const AgentMarketplace = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleExploreCapabilities = (productId: string) => {
    navigate(`/agent-marketplace/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <MarketplaceHero />

      {/* Global Triage (Categories) */}
      <CategoryNavigation
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Product Grid: The Service Tiers */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SolutionCard
              assetId="ASSET_ID: FB-MSG-01"
              headline="FB_MESSENGER_AUTOMATION"
              keyBenefit="Turn your page into a 24/7 lead-capture machine. Includes AI-driven qualification and instant FAQ responses."
              humanTouchLabel="[ FULL_CONCIERGE_SETUP_INCLUDED ]"
              price="999"
              onExploreCapabilities={() => handleExploreCapabilities('fb-concierge')}
            />
            <SolutionCard
              assetId="ASSET_ID: GMAIL-INBOX-01"
              headline="GMAIL_INBOX_TRIAGE"
              keyBenefit="Eliminate manual inbox management. AI automatically categorizes, prioritizes, and drafts responses based on intent and urgency."
              humanTouchLabel="[ FULL_CONCIERGE_SETUP_INCLUDED ]"
              price="799"
              onExploreCapabilities={() => handleExploreCapabilities('gmail-triage')}
            />
            <SolutionCard
              assetId="ASSET_ID: WEB-INTEL-01"
              headline="WEB_INTELLIGENCE_CORE"
              keyBenefit="Transform your website into an intelligent data collection and processing hub with automated workflows and insights."
              humanTouchLabel="[ FULL_CONCIERGE_SETUP_INCLUDED ]"
              price="1,199"
              onExploreCapabilities={() => handleExploreCapabilities('web-core')}
            />
          </div>
        </div>
      </section>

      {/* Operational Standards */}
      <TrustGrid />
        </div>
  );
};

export default AgentMarketplace;
