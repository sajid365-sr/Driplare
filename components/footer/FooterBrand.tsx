"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FooterNewsletter } from "./FooterNewsletter";

export function FooterBrand() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
            {/* Brand Logo */}
            <Link
                href="/"
                className="relative z-10 -ml-3 hover:opacity-80 transition-opacity"
            >
                <img src="/header-logo-black.png" alt="Driplare" width={170} className="dark:hidden block" />
                <img src="/header-logo-white.png" alt="Driplare" width={170} className="hidden dark:block" />
            </Link>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                {t("footer.tagline")}
            </p>

            {/* Divider */}
            <div className="h-px w-8 bg-primary/30 rounded-full" />

            {/* Newsletter */}
            <FooterNewsletter />
        </div>
    );
}