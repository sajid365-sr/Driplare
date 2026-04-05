import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updatePaymentStatus } from "@/lib/billing-actions";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const tranId = String(form.get("tran_id") ?? "");
    const status = String(form.get("status") ?? "").toLowerCase();
    const valId = String(form.get("val_id") ?? "");

    const payment = await prisma.payment.findFirst({
      where: { gatewayRef: tranId },
    });
    if (!payment) return NextResponse.json({ ok: true });

    if (status === "valid" || status === "validated") {
      await updatePaymentStatus({
        paymentId: payment.id,
        status: "paid",
        transactionId: valId || tranId,
      });
    } else if (status === "failed") {
      await updatePaymentStatus({
        paymentId: payment.id,
        status: "failed",
        transactionId: tranId,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("sslcommerz ipn error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
