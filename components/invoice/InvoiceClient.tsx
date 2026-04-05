"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoicePreview from "@/components/invoice/InvoicePreview";

interface InvoiceClientProps {
  invoice: any;
  logoUrl?: string;
  siteName?: string;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyVatNumber?: string | null;
  paymentInstructions?: string | null;
  invoiceFooterNote?: string | null;
}

export default function InvoiceClient({
  invoice,
  logoUrl,
  siteName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyWebsite,
  companyVatNumber,
  paymentInstructions,
  invoiceFooterNote,
}: InvoiceClientProps) {
  const [loading, setLoading] = useState<null | "deposit" | "remaining">(null);

  const payments = invoice.payments ?? [];
  const totalPaid = useMemo(
    () => payments.filter((p: any) => p.status === "paid").reduce((sum: number, p: any) => sum + p.amount, 0),
    [payments],
  );

  const canPayDeposit = totalPaid < invoice.depositAmount;
  const canPayRemaining =
    !!invoice.deliveredAt && totalPaid >= invoice.depositAmount && totalPaid < invoice.totalAmount;

  async function startPayment(type: "deposit" | "remaining") {
    try {
      setLoading(type);
      const res = await fetch("/api/payments/sslcommerz/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, amountType: type }),
      });
      const data = await res.json();
      if (data?.gatewayUrl) {
        window.location.href = data.gatewayUrl;
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h1 className="text-2xl font-black">Invoice</h1>
        <div className="flex items-center gap-2">
          <a href={`/api/invoices/${invoice.id}/pdf`} className="text-sm font-semibold text-primary">
            Download PDF
          </a>
          <Button variant="outline" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div id="invoice-print">
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
              invoiceNumber={invoice.invoiceNumber}
              issuedAt={invoice.issuedAt}
              dueDate={invoice.dueDate}
              customerName={invoice.customerName}
              customerEmail={invoice.customerEmail}
              productName={invoice.project?.productName ?? "Service"}
              scopeSummary={invoice.scopeSummary}
              termsNote={invoice.termsNote}
              refundNote={invoice.refundNote}
              totalAmount={invoice.totalAmount}
              depositAmount={invoice.depositAmount}
              remainingAmount={invoice.remainingAmount}
              totalPaid={totalPaid}
              mode="print"
            />
          </div>

          <div className="rounded-2xl border bg-card/80 p-6 print:hidden">
            <h2 className="text-base font-black mb-4">Payment History</h2>
            {payments.length === 0 ? (
              <div className="text-sm text-muted-foreground">No payments yet.</div>
            ) : (
              <div className="space-y-3">
                {payments.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${p.status === "paid" ? "text-emerald-500" : "text-muted-foreground"}`}
                      />
                      <span>{p.method}</span>
                      <span className="text-muted-foreground">#{p.transactionId ?? p.gatewayRef ?? "pending"}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">৳{p.amount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {p.createdAt ? format(new Date(p.createdAt), "MMM dd, yyyy") : "-"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start print:hidden">
          <div className="rounded-2xl border bg-card/80 p-6">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-3xl font-black">৳{invoice.totalAmount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Deposit: ৳{invoice.depositAmount.toLocaleString()} • Remaining: ৳{invoice.remainingAmount.toLocaleString()}
            </div>
            <div className="mt-6 space-y-2">
              {canPayDeposit && (
                <Button
                  className="w-full bg-primary text-white font-black"
                  disabled={loading === "deposit"}
                  onClick={() => startPayment("deposit")}
                >
                  {loading === "deposit" ? "Processing..." : "Pay 50% Deposit"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {canPayRemaining && (
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-600/90 text-white font-black"
                  disabled={loading === "remaining"}
                  onClick={() => startPayment("remaining")}
                >
                  {loading === "remaining" ? "Processing..." : "Pay Remaining 50%"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {!canPayRemaining && totalPaid >= invoice.depositAmount && !invoice.deliveredAt && (
                <div className="text-xs text-muted-foreground">
                  Remaining payment unlocks after delivery confirmation.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/40 p-5 text-xs text-muted-foreground">
            We keep all payments inside your Driplare account for full tracking and transparency.
          </div>
        </div>
      </div>
    </div>
  );
}
