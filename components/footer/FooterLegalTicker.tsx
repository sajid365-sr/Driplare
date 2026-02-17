"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getSiteSettings, SiteSettings } from "@/lib/site-settings";

export function FooterLegalTicker() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const siteSettings = await getSiteSettings();
      if (siteSettings) setSettings(siteSettings);
    };
    loadSettings();
  }, []);

  const copyrightText =
    settings?.footerCopyright || `© ${new Date().getFullYear()} ${t("footer.rights")}`;

  const legalLinks = [
    { label: t("footer.links.privacy"), href: "/privacy" },
    { label: t("footer.links.terms"), href: "/terms" },
  ];

  return (
    <div className="border-t border-black/5 dark:border-white/5 py-10 bg-black/[0.02] dark:bg-white/[0.02] transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

          {/* Copyright */}
          <div className="font-mono text-[10px] font-bold text-[#0A0A0A]/40 dark:text-white/40 uppercase tracking-[0.2em]">
            {copyrightText}
          </div>

          {/* Legal links */}
          <div className="flex gap-8">
            {legalLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-[10px] font-black text-[#0A0A0A]/50 dark:text-white/50 hover:text-primary transition-colors uppercase tracking-widest"
              >
                [{label}]
              </Link>
            ))}
          </div>

          {/* Architected by */}
          <div className="font-mono text-[10px] font-bold text-[#0A0A0A]/40 dark:text-white/40 uppercase tracking-[0.2em]">
            {t("footer.architectedBy")}:{" "}
            <span className="text-[#0A0A0A] dark:text-white">Driplare</span>
          </div>

        </div>
      </div>
    </div>
  );
}