import { useState, useEffect } from "react";
import { toast } from "sonner";

// Interface for content sync data
interface ContentSyncData {
  websiteUrl?: string;
  contentSnippets?: string;
  file?: File | null;
}

export function useGeminiAPI() {
  // Key to store Gemini API key in localStorage
  const GEMINI_API_KEY = "gemini_api_key";

  // State
  const [apiKey, setApiKeyState] = useState<string>("");
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem(GEMINI_API_KEY);
    if (storedKey) {
      setApiKeyState(storedKey);
    }
  }, []);

  // Set API key and save to localStorage
  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem(GEMINI_API_KEY, key);
      toast.success("Gemini API key saved");
    } else {
      localStorage.removeItem(GEMINI_API_KEY);
      toast.info("Gemini API key removed");
    }
  };

  // Test connection with Gemini API
  const testConnection = async () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }

    setIsTestingConnection(true);

    try {
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, we would make an actual API call to Gemini
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }],
          }),
        }
      );

      if (!response.ok) throw new Error("API call failed");

      toast.success("Connection to Gemini API successful");
    } catch (error) {
      toast.error(
        "Failed to connect to Gemini API. Please check your API key."
      );
      console.error("Gemini API test failed:", error);
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Sync content with Gemini
  const syncContent = async (contentData: ContentSyncData) => {
    if (!apiKey) {
      toast.error("Please set a valid Gemini API key first");
      return;
    }

    setIsSyncing(true);

    try {
      // Process website URL if provided
      let contentToSync = [];

      if (contentData.websiteUrl) {
        contentToSync.push({
          source: "website",
          url: contentData.websiteUrl,
          content: `Content fetched from ${contentData.websiteUrl}`,
        });
      }

      // Process content snippets if provided
      if (contentData.contentSnippets) {
        contentToSync.push({
          source: "snippets",
          content: contentData.contentSnippets,
        });
      }

      // Process file if provided
      if (contentData.file) {
        // In a real app, we would read the file content
        contentToSync.push({
          source: "file",
          filename: contentData.file.name,
          content: `Content from file: ${contentData.file.name}`,
        });
      }

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, we would make an actual API call to Gemini
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:syncKnowledge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({ content: contentToSync }),
        }
      );

      if (!response.ok) throw new Error("API call failed");

      // Record sync event
      const syncEvent = {
        timestamp: new Date().toISOString(),
        content: contentToSync.map((c) => c.source).join(", "),
        status: "success",
      };

      const syncLogs = JSON.parse(
        localStorage.getItem("gemini_sync_logs") || "[]"
      );
      syncLogs.push(syncEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(syncLogs));

      return true;
    } catch (error) {
      console.error("Content sync failed:", error);

      // Record failed sync event
      const syncEvent = {
        timestamp: new Date().toISOString(),
        error: String(error),
        status: "failed",
      };

      const syncLogs = JSON.parse(
        localStorage.getItem("gemini_sync_logs") || "[]"
      );
      syncLogs.push(syncEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(syncLogs));

      throw error;
    } finally {
      setIsSyncing(false);
    }
  };

  // Get sync logs
  const getSyncLogs = () => {
    return JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
  };

  return {
    apiKey,
    setApiKey,
    testConnection,
    isTestingConnection,
    syncContent,
    isSyncing,
    getSyncLogs,
  };
}
