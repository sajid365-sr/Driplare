"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  Briefcase,
  FileText,
  Users,
  Bell,
  Settings,
  FormInput,
  BellDot,
  MessageCircle,
  CreditCard,
  KeyRound,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* --- Admin Specific Navbar --- */}
      <header className="h-16 border-b bg-background/95 backdrop-blur sticky top-0 z-50 flex items-center px-8 justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
            D
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">Driplare Admin</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
              Management Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-muted-foreground hover:text-primary transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none">Super Admin</p>
              <p className="text-xs text-muted-foreground mt-1">
                {emailAddress}
              </p>
            </div>

            <UserButton />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* --- Fixed Sidebar --- */}
        <aside className="hidden md:block w-64 border-r bg-background/50 h-[calc(100vh-64px)] sticky top-24 overflow-y-auto">
          <nav className="flex flex-col gap-2 p-4">
            <NavItem
              href="/admin"
              icon={<LayoutDashboard size={18} />}
              label="Overview"
            />
            <NavItem
              href="/admin/leads"
              icon={<MessageCircle size={18} />}
              label="Leads"
            />
            <NavItem
              href="/admin/invoices"
              icon={<CreditCard size={18} />}
              label="Invoices"
            />

            <div className="text-xs font-semibold text-muted-foreground mt-4 mb-2 px-4">
              CONTENT
            </div>
            <NavItem
              href="/admin/form-submission"
              icon={<FormInput size={18} />}
              label="Form Submission"
            />
            <NavItem
              href="/admin/case-studies"
              icon={<Briefcase size={18} />}
              label="Case Studies"
            />
            <NavItem
              href="/admin/reviews"
              icon={<Briefcase size={18} />}
              label="Client Reviews"
            />
            <NavItem
              href="/admin/blogs"
              icon={<FileText size={18} />}
              label="Blogs"
            />

            <div className="text-xs font-semibold text-muted-foreground mt-4 mb-2 px-4">
              SYSTEM
            </div>
            <NavItem
              href="/admin/notification"
              icon={<BellDot size={18} />}
              label="Notification"
            />
            <NavItem
              href="/admin/users"
              icon={<Users size={18} />}
              label="User Management"
            />
            <NavItem
              href="/admin/settings"
              icon={<Settings size={18} />}
              label="Settings"
            />
            <NavItem
              href="/admin/api-keys"
              icon={<KeyRound size={18} />}
              label="Client API Keys"
            />
          </nav>
        </aside>

        {/* --- Main Content Area (Dynamic) --- */}
        <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

// Helper Component for Sidebar Links
function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
