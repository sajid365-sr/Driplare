"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar, Clock, Tag, ArrowLeft, ArrowRight,
    ChevronLeft, Share2, Twitter, Linkedin, Link2,
} from "lucide-react";
import { BlogPostDetails } from "@/types/blog-types";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";
import { useState } from "react";

// ─── utils ────────────────────────────────────────────────────────────────────
function readingTime(html: string) {
    return Math.max(1, Math.ceil(html.replace(/<[^>]*>/g, "").split(/\s+/).length / 200));
}

function fmtDate(d: string | Date, lang: string) {
    return new Date(d).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
        day: "numeric", month: "long", year: "numeric",
    });
}

// ─── ShareButtons ─────────────────────────────────────────────────────────────
function ShareButtons({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium mr-1">Share</span>
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-muted border border-border hover:border-primary/30
                   flex items-center justify-center transition-colors group"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-muted border border-border hover:border-primary/30
                   flex items-center justify-center transition-colors group"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <button
                onClick={copyLink}
                className="w-8 h-8 rounded-xl bg-muted border border-border hover:border-primary/30
                   flex items-center justify-center transition-colors group"
                aria-label="Copy link"
            >
                <Link2 className={`w-3.5 h-3.5 transition-colors ${copied ? "text-emerald-500" : "text-muted-foreground group-hover:text-primary"}`} />
            </button>
            {copied && (
                <span className="text-[10px] text-emerald-500 font-bold animate-fade-in">
                    Copied!
                </span>
            )}
        </div>
    );
}

// ─── RelatedCard ──────────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: { id: string; title: string; cover_image: string; slug: string } }) {
    return (
        <Link href={`/insights/${post.slug}`}
            className="group flex items-center gap-3 p-3 rounded-2xl border border-border
                 hover:border-primary/30 hover:bg-muted/40 transition-all">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                {post.cover_image && (
                    <Image src={post.cover_image} alt={post.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="56px"
                    />
                )}
            </div>
            <p className="text-xs font-bold text-foreground leading-snug line-clamp-2
                    group-hover:text-primary transition-colors">
                {post.title}
            </p>
        </Link>
    );
}

// ─── Main Detail Client ───────────────────────────────────────────────────────
interface BlogDetailClientProps {
    data: BlogPostDetails;
}

export function BlogDetailClient({ data }: BlogDetailClientProps) {
    const { post, relatedPosts, prevPost, nextPost } = data;
    const { i18n } = useTranslation();
    const mins = readingTime(post.content);

    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* bg-effects */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.025} cellSize={44} style="dots" />
                <DarkGridBoost color={BRAND.violet} opacity={0.045} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.04} duration={22} />
                <GlowBlob color={BRAND.blue} position="top-right" size={380} opacity={0.03} duration={28} delay={8} />
            </div>

            <div className="relative z-10">
                {/* ── Back nav ── */}
                <div className="container mx-auto px-4 md:px-8 pt-24 pb-6">
                    <Link href="/insights"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground
                       hover:text-foreground transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Insights
                    </Link>
                </div>

                {/* ── Cover image ── */}
                {post.cover_image && (
                    <div className="container mx-auto px-4 md:px-8 mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full h-[280px] md:h-[420px] rounded-3xl overflow-hidden border border-border"
                        >
                            <Image
                                src={post.cover_image} alt={post.title} fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 90vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                )}

                {/* ── Article layout: prose + sidebar ── */}
                <div className="container mx-auto px-4 md:px-8 pb-20">
                    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">

                        {/* ── Main prose column ── */}
                        <article className="flex-1 min-w-0">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.48 }}
                                className="mb-8"
                            >
                                {/* Category + tags */}
                                <div className="flex items-center flex-wrap gap-2 mb-4">
                                    <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20
                                   text-primary text-[10px] font-black px-3 py-1 rounded-full">
                                        <Tag className="w-2.5 h-2.5" />
                                        {post.category}
                                    </span>
                                    {post.tags?.map((tag) => (
                                        <span key={tag}
                                            className="text-[10px] font-bold text-muted-foreground bg-muted
                                 px-2 py-0.5 rounded-full border border-border">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl md:text-4xl font-black text-foreground leading-tight mb-4">
                                    {post.title}
                                </h1>

                                {/* Meta row */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3
                                justify-between border-y border-border py-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {fmtDate(post.createdAt, i18n.language)}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {mins} min read
                                        </span>
                                    </div>
                                    <ShareButtons title={post.title} />
                                </div>

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <p className="text-base text-muted-foreground leading-relaxed
                                border-l-2 border-primary/40 pl-4 mt-5 italic">
                                        {post.excerpt}
                                    </p>
                                )}
                            </motion.div>

                            {/* Tiptap HTML prose */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="tiptap-prose"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* ── Prev / Next navigation ── */}
                            {(prevPost || nextPost) && (
                                <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {prevPost ? (
                                        <Link href={`/insights/${prevPost.slug}`}
                                            className="group flex flex-col gap-1 p-4 rounded-2xl border border-border
                                 hover:border-primary/30 hover:bg-muted/30 transition-all">
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black
                                       text-muted-foreground uppercase tracking-widest">
                                                <ArrowLeft className="w-3 h-3" /> Previous
                                            </span>
                                            <p className="text-sm font-bold text-foreground group-hover:text-primary
                                    transition-colors line-clamp-2">
                                                {prevPost.title}
                                            </p>
                                        </Link>
                                    ) : <div />}

                                    {nextPost && (
                                        <Link href={`/insights/${nextPost.slug}`}
                                            className="group flex flex-col gap-1 p-4 rounded-2xl border border-border
                                 hover:border-primary/30 hover:bg-muted/30 transition-all text-right">
                                            <span className="inline-flex items-center justify-end gap-1.5 text-[10px] font-black
                                       text-muted-foreground uppercase tracking-widest">
                                                Next <ArrowRight className="w-3 h-3" />
                                            </span>
                                            <p className="text-sm font-bold text-foreground group-hover:text-primary
                                    transition-colors line-clamp-2">
                                                {nextPost.title}
                                            </p>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </article>

                        {/* ── Sticky sidebar ── */}
                        <aside className="lg:w-[280px] flex-shrink-0">
                            <div className="sticky top-24 flex flex-col gap-6">

                                {/* Post info card */}
                                <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                        Article Info
                                    </p>
                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Category</span>
                                            <span className="font-bold text-foreground">{post.category}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Read time</span>
                                            <span className="font-bold text-foreground">{mins} min</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Published</span>
                                            <span className="font-bold text-foreground text-right text-xs">
                                                {fmtDate(post.createdAt, i18n.language)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Related posts */}
                                {relatedPosts.length > 0 && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                            Related Articles
                                        </p>
                                        {relatedPosts.map((rp) => (
                                            <RelatedCard key={rp.id} post={rp} />
                                        ))}
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="bg-gradient-to-br from-primary/8 via-secondary/5 to-accent/8
                                dark:from-primary/12 dark:via-secondary/8 dark:to-accent/10
                                border border-border rounded-2xl p-5 space-y-3">
                                    <p className="text-xs font-black text-foreground leading-snug">
                                        Want AI like this for your business?
                                    </p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        We build and deploy custom AI systems for BD and international businesses.
                                    </p>
                                    <Link href="/contact"
                                        className="inline-flex items-center gap-1.5 text-xs font-black text-primary
                               hover:gap-2.5 transition-all group">
                                        Book a discovery call
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}