import React from "react";
import { getAllLeads, getLeadStats } from "@/lib/lead-actions";
import LeadsTable from "@/components/admin/leads/LeadsTable";
import LeadStats from "@/components/admin/leads/LeadStats";

export const metadata = {
  title: "Lead Management | Driplare Admin",
  description: "Manage your leads and track conversions",
};

export default async function LeadsPage() {
  const [leadsResult, statsResult] = await Promise.all([
    getAllLeads(),
    getLeadStats(),
  ]);

  const leads = leadsResult.success ? leadsResult.data : [];
  const stats = statsResult.success ? statsResult.data : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lead Management</h1>
        <p className="text-muted-foreground">
          Track and manage your customer inquiries
        </p>
      </div>

      {/* Stats Cards */}
      {stats && <LeadStats stats={stats} />}

      {/* Leads Table */}
      <div className="mt-8">
        <LeadsTable initialLeads={leads || []} />
      </div>
    </div>
  );
}