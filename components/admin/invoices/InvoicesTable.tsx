"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { markInvoiceDelivered } from "@/lib/billing-actions";

export default function InvoicesTable({ initialInvoices }: { initialInvoices: any[] }) {
  const [invoices, setInvoices] = useState(initialInvoices);

  const handleDelivered = async (id: string) => {
    const res = await markInvoiceDelivered(id);
    if (res.success) {
      setInvoices((prev) =>
        prev.map((i: any) => (i.id === id ? { ...i, deliveredAt: new Date().toISOString() } : i)),
      );
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle>Invoices</CardTitle>
        <Link href="/admin/invoices/new" className="text-sm font-semibold text-primary">
          Create Invoice
        </Link>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        ) : (
          <div className="space-y-3">
            {invoices.map((inv: any) => (
              <div key={inv.id} className="flex items-center justify-between border rounded-xl p-4">
                <div>
                  <div className="font-semibold">{inv.project?.productName ?? inv.customerName}</div>
                  <div className="text-xs text-muted-foreground">
                    {inv.customerEmail} • {format(new Date(inv.createdAt), "MMM dd, yyyy")}
                  </div>
                  {inv.invoiceNumber && (
                    <div className="text-xs text-muted-foreground">Invoice: {inv.invoiceNumber}</div>
                  )}
                  <div className="text-xs text-muted-foreground">Status: {inv.status}</div>
                </div>
                <div className="text-right space-y-2">
                  <div className="font-bold">৳{inv.totalAmount.toLocaleString()}</div>
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/invoice/${inv.id}`} className="text-xs text-primary font-semibold">
                      View Invoice
                    </Link>
                    {!inv.deliveredAt && (
                      <Button size="sm" variant="outline" onClick={() => handleDelivered(inv.id)}>
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
