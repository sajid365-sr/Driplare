// Agent Marketplace Types

// Embedded content type for multi-language support
export interface AgentContent {
    name: string;
    description: string;
    fullDescription: string;
    features: string[];
}

export interface Agent {
    id: string;
    slug: string;
    price: number;
    rating: number;
    totalSales: number;
    category: string;
    mainImage: string;
    gallery: string[];
    videoUrl?: string | null;
    techStack: string[];
    difficulty: string;
    setupTime?: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    // Multi-language content (like CaseStudy)
    en: AgentContent;
    bn: AgentContent;
}

// API Response Types
export interface AgentResponse {
    success: boolean;
    data?: Agent | Agent[];
    error?: string;
    message?: string;
}

// Processed agent with language-specific content extracted
export interface ProcessedAgent {
    id: string;
    slug: string;
    category: string;
    price: number;
    rating: number;
    totalSales: number;
    mainImage: string;
    gallery: string[];
    videoUrl?: string | null;
    techStack: string[];
    difficulty: string;
    setupTime?: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    // Language-specific fields (extracted from en/bn)
    name: string;
    description: string;
    fullDescription: string;
    features: string[];
}

// Component Props Types
export interface AgentCardProps {
    agent: ProcessedAgent;
    index?: number;
}

export interface MarketplaceFiltersProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export interface AgentDetailsPageProps {
    params: {
        productId: string;
    };
}

// Filter and Search Types
export interface AgentFilters {
    category: string;
    searchQuery: string;
    priceRange?: [number, number];
    rating?: number;
    difficulty?: string;
}

// Agent Categories
export const AGENT_CATEGORIES = [
    "All",
    "Business Automation",
    "Data Processing",
    "Customer Service",
    "Content Creation",
    "Analytics",
    "Integration",
    "Custom Solutions"
] as const;

export type AgentCategory = typeof AGENT_CATEGORIES[number];

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
    "Beginner",
    "Easy",
    "Intermediate",
    "Advanced",
    "Expert"
] as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];

// Status Types
export type AgentStatus = "active" | "inactive" | "draft" | "archived";

// Translation Language Types
export type LanguageCode = "en" | "bn";

// Feature highlighting types
export interface AgentFeature {
    icon: string;
    title: string;
    description: string;
}

// Pricing display types
export interface PricingInfo {
    price: number;
    currency: string;
    period?: string;
    discount?: number;
}

// Rating display types
export interface RatingInfo {
    rating: number;
    totalReviews: number;
    stars: number[];
}