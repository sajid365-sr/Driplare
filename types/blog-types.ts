// types/blog-types.ts

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;       // Tiptap HTML
    cover_image: string;
    category: string;
    excerpt?: string;
    tags: string[];
    published: boolean;
    locale?: string;       // "en" | "bn" — add after migration
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface RelatedPost {
    id: string;
    title: string;
    cover_image: string;
    slug: string;
}

export interface PostNavigationInfo {
    id: string;
    title: string;
    slug: string;
}

export interface BlogPostDetails {
    post: BlogPost;
    relatedPosts: RelatedPost[];
    prevPost: PostNavigationInfo | null;
    nextPost: PostNavigationInfo | null;
}