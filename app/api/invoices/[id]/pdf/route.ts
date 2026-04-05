import { NextResponse } from "next/server";
export const runtime = "nodejs";
import { pdf } from "@react-pdf/renderer";
import InvoicePdf from "@/components/invoice/InvoicePdf";
import { getInvoiceById } from "@/lib/billing-actions";
import { getSiteSettings } from "@/lib/site-settings";

function toAbsoluteUrl(url: string | null | undefined, host: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (!host) return url;
  return `${host}${url}`;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const res = await getInvoiceById(params.id);
  if (!res.success || !res.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const settings = await getSiteSettings();
  const host = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "";
  const logo = toAbsoluteUrl(settings?.logoUrl ?? "/header-logo-black.png", host);

  const doc = (
    <InvoicePdf
      invoice={res.data}
      logoUrl={logo ?? undefined}
      siteName={settings?.siteName ?? "Driplare"}
      companyAddress={settings?.companyAddress ?? null}
      companyPhone={settings?.companyPhone ?? null}
      companyEmail={settings?.companyEmail ?? null}
      companyWebsite={settings?.companyWebsite ?? null}
      companyVatNumber={settings?.companyVatNumber ?? null}
      paymentInstructions={settings?.paymentInstructions ?? null}
      invoiceFooterNote={settings?.invoiceFooterNote ?? null}
    />
  );

  const buffer = await pdf(doc).toBuffer();
  const filename = `${res.data.invoiceNumber ?? res.data.id}.pdf`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
    },
  });
}
