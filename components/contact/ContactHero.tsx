"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarIcon, MessageCircle, Mail, Sparkles } from "lucide-react";

interface ContactHeroProps {
  onFormOpen: () => void;
  whatsappNumber: string;
  whatsappMessage: string;
  calendarUrl: string;
}

export function ContactHero({
  onFormOpen,
  whatsappNumber,
  whatsappMessage,
  calendarUrl,
}: ContactHeroProps) {
  const { t } = useTranslation("contactPage");

  return (
    <section className="pt-28 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                          rounded-full px-3 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
            {t("hero.title")}{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t("hero.titleAccent")}
            </span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            {t("hero.subtitle")}
          </p>

          {/* 3 BIG conversion buttons */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {/* Calendar */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              onClick={() => window.open(calendarUrl, "_blank")}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                         border-2 border-border hover:border-primary/40
                         bg-card hover:bg-muted/40 hover:shadow-lg
                         transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center
                              group-hover:scale-110 transition-transform">
                <CalendarIcon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-foreground mb-1">
                  {t("paths.calendar.title")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("paths.calendar.desc")}
                </p>
              </div>
            </motion.button>

            {/* WhatsApp */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                         border-2 border-border hover:border-emerald-500/40
                         bg-card hover:bg-emerald-500/5 hover:shadow-lg
                         transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center
                              group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-foreground mb-1">
                  {t("paths.whatsapp.title")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("paths.whatsapp.desc")}
                </p>
              </div>
            </motion.a>

            {/* Form */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={onFormOpen}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                         border-2 border-border hover:border-blue-500/40
                         bg-card hover:bg-blue-500/5 hover:shadow-lg
                         transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center
                              group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-foreground mb-1">
                  {t("paths.form.title")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("paths.form.desc")}
                </p>
              </div>
            </motion.button>
          </div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs md:text-base text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-foreground">{t("social.response")}</strong>
            </span>
            <span className="hidden sm:block w-px h-3 bg-border" />
            <span>{t("social.countries")}</span>
            <span className="hidden sm:block w-px h-3 bg-border" />
            <span className="flex items-center gap-1">
              <span className="text-amber-500">⭐</span>
              {t("social.rating")}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}