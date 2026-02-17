"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FooterNewsletter } from "./FooterNewsletter";

export function FooterBrand() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
            {/* Logo */}
            <Link
                href="/"
                className="text-2xl font-black tracking-tighter text-foreground hover:text-primary transition-colors w-fit"
            >
                DRIPLARE<span className="text-primary">.</span>
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