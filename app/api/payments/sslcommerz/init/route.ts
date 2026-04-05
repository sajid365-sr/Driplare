import { NextResponse } from "next/server";
import { getInvoiceById, createPaymentRecord } from "@/lib/billing-actions";
import { prisma } from "@/lib/prisma";

function getBaseUrl() {
  const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
  return isLive
    ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
    : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceId, amountType } = body as {
      invoiceId: string;
      amountType: "deposit" | "remaining";
    };

    const res = await getInvoiceById(invoiceId);
    if (!res.success || !res.data) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    const invoice = res.data as any;

    const amount =
      amountType === "deposit" ? invoice.depositAmount : invoice.remainingAmount;

    if (amountType === "remaining" && !invoice.deliveredAt) {
      return NextResponse.json({ error: "Remaining payment locked" }, { status: 400 });
    }

    const tranId = `driplare_${invoice.id}_${Date.now()}`;

    const paymentRes = await createPaymentRecord({
      invoiceId: invoice.id,
      userId: invoice.userId ?? undefined,
      amount,
      currency: invoice.currency ?? "BDT",
      method: "sslcommerz",
      gatewayRef: tranId,
    });

    if (!paymentRes.success || !paymentRes.data) {
      return NextResponse.json({ error: "Payment init failed" }, { status: 500 });
    }

    const storeId = process.env.SSLCOMMERZ_STORE_ID ?? "";
    const storePass = process.env.SSLCOMMERZ_STORE_PASS ?? "";
    if (!storeId || !storePass) {
      return NextResponse.json({ error: "Gateway not configured" }, { status: 500 });
    }

    const url = getBaseUrl();
    const baseSite =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const form = new URLSearchParams();
    form.append("store_id", storeId);
    form.append("store_passwd", storePass);
    form.append("total_amount", amount.toString());
    form.append("currency", invoice.currency ?? "BDT");
    form.append("tran_id", tranId);
    form.append("success_url", `${baseSite}/api/payments/sslcommerz/success`);
    form.append("fail_url", `${baseSite}/api/payments/sslcommerz/fail`);
    form.append("cancel_url", `${baseSite}/api/payments/sslcommerz/fail`);
    form.append("ipn_url", `${baseSite}/api/payments/sslcommerz/ipn`);
    form.append("cus_name", invoice.customerName);
    form.append("cus_email", invoice.customerEmail);
    form.append("product_name", invoice.project?.productName ?? "Service");
    form.append("product_category", "Service");
    form.append("product_profile", "general");

    const gatewayRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      cache: "no-store",
    });

    const data = await gatewayRes.json();

    if (!data?.GatewayPageURL) {
      await prisma.payment.update({
        where: { id: paymentRes.data.id },
        data: { status: "failed" },
      });
      return NextResponse.json({ error: "Gateway error", details: data }, { status: 502 });
    }

    return NextResponse.json({
      gatewayUrl: data.GatewayPageURL,
      paymentId: paymentRes.data.id,
    });
  } catch (error) {
    console.error("sslcommerz init error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
