"use client";

import { format } from "date-fns";

interface InvoicePreviewProps {
  logoUrl?: string | null;
  siteName?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  companyVatNumber?: string | null;
  paymentInstructions?: string | null;
  invoiceFooterNote?: string | null;
  invoiceNumber?: string | null;
  issuedAt?: Date | string | null;
  dueDate?: Date | string | null;
  customerName?: string;
  customerEmail?: string;
  productName?: string;
  scopeSummary?: string | null;
  termsNote?: string | null;
  refundNote?: string | null;
  totalAmount: number;
  depositAmount: number;
  remainingAmount: number;
  totalPaid?: number;
  mode?: "preview" | "print";
}

export default function InvoicePreview({
  logoUrl,
  siteName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyWebsite,
  companyVatNumber,
  paymentInstructions,
  invoiceFooterNote,
  invoiceNumber,
  issuedAt,
  dueDate,
  customerName,
  customerEmail,
  productName,
  scopeSummary,
  termsNote,
  refundNote,
  totalAmount,
  depositAmount,
  remainingAmount,
  totalPaid = 0,
  mode = "preview",
}: InvoicePreviewProps) {
  const issuedLabel = issuedAt ? format(new Date(issuedAt), "MMM dd, yyyy") : format(new Date(), "MMM dd, yyyy");
  const dueLabel = dueDate ? format(new Date(dueDate), "MMM dd, yyyy") : "—";
  const amountDue = Math.max(totalAmount - totalPaid, 0);

  const companyLines = [companyAddress, companyPhone, companyEmail, companyWebsite, companyVatNumber]
    .filter(Boolean)
    .map((line) => String(line));

  return (
    <div className={`rounded-2xl border bg-white text-slate-900 ${mode === "print" ? "p-8" : "p-6"}`}>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={siteName ?? "Logo"} className="h-12 w-auto" />
          ) : (
            <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              D
            </div>
          )}
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Invoice</div>
            <div className="text-xl font-black leading-tight">{siteName ?? "Driplare"}</div>
            {companyLines.length > 0 && (
              <div className="mt-2 text-xs text-slate-500 space-y-1">
                {companyLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-left md:text-right text-sm">
          <div className="text-xs uppercase tracking-widest text-slate-400">Invoice No.</div>
          <div className="font-semibold text-base">{invoiceNumber ?? "INV-YYYY-XXXX"}</div>
          <div className="text-xs text-slate-500 mt-2">Issued: {issuedLabel}</div>
          <div className="text-xs text-slate-500">Due: {dueLabel}</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 text-sm">
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500">Bill To</div>
          <div className="mt-2 font-semibold">{customerName || "Client Name"}</div>
          <div className="text-slate-600 text-xs">{customerEmail || "client@email.com"}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500">Service</div>
          <div className="mt-2 font-semibold">{productName || "Service Name"}</div>
          {scopeSummary && <div className="text-xs text-slate-600 mt-1">{scopeSummary}</div>}
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-[1fr_80px_140px_140px] text-[11px] uppercase tracking-widest text-slate-400 border-b pb-2">
          <div>Description</div>
          <div className="text-right">Qty</div>
          <div className="text-right">Rate</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="grid grid-cols-[1fr_80px_140px_140px] text-sm border-b py-3">
          <div className="font-semibold">{productName || "Service"}</div>
          <div className="text-right">1</div>
          <div className="text-right">৳{totalAmount.toLocaleString()}</div>
          <div className="text-right font-semibold">৳{totalAmount.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span>৳{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Deposit</span>
            <span>৳{depositAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Paid</span>
            <span>৳{totalPaid.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Remaining</span>
            <span>৳{remainingAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-base font-bold pt-2 border-t">
            <span>Amount Due</span>
            <span>৳{amountDue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 text-xs text-slate-600">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-slate-500">Terms</div>
          <div className="mt-2">{termsNote || "50% upfront deposit, 50% after delivery."}</div>
          {refundNote && <div className="mt-2">Refund: {refundNote}</div>}
        </div>
        {paymentInstructions && (
          <div>
            <div className="text-[11px] uppercase tracking-widest text-slate-500">Payment Instructions</div>
            <div className="mt-2 whitespace-pre-line">{paymentInstructions}</div>
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        {invoiceFooterNote ?? "Thank you for choosing Driplare. We appreciate your trust."}
      </div>
    </div>
  );
}
