"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";


export function LiveDemoSection() {
    const { t } = useTranslation();



    return (
        <section id="demo" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
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
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            {t("services.AIAgent.liveDemo.badge")}
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("services.AIAgent.liveDemo.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        {t("services.AIAgent.liveDemo.subtitle")}
                    </p>

                    <Button
                        size="lg"
                        onClick={() => {
                            // Open the main chatbot (which is context-aware)
                            if (typeof window !== 'undefined' && (window as any).openDriplareChat) {
                                (window as any).openDriplareChat();
                            }
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 group"
                    >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {t("services.AIAgent.liveDemo.cta")}
                        <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                    </Button>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {(t("services.AIAgent.liveDemo.features", { returnObjects: true }) as Array<{
                        icon: string;
                        title: string;
                        description: string;
                    }>).map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all"
                        >
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className="text-lg font-bold text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>


        </section>
    );
}