

import React from "react";
import AgentMarketplaceClient from "@/components/agent-marketplace/AgentMarketplaceClient";
import { getAllAgents } from "@/lib/agent-marketplace-action";

// export const metadata = {
//   title: "AI Agent Marketplace | Driplare",
//   description: "Discover powerful AI agents designed to automate your business processes, boost productivity, and drive innovation.",
// };

export default async function AgentMarketplacePage() {





  const result = await getAllAgents();
  const initialAgents = result.success ? result.data : [];

  return <AgentMarketplaceClient initialAgents={initialAgents || []} />;

}