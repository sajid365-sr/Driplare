
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, ChevronRight, LogOut } from "lucide-react";

import AdminLoginModal from "../../admin/AdminLoginModal";
import {
  getAdminSession,
  clearAdminSession,
  AdminSession
} from "@/utils/admin-auth";
import ScrollToTop from "../ScrollToTop";
import { ChatbotWidget } from "../chatbot/ChatbotWidget";
import { initializeNotificationsFromSupabase } from "@/utils/notification-utils";

import Dashboard from "@/pages/admin/Dashboard";
import Analytics from "@/pages/admin/Analytics";
import AdminManagement from "@/pages/admin/AdminManagement";
import Notifications from "@/pages/admin/Notifications";
import AuditLogs from "@/pages/admin/AuditLogs";
import Settings from "@/pages/admin/Settings";

export default function AdminLayout() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
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
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    const session = getAdminSession();
    setAdminSession(session);
    setShowLoginModal(false);
  };

  // Determine if the current user has permission to access certain tabs
  const canAccessAdminManagement = adminSession?.permissions.canManageAdmins;

  return (
    <main className="min-h-screen flex flex-col md:px-5">
      <ScrollToTop />
      <Toaster position="top-center" richColors />

      <div className="mt-5">
        <img src="/logo-white.png" alt="Driplare Logo" width={120} />

        {/* Tabs wrapper must wrap both list & content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-1 flex-col lg:flex-row md:mt-10"
        >
          {/* Sidebar with triggers */}
          <aside className="md:w-[20%] w-full md:border-r rounded-sm border-gray-800 pt-40 md:bg-gray-950 p-4 h-screen">
            <TabsList className="flex flex-row md:flex-col px-10 overflow-x-auto md:overflow-x-visible space-y-2">
              <TabsTrigger value="dashboard">Submissions</TabsTrigger>
              {adminSession?.permissions.canView && (
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              )}
              {canAccessAdminManagement && (
                <TabsTrigger value="admins">User Management</TabsTrigger>
              )}
              {adminSession?.permissions.canView && (
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              )}
              {adminSession?.permissions.canView && (
                <TabsTrigger value="logs">Audit Logs</TabsTrigger>
              )}
              {adminSession?.permissions.canEdit && (
                <TabsTrigger value="settings">Settings</TabsTrigger>
              )}

              <Link to="/">
                <button
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-5 text-green-400 hover:text-green-500"
                >
                  Client Area
                  <ArrowRight className="mr-2 hover:scale-x-150 " size={16} />
                </button>
              </Link>
            </TabsList>
          </aside>

          {/* Tab content */}
          <section className="md:w-[80%] w-full p-6 overflow-y-auto ">
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>
            <TabsContent value="admins">
              <AdminManagement />
            </TabsContent>
            <TabsContent value="notifications">
              <Notifications />
            </TabsContent>
            <TabsContent value="logs">
              <AuditLogs />
            </TabsContent>
            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </section>
        </Tabs>
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
