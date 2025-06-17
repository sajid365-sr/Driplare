import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Key, Upload, Trash2, RotateCcw } from "lucide-react";
import { useGeminiAPI } from "@/hooks/use-gemini-api";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import {
  fetchContentSyncSettings,
  saveContentSyncSettings,
  uploadContentFile,
} from "@/utils/content-sync";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Gemini API settings
  const [showApiKey, setShowApiKey] = useState(false);
  const {
    apiKey,
    setApiKey,
    geminiModel,
    setGeminiModel,
    isTestingConnection,
    syncLogs,
    clearSyncLogs,
  } = useGeminiAPI();

  // Add Gemini model options (now includes Flash models and 2.0)
  const GEMINI_MODEL_OPTIONS = [
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
    { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    { value: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash-Lite" },
    { value: "gemini-2.5-flash-preview", label: "Gemini 2.5 Flash Preview" },
    { value: "gemini-1.5-flash-8b", label: "Gemini 1.5 Flash-8B" },
  ];

  // Content sync settings
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [contentSnippets, setContentSnippets] = useState("");
  const [activeTab, setActiveTab] = useState("api-key");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSavingContentSync, setIsSavingContentSync] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const allowedTypes = [
        "text/plain",
        "application/json",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        // For Markdown
        "text/markdown",
        // Some browsers might set an empty type for .md/.txt files
        "",
      ];
      const file = e.target.files[0];
      // Check extension type fallback if type is empty
      const ext = file.name.split(".").pop()?.toLowerCase();
      const allowedExts = ["txt", "md", "json", "pdf", "docx"];
      if (
        !allowedTypes.includes(file.type) &&
        !allowedExts.includes(ext || "")
      ) {
        toast.error(
          "Invalid file type. Please upload a txt, md, json, pdf, or docx file."
        );
        return;
      }
      setSelectedFile(file);
      setUploadedFileName(file.name);
    }
  };

  // Fetch saved settings each time content-sync tab is entered or Settings mounts
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await fetchContentSyncSettings();
        if (data) {
          setWebsiteUrl(data.website_url || "");
          setContentSnippets(data.content_snippets || "");
          setUploadedFileUrl(data.content_file_url || null);
          if (data.content_file_url) {
            // Try to extract filename for display
            const fname = data.content_file_url.split("/")?.pop() || null;
            setUploadedFileName(fname);
          } else {
            setUploadedFileName(null);
          }
        } else {
          setWebsiteUrl("");
          setContentSnippets("");
          setUploadedFileUrl(null);
          setUploadedFileName(null);
        }
        setSelectedFile(null); // always clear file input when loading from db
      } catch (err) {
        toast.error("Failed to fetch content sync settings");
      }
    };

    if (activeTab === "content-sync") {
      fetchSettings();
    }
  }, [activeTab]);

  // Handle content sync
  const handleContentSync = async () => {
    if (!apiKey) {
      toast.error("Please enter a Gemini API key first");
      return;
    }
    setIsSavingContentSync(true);

    try {
      let fileUrl = uploadedFileUrl ?? null;

      // If a new file is selected, upload it
      if (selectedFile) {
        fileUrl = await uploadContentFile(selectedFile);
        setUploadedFileUrl(fileUrl);
      }
      // Save the settings into Supabase
      await saveContentSyncSettings({
        websiteUrl,
        contentSnippets,
        fileUrl,
      });

      toast.success("Content sync settings saved successfully!");
      setSelectedFile(null);
      // Refetch settings after save to ensure state is correct
      const updated = await fetchContentSyncSettings();
      setWebsiteUrl(updated.website_url || "");
      setContentSnippets(updated.content_snippets || "");
      setUploadedFileUrl(updated.content_file_url || null);
      setUploadedFileName(
        updated.content_file_url
          ? updated.content_file_url.split("/")?.pop() || null
          : null
      );
    } catch (error) {
      toast.error("Failed to save content sync settings");
    } finally {
      setIsSavingContentSync(false);
    }
  };

  // Format log status for display
  const getStatusBadgeClass = (status: string) => {
    return status === "success"
      ? "bg-green-500/20 text-green-500 px-2 py-0.5 rounded text-xs font-medium"
      : "bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-xs font-medium";
  };

  // Remove handlers
  const handleRemoveWebsiteUrl = () => setWebsiteUrl("");
  const handleRemoveSnippets = () => setContentSnippets("");
  const handleRemoveFile = () => {
    setUploadedFileUrl(null);
    setUploadedFileName(null);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings & Integrations</h1>

      <div>
        {/* Gemini AI Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Gemini AI Integration</CardTitle>
            <CardDescription>
              Configure Google Gemini AI integration for enhanced chatbot
              responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="api-key">API Key</TabsTrigger>
                <TabsTrigger value="content-sync">Knowledge Base</TabsTrigger>
                <TabsTrigger value="logs">Activity Logs</TabsTrigger>
              </TabsList>

              {/* API Key Tab */}
              <TabsContent value="api-key" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gemini-api-key">Gemini API Key</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Input
                        id="gemini-api-key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="pr-10"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                        aria-label={showApiKey ? "Hide" : "Show"}
                      >
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      className=" whitespace-nowrap"
                      onClick={() => {
                        if (!apiKey.trim()) {
                          toast.error("API key cannot be empty");
                        } else {
                          setApiKey(apiKey.trim());
                          toast.success("API key updated.");
                        }
                      }}
                      disabled={isTestingConnection}
                    >
                      Save
                    </Button>
                    <Button variant="destructive" size="icon" asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <span title="Delete API Key">
                            <Trash2 size={16} />
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete your Gemini API
                              key? This action cannot be undone and will
                              disconnect Gemini features.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive"
                              onClick={() => {
                                setApiKey("");
                                toast.info("API key deleted.");
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your API key is stored securely and used to connect with
                    Google Gemini services.
                  </p>
                </div>
                <div className="bg-muted/40 p-4 rounded-md border border-border/50 mt-4">
                  <h4 className="font-medium mb-2">About Gemini API</h4>
                  <p className="text-sm text-muted-foreground">
                    Google Gemini is an advanced AI model that powers our
                    chatbot features. When connected, it provides more natural,
                    accurate responses to customer queries. To get an API key:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>
                      Go to the{" "}
                      <a
                        href="https://ai.google.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Google AI Studio
                      </a>
                    </li>
                    <li>Sign in with your Google account</li>
                    <li>Navigate to the API keys section</li>
                    <li>Create a new API key and paste it above</li>
                  </ol>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gemini-model">Gemini Model</Label>
                  <select
                    title="select"
                    id="gemini-model"
                    className="block w-full border border-border rounded-md p-2 mt-1 bg-background"
                    value={geminiModel}
                    onChange={(e) => {
                      setGeminiModel(e.target.value); // Hook will sync this to localStorage
                    }}
                  >
                    {GEMINI_MODEL_OPTIONS.map((m) => (
                      <option value={m.value} key={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-muted-foreground">
                    Select the Gemini AI model to use for all chatbot and
                    content syncing.
                  </p>
                </div>
              </TabsContent>

              {/* Content Sync Tab */}
              <TabsContent value="content-sync" className="space-y-4">
                {/* Website URL */}
                <div className="space-y-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="website-url"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                    {websiteUrl && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleRemoveWebsiteUrl}
                        title="Remove Website URL"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter your website URL to fetch and process content for the
                    chatbot.
                  </p>
                </div>

                {/* Content Snippets */}
                <div className="space-y-2">
                  <Label htmlFor="content-snippets">
                    Custom Content Snippets
                  </Label>
                  <div className="flex items-start gap-2">
                    <Textarea
                      id="content-snippets"
                      placeholder="Paste key content, FAQs, or service descriptions here..."
                      className="min-h-[250px]"
                      value={contentSnippets}
                      onChange={(e) => setContentSnippets(e.target.value)}
                    />
                    {contentSnippets && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleRemoveSnippets}
                        title="Remove Snippets"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Content File */}
                <div className="space-y-2">
                  <Label htmlFor="content-file">Upload Content File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="content-file"
                      type="file"
                      accept=".txt,.md,.json,.pdf,.docx"
                      onChange={handleFileChange}
                    />
                    {(uploadedFileUrl || selectedFile) && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleRemoveFile}
                        title="Remove File"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  {(uploadedFileName || uploadedFileUrl) && (
                    <p className="text-sm text-muted-foreground">
                      {uploadedFileUrl ? (
                        <>
                          Uploaded file:{" "}
                          <a
                            href={uploadedFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            {uploadedFileName || "View file"}
                          </a>
                        </>
                      ) : (
                        <>Selected file: {uploadedFileName}</>
                      )}
                    </p>
                  )}
                </div>

                <Button
                  className="mt-4"
                  onClick={handleContentSync}
                  disabled={isSavingContentSync || !apiKey}
                >
                  <Upload size={16} className="mr-1" />
                  {isSavingContentSync ? "Saving..." : "Save Content Settings"}
                </Button>
              </TabsContent>

              {/* Logs Tab */}
              <TabsContent value="logs" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Gemini Activity Logs</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSyncLogs}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    <span>Clear Logs</span>
                  </Button>
                </div>

                <div className="border rounded-md">
                  <ScrollArea className="h-[300px]">
                    {syncLogs.length > 0 ? (
                      <div className="p-2">
                        {syncLogs
                          .slice()
                          .reverse()
                          .map((log, index) => (
                            <div
                              key={index}
                              className="border-b last:border-b-0 p-3"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {format(
                                      new Date(log.timestamp),
                                      "MMM d, yyyy HH:mm:ss"
                                    )}
                                  </span>
                                  <span
                                    className={getStatusBadgeClass(log.status)}
                                  >
                                    {log.status.toUpperCase()}
                                  </span>
                                </div>
                                <span className="text-xs font-medium">
                                  {log.type === "connection_test"
                                    ? "API Test"
                                    : log.type === "content_sync"
                                      ? "Content Sync"
                                      : "Chat"}
                                </span>
                              </div>

                              {log.content && (
                                <p className="text-sm truncate">
                                  {log.content}
                                </p>
                              )}

                              {log.error && (
                                <p className="text-sm text-red-500 truncate">
                                  {log.error}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                        <RotateCcw
                          size={24}
                          className="text-muted-foreground mb-2"
                        />
                        <p className="text-muted-foreground">
                          No activity logs yet
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  Logs show recent Gemini API activity including connection
                  tests, content syncs, and chat interactions.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
