import { Sparkles, Zap, ArrowUpRight, ShoppingBag, Package, Truck, DollarSign, HelpCircle, Calendar } from "lucide-react";

export type ChatMode = "support" | "demo" | "pricing";

export interface ChatConfig {
  mode: ChatMode;
  greeting: string;
  subtitle: string;
  defaultPlaceholder: string;
  starterQuestions: Array<{
    id: number;
    label: string;
    icon: React.ElementType;
    prompt: string;
  }>;
  bannerText: string | null;
  ctaMessage: {
    trigger: number;
    content: string;
    buttonText: string;
    link: string;
  } | null;
}

export const getChatConfig = (pathname: string): ChatConfig => {
  // Demo Mode - AI Agent Solution Page
  if (pathname === "/solutions/ai-agents") {
    return {
      mode: "demo",
      greeting: "Experience AI in Action!",
      subtitle: "Try asking me about products, prices, or placing an order. See how I handle customers!",
      defaultPlaceholder: "Ask about products, delivery, or order...",
      starterQuestions: [
        {
          id: 1,
          label: "What's the price?",
          icon: ShoppingBag,
          prompt: "What are your product prices?",
        },
        {
          id: 2,
          label: "Is this available?",
          icon: Package,
          prompt: "Do you have this item in stock?",
        },
        {
          id: 3,
          label: "When can you deliver?",
          icon: Truck,
          prompt: "What are your delivery times and charges?",
        },
      ],
      bannerText: "🎮 Demo Mode - Experience AI Shopping Assistant",
      ctaMessage: {
        trigger: 3,
        content: "Impressed? This AI Agent can work for YOUR business 24/7!",
        buttonText: "Get This For My Business →",
        link: "/contact",
      },
    };
  }

  // Pricing Mode - Pricing Page
  if (pathname === "/pricing") {
    return {
      mode: "pricing",
      greeting: "Questions About Pricing?",
      subtitle: "I can help you choose the right plan and answer any pricing questions!",
      defaultPlaceholder: "Ask about plans, features, or pricing...",
      starterQuestions: [
        {
          id: 1,
          label: "Which plan is right for me?",
          icon: HelpCircle,
          prompt: "I'm not sure which pricing plan is best for my business. Can you help me choose?",
        },
        {
          id: 2,
          label: "What's included in each plan?",
          icon: DollarSign,
          prompt: "Can you explain what features are included in each pricing tier?",
        },
        {
          id: 3,
          label: "Book a consultation",
          icon: Calendar,
          prompt: "I'd like to book a consultation to discuss pricing and custom solutions.",
        },
      ],
      bannerText: "💰 Pricing Help - Get answers about plans & features",
      ctaMessage: null,
    };
  }

  // Default - Support Mode (all other pages)
  return {
    mode: "support",
    greeting: "Hello! 👋",
    subtitle: "I'm ready to automate your workflow. How can I help?",
    defaultPlaceholder: "Ask Driplare anything...",
    starterQuestions: [
      {
        id: 1,
        label: "I want to create a custom AI chatbot",
        icon: Sparkles,
        prompt: "Hi! I want to create a custom AI chatbot (for Customer Support or Sales) for my website. Can you guide me on the best way to deploy an agent with Driplare?",
      },
      {
        id: 2,
        label: "Automate my business workflows",
        icon: Zap,
        prompt: "I want to replace manual processes with AI automation. How can Driplare help me implement workflow automation using tools like n8n or custom integrations?",
      },
      {
        id: 3,
        label: "I need AI consultancy for my company",
        icon: ArrowUpRight,
        prompt: "I am looking for strategic advice on AI adoption. Can you tell me about your AI Consultancy services and Readiness Assessments?",
      },
    ],
    bannerText: null,
    ctaMessage: null,
  };
};