'use client'

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bell, Plus, Send } from "lucide-react";
import { CreateNotification } from "@/components/admin/notifications/CreateNotification";
import { NotificationTabs } from "@/components/admin/notifications/NotificationTabs";
import { toast } from "sonner";

export default function Notifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Notifications Management</CardTitle>
          <CardDescription>
            Send notifications to users and manage notification templates
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="manage">Manage Notifications</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          <NotificationTabs />
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <CreateNotification />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Pre-configured notification templates for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Templates Coming Soon</h3>
                <p className="text-muted-foreground">
                  Notification templates will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
