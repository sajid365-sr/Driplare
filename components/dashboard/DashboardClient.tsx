"use client";

import { useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { FileText, CreditCard, Workflow, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardClient({
  invoices,
  projects,
  usage,
}: {
  invoices: any[];
  projects: any[];
  usage: any[];
}) {
  const payments = useMemo(() => {
    const rows: any[] = [];
    invoices.forEach((inv) => {
      (inv.payments ?? []).forEach((p: any) => rows.push({ ...p, invoiceId: inv.id }));
    });
    return rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [invoices]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-black">Client Dashboard</h1>
        <p className="text-sm text-muted-foreground">All your invoices, payments, and usage in one place.</p>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-2">
              <TabsList className="flex flex-col gap-1 h-auto bg-transparent">
                <TabsTrigger value="invoices" className="justify-start gap-2">
                  <FileText className="w-4 h-4" /> Invoices
                </TabsTrigger>
                <TabsTrigger value="payments" className="justify-start gap-2">
                  <CreditCard className="w-4 h-4" /> Payments
                </TabsTrigger>
                <TabsTrigger value="projects" className="justify-start gap-2">
                  <Workflow className="w-4 h-4" /> Projects
                </TabsTrigger>
                <TabsTrigger value="usage" className="justify-start gap-2">
                  <BarChart3 className="w-4 h-4" /> API Usage
                </TabsTrigger>
              </TabsList>
            </Card>
          </div>

          <div>
            <TabsContent value="invoices">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  {invoices.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No invoices yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {invoices.map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between border rounded-xl p-4">
                          <div>
                            <div className="font-semibold">{inv.project?.productName ?? "Service"}</div>
                            <div className="text-xs text-muted-foreground">
                              {inv.status} • {format(new Date(inv.createdAt), "MMM dd, yyyy")}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">৳{inv.totalAmount.toLocaleString()}</div>
                            <Link href={`/dashboard/invoices/${inv.id}`} className="text-xs text-primary font-semibold">
                              View invoice
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  {payments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No payments yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {payments.map((p) => (
                        <div key={p.id} className="flex items-center justify-between border rounded-xl p-4">
                          <div>
                            <div className="font-semibold capitalize">{p.status}</div>
                            <div className="text-xs text-muted-foreground">
                              {p.method} • {p.transactionId ?? p.gatewayRef ?? "pending"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">৳{p.amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              {p.createdAt ? format(new Date(p.createdAt), "MMM dd, yyyy") : "-"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No active projects yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {projects.map((p) => (
                        <div key={p.id} className="border rounded-xl p-4">
                          <div className="font-semibold">{p.productName}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Status: {p.status} • {p.timeline ?? "Timeline pending"}
                          </div>
                          {p.nextAction && (
                            <div className="text-xs text-muted-foreground mt-1">Next: {p.nextAction}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  {usage.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No usage data yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {usage.map((u) => (
                        <div key={u.id} className="flex items-center justify-between border rounded-xl p-4">
                          <div>
                            <div className="font-semibold">{u.period}</div>
                            <div className="text-xs text-muted-foreground">
                              Messages: {u.messageCount} • Tokens: {u.tokenCount}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">৳{u.cost.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{u.currency}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
