"use client";

import { useState } from "react";
import { format } from "date-fns";
import { MessageCircle, Mail, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead, LeadStatus } from "@/types/lead-types";
import { updateLead } from "@/lib/lead-actions";

interface LeadsTableProps {
  initialLeads: Lead[];
}

export default function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter === "all") return true;
    return lead.status === statusFilter;
  });

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const result = await updateLead({ id: leadId, status: newStatus });
    
    if (result.success) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      new: { color: "bg-blue-100 text-blue-800", label: "New" },
      contacted: { color: "bg-yellow-100 text-yellow-800", label: "Contacted" },
      qualified: { color: "bg-green-100 text-green-800", label: "Qualified" },
      "proposal-sent": { color: "bg-purple-100 text-purple-800", label: "Proposal Sent" },
      paid: { color: "bg-emerald-100 text-emerald-800", label: "Paid" },
      completed: { color: "bg-gray-100 text-gray-800", label: "Completed" },
      "closed-lost": { color: "bg-red-100 text-red-800", label: "Closed Lost" },
    };

    const variant = variants[status] || variants.new;
    return (
      <Badge className={`${variant.color} border-0`}>
        {variant.label}
      </Badge>
    );
  };

  const openWhatsApp = (whatsapp: string, name: string) => {
    const message = encodeURIComponent(`Hi ${name}! Following up on your AI agent inquiry...`);
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="closed-lost">Closed Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No leads found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(lead.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <MessageCircle className="h-3 w-3" />
                          {lead.whatsapp}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{lead.agentName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.platform}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{lead.businessType || "-"}</TableCell>
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue>{getStatusBadge(lead.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="closed-lost">Closed Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openWhatsApp(lead.whatsapp, lead.name)}
                        className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-0"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}