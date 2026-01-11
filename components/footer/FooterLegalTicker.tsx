"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function FooterLegalTicker() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-black/5 dark:border-white/5 py-10 bg-black/[0.02] dark:bg-white/[0.02] transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="font-mono text-[10px] font-bold text-[#0A0A0A]/40 dark:text-white/40 uppercase tracking-[0.2em]">
            © {currentYear} {t("footer.rights")}
          </div>

          <div className="flex gap-8">
            {["Privacy", "Terms", "Security"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="font-mono text-[10px] font-black text-[#0A0A0A]/50 dark:text-white/50 hover:text-primary transition-colors uppercase tracking-widest"
              >
                [{item}]
              </Link>
            ))}
          </div>

          <div className="font-mono text-[10px] font-bold text-[#0A0A0A]/40 dark:text-white/40 uppercase tracking-[0.2em]">
            {t("footer.architectedBy")}:{" "}
            <span className="text-[#0A0A0A] dark:text-white">Driplare</span>
          </div>
        </div>
      </div>
    </div>
  );
}
