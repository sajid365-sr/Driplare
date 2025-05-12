
import { FooterSocials } from "./footer/FooterSocials";
import { FooterContent } from "./footer/FooterContent";
import { FooterBottom } from "./footer/FooterBottom";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary/5 to-primary/30">
      <FooterSocials />
      <div className="container">
        <FooterContent />
        <FooterBottom />
      </div>
    </footer>
  );
}
