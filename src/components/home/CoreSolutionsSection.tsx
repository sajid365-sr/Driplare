import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedGridBg from "../common/AnimatedGridBg";
import {
  Laptop,
  Smartphone,
  Rocket,
  Paintbrush,
  FileText,
  BrainCircuit,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const offerings = [
  {
    icon: Laptop,
    title: "Web Development",
    valueProp: "We build beautiful, fast, and functional websites tailored to your business goals.",
    bullets: [
      "Custom Website Development (Landing pages, corporate sites, personal portfolios)",
      "Full-Stack Web Applications (MERN, Next.js, React)",
      "E-Commerce Development (Multivendor, payment gateway integration)",
      "CMS & Dashboard Development (Admin panels, analytics dashboards)",
      "Responsive Design & Cross-Browser Compatibility",
      "SEO-Optimized & Performance-Tuned"
    ],
    tech: "Tech Stack: React, Next.js, Node.js, MongoDB/MySQL, Tailwind, Vite, Prisma",
    link: "/web-design"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    valueProp: "We develop cross-platform mobile applications that feel native.",
    bullets: [
      "React Native App Development",
      "Expo & Expo Router Integration",
      "Backend with Supabase or Firebase",
      "AI-integrated features (if required)",
      "App UI/UX Design",
      "Testing and Deployment to App Store/Play Store"
    ],
    link: "/mobile-app-development"
  },
  {
    icon: Rocket,
    title: "Digital Marketing",
    valueProp: "Driplare ensures your brand gets the visibility and engagement it deserves.",
    bullets: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Google & Meta Ads Management",
      "Email Campaigns & Automation",
      "Conversion Rate Optimization (CRO)",
      "Analytics, Reporting & Strategy Building"
    ],
    note: "Campaigns are tailored to your niche, target audience, and business objectives.",
    link: "/digital-marketing"
  },
  {
    icon: Paintbrush,
    title: "Graphic Design & Branding",
    valueProp: "We help brands visually communicate with clarity and creativity.",
    bullets: [
      "Logo Design & Brand Identity",
      "Business Cards, Brochures & Flyers",
      "Social Media Creatives",
      "UI/UX Design for Web & App",
      "Motion Graphics & Illustrations",
      "Packaging & Product Design"
    ],
    note: "We ensure brand consistency across all design elements.",
    link: "/design-branding"
  },
  {
    icon: FileText,
    title: "Content Writing & Strategy",
    valueProp: "Compelling content that ranks and converts.",
    bullets: [
      "Website Copywriting",
      "SEO Blog Writing",
      "Product Descriptions",
      "Email Campaign Content",
      "Ad Copy & Social Captions",
      "Scriptwriting for Videos & Reels"
    ],
    note: "Content is always optimized for tone, brand voice, and user engagement.",
    link: "/content-writing"
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Solutions",
    valueProp: "For businesses that want to future-proof with automation and intelligence.",
    bullets: [
      "AI Chatbots for Support or Sales",
      "Generative AI Integration (Text, Image, Outfit Styling, etc.)",
      "Data-driven Recommendation Engines",
      "Automation Workflows for Customer Engagement",
      "AI-enhanced UI Interactions (voice, gesture, search)"
    ],
    badge: "Premium / On Demand",
    link: "/ai-services"
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    valueProp: "We're here even after launch.",
    bullets: [
      "Website and App Monitoring",
      "Bug Fixing and Performance Optimization",
      "Feature Upgrades",
      "Monthly Retainer Packages",
      "Security Patches & Backups"
    ],
    link: "/maintenance"
  }
];

// Animation variants for the expandable cards
const cardVariants = {
  collapsed: {
    width: 64,
    minWidth: 64,
    maxWidth: 70,
    borderRadius: "2rem",
    transition: { duration: 0.45, type: "spring", bounce: 0.2 },
  },
  expanded: {
    width: 370,
    minWidth: 300,
    maxWidth: 420,
    borderRadius: "2.2rem",
    transition: { duration: 0.6, type: "spring", bounce: 0.24 },
  },
};

