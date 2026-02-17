"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSiteSettings, SiteSettings } from "@/lib/site-settings";
import { GridLayer, DarkGridBoost, GlowBlob, BRAND } from "@/components/effects/bg-effects";
import { FooterCTA } from "./footer/FooterCTA";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterLinks } from "./footer/FooterLinks";
import { FooterLegal } from "./footer/FooterLegal";

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then((s) => { if (s) setSettings(s); });
  }, []);

  // Admin-controlled social links
  const socialLinks: { text: string; url: string; external: boolean }[] = [];
  if (settings?.showLinkedin && settings.linkedinUrl) socialLinks.push({ text: "LinkedIn", url: settings.linkedinUrl, external: true });
  if (settings?.showFacebook && settings.facebookUrl) socialLinks.push({ text: "Facebook", url: settings.facebookUrl, external: true });
  if (settings?.showTwitter && settings.twitterUrl) socialLinks.push({ text: "Twitter", url: settings.twitterUrl, external: true });
  if (settings?.showInstagram && settings.instagramUrl) socialLinks.push({ text: "Instagram", url: settings.instagramUrl, external: true });
  if (settings?.showYouTube && settings.youtubeUrl) socialLinks.push({ text: "YouTube", url: settings.youtubeUrl, external: true });

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">

      {/* ── bg-effects (theme-aware — subtle in light, vivid in dark) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid — light mode only */}
        <GridLayer
          color={BRAND.violet}
          opacity={0.035}
          cellSize={40}
          style="dots"
        />
        {/* Line grid boost — dark mode only */}
        <DarkGridBoost
          color={BRAND.violet}
          opacity={0.05}
          cellSize={40}
        />
        {/* Ambient glows — very soft in light, atmospheric in dark */}
        <GlowBlob
          color={BRAND.violet}
          position="top-left"
          size={480}
          opacity={0.05}
          duration={20}
        />
        <GlowBlob
          color={BRAND.blue}
          position="bottom-right"
          size={420}
          opacity={0.04}
          duration={24}
          delay={6}
        />
        <GlowBlob
          color={BRAND.emerald}
          position="top-right"
          size={320}
          opacity={0.03}
          duration={28}
          delay={12}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Zone 1: compact availability CTA */}
        <FooterCTA />

        {/* Zone 2: brand + nav grid */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 md:px-8 py-14">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-8">
              {/* Brand + newsletter — spans 2 cols on md */}
              <div className="col-span-2 md:col-span-2">
                <FooterBrand />
              </div>
              {/* Nav columns */}
              <div className="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                <FooterLinks socialLinks={socialLinks} />
              </div>
            </div>
          </div>
        </div>

        {/* Zone 3: legal */}
        <FooterLegal settings={settings} />
      </div>

    </footer>
  );
}