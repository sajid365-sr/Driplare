
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Settings() {
  const [slackWebhook, setSlackWebhook] = useState("");
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    document.documentElement.classList.contains("dark")
  );
  
  // Handle dark mode toggle
  const handleThemeToggle = () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    toast.success(`Theme changed to ${newMode ? 'dark' : 'light'} mode`);
  };
  
  // Save webhook settings
  const handleSaveWebhooks = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save these to a database
    toast.success("Integration settings saved successfully");
  };
  
  // Test webhook
  const handleTestWebhook = (type: string) => {
    const webhookUrl = type === 'slack' ? slackWebhook : zapierWebhook;
    
    if (!webhookUrl) {
      toast.error(`Please enter a valid ${type} webhook URL`);
      return;
    }
    
    // In a real app, we would actually trigger the webhook
    toast.success(`Test ${type} notification sent`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings & Integrations</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of your admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch 
                id="dark-mode" 
                checked={darkModeEnabled}
                onCheckedChange={handleThemeToggle}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="animations" className="text-base">Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable smooth transitions and animations
                </p>
              </div>
              <Switch id="animations" defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        {/* API Usage */}
        <Card>
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>
              Monitor your API usage and rate limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Requests this month</p>
              <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>2,250 / 5,000</span>
                <span>45%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Error rate</p>
              <div className="mt-1 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="bg-destructive h-full rounded-full" style={{ width: '3%' }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>67 errors</span>
                <span>3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Integrations */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notification Webhooks</CardTitle>
            <CardDescription>
              Configure external integrations for notifications when new submissions arrive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="webhook-form" onSubmit={handleSaveWebhooks} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="slack-webhook"
                    placeholder="https://hooks.slack.com/services/..."
                    value={slackWebhook}
                    onChange={(e) => setSlackWebhook(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleTestWebhook('slack')}
                  >
                    Test
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="zapier-webhook"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={zapierWebhook}
                    onChange={(e) => setZapierWebhook(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleTestWebhook('zapier')}
                  >
                    Test
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="webhook-form">Save Integration Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