const fadeInContent = {
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0, transition: { delay: 0.08, duration: 0.36 } },
  exit: { opacity: 0, x: 36, transition: { duration: 0.26 } }
};

export function CoreSolutionsSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  // On mobile, tap to expand, tap again to collapse
  const handleCardClick = (idx: number) => {
    if (window.innerWidth < 768) {
      setExpanded(prev => (prev === idx ? null : idx));
    }
  };

  return (
    <section
      id="solutions"
      className="py-20 bg-secondary/50 dark:bg-secondary/20 relative overflow-x-hidden"
    >
      <AnimatedGridBg />
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">
            Our Offerings & Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            From web and mobile to AI, creative design, marketing, and beyond—Driplare empowers your business to thrive in the digital age.
          </p>
        </div>
        {/* Horizontally scrollable cards on mobile, flex centered on desktop */}
        <div
          className="
            flex gap-5 md:gap-8 w-full
            overflow-x-auto
            md:overflow-visible
            pb-4
            mb-4
            md:justify-center
            scrollbar-hide
          "
        >
          {offerings.map((offering, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={offering.title}
                className={`
                  group relative overflow-visible flex flex-col items-center
                  shadow-2xl transition-[box-shadow] min-h-[66px]
                  ${isExpanded ? "z-20" : "z-10"}
                `}
                initial="collapsed"
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={cardVariants}
                onMouseEnter={() => window.innerWidth >= 768 && setExpanded(i)}
                onMouseLeave={() => window.innerWidth >= 768 && setExpanded(0)}
                onClick={() => handleCardClick(i)}
                style={{
                  background: "linear-gradient(135deg, #8F5CFF 80%, #CBA8FF 100%)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {/* Vertical title and number when collapsed */}
                <motion.div
                  className="flex flex-col items-center justify-center h-full w-full"
                  style={{
                    minHeight: 64,
                    minWidth: 64,
                  }}
                >
                  {/* Number circle */}
                  <div className="w-10 h-10 bg-white/80 text-primary font-bold flex items-center justify-center rounded-full mt-3 shadow-md mb-2 border-2 border-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Vertical label */}
                  <div className="flex flex-col items-center" style={{ height: 140, justifyContent: "center" }}>
                    <span
                      className="uppercase tracking-wider text-xs font-semibold text-white/90"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {offering.title}
                    </span>
                  </div>
                </motion.div>
                {/* Revealed content on expand */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="
                        absolute left-0 top-0 h-full w-full rounded-[2.2rem]
                        shadow-2xl bg-white/95 text-foreground px-8 py-7 flex flex-col justify-start items-start
                        z-30
                        overflow-hidden
                        "
                      variants={fadeInContent}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{
                        boxShadow: "0 6px 56px 8px #8F5CFF11",
                      }}
                    >
                      {/* Icon & badge row */}
                      <div className="flex items-center gap-2 mb-4">
                        <offering.icon className="h-10 w-10 text-primary bg-white rounded-full p-2 drop-shadow-lg" />
                        {offering.badge && (
                          <span className="inline-block px-2 py-1 ml-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                            {offering.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-extrabold mb-1 text-primary">{offering.title}</h3>
                      <p className="mb-3 text-base text-muted-foreground font-medium">{offering.valueProp}</p>
                      <ul className="mb-2 flex flex-col gap-2 text-foreground/90 text-xs pl-1">
                        {offering.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2">
                            <span className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-primary/60 shrink-0"></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {offering.tech && (
                        <div className="mt-2 mb-1 text-xs font-medium text-primary">{offering.tech}</div>
                      )}
                      {offering.note && (
                        <div className="mt-2 mb-1 text-xs font-medium text-accent-foreground">{offering.note}</div>
                      )}
                      {/* "Learn More" button */}
                      <div className="flex-grow" />
                      <div className="mt-4 flex">
                        <Link to={offering.link} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full bg-primary text-white rounded-full py-2 font-bold tracking-wide flex items-center justify-center group hover:bg-primary/90 transition"
                          >
                            <span>Learn More</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Hide scrollbars on mobile/modern browsers
// Source: https://webtrickz.com/hide-scrollbar-with-tailwind-css/
