
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";

export function FooterContent() {
  const solutionLinks = [
    { text: "Web Design & Development", url: "/web-design" },
    { text: "Digital Marketing", url: "/digital-marketing" },
    { text: "AI Solutions", url: "/ai-services" },
    { text: "Chatbot Integration", url: "/ai-services#chatbot" },
    { text: "Custom AI Agents", url: "/ai-services#agents" },
    { text: "AI Automation", url: "/ai-services#automation" },
  ];

  const companyLinks = [
    { text: "About", url: "/about" },
    { text: "Team", url: "/team" },
    { text: "Careers", url: "/careers" },
    { text: "Portfolio", url: "/portfolio" },
    { text: "Insights", url: "/insights" },
    { text: "Contact", url: "/contact" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-border">
      <div>
        <img src="logo.png" alt="Driplare Logo" width={150} />
        <p className="mt-5">
          Driplare is your go-to technology partner focusing on innovative
          solutions that enhance your brand's online visibility and success.
        </p>
      </div>
      <FooterLinks title="Solutions" links={solutionLinks} />
      <FooterLinks title="Company" links={companyLinks} />
      <FooterNewsletter />
    </div>
  );
}
