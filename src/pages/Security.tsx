import { TrustHero } from "@/components/security/TrustHero";
import { SecurityGrid } from "@/components/security/SecurityGrid";
import { DataFlowVisual } from "@/components/security/DataFlowVisual";
import { CategorizedFAQ } from "@/components/security/CategorizedFAQ";
import { ComplianceLogos } from "@/components/security/ComplianceLogos";
import { SecurityCTA } from "@/components/security/SecurityCTA";

export default function Security() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section: The Reliability Standard */}
      <TrustHero />

      {/* 2. Our Security Pillars */}
      <SecurityGrid />

      {/* 3. Visualizing the Secure Flow */}
      <DataFlowVisual />

      {/* 4. The Knowledge Base */}
      <CategorizedFAQ />

      {/* 5. Compliance & Hosting */}
      <ComplianceLogos />

      {/* 6. Final Call to Action */}
      <SecurityCTA />
    </div>
  );
}
