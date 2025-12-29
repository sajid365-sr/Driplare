import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const linkSections = [
  {
    title: "ECOSYSTEM",
    subtitle: "(SERVICES)",
    links: [
      { text: "Custom AI Agents", url: "/services/ai-agents" },
      { text: "Workflow Automation", url: "/services/workflow-automation" },
      { text: "MERN Infrastructure", url: "/services/web-development" },
      { text: "Data Monitoring", url: "/services/data-scraping" },
      { text: "Technical Consulting", url: "/services/b2b-consulting" }
    ]
  },
  {
    title: "INTELLIGENCE",
    subtitle: "(RESOURCES)",
    links: [
      { text: "Engineered Results", url: "/case-studies" },
      { text: "Intelligence Hub", url: "/insights" },
      { text: "System Documentation", url: "/docs" },
      { text: "FAQ & Security", url: "/security" }
    ]
  },
  {
    title: "IDENTITY",
    subtitle: "(DRIPLARE)",
    links: [
      { text: "About the Architecture", url: "/about-us" },
      { text: "Our Methodology", url: "/methodology" },
      { text: "Contact the Architect", url: "/contact" },
      { text: "Book a Strategy Call", url: "/contact" }
    ]
  },
  {
    title: "CONNECT",
    subtitle: "(SOCIALS)",
    links: [
      { text: "LinkedIn", url: "https://linkedin.com/company/driplare", external: true },
      { text: "GitHub", url: "https://github.com/driplare", external: true },
      { text: "X / Twitter", url: "https://twitter.com/driplare", external: true },
      { text: "YouTube", url: "https://youtube.com/@driplare", external: true }
    ]
  }
];

export function FooterLinksGrid() {
  return (
    <div className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {linkSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-6"
            >
              {/* Column Header */}
              <div>
                <h3 className="font-montserrat font-bold text-sm text-[#0A0A0A] uppercase tracking-wider mb-1">
                  {section.title}
                </h3>
                <p className="font-mono text-xs text-[#0A0A0A]/60">{section.subtitle}</p>
              </div>

              {/* Links */}
              <nav className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.div
                    key={link.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    {link.external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center font-inter text-[14px] text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-all duration-300 hover:translate-x-[5px]"
                      >
                        <span className="mr-2 text-[#0A0A0A]/40 group-hover:text-[#FF6B00] transition-colors">&gt;</span>
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="group flex items-center font-inter text-[14px] text-[#0A0A0A]/70 hover:text-[#FF6B00] transition-all duration-300 hover:translate-x-[5px]"
                      >
                        <span className="mr-2 text-[#0A0A0A]/40 group-hover:text-[#FF6B00] transition-colors">&gt;</span>
                        {link.text}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
