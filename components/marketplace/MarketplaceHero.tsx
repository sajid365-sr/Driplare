"use client";

import { Bot, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MarketplaceHero() {
  const { t } = useTranslation();

  return (
    <div className="relative text-center space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
        <Sparkles size={14} /> {t("marketplace.hero.badge")}
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight dark:text-white">
        {t("marketplace.hero.title_main")}{" "}
        <span className="text-primary">
          {t("marketplace.hero.title_accent")}
        </span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
        {t("marketplace.hero.description")}
      </p>
    </div>
  );
}
