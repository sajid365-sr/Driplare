"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Sheet,
  Zap,
  CheckCircle2,
  Users,
  Clock,
  BarChart3,
  Shield,
  Headphones,
  Smartphone,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function WhatYouGetSection() {
  const { t } = useTranslation();

  const mainDeliverables = [
    {
      icon: Bot,
      title: t("whatYouGet.main.agent.title"),
      description: t("whatYouGet.main.agent.description"),
      gradient: "from-primary to-primary/80",
      items: t("whatYouGet.main.agent.items", { returnObjects: true }) as string[],
    },
    {
      icon: Sheet,
      title: t("whatYouGet.main.sheet.title"),
      description: t("whatYouGet.main.sheet.description"),
      gradient: "from-secondary to-secondary/80",
      items: t("whatYouGet.main.sheet.items", { returnObjects: true }) as string[],
    },
    {
      icon: Headphones,
      title: t("whatYouGet.main.support.title"),
      description: t("whatYouGet.main.support.description"),
      gradient: "from-accent to-accent/80",
      items: t("whatYouGet.main.support.items", { returnObjects: true }) as string[],
    },
  ];

  const bonusFeatures = [
    {
      icon: MessageSquare,
      title: t("whatYouGet.bonus.messaging.title"),
      description: t("whatYouGet.bonus.messaging.description"),
    },
    {
      icon: Zap,
      title: t("whatYouGet.bonus.instant.title"),
      description: t("whatYouGet.bonus.instant.description"),
    },
    {
      icon: Clock,
      title: t("whatYouGet.bonus.available.title"),
      description: t("whatYouGet.bonus.available.description"),
    },
    {
      icon: BarChart3,
      title: t("whatYouGet.bonus.tracking.title"),
      description: t("whatYouGet.bonus.tracking.description"),
    },
    {
      icon: Shield,
      title: t("whatYouGet.bonus.secure.title"),
      description: t("whatYouGet.bonus.secure.description"),
    },
    {
      icon: Smartphone,
      title: t("whatYouGet.bonus.mobile.title"),
      description: t("whatYouGet.bonus.mobile.description"),
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-secondary/5" />

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
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              {t("whatYouGet.badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            {t("whatYouGet.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("whatYouGet.subtitle")}
          </p>
        </motion.div>

        {/* Main Deliverables - Large Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {mainDeliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-card border-2 border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group"
            >
              {/* Icon with Gradient Background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Checklist */}
              <div className="space-y-3">
                {item?.items.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonus Features - Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("whatYouGet.bonusTitle")}
            </h3>
            <p className="text-muted-foreground">
              {t("whatYouGet.bonusSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonusFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-4">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">
                  {t("whatYouGet.value.badge")}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("whatYouGet.value.title")}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t("whatYouGet.value.subtitle")}
              </p>
            </div>

            {/* Value Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {(t("whatYouGet.value.highlights", { returnObjects: true }) as Array<{label: string, value: string}>).map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-card/70 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
                >
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2">
                    {highlight.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {highlight.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8"
                asChild
              >
                <a href="/agent-marketplace">
                  {t("whatYouGet.cta")}
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                {t("whatYouGet.ctaSubtext")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}