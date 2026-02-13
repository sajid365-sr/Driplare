"use client";

import { motion } from "framer-motion";
import { Workflow, Database, Code, BarChart3, ArrowRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function AdditionalServicesSection() {
    const { t } = useTranslation("pricingPage");

    const services = [
        {
            icon: Workflow,
            title: t("Services.automation.title"),
            price: t("Services.automation.price"),
            description: t("Services.automation.description"),
            features: t("Services.automation.features", { returnObjects: true }) as string[],
            color: "from-primary to-primary/80",
        },
        {
            icon: Database,
            title: t("Services.scraping.title"),
            price: t("Services.scraping.price"),
            description: t("Services.scraping.description"),
            features: t("Services.scraping.features", { returnObjects: true }) as string[],
            color: "from-secondary to-secondary/80",
        },
        {
            icon: Code,
            title: t("Services.mern.title"),
            price: t("Services.mern.price"),
            description: t("Services.mern.description"),
            features: t("Services.mern.features", { returnObjects: true }) as string[],
            color: "from-accent to-accent/80",
        },
        {
            icon: BarChart3,
            title: t("Services.consulting.title"),
            price: t("Services.consulting.price"),
            description: t("Services.consulting.description"),
            features: t("Services.consulting.features", { returnObjects: true }) as string[],
            color: "from-primary/80 to-secondary",
        },
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                        {t("Services.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t("Services.subtitle")}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border-2 border-border rounded-3xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <service.icon className="w-7 h-7 text-white" strokeWidth={2} />
                            </div>

                            {/* Title & Price */}
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {service.title}
                            </h3>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-sm font-semibold text-muted-foreground uppercase">
                                    {t("Services.startingAt")}
                                </span>
                                <span className="text-2xl font-black text-primary">
                                    {service.price}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                                        <span className="text-xs text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button
                                variant="outline"
                                className="w-full border-2 font-bold group-hover:border-primary group-hover:text-primary transition-colors"
                                asChild
                            >
                                <a href="/contact" className="flex items-center justify-center gap-2">
                                    {t("Services.cta")}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-sm text-muted-foreground">
                        {t("Services.note")}{" "}
                        <a href="/contact" className="text-primary font-semibold hover:underline">
                            {t("Services.contactUs")}
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}