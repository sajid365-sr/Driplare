// app/marketplace/page.tsx  — Server Component
import { getAllMarketplaceProducts } from "@/lib/marketplace-action";
import { MarketplaceClient } from "@/components/agent-marketplace/MarketplaceClient";

export const metadata = {
  title: "Marketplace | Driplare — AI Agents, Automations & Websites",
  description:
    "Browse ready-made AI agents, workflow automations, and website packages. Deploy in minutes, not months.",
};

export default async function MarketplacePage() {
  const { agents, automations, websites } = await getAllMarketplaceProducts();
  return (
    <MarketplaceClient
      agents={agents}
      automations={automations}
      websites={websites}
    />
  );
}