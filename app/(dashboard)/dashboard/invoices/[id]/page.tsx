import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getInvoiceById } from "@/lib/billing-actions";
import { getSiteSettings } from "@/lib/site-settings";
import InvoiceClient from "@/components/invoice/InvoiceClient";

export default async function DashboardInvoicePage({ params }: { params: { id: string } }) {
  const { userId, sessionClaims } = auth();
  const user = await currentUser();
  if (!userId || !user) {
    redirect(`/sign-in?redirect_url=/dashboard/invoices/${params.id}`);
  }

  const res = await getInvoiceById(params.id);
  if (!res.success || !res.data) {
    notFound();
  }

  const invoice = res.data as any;
  const role =
    (user.publicMetadata?.role as string | undefined) ??
    ((user as any).privateMetadata?.role as string | undefined) ??
    (sessionClaims?.metadata?.role as string | undefined) ??
    (sessionClaims?.publicMetadata?.role as string | undefined);
  const isAdmin = role === "admin" || role === "system_admin";

  if (!isAdmin) {
    const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    const invoiceEmail = invoice.customerEmail?.toLowerCase();
    if (!email || !invoiceEmail || email !== invoiceEmail) {
      notFound();
    }
  }

  const settings = await getSiteSettings();

  return (
    <InvoiceClient
      invoice={invoice}
      logoUrl={settings?.logoUrl ?? "/header-logo-black.png"}
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
}
