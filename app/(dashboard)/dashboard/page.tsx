import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUserWithDb } from "@/lib/auth-action";
import { getUserInvoices, getUserProjects } from "@/lib/billing-actions";
import { getApiUsageForUser } from "@/lib/usage-actions";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in?redirect_url=/dashboard");
  }

  const syncRes = await syncUserWithDb();
  if (!syncRes.success || !syncRes.user) {
    redirect("/");
  }

  const dbUser = syncRes.user as any;
  const email = user.emailAddresses?.[0]?.emailAddress ?? "";

  const [invRes, projRes, usageRes] = await Promise.all([
    getUserInvoices(dbUser.id, email),
    getUserProjects(dbUser.id, email),
    getApiUsageForUser(dbUser.id),
  ]);

  return (
    <DashboardClient
      invoices={invRes.success ? (invRes.data as any[]) : []}
      projects={projRes.success ? (projRes.data as any[]) : []}
      usage={usageRes.success ? (usageRes.data as any[]) : []}
    />
  );
}
