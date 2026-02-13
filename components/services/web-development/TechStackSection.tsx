"use client";

import { motion } from "framer-motion";
import { Layers, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export function TechStackSection() {
    const { t } = useTranslation("webDevelopmentPage");

    const categories = t("techStack.categories", {
        returnObjects: true,
    }) as Array<{
        title: string;
        techs: Array<{
            name: string;
            logoUrl: string;
        }>;
    }>;

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Layers className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("techStack.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("techStack.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("techStack.subtitle")}
                    </p>
                </motion.div>

                {/* Tech Categories */}
                <div className="max-w-6xl mx-auto space-y-10">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            {/* Category Label */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-px flex-1 bg-border" />
                                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest px-2">
                                    {category.title}
                                </span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            {/* Tech Logos */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {category.techs.map((tech, techIndex) => (
                                    <motion.div
                                        key={techIndex}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: catIndex * 0.1 + techIndex * 0.05 }}
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        className="group flex flex-col items-center gap-2 bg-card border-2 border-border rounded-2xl px-5 py-4 min-w-[90px] hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default"
                                    >
                                        {/*
                      IMAGE PLACEHOLDER: Tech Logo
                      Dimensions: 48x48px (square SVG preferred)
                      Path: tech.logoUrl (defined in translations)
                      Content: Official technology logo
                      All logos available at: https://svgl.app or https://simpleicons.org
                      Suggested format: SVG or PNG with transparent background
                    */}
                                        <div className="w-10 h-10 flex items-center justify-center">
                                            {/* Uncomment when logos are ready */}
                                            {/* <Image
                        src={tech.logoUrl}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="object-contain grayscale group-hover:grayscale-0 transition-all"
                      /> */}

                                            {/* Placeholder circle */}
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                <span className="text-xs font-black text-primary">
                                                    {tech.name.slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-full px-6 py-3">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("techStack.note")}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}