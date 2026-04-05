"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProjectAndInvoice } from "@/lib/billing-actions";

const PRODUCT_TYPES = ["agent", "automation", "website", "custom"] as const;

interface InvoiceCreateDialogProps {
  triggerLabel?: string;
  preset?: Partial<{
    customerName: string;
    customerEmail: string;
    productType: "agent" | "automation" | "website" | "custom";
    productName: string;
  }>;
}

export default function InvoiceCreateDialog({ triggerLabel = "Create Invoice", preset }: InvoiceCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: preset?.customerName ?? "",
    customerEmail: preset?.customerEmail ?? "",
    productType: preset?.productType ?? "agent",
    productName: preset?.productName ?? "",
    totalAmount: "",
    depositPercent: "50",
    timelineSummary: "",
    scopeSummary: "",
    termsNote: "50% upfront deposit, 50% after delivery.",
    refundNote: "Refunds are handled case-by-case after delivery review.",
    dueDate: "",
  });

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleCreate() {
    if (!form.customerName || !form.customerEmail || !form.productName || !form.totalAmount) return;
    setLoading(true);
    const res = await createProjectAndInvoice({
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      productType: form.productType as any,
      productName: form.productName,
      totalAmount: Number(form.totalAmount),
      depositPercent: Number(form.depositPercent || "50"),
      timelineSummary: form.timelineSummary || undefined,
      scopeSummary: form.scopeSummary || undefined,
      termsNote: form.termsNote || undefined,
      refundNote: form.refundNote || undefined,
      dueDate: form.dueDate ? new Date(form.dueDate) : undefined,
    });
    setLoading(false);
    if (res.success) {
      setOpen(false);
      window.location.reload();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Customer name" value={form.customerName} onChange={(e) => set("customerName")(e.target.value)} />
          <Input placeholder="Customer email" value={form.customerEmail} onChange={(e) => set("customerEmail")(e.target.value)} />
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={form.productType}
            onChange={(e) => set("productType")(e.target.value)}
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <Input placeholder="Product name" value={form.productName} onChange={(e) => set("productName")(e.target.value)} />
          <Input placeholder="Total amount" value={form.totalAmount} onChange={(e) => set("totalAmount")(e.target.value)} />
          <Input placeholder="Deposit %" value={form.depositPercent} onChange={(e) => set("depositPercent")(e.target.value)} />
          <Input placeholder="Timeline (e.g. 2 weeks)" value={form.timelineSummary} onChange={(e) => set("timelineSummary")(e.target.value)} />
          <Input placeholder="Due date (YYYY-MM-DD)" value={form.dueDate} onChange={(e) => set("dueDate")(e.target.value)} />
        </div>
        <div className="mt-3 space-y-2">
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Scope summary"
            rows={3}
            value={form.scopeSummary}
            onChange={(e) => set("scopeSummary")(e.target.value)}
          />
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Terms note"
            rows={2}
            value={form.termsNote}
            onChange={(e) => set("termsNote")(e.target.value)}
          />
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Refund note"
            rows={2}
            value={form.refundNote}
            onChange={(e) => set("refundNote")(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Invoice"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
