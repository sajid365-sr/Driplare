"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Save,
  Mail,
  Database,
  Shield,
  Palette,
  Globe,
  Share2,
  Search,
  Settings as SettingsIcon,
  Upload,
  ExternalLink
} from "lucide-react";
import { getSiteSettings, updateSiteSettings, SiteSettings } from "@/lib/site-settings";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const siteSettings = await getSiteSettings();
        if (siteSettings) {
          setSettings(siteSettings);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const result = await updateSiteSettings(settings);
      if (result.success) {
        toast.success("Settings saved successfully");
      } else {
        toast.error(result.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string | boolean) => {
    if (!settings) return;
    setSettings((prev) => prev ? ({ ...prev, [key]: value }) : null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load settings</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            Site Settings
          </CardTitle>
          <CardDescription>
            Configure your website settings and preferences
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
          <TabsTrigger value="system">System Control</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic site configuration and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => updateSetting("siteTitle", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerCopyright">Footer Copyright Text</Label>
                <Input
                  id="footerCopyright"
                  value={settings.footerCopyright}
                  onChange={(e) => updateSetting("footerCopyright", e.target.value)}
                />
              </div>

              {/* Logo Upload Section */}
              <div className="space-y-4">
                <Label>Branding Assets</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logoUrl"
                        value={settings.logoUrl || ""}
                        onChange={(e) => updateSetting("logoUrl", e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                      {settings.logoUrl && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faviconUrl">Favicon URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="faviconUrl"
                        value={settings.faviconUrl || ""}
                        onChange={(e) => updateSetting("faviconUrl", e.target.value)}
                        placeholder="https://example.com/favicon.ico"
                      />
                      {settings.faviconUrl && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>
                Configure social media links and visibility settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: "linkedin", label: "LinkedIn", showKey: "showLinkedin" as keyof SiteSettings },
                { key: "facebook", label: "Facebook", showKey: "showFacebook" as keyof SiteSettings },
                { key: "twitter", label: "Twitter", showKey: "showTwitter" as keyof SiteSettings },
                { key: "instagram", label: "Instagram", showKey: "showInstagram" as keyof SiteSettings },
                { key: "youtube", label: "YouTube", showKey: "showYouTube" as keyof SiteSettings },
              ].map(({ key, label, showKey }) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 mr-4">
                    <Label htmlFor={`${key}Url`} className="text-sm font-medium">
                      {label} URL
                    </Label>
                    <Input
                      id={`${key}Url`}
                      value={(settings as unknown as Record<string, string | null>)[`${key}Url`] || ""}
                      onChange={(e) => updateSetting(`${key}Url` as keyof SiteSettings, e.target.value)}
                      placeholder={`https://${key}.com/your-profile`}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${key}Show`} className="text-sm">
                      Show
                    </Label>
                    <Switch
                      id={`${key}Show`}
                      checked={(settings as unknown as Record<string, boolean>)[showKey]}
                      onCheckedChange={(checked) => updateSetting(showKey, checked)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO & Analytics */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO & Analytics
              </CardTitle>
              <CardDescription>
                Configure search engine optimization and analytics tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics Measurement ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId || ""}
                  onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Google Analytics measurement ID (e.g., G-1234567890)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Global Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription || ""}
                  onChange={(e) => updateSetting("metaDescription", e.target.value)}
                  placeholder="A brief description of your website for search engines..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  This description will be used as the default meta description for pages that don't have one
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Control */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Control
              </CardTitle>
              <CardDescription>
                Control system-wide settings and maintenance mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20 bg-destructive/5">
                <div className="space-y-0.5">
                  <Label className="text-destructive font-medium">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, public users will see a maintenance page instead of your website
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                />
              </div>

              {settings.maintenanceMode && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Warning:</strong> Maintenance mode is currently enabled. Only administrators can access the website.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>
                Advanced settings for API integrations and system configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cloudinaryFolder">Cloudinary Folder</Label>
                  <Input
                    id="cloudinaryFolder"
                    value={settings.cloudinaryFolder}
                    onChange={(e) => updateSetting("cloudinaryFolder", e.target.value)}
                    placeholder="portfolio"
                  />
                  <p className="text-xs text-muted-foreground">
                    Folder name for image uploads
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resendFromEmail">Resend From Email</Label>
                  <Input
                    id="resendFromEmail"
                    type="email"
                    value={settings.resendFromEmail}
                    onChange={(e) => updateSetting("resendFromEmail", e.target.value)}
                    placeholder="noreply@yourdomain.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Default sender email for notifications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
