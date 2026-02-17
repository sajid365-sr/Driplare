"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type LinkItem = { text: string; url: string; external?: boolean };

function NavColumn({
    title,
    links,
    delay = 0,
}: {
    title: string;
    links: LinkItem[];
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay }}
            className="flex flex-col gap-5"
        >
            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.18em]">
                {title}
            </p>
            <nav className="flex flex-col gap-3">
                {links.map((link) => (
                    <Link
                        key={link.text}
                        href={link.url}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-1 text-sm text-muted-foreground
                       hover:text-foreground transition-colors duration-200"
                    >
                        <span
                            className="inline-block w-0 overflow-hidden group-hover:w-3.5
                         text-primary text-xs font-black transition-all duration-200 leading-none"
                        >
                            ›
                        </span>
                        <span>{link.text}</span>
                        {link.external && (
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity ml-0.5" />
                        )}
                    </Link>
                ))}
            </nav>
        </motion.div>
    );
}

type FooterLinksProps = {
    socialLinks: LinkItem[];
};

export function FooterLinks({ socialLinks }: FooterLinksProps) {
    const { t } = useTranslation();

    const sections = [
        {
            title: t("footer.sections.services"),
            links: [
                { text: t("footer.links.aiAgents"), url: "/solutions/ai-agents" },
                { text: t("footer.links.workflow"), url: "/solutions/workflow-automation" },
                { text: t("footer.links.webDev"), url: "/solutions/web-development" },
                { text: t("footer.links.consulting"), url: "/solutions/ai-consulting" },
                { text: t("footer.links.marketplace"), url: "/marketplace" },
            ],
        },
        {
            title: t("footer.sections.resources"),
            links: [
                { text: t("footer.links.caseStudies"), url: "/case-studies" },
                { text: t("footer.links.insights"), url: "/insights" },
                { text: t("footer.links.pricing"), url: "/pricing" },
                { text: t("footer.links.faq"), url: "/pricing#faq" },
            ],
        },
        {
            title: t("footer.sections.company"),
            links: [
                { text: t("footer.links.about"), url: "/about-us" },
                { text: t("footer.links.contact"), url: "/contact" },
                { text: t("footer.links.strategy"), url: "/contact" },
                { text: t("footer.links.privacy"), url: "/privacy" },
                { text: t("footer.links.terms"), url: "/terms" },
            ],
        },
    ];

    return (
        <>
            {sections.map((section, i) => (
                <NavColumn
                    key={section.title}
                    title={section.title}
                    links={section.links}
                    delay={0.08 + i * 0.07}
                />
            ))}

            {/* Social links — only rendered when admin enables at least one */}
            {socialLinks.length > 0 && (
                <NavColumn
                    title={t("footer.sections.connect")}
                    links={socialLinks}
                    delay={0.29}
                />
            )}
        </>
    );
}