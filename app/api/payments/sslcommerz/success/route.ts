import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updatePaymentStatus } from "@/lib/billing-actions";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const tranId = String(form.get("tran_id") ?? "");
    const valId = String(form.get("val_id") ?? "");

    const payment = await prisma.payment.findFirst({
      where: { gatewayRef: tranId },
    });
    if (!payment) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    await updatePaymentStatus({
      paymentId: payment.id,
      status: "paid",
      transactionId: valId || tranId,
    });

    return NextResponse.redirect(new URL(`/invoice/${payment.invoiceId}`, req.url));
  } catch (error) {
    console.error("sslcommerz success error:", error);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
