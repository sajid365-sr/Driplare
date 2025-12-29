import { FooterTop } from "./footer/FooterTop";
import { FooterLinksGrid } from "./footer/FooterLinksGrid";
import { FooterLegalTicker } from "./footer/FooterLegalTicker";

export function Footer() {
  return (
    <footer className="bg-white text-[#0A0A0A] relative overflow-hidden border-t border-border/50">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Schematic Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container h-full relative mx-auto px-4">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-[#0A0A0A]/10 to-transparent"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/4 w-px bg-gradient-to-b from-transparent via-[#0A0A0A]/10 to-transparent"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-[#0A0A0A]/10 to-transparent"></div>
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