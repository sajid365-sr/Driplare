"use client";

import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import AdminManagement from "./AdminManagement";
import Notifications from "./Notifications";
import AuditLogs from "./AuditLogs";
import Settings from "./Settings";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: 'Admin Panel - Driplare Management',
//   description: 'Administrative dashboard for managing submissions, analytics, users, and system settings.',
// }

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6 mt-56">
      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-row w-screen"
      >
        <div className="w-1/4">
          {/* Responsive Tab List */}
          <TabsList className="flex flex-col px-5  ">
            <TabsTrigger value="dashboard">Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="admins">User Management</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <div className="w-3/4">
          {/* Tab Contents */}
          <TabsContent value="dashboard">{/* <Dashboard /> */}</TabsContent>
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
        </div>
      </Tabs>
    </div>
  );
}
