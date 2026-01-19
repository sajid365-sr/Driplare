export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    category: string;
    excerpt?: string | null;
    tags: string[];
    published: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface BlogActionResponse {
    success: boolean;
    data: BlogPost[];
    error?: string;
}

export interface PostNavigationInfo {
    id: string;
    title: string;
    slug?: string;
}

export interface RelatedPost {
    id: string;
    title: string;
    cover_image: string;
    slug: string;
}

export interface BlogPostDetails {
    post: BlogPost;
    relatedPosts: RelatedPost[];
    prevPost: PostNavigationInfo | null;
    nextPost: PostNavigationInfo | null;
}