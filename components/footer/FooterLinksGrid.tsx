import { motion } from "framer-motion";
import Link from "next/link";

export function FooterLinksGrid() {


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

        { text: "Facebook", url: "https://facebook.com/driplare", external: true },



      ]

    }

  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {linkSections.map((section, idx) => (
            <div key={section.title} className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-[#0A0A0A] tracking-tighter mb-1 uppercase">
                  {section.title}
                </h3>
                <div className="h-0.5 w-6 bg-primary/30 rounded-full" />
                <p className="font-mono text-[12px] font-bold text-[#0A0A0A]/30 mt-2 tracking-widest">
                  {section.subtitle}
                </p>
              </div>

              <nav className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.url}
                    className="text-sm font-medium text-[#0A0A0A]/60 hover:text-primary transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all text-primary font-bold opacity-0 group-hover:opacity-100 italic">
                      /
                    </span>
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
