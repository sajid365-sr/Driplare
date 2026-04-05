import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-[calc(100vh-64px)] bg-muted/30">
        {children}
      </main>
    </>
  );
}
