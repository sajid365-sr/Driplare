import { FooterSocials } from "./footer/FooterSocials";
import { FooterContent } from "./footer/FooterContent";
import { FooterBottom } from "./footer/FooterBottom";

export function Footer() {
  return (
    <footer className="bg-primary">
      <FooterSocials />
      <div className="container">
        <FooterContent />
        <FooterBottom />
      </div>
    </footer>
  );
}
