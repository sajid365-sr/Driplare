"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SiteSettings } from "@/lib/site-settings";

type FooterLegalProps = {
    settings: SiteSettings | null;
};

export function FooterLegal({ settings }: FooterLegalProps) {
    const { t } = useTranslation();

    const copyrightText =
        settings?.footerCopyright ||
        `© ${new Date().getFullYear()} Driplare. All rights reserved.`;

    return (
        <div className="relative overflow-hidden border-t border-border">
            {/* Decorative watermark */}
            <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none
                   text-[clamp(48px,10vw,120px)] font-black tracking-tighter
                   text-foreground/[0.025] dark:text-white/[0.03]
                   whitespace-nowrap leading-none"
            >
                DRIPLARE
            </div>

            <div className="container mx-auto px-4 md:px-8 py-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3
                        text-center md:text-left">

                    <p className="text-[11px] text-muted-foreground/60 font-medium tracking-wide">
                        {copyrightText}
                    </p>

                    <div className="flex items-center gap-1 text-muted-foreground/40">
                        <Link
                            href="/privacy"
                            className="text-[11px] font-medium hover:text-foreground transition-colors px-3 py-1"
                        >
                            {t("footer.links.privacy")}
                        </Link>
                        <span className="text-[10px]">·</span>
                        <Link
                            href="/terms"
                            className="text-[11px] font-medium hover:text-foreground transition-colors px-3 py-1"
                        >
                            {t("footer.links.terms")}
                        </Link>
                    </div>

                    <p className="text-[11px] text-muted-foreground/40 font-medium">
                        {t("footer.builtWith")}
                    </p>

                </div>
            </div>
        </div>
    );
}