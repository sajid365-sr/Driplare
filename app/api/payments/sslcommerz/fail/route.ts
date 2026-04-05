import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updatePaymentStatus } from "@/lib/billing-actions";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const tranId = String(form.get("tran_id") ?? "");
    const payment = await prisma.payment.findFirst({
      where: { gatewayRef: tranId },
    });
    if (payment) {
      await updatePaymentStatus({
        paymentId: payment.id,
        status: "failed",
        transactionId: tranId,
      });
    }
    return payment
      ? NextResponse.redirect(new URL(`/invoice/${payment.invoiceId}`, req.url))
      : NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("sslcommerz fail error:", error);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
