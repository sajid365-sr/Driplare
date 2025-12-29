
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";

export function FooterContent() {
  const solutionLinks = [
    { text: "Custom AI Agent", url: "/ai-agents" },
    { text: "Workflow Automation", url: "/workflow-automation" },
    { text: "Web Development", url: "/web-development" },
    { text: "Data Scraping", url: "/data-scraping" },
    { text: "B2B Consulting", url: "/b2b-consulting" },
  ];

  const companyLinks = [
    { text: "About", url: "/about-us" },
    { text: "Pricing", url: "/pricing" },
    { text: "Security", url: "/security" },
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
