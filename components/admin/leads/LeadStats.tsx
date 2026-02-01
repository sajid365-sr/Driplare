"use client";

import { Users, UserCheck, DollarSign, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeadStatsProps {
  stats: {
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    paidLeads: number;
    completedLeads: number;
    conversionRates: {
      leadToQualified: number;
      qualifiedToPaid: number;
      overallConversion: number;
    };
  };
}

export default function LeadStats({ stats }: LeadStatsProps) {
  const statCards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: UserCheck,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Qualified",
      value: stats.qualifiedLeads,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Paid",
      value: stats.paidLeads,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversion Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conversion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Lead → Qualified
              </p>
              <p className="text-2xl font-bold text-green-600">
                {stats.conversionRates.leadToQualified}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Qualified → Paid
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.conversionRates.qualifiedToPaid}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Overall Conversion
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.conversionRates.overallConversion}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}