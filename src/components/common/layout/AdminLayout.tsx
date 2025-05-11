import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { LogOut, Menu, X } from "lucide-react";

import AdminLoginModal from "../../admin/AdminLoginModal";
import {
  getAdminSession,
  clearAdminSession,
  AdminSession,
} from "@/utils/admin-auth";
import ScrollToTop from "../ScrollToTop";
import { ChatbotWidget } from "../chatbot/ChatbotWidget";
import { initializeNotificationsFromSupabase } from "@/utils/notification-utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Dashboard from "@/pages/admin/Dashboard";
import Analytics from "@/pages/admin/Analytics";
import AdminManagement from "@/pages/admin/AdminManagement";
import Notifications from "@/pages/admin/Notifications";
import AuditLogs from "@/pages/admin/AuditLogs";
import Settings from "@/pages/admin/Settings";
import BlogManager from "@/pages/admin/BlogManager";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ClientReview from "@/pages/admin/ClientReview";

export default function AdminLayout() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Load admin session and check if it exists
    const session = getAdminSession();
    setAdminSession(session);

    // Show login modal if no valid session exists
    if (!session) setShowLoginModal(true);

    // Initialize notifications from Supabase
    initializeNotificationsFromSupabase();

    // Apply dark mode to the admin panel
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const handleLogout = () => {
    clearAdminSession();
    setAdminSession(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleLoginSuccess = () => {
    const session = getAdminSession();
    setAdminSession(session);
    setShowLoginModal(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  // Determine if the current user has permission to access certain tabs
  const canAccessAdminManagement = adminSession?.permissions.canManageAdmins;

  return (
    <main className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Toaster position="top-center" richColors />

      <div className="flex flex-1 flex-col h-screen">
        <header className="flex justify-between items-center p-4 md:px-6 border-b bg-background">
          <div className="flex items-center gap-4">
            <img src="/logo-white.png" alt="Driplare Logo" width={120} />
          </div>

          {isMobile && (
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[240px] sm:w-[300px] pt-10"
              >
                <nav className="flex flex-col space-y-2">
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => handleTabChange("dashboard")}
                  >
                    Submissions
                  </Button>

                  {adminSession?.permissions.canView && (
                    <Button
                      variant={activeTab === "analytics" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleTabChange("analytics")}
                    >
                      Analytics
                    </Button>
                  )}

                  {canAccessAdminManagement && (
                    <Button
                      variant={activeTab === "admins" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleTabChange("admins")}
                    >
                      User Management
                    </Button>
                  )}

                  {adminSession?.permissions.canEdit && (
                    <Button
                      variant={activeTab === "blogs" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleTabChange("blogs")}
                    >
                      Blog Manager
                    </Button>
                  )}

                  {adminSession?.permissions.canView && (
                    <Button
                      variant={
                        activeTab === "notifications" ? "default" : "ghost"
                      }
                      className="justify-start"
                      onClick={() => handleTabChange("notifications")}
                    >
                      Notifications
                    </Button>
                  )}

                  {adminSession?.permissions.canView && (
                    <Button
                      variant={activeTab === "logs" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleTabChange("logs")}
                    >
                      Audit Logs
                    </Button>
                  )}
                  {adminSession?.permissions.canView && (
                    <Button
                      variant={
                        activeTab === "clientReview" ? "default" : "ghost"
                      }
                      className="justify-start"
                      onClick={() => handleTabChange("clientReview")}
                    >
                      Client Reviews
                    </Button>
                  )}

                  {adminSession?.permissions.canEdit && (
                    <Button
                      variant={activeTab === "settings" ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => handleTabChange("settings")}
                    >
                      Settings
                    </Button>
                  )}

                  <div className="pt-4 mt-4 border-t">
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="flex items-center gap-2 text-red-400 hover:text-red-500 w-full justify-start mt-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </header>

        {/* Desktop/Tablet Layout */}
        <div className="flex flex-1 overflow-hidden">
          {!isMobile && (
            <aside className="w-[240px] border-r dark:bg-gray-900 bg-gray-100 p-4 hidden md:block">
              <nav className="flex flex-col space-y-2">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("dashboard")}
                >
                  Submissions
                </Button>

                {adminSession?.permissions.canView && (
                  <Button
                    variant={activeTab === "analytics" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("analytics")}
                  >
                    Analytics
                  </Button>
                )}

                {canAccessAdminManagement && (
                  <Button
                    variant={activeTab === "admins" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("admins")}
                  >
                    User Management
                  </Button>
                )}

                {adminSession?.permissions.canEdit && (
                  <Button
                    variant={activeTab === "blogs" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("blogs")}
                  >
                    Blog Manager
                  </Button>
                )}

                {adminSession?.permissions.canView && (
                  <Button
                    variant={
                      activeTab === "notifications" ? "default" : "ghost"
                    }
                    className="justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    Notifications
                  </Button>
                )}

                {adminSession?.permissions.canView && (
                  <Button
                    variant={activeTab === "logs" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("logs")}
                  >
                    Audit Logs
                  </Button>
                )}
                {adminSession?.permissions.canView && (
                  <Button
                    variant={activeTab === "clientReview" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("clientReview")}
                  >
                    Client Reviews
                  </Button>
                )}

                {adminSession?.permissions.canEdit && (
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    Settings
                  </Button>
                )}

                <div className="pt-4 mt-6 border-t">
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="flex items-center gap-2 text-red-400 hover:text-red-500 w-full justify-start mt-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              </nav>
            </aside>
          )}

          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "analytics" && <Analytics />}
              {activeTab === "admins" && <AdminManagement />}
              {activeTab === "blogs" && <BlogManager />}
              {activeTab === "notifications" && <Notifications />}
              {activeTab === "logs" && <AuditLogs />}
              {activeTab === "clientReview" && <ClientReview />}
              {activeTab === "settings" && <Settings />}
            </div>
          </main>
        </div>
      </div>

      <AdminLoginModal
        open={showLoginModal}
        setClose={setShowLoginModal}
        onSuccess={handleLoginSuccess}
      />

      <ChatbotWidget />
    </main>
  );
}
