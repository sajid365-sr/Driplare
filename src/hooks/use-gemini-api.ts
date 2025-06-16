import { useState, useEffect } from "react";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Interface for content sync data
interface ContentSyncData {
  websiteUrl?: string;
  contentSnippets?: string;
  file?: File | null;
}

export function useGeminiAPI() {
  // Key to store Gemini API key and model in localStorage
  const GEMINI_API_KEY = "gemini_api_key";
  const GEMINI_MODEL_KEY = "gemini_model";

  // Valid Gemini models supported by the Gemini SDK
  const SUPPORTED_MODELS = [
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-2.0-flash",
  ];

  // State
  const [apiKey, setApiKeyState] = useState<string>("");
  const [geminiModel, setGeminiModelState] = useState<string>("gemini-1.5-pro");
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<any[]>([]);

  // Load API key and model from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem(GEMINI_API_KEY);
    if (storedKey) setApiKeyState(storedKey);

    // If localStorage has an unsupported model, force to default
    let storedModel =
      localStorage.getItem(GEMINI_MODEL_KEY) || "gemini-1.5-pro";
    if (!SUPPORTED_MODELS.includes(storedModel)) {
      storedModel = "gemini-1.5-pro";
      localStorage.setItem(GEMINI_MODEL_KEY, storedModel);
    }
    setGeminiModelState(storedModel);

    // Load sync logs from localStorage
    const logs = JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
    setSyncLogs(logs);
  }, []);

  // Set Gemini model and save to localStorage (with validation)
  const setGeminiModel = (model: string) => {
    // Only allow supported models
    const validatedModel = SUPPORTED_MODELS.includes(model)
      ? model
      : "gemini-1.5-pro";
    setGeminiModelState(validatedModel);
    if (validatedModel) {
      localStorage.setItem(GEMINI_MODEL_KEY, validatedModel);
      toast.success("Gemini model updated");
    }
  };

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

  // Test connection to Gemini API using SDK
  const testConnection = async () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }
    setIsTestingConnection(true);

    try {
      // Use SDK (not REST API)
      const genAI = new GoogleGenerativeAI(apiKey);
      const selectedModel =
        localStorage.getItem(GEMINI_MODEL_KEY) || "gemini-1.5-pro";
      const model = genAI.getGenerativeModel({
        model: selectedModel,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 2000,
        },
      });

      // Simple test prompt
      const result = await model.generateContent(
        ["Test Gemini API connection."],
        {
          timeout: 15000,
        }
      );
      const text = result?.response?.text ? await result.response.text() : "";
      if (text.toLowerCase().includes("error")) {
        throw new Error("Error from Gemini: " + text);
      }
      toast.success("Connection to Gemini API successful");
      // Log test event
      const testEvent = {
        timestamp: new Date().toISOString(),
        type: "connection_test",
        status: "success",
      };
      const logs = JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
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
        error: String(error),
      };
      const logs = JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
      logs.push(testEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(logs));
      setSyncLogs(logs);
    } finally {
      setIsTestingConnection(false);
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

  // --- Gemini SDK Setup with dynamic model (but safe) ---
  const getGeminiModelInstance = () => {
    const key = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) throw new Error("Gemini API key is required");
    // Get supported model only (falling back to default)
    let selectedModel =
      localStorage.getItem(GEMINI_MODEL_KEY) || "gemini-1.5-pro";
    if (!SUPPORTED_MODELS.includes(selectedModel)) {
      selectedModel = "gemini-1.5-pro";
      localStorage.setItem(GEMINI_MODEL_KEY, selectedModel);
      setGeminiModelState(selectedModel);
    }
    const genAI = new GoogleGenerativeAI(key);
    return genAI.getGenerativeModel({
      model: selectedModel,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 2000,
      },
    });
  };

  // --- Content ingestion for chat from website/snippets/files in context prompt ---
  const getKnowledgeContext = async () => {
    // Fetch settings from Supabase
    try {
      const { fetchContentSyncSettings } = await import("@/utils/content-sync");
      const data = await fetchContentSyncSettings();
      const website = data.website_url || "";
      const snippets = data.content_snippets || "";
      const fileUrl: string | null = data.content_file_url || null;
      let fileText = "";
      if (fileUrl) {
        // Fetch the file as text (.txt/.md/.json) or provide a hint for binary
        try {
          const ext = fileUrl.split(".").pop()?.toLowerCase();
          const resp = await fetch(fileUrl);
          if (["pdf", "docx"].includes(ext || "")) {
            fileText = `[File "${fileUrl}" uploaded. Please infer content from document if possible.]`;
          } else {
            fileText = await resp.text();
          }
        } catch (e) {
          fileText = "";
        }
      }
      return {
        website,
        snippets,
        fileText,
      };
    } catch (err) {
      return { website: "", snippets: "", fileText: "" };
    }
  };

  // Chat method, with context from content sync sources (now uses SDK and dynamic model)
  const askGemini = async (
    userMessage: string,
    previousMessages: { text: string; isBot: boolean }[]
  ) => {
    const model = getGeminiModelInstance();
    const context = await getKnowledgeContext();
    const contextPrompt = [
      "You are Driplare's AI assistant. Use the following website details, content snippets, and file contents as your knowledge base.",
      context.website && `Website URL: ${context.website}`,
      context.snippets && `Custom Snippets:\n${context.snippets}`,
      context.fileText && `File context:\n${context.fileText}`,
      "",
      "Always prioritize using this knowledge base and sound friendly yet expert.",
    ]
      .filter(Boolean)
      .join("\n\n");

    // Compose dynamic prompt
    const dynPrompt =
      contextPrompt +
      "\n\nConversation:\n" +
      previousMessages
        .map((m) => (m.isBot ? `AI: ${m.text}` : `User: ${m.text}`))
        .join("\n") +
      `\nUser: ${userMessage}\nAI:`;

    // Use Gemini SDK, not REST
    const result = await model.generateContent([dynPrompt], { timeout: 30000 });
    const text =
      result && result.response && result.response.text
        ? await result.response.text()
        : "Sorry, I couldn't generate a response.";
    return typeof text === "string" ? text : "";
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
      const contentToSync = [];

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
                    text:
                      "Process this content for my chatbot knowledge base: " +
                      JSON.stringify(contentToSync),
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.2,
            },
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
        type: "content_sync",
      };

      const logs = JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
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
        type: "content_sync",
      };

      const logs = JSON.parse(localStorage.getItem("gemini_sync_logs") || "[]");
      logs.push(syncEvent);
      localStorage.setItem("gemini_sync_logs", JSON.stringify(logs));
      setSyncLogs(logs);

      toast.error(
        `Content sync failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      throw error;
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    geminiModel,
    setGeminiModel,
    testConnection,
    isTestingConnection,
    syncContent,
    isSyncing,
    getSyncLogs,
    syncLogs,
    clearSyncLogs,
    askGemini,
  };
}
