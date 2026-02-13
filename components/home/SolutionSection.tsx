"use client";

import { motion } from "framer-motion";
import { MessageSquare, ShoppingBag, FolderOpen, Brain, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SolutionSection() {
  const { t } = useTranslation("homePage");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: MessageSquare,
      title: t("solution.features.replies.title"),
      description: t("solution.features.replies.description"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: ShoppingBag,
      title: t("solution.features.orders.title"),
      description: t("solution.features.orders.description"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: FolderOpen,
      title: t("solution.features.organized.title"),
      description: t("solution.features.organized.description"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Brain,
      title: t("solution.features.learns.title"),
      description: t("solution.features.learns.description"),
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-background" />

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
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              {t("solution.badge")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            {t("solution.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("solution.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Demo Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl overflow-hidden border-2 border-border shadow-2xl">
              <Image
                src="/ai_chatbot.svg"
                alt={t("solution.imageAlt")}
                fill
                className="object-cover"
                priority
              />

              {/* Video Play Button Overlay */}
              {!isVideoPlaying && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm group cursor-pointer"
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-primary/50 transition-all">
                    <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                  <span className="absolute bottom-8 text-white font-semibold">
                    {t("solution.watchDemo")}
                  </span>
                </motion.button>
              )}

              {/* Video Player */}
              {isVideoPlaying && (
                <div className="absolute inset-0">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=1"
                    title="Driplare AI Sales Agent Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                {t("solution.liveBadge")}
              </div>
            </div>
          </motion.div>

          {/* Right: Feature List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-card border-2 border-border rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border-2 border-border rounded-3xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-8">
              {t("solution.comparison.title")}
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <span className="text-2xl">😫</span>
                  </div>
                  <h4 className="text-xl font-bold text-destructive">
                    {t("solution.comparison.before.title")}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {(t("solution.comparison.before.points", { returnObjects: true }) as string[]).map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-destructive mt-1">✗</span>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="space-y-4 md:border-l-2 md:border-border md:pl-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="text-xl font-bold text-accent">
                    {t("solution.comparison.after.title")}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {(t("solution.comparison.after.points", { returnObjects: true }) as string[]).map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span className="text-foreground font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            asChild
          >
            <a href="/agent-marketplace">
              {t("solution.cta")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}