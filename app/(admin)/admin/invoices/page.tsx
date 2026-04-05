import Link from "next/link";
import { getAllInvoices } from "@/lib/billing-actions";
import InvoicesTable from "@/components/admin/invoices/InvoicesTable";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Invoices | Driplare Admin",
  description: "Create and manage client invoices",
};

export default async function InvoicesPage() {
  const res = await getAllInvoices();
  const invoices = res.success ? res.data : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invoices</h1>
          <p className="text-muted-foreground">Create invoices and track payment status</p>
        </div>
        <Link href="/admin/invoices/new">
          <Button>Create Invoice</Button>
        </Link>
      </div>
      <InvoicesTable initialInvoices={invoices || []} />
    </div>
  );
}
