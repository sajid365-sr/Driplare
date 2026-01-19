export interface CaseContent {
    title: string;
    context: string;
    problem: string;
    solution: string;
    myApproach?: string; // The Strategy / Story
    failedAttempts?: string; // Challenges & what didn't work initially
    result: string;
    metric: string; // e.g., "70% Cost Reduction"
    testimonial?: string;
    testimonialRole?: string; // e.g., "CEO", "Operations Manager"
}

export interface CaseStudy {
    id?: string;
    category: string;
    techTags: string[];
    clientName?: string;
    clientLocation?: string; // e.g., "USA", "UK", "Bangladesh"
    industry?: string; // e.g., "E-commerce", "Healthcare"
    projectDuration?: string; // e.g., "3 Weeks", "2 Months"
    heroImage?: string;
    videoReviewUrl?: string; // Client Testimonial Video (YouTube/Loom)
    dashboardVideoUrl?: string; // Solution Demo Video
    n8nDiagramUrl?: string; // Workflow Diagram Image
    gallery: string[]; // [image1_url, image2_url, ...]
    beforeMetricValue?: number; // e.g., 40 (hours)
    afterMetricValue?: number; // e.g., 2 (hours)
    metricUnit?: string; // e.g., "hrs/week", "USD", "%"
    en: CaseContent;
    bn: CaseContent;
    createdAt: string;
    updatedAt: string;
}
