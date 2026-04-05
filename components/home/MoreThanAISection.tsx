"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  LayoutDashboard,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { EcosystemDiagram } from "./EcosystemDiagram";

export function MoreThanAISection() {
  const { t } = useTranslation("homePage");

  const pillars = [
    {
      icon: Bot,
      title: t("moreThanAI.pillars.ai.title"),
      description: t("moreThanAI.pillars.ai.description"),
      color: "from-primary to-primary/80",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      link: "/solutions/ai-agents",
    },
    {
      icon: Workflow,
      title: t("moreThanAI.pillars.automation.title"),
      description: t("moreThanAI.pillars.automation.description"),
      color: "from-secondary to-secondary/80",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      link: "/solutions/workflow-automation",
    },
    {
      icon: LayoutDashboard,
      title: t("moreThanAI.pillars.dashboard.title"),
      description: t("moreThanAI.pillars.dashboard.description"),
      color: "from-accent to-accent/80",
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
      link: "/solutions/web-development",
    },
    {
      icon: Lightbulb,
      title: t("moreThanAI.pillars.consulting.title"),
      description: t("moreThanAI.pillars.consulting.description"),
      color: "from-primary/70 to-accent/70",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      link: "/solutions/ai-consulting",
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), 
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

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
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {t("moreThanAI.badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            {t("moreThanAI.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("moreThanAI.subtitle")}
          </p>
        </motion.div>

        {/* Ecosystem Visual - Animated SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative aspect-[2/1] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl border-2 border-border overflow-hidden p-8">
            <EcosystemDiagram />
          </div>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {pillars.map((pillar, index) => (
            <motion.a
              key={index}
              href={pillar.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block"
            >
              <div className="bg-card border-2 border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {pillar.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  <span>{t("moreThanAI.learnMore")}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("moreThanAI.cta.title")}
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("moreThanAI.cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
                asChild
              >
                <a href="/solutions">
                  {t("moreThanAI.cta.primary")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 font-bold group"
                asChild
              >
                <a href="/contact">
                  {t("moreThanAI.cta.secondary")}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}