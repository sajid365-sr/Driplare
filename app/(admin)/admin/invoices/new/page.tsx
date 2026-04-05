import InvoiceCreatePage from "@/components/admin/invoices/InvoiceCreatePage";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = {
  title: "Create Invoice | Driplare Admin",
  description: "Create a professional invoice",
};

export default async function NewInvoicePage() {
  const settings = await getSiteSettings();

  return (
    <InvoiceCreatePage
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
