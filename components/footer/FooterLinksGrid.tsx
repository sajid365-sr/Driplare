"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NewsletterForm } from "./NewsletterForm";
import { useEffect, useState } from "react";
import { getSiteSettings, SiteSettings } from "@/lib/site-settings";

export function FooterLinksGrid() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const siteSettings = await getSiteSettings();
      if (siteSettings) setSettings(siteSettings);
    };
    loadSettings();
  }, []);

  const getSocialLinks = () => {
    if (!settings) return [];
    const links = [];
    if (settings.showLinkedin && settings.linkedinUrl) links.push({ text: "LinkedIn", url: settings.linkedinUrl, external: true });
    if (settings.showFacebook && settings.facebookUrl) links.push({ text: "Facebook", url: settings.facebookUrl, external: true });
    if (settings.showTwitter && settings.twitterUrl) links.push({ text: "Twitter", url: settings.twitterUrl, external: true });
    if (settings.showInstagram && settings.instagramUrl) links.push({ text: "Instagram", url: settings.instagramUrl, external: true });
    if (settings.showYouTube && settings.youtubeUrl) links.push({ text: "YouTube", url: settings.youtubeUrl, external: true });
    return links;
  };

  const linkSections = [
    {
      title: t("footer.sections.ecosystem"),
      subtitle: t("footer.subtitles.services"),
      links: [
        { text: t("footer.links.aiAgents"), url: "/solutions/ai-agents" },
        { text: t("footer.links.workflow"), url: "/solutions/workflow-automation" },
        { text: t("footer.links.webDev"), url: "/solutions/web-development" },
        { text: t("footer.links.consulting"), url: "/solutions/ai-consulting" },
        { text: t("footer.links.marketplace"), url: "/marketplace" },
      ],
    },
    {
      title: t("footer.sections.intelligence"),
      subtitle: t("footer.subtitles.resources"),
      links: [
        { text: t("footer.links.caseStudies"), url: "/case-studies" },
        { text: t("footer.links.insights"), url: "/insights" },
        { text: t("footer.links.pricing"), url: "/pricing" },
        { text: t("footer.links.faq"), url: "/pricing#faq" },
      ],
    },
    {
      title: t("footer.sections.identity"),
      subtitle: t("footer.subtitles.driplare"),
      links: [
        { text: t("footer.links.about"), url: "/about-us" },
        { text: t("footer.links.contact"), url: "/contact" },
        { text: t("footer.links.strategy"), url: "/contact" },
        { text: t("footer.links.privacy"), url: "/privacy" },
        { text: t("footer.links.terms"), url: "/terms" },
      ],
    },
    {
      title: t("footer.sections.connect"),
      subtitle: t("footer.subtitles.socials"),
      links: getSocialLinks(),
    },
  ];

  return (
    <div className="py-20 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* Columns 1–3: link sections */}
          {linkSections.slice(0, 3).map((section) => (
            <div key={section.title} className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-[#0A0A0A] dark:text-white tracking-tighter mb-1 uppercase">
                  {section.title}
                </h3>
                <div className="h-0.5 w-6 bg-primary/30 rounded-full" />
                <p className="font-mono text-[12px] font-bold text-[#0A0A0A]/30 dark:text-white/30 mt-2 tracking-widest uppercase">
                  {section.subtitle}
                </p>
              </div>
              <nav className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.url}
                    className="text-sm font-medium text-[#0A0A0A]/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all text-primary font-bold opacity-0 group-hover:opacity-100 italic">
                      /
                    </span>
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Column 4: newsletter + socials */}
          <div className="space-y-12">
            <NewsletterForm />

            {linkSections[3].links.length > 0 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-black text-[#0A0A0A] dark:text-white tracking-tighter mb-1 uppercase">
                    {linkSections[3].title}
                  </h3>
                  <div className="h-0.5 w-6 bg-primary/30 rounded-full" />
                  <p className="font-mono text-[12px] font-bold text-[#0A0A0A]/30 dark:text-white/30 mt-2 tracking-widest uppercase">
                    {linkSections[3].subtitle}
                  </p>
                </div>
                <nav className="flex flex-col gap-4">
                  {linkSections[3].links.map((link) => (
                    <Link
                      key={link.text}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#0A0A0A]/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all text-primary font-bold opacity-0 group-hover:opacity-100 italic">
                        /
                      </span>
                      {link.text}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}