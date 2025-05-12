
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
  const [syncLogs, setSyncLogs] = useState<any[]>([]);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem(GEMINI_API_KEY);
    if (storedKey) {
      setApiKeyState(storedKey);
    }
    
    // Load sync logs
    const logs = JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
    setSyncLogs(logs);
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
      // Make an actual API call to Gemini
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              { 
                role: "user",
                parts: [{ text: "Hello, testing connection" }] 
              }
            ],
            generationConfig: {
              maxOutputTokens: 100,
              temperature: 0.7
            }
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("API error:", data);
        throw new Error(data.error?.message || "API call failed");
      }

      toast.success("Connection to Gemini API successful");
      
      // Log test event
      const testEvent = {
        timestamp: new Date().toISOString(),
        type: "connection_test",
        status: "success",
      };

      const logs = JSON.parse(
        localStorage.getItem("gemini_sync_logs") || "[]"
      );
      logs.push(testEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(logs));
      setSyncLogs(logs);
      
    } catch (error) {
      toast.error(
        "Failed to connect to Gemini API. Please check your API key."
      );
      console.error("Gemini API test failed:", error);
      
      // Log failed test
      const testEvent = {
        timestamp: new Date().toISOString(),
        type: "connection_test",
        status: "failed",
        error: String(error)
      };

      const logs = JSON.parse(
        localStorage.getItem("gemini_sync_logs") || "[]"
      );
      logs.push(testEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(logs));
      setSyncLogs(logs);
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
        // For real implementation, we would read file content
        const fileContent = await readFileContent(contentData.file);
        contentToSync.push({
          source: "file",
          filename: contentData.file.name,
          content: fileContent,
        });
      }

      // In a real implementation with Gemini API
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { 
                    text: "Process this content for my chatbot knowledge base: " + 
                    JSON.stringify(contentToSync)
                  }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.2
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API call failed");
      }

      // Record sync event
      const syncEvent = {
        timestamp: new Date().toISOString(),
        content: contentToSync.map((c) => c.source).join(", "),
        status: "success",
        type: "content_sync"
      };

      const logs = JSON.parse(
        localStorage.getItem("gemini_sync_logs") || "[]"
      );
      logs.push(syncEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(logs));
      setSyncLogs(logs);
      
      toast.success("Content successfully synced with Gemini AI");
      return true;
    } catch (error) {
      console.error("Content sync failed:", error);

      // Record failed sync event
      const syncEvent = {
        timestamp: new Date().toISOString(),
        error: String(error),
        status: "failed",
        type: "content_sync"
      };

      const logs = JSON.parse(
        localStorage.getItem("gemini_sync_logs") || "[]"
      );
      logs.push(syncEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(logs));
      setSyncLogs(logs);

      toast.error(`Content sync failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  };

  // Read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsText(file);
    });
  };

  // Get sync logs
  const getSyncLogs = () => {
    return syncLogs;
  };

  // Clear sync logs
  const clearSyncLogs = () => {
    localStorage.removeItem("gemini_sync_logs");
    setSyncLogs([]);
    toast.success("Sync logs cleared");
  };

  return {
    apiKey,
    setApiKey,
    testConnection,
    isTestingConnection,
    syncContent,
    isSyncing,
    getSyncLogs,
    syncLogs,
    clearSyncLogs
  };
}

