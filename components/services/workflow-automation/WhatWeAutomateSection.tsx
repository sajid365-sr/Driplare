"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Share2, Users, Mail, BarChart3, ShoppingCart,
    UserCheck, FileText, Bell, Zap, ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
    social: Share2,
    leads: Users,
    inbox: Mail,
    reporting: BarChart3,
    ecommerce: ShoppingCart,
    onboarding: UserCheck,
    content: FileText,
    alerts: Bell,
};

const ICON_GRADIENTS: Record<string, string> = {
    social: "from-primary to-secondary",
    leads: "from-secondary to-accent",
    inbox: "from-accent to-primary",
    reporting: "from-primary to-accent",
    ecommerce: "from-secondary to-primary",
    onboarding: "from-accent to-secondary",
    content: "from-primary to-secondary",
    alerts: "from-secondary to-accent",
};

type Category = {
    key: string;
    title: string;
    description: string;
    examples: string[];
    tools: string[];
};

export function WhatWeAutomateSection() {
    const { t } = useTranslation("workflowAutomationPage");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Category | null>(null);

    const categories = t("whatWeAutomate.categories", {
        returnObjects: true,
    }) as Category[];

    const handleOpen = (cat: Category) => {
        setSelected(cat);
        setOpen(true);
    };

    const ActiveIcon = selected ? (CATEGORY_ICONS[selected.key] ?? Zap) : null;
    const gradient = selected ? (ICON_GRADIENTS[selected.key] ?? "from-primary to-secondary") : "";

    return (
        <section
            id="what-we-automate"
            className="py-20 bg-muted/30 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

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
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                            {t("whatWeAutomate.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("whatWeAutomate.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("whatWeAutomate.subtitle")}
                    </p>
                </motion.div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
                    {categories.map((cat, index) => {
                        const IconComponent = CATEGORY_ICONS[cat.key] ?? Zap;
                        const grad = ICON_GRADIENTS[cat.key] ?? "from-primary to-secondary";

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.07 }}
                            >
                                <button
                                    onClick={() => handleOpen(cat)}
                                    className="group w-full text-left bg-card border-2 border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 rounded-2xl p-5 transition-all"
                                >
                                    {/* Icon */}
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                                        <IconComponent className="w-5 h-5 text-white" strokeWidth={2} />
                                    </div>

                                    {/* Title */}
                                    <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                                        {cat.title}
                                    </p>

                                    {/* CTA hint */}
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                        {t("whatWeAutomate.expandLabel")}
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-muted-foreground mb-6">
                        {t("whatWeAutomate.bottomText")}
                    </p>
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                        asChild
                    >
                        <a href="/contact" className="flex items-center gap-2">
                            {t("whatWeAutomate.bottomCta")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>
            </div>

            {/* ── Drawer ── */}
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="max-h-[85vh]">
                    {selected && (
                        <>
                            {/* Gradient header strip */}
                            <div className={`bg-gradient-to-r ${gradient} px-6 pt-6 pb-8 rounded-t-[10px]`}>
                                <div className="flex items-center gap-4 max-w-4xl mx-auto">
                                    {ActiveIcon && (
                                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <ActiveIcon className="w-6 h-6 text-white" strokeWidth={2} />
                                        </div>
                                    )}
                                    <DrawerHeader className="p-0 text-left ">
                                        <DrawerTitle className="text-xl font-black text-white">
                                            {selected.title}
                                        </DrawerTitle>
                                        <DrawerDescription className="text-white/75 text-sm mt-0.5">
                                            {selected.description}
                                        </DrawerDescription>
                                    </DrawerHeader>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="overflow-y-auto px-6 pb-4 max-w-4xl mx-auto w-full">
                                <div className="grid md:grid-cols-2 gap-8 py-6">

                                    {/* Examples */}
                                    <div>
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">
                                            {t("whatWeAutomate.examplesLabel")}
                                        </p>
                                        <div className="space-y-3">
                                            {selected.examples.map((ex, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-[10px] font-black text-primary">{i + 1}</span>
                                                    </div>
                                                    <span className="text-sm text-foreground leading-relaxed">{ex}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tools */}
                                    <div>
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">
                                            {t("whatWeAutomate.toolsLabel")}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {selected.tools.map((tool, i) => (
                                                <span
                                                    key={i}
                                                    className="text-sm font-bold bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="bg-muted/50 border border-border rounded-2xl p-4">
                                            <p className="text-sm font-bold text-foreground mb-1">
                                                {t("whatWeAutomate.drawerCtaTitle")}
                                            </p>
                                            <p className="text-xs text-muted-foreground mb-4">
                                                {t("whatWeAutomate.drawerCtaSubtitle")}
                                            </p>
                                            <Button
                                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
                                                asChild
                                            >
                                                <a href="/contact" className="flex items-center justify-center gap-2">
                                                    {t("whatWeAutomate.panelCta")}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <DrawerFooter className="pt-0 max-w-4xl mx-auto w-full px-6">
                                <DrawerClose asChild>
                                    <Button variant="outline" className="border-2 font-bold">
                                        {t("whatWeAutomate.collapseLabel")}
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </section>
    );
}