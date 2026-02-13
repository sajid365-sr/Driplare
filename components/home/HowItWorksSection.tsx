"use client";

import { motion } from "framer-motion";
import { MessageCircle, Settings, Rocket, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function HowItWorksSection() {
  const { t } = useTranslation("homePage");

  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: t("howItWorks.steps.tell.title"),
      description: t("howItWorks.steps.tell.description"),
      details: t("howItWorks.steps.tell.details", { returnObjects: true }) as string[],
      color: "from-primary to-primary/80",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      number: "02",
      icon: Settings,
      title: t("howItWorks.steps.setup.title"),
      description: t("howItWorks.steps.setup.description"),
      details: t("howItWorks.steps.setup.details", { returnObjects: true }) as string[],
      color: "from-secondary to-secondary/80",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      number: "03",
      icon: Rocket,
      title: t("howItWorks.steps.launch.title"),
      description: t("howItWorks.steps.launch.description"),
      details: t("howItWorks.steps.launch.details", { returnObjects: true }) as string[],
      color: "from-accent to-accent/80",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

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
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {t("howItWorks.badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Arrow (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-4 z-10">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              )}

              {/* Step Card */}
              <div className="bg-card border-2 border-border rounded-3xl p-8 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-7 h-7 ${step.iconColor}`} strokeWidth={2} />
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Details List */}
                <div className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${step.iconBg} ${step.iconColor} mt-2 flex-shrink-0`} />
                      <span className="text-sm text-muted-foreground">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Connector (Mobile Only) */}
        <div className="md:hidden flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("howItWorks.promise.title")}
              </h3>
              <p className="text-lg text-muted-foreground">
                {t("howItWorks.promise.subtitle")}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {(t("howItWorks.promise.features", { returnObjects: true }) as string[]).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50"
                >
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
                asChild
              >
                <a href="/agent-marketplace">
                  {t("howItWorks.cta")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            {t("howItWorks.trustBadge")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}