"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import {
    Calendar, Clock, Tag, ArrowRight, Search,
    Rss, ArrowUpRight, BookOpen,
} from "lucide-react";
import { BlogPost } from "@/types/blog-types";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";

// ─── utils ───────────────────────────────────────────────────────────────────
function readingTime(html: string) {
    return Math.max(1, Math.ceil(html.replace(/<[^>]*>/g, "").split(/\s+/).length / 200));
}

function fmtDate(d: string | Date, lang: string) {
    return new Date(d).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
        day: "numeric", month: "short", year: "numeric",
    });
}

// Category → accent colour mapping (cycles through brand palette)
const CAT_COLORS: Record<string, string> = {};
const PALETTE = [
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
];
function catColor(cat: string) {
    if (!CAT_COLORS[cat]) {
        const idx = Object.keys(CAT_COLORS).length % PALETTE.length;
        CAT_COLORS[cat] = PALETTE[idx];
    }
    return CAT_COLORS[cat];
}

// ─── BlogCard ─────────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const { i18n } = useTranslation();
    const [hovered, setHovered] = useState(false);
    const mins = readingTime(post.content);

    return (
        <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.42 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative flex flex-col rounded-2xl overflow-hidden
                 bg-card border border-border
                 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/8
                 transition-all duration-300 cursor-pointer"
        >
            {/* Scan-line on hover */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ top: "-2px", opacity: 0.8 }}
                        animate={{ top: "102%", opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.1, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none
                       bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                        style={{ position: "absolute" }}
                    />
                )}
            </AnimatePresence>

            {/* Cover */}
            <div className="relative h-44 overflow-hidden bg-muted flex-shrink-0">
                {post.cover_image ? (
                    <Image
                        src={post.cover_image} alt={post.title} fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
                )}
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                {/* Category chip */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 border text-[10px] font-black
                            px-2.5 py-1 rounded-full backdrop-blur-sm bg-background/80
                            ${catColor(post.category)}`}>
                        <Tag className="w-2.5 h-2.5" />
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {fmtDate(post.createdAt, i18n.language)}
                    </span>
                    <span className="w-px h-3 bg-border flex-shrink-0" />
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {mins} min
                    </span>
                </div>

                <h2 className="text-sm font-black text-foreground leading-snug
                       group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.title}
                </h2>

                {post.excerpt && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                    </p>
                )}

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag}
                                className="text-[10px] font-bold text-muted-foreground/70 bg-muted
                           px-2 py-0.5 rounded-full border border-border/60">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <Link href={`/insights/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black
                     text-primary hover:gap-2.5 transition-all duration-200 mt-auto pt-1 w-fit">
                    Read article
                    <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </motion.article>
    );
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPost }) {
    const { i18n } = useTranslation();
    const mins = readingTime(post.content);

    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52 }}
            className="group col-span-full relative overflow-hidden rounded-3xl
                 border border-border bg-card
                 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/10
                 transition-all duration-300"
        >
            <div className="flex flex-col md:flex-row min-h-[320px]">
                {/* Image */}
                <div className="relative md:w-[42%] h-56 md:h-auto overflow-hidden bg-muted flex-shrink-0">
                    {post.cover_image ? (
                        <Image
                            src={post.cover_image} alt={post.title} fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 42vw"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
                    )}
                    {/* Right fade for desktop */}
                    <div className="hidden md:block absolute inset-0
                          bg-gradient-to-r from-transparent via-transparent to-card/70" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-7 md:p-10 gap-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20
                             text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            ★ Featured
                        </span>
                        <span className={`inline-flex items-center gap-1.5 border text-[10px] font-black
                              px-2.5 py-1 rounded-full ${catColor(post.category)}`}>
                            <Tag className="w-2.5 h-2.5" />
                            {post.category}
                        </span>
                    </div>

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground leading-tight
                         group-hover:text-primary transition-colors duration-200">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl line-clamp-2">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {fmtDate(post.createdAt, i18n.language)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {mins} min read
                        </span>
                    </div>

                    <Link href={`/insights/${post.slug}`}
                        className="group/l inline-flex items-center gap-2 text-sm font-black
                       text-primary hover:gap-3 transition-all duration-200 w-fit">
                        Read full article
                        <ArrowRight className="w-4 h-4 group-hover/l:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-border overflow-hidden animate-pulse">
            <div className="h-44 bg-muted" />
            <div className="p-5 space-y-3">
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-4/5" />
                <div className="h-3 bg-muted rounded w-1/2" />
            </div>
        </div>
    );
}

// ─── Main Client ──────────────────────────────────────────────────────────────
interface InsightsClientProps {
    posts: BlogPost[];
    categories: string[];
}

export function InsightsClient({ posts, categories }: InsightsClientProps) {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        let r = [...posts];
        if (activeCategory !== "All") r = r.filter((p) => p.category === activeCategory);
        if (search.trim()) {
            const q = search.toLowerCase();
            r = r.filter((p) =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt?.toLowerCase().includes(q) ||
                p.tags?.some((t) => t.toLowerCase().includes(q))
            );
        }
        return r;
    }, [posts, activeCategory, search]);

    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden">
            {/* bg-effects */}
            <div className="absolute inset-0 pointer-events-none">
                <GridLayer color={BRAND.violet} opacity={0.03} cellSize={44} style="dots" />
                <DarkGridBoost color={BRAND.violet} opacity={0.055} cellSize={44} />
                <GlowBlob color={BRAND.violet} position="top-left" size={520} opacity={0.05} duration={22} />
                <GlowBlob color={BRAND.blue} position="bottom-right" size={440} opacity={0.04} duration={26} delay={7} />
            </div>

            <div className="relative z-10">
                {/* ── Hero ── */}
                <section className="pt-28 pb-12 border-b border-border">
                    <div className="container mx-auto px-4 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                        >
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                                rounded-full px-3 py-1.5 mb-5">
                                    <Rss className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[11px] font-black text-primary uppercase tracking-widest">
                                        {t("insights.badge")}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.05] mb-3">
                                    {t("insights.title")}{" "}
                                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                        {t("insights.titleAccent")}
                                    </span>
                                </h1>
                                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                                    {t("insights.subtitle")}
                                </p>
                            </div>

                            {/* Post count */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                                <BookOpen className="w-4 h-4 text-primary" />
                                <span className="font-bold text-foreground">{posts.length}</span>
                                <span>{t("insights.postCount")}</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Sticky filter bar ── */}
                <div className="sticky top-[64px] z-30 bg-background/90 backdrop-blur-md border-b border-border">
                    <div className="container mx-auto px-4 md:px-8 py-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center
                            justify-between gap-3">
                            {/* Category chips */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {["All", ...categories].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`text-[11px] font-black px-3.5 py-1.5 rounded-full border
                                transition-all duration-200 ${activeCategory === cat
                                                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                                                : "text-muted-foreground border-border hover:border-primary/30 hover:text-foreground bg-transparent"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative flex-shrink-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={t("insights.searchPlaceholder")}
                                    className="pl-9 pr-4 py-1.5 text-xs bg-muted border border-border rounded-xl
                             text-foreground placeholder:text-muted-foreground/50
                             focus:outline-none focus:border-primary/50 focus:ring-1
                             focus:ring-primary/20 w-48 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Posts ── */}
                <section className="py-12">
                    <div className="container mx-auto px-4 md:px-8">
                        <AnimatePresence mode="wait">
                            {filtered.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-24"
                                >
                                    <p className="text-5xl mb-4">📭</p>
                                    <p className="font-bold text-foreground mb-1">{t("insights.emptyTitle")}</p>
                                    <p className="text-sm text-muted-foreground">{t("insights.emptySub")}</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {featured && <FeaturedCard post={featured} />}
                                    {rest.map((post, i) => (
                                        <BlogCard key={post.id} post={post} index={i} />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </div>
        </div>
    );
}