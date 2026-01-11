import { FooterTop } from "./footer/FooterTop";
import { FooterLinksGrid } from "./footer/FooterLinksGrid";
import { FooterLegalTicker } from "./footer/FooterLegalTicker";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white relative overflow-hidden border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Schematic Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container h-full relative mx-auto px-4">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/4 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10">
        <FooterTop />
        <FooterLinksGrid />
        <FooterLegalTicker />
      </div>
    </footer>
  );
}
