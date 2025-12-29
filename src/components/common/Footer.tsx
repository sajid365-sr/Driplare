import { FooterTop } from "./footer/FooterTop";
import { FooterLinksGrid } from "./footer/FooterLinksGrid";
import { FooterLegalTicker } from "./footer/FooterLegalTicker";

export function Footer() {
  return (
    <footer className="bg-[#F9F9F9] text-[#0A0A0A] relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-5 bg-[length:40px_40px] bg-[image:linear-gradient(#0A0A0A_1px,transparent_1px),linear-gradient(90deg,#0A0A0A_1px,transparent_1px)]"></div>

      {/* Server Rack Visual - Thin vertical lines */}
      <div className="absolute inset-0">
        <div className="container h-full relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px bg-[#0A0A0A] opacity-20"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/4 w-px bg-[#0A0A0A] opacity-20"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-px bg-[#0A0A0A] opacity-20"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* 1. Top Tier: The Global Triage */}
        <FooterTop />

        {/* 2. Middle Tier: The Information Grid */}
        <FooterLinksGrid />

        {/* 3. Bottom Tier: The Compliance Bar */}
        <FooterLegalTicker />
      </div>
    </footer>
  );
}
