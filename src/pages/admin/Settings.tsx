
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Key, Upload } from "lucide-react";
import { useGeminiAPI } from "@/hooks/use-gemini-api";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [slackWebhook, setSlackWebhook] = useState("");
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    document.documentElement.classList.contains("dark")
  );
  
  // Gemini API settings
  const [showApiKey, setShowApiKey] = useState(false);
  const { 
    apiKey, 
    setApiKey, 
    testConnection, 
    isTestingConnection,
    syncContent,
    isSyncing
  } = useGeminiAPI();
  
  // Content sync settings
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [contentSnippets, setContentSnippets] = useState("");
  const [activeTab, setActiveTab] = useState("api-key");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Handle content sync
  const handleContentSync = async () => {
    if (!apiKey) {
      toast.error("Please enter a Gemini API key first");
      return;
    }
    
    try {
      const contentData = {
        websiteUrl,
        contentSnippets,
        file: selectedFile
      };
      
      await syncContent(contentData);
      toast.success("Content successfully synced with Gemini");
    } catch (error) {
      toast.error("Failed to sync content");
    }
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
        
        {/* Gemini AI Integration */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Gemini AI Integration</CardTitle>
            <CardDescription>
              Configure Google Gemini AI integration for enhanced chatbot responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="api-key">API Key</TabsTrigger>
                <TabsTrigger value="content-sync">Content Sync</TabsTrigger>
              </TabsList>
              
              {/* API Key Tab */}
              <TabsContent value="api-key" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gemini-api-key">Gemini API Key</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="gemini-api-key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      className="ml-2 whitespace-nowrap"
                      onClick={testConnection}
                      disabled={!apiKey || isTestingConnection}
                    >
                      <Key size={16} className="mr-1" />
                      {isTestingConnection ? "Testing..." : "Test Connection"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your API key is stored securely and used to connect with Google Gemini services.
                  </p>
                </div>
              </TabsContent>
              
              {/* Content Sync Tab */}
              <TabsContent value="content-sync" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <Input
                    id="website-url"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter your website URL to fetch and process content for the chatbot.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content-snippets">Custom Content Snippets</Label>
                  <Textarea
                    id="content-snippets"
                    placeholder="Paste key content, FAQs, or service descriptions here..."
                    className="min-h-[120px]"
                    value={contentSnippets}
                    onChange={(e) => setContentSnippets(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content-file">Upload Content File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="content-file"
                      type="file"
                      accept=".txt,.md,.json"
                      onChange={handleFileChange}
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
                
                <Button 
                  className="mt-4"
                  onClick={handleContentSync}
                  disabled={isSyncing || !apiKey}
                >
                  <Upload size={16} className="mr-1" />
                  {isSyncing ? "Syncing Content..." : "Update Gemini Knowledge"}
                </Button>
              </TabsContent>
            </Tabs>
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
