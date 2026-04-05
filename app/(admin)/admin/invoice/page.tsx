import { redirect } from "next/navigation";

export default function AdminInvoiceRedirect() {
  redirect("/admin/invoices");
}
