import { NextResponse } from "next/server";
import { z } from "zod";
import { createProjectAndInvoice } from "@/lib/billing-actions";

const schema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  productType: z.enum(["agent", "automation", "website", "custom"]),
  productName: z.string().min(1),
  totalAmount: z.number().positive(),
  depositPercent: z.number().min(1).max(100).optional(),
  timelineSummary: z.string().optional(),
  scopeSummary: z.string().optional(),
  termsNote: z.string().optional(),
  refundNote: z.string().optional(),
  dueDate: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const payload = parsed.data;
    const res = await createProjectAndInvoice({
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      productType: payload.productType,
      productName: payload.productName,
      totalAmount: payload.totalAmount,
      depositPercent: payload.depositPercent,
      timelineSummary: payload.timelineSummary,
      scopeSummary: payload.scopeSummary,
      termsNote: payload.termsNote,
      refundNote: payload.refundNote,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
    });

    if (!res.success || !res.data) {
      return NextResponse.json({ error: res.error ?? "Failed to create invoice" }, { status: 500 });
    }

    return NextResponse.json({
      invoiceId: res.data.invoice.id,
      invoiceNumber: res.data.invoice.invoiceNumber,
    });
  } catch (error) {
    console.error("invoice create api error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
