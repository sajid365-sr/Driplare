"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InvoicePreview from "@/components/invoice/InvoicePreview";

interface InvoiceCreatePageProps {
  logoUrl?: string | null;
  siteName?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyVatNumber?: string | null;
  paymentInstructions?: string | null;
  invoiceFooterNote?: string | null;
}

const PRODUCT_TYPES = ["agent", "automation", "website", "custom"] as const;

type ProductType = (typeof PRODUCT_TYPES)[number];

export default function InvoiceCreatePage({
  logoUrl,
  siteName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyWebsite,
  companyVatNumber,
  paymentInstructions,
  invoiceFooterNote,
}: InvoiceCreatePageProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    productType: "agent" as ProductType,
    productName: "",
    totalAmount: "",
    depositPercent: "50",
    timelineSummary: "",
    scopeSummary: "",
    termsNote: "50% upfront deposit, 50% after delivery.",
    refundNote: "Refunds are handled case-by-case after delivery review.",
    dueDate: "",
  });

  useEffect(() => {
    const presetName = params.get("name") ?? "";
    const presetEmail = params.get("email") ?? "";
    const presetProductName = params.get("productName") ?? "";
    const presetProductType = (params.get("productType") as ProductType) ?? "agent";

    setForm((f) => ({
      ...f,
      customerName: presetName || f.customerName,
      customerEmail: presetEmail || f.customerEmail,
      productName: presetProductName || f.productName,
      productType: PRODUCT_TYPES.includes(presetProductType) ? presetProductType : f.productType,
    }));
  }, [params]);

  const depositAmount = useMemo(() => {
    const total = Number(form.totalAmount || 0);
    const percent = Number(form.depositPercent || 0);
    return Number(((total * percent) / 100).toFixed(2));
  }, [form.totalAmount, form.depositPercent]);

  const remainingAmount = useMemo(() => {
    const total = Number(form.totalAmount || 0);
    return Number((total - depositAmount).toFixed(2));
  }, [form.totalAmount, depositAmount]);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleCreate() {
    if (!form.customerName || !form.customerEmail || !form.productName || !form.totalAmount) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      const res = await fetch("/api/admin/invoices/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          productType: form.productType,
          productName: form.productName,
          totalAmount: Number(form.totalAmount),
          depositPercent: Number(form.depositPercent || "50"),
          timelineSummary: form.timelineSummary || undefined,
          scopeSummary: form.scopeSummary || undefined,
          termsNote: form.termsNote || undefined,
          refundNote: form.refundNote || undefined,
          dueDate: form.dueDate || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "Failed to create invoice");
        return;
      }
      toast.success(`Invoice ${data.invoiceNumber} created`);
      router.push(`/invoice/${data.invoiceId}`);
    } catch (error) {
      toast.error("Failed to create invoice");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p className="text-muted-foreground text-sm">Fill details and preview before sending.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Customer name" value={form.customerName} onChange={(e) => set("customerName")(e.target.value)} />
            <Input placeholder="Customer email" value={form.customerEmail} onChange={(e) => set("customerEmail")(e.target.value)} />
            <select className="w-full border rounded-md px-3 py-2 text-sm" value={form.productType} onChange={(e) => set("productType")(e.target.value)}>
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
          <textarea className="w-full border rounded-md px-3 py-2 text-sm" rows={3} placeholder="Scope summary" value={form.scopeSummary} onChange={(e) => set("scopeSummary")(e.target.value)} />
          <textarea className="w-full border rounded-md px-3 py-2 text-sm" rows={2} placeholder="Terms note" value={form.termsNote} onChange={(e) => set("termsNote")(e.target.value)} />
          <textarea className="w-full border rounded-md px-3 py-2 text-sm" rows={2} placeholder="Refund note" value={form.refundNote} onChange={(e) => set("refundNote")(e.target.value)} />

          <div className="flex justify-end">
            <Button onClick={handleCreate}>Create Invoice</Button>
          </div>
        </div>

        <div>
          <InvoicePreview
            logoUrl={logoUrl}
            siteName={siteName}
            companyAddress={companyAddress}
            companyPhone={companyPhone}
            companyEmail={companyEmail}
            companyWebsite={companyWebsite}
            companyVatNumber={companyVatNumber}
            paymentInstructions={paymentInstructions}
            invoiceFooterNote={invoiceFooterNote}
            customerName={form.customerName}
            customerEmail={form.customerEmail}
            productName={form.productName}
            scopeSummary={form.scopeSummary}
            termsNote={form.termsNote}
            refundNote={form.refundNote}
            totalAmount={Number(form.totalAmount || 0)}
            depositAmount={depositAmount}
            remainingAmount={remainingAmount}
            totalPaid={0}
            mode="preview"
          />
        </div>
      </div>
    </div>
  );
}
