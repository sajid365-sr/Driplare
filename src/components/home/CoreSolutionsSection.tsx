import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ArrowRight
} from "lucide-react";

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

export function CoreSolutionsSection() {
  return (
    <section
      id="solutions"
      className="py-20 bg-secondary/50 dark:bg-secondary/20"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offerings.map((offering, i) => (
            <div
              key={offering.title}
              className={`
                relative group rounded-3xl transition-shadow overflow-hidden
                shadow-xl border border-primary/10 bg-gradient-to-br from-secondary/60 via-white/60 to-primary/10
                backdrop-blur-[3px] hover:scale-105
                flex flex-col
                min-h-[430px]
              `}
              style={{ boxShadow: "0 8px 64px 8px #8F5CFF12" }}
            >
              {/* Number circle (like screenshot) */}
              <div className="absolute right-5 top-5 z-10">
                <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-7 pt-9 flex-1 flex flex-col">
                {/* Icon and badge row */}
                <div className="flex items-center gap-3 mb-5">
                  <offering.icon className="h-11 w-11 text-primary drop-shadow-lg bg-white/70 rounded-full p-2" />
                  {offering.badge && (
                    <span className="inline-block px-2 py-1 ml-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                      {offering.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{offering.title}</h3>
                <p className="mb-3 text-base text-muted-foreground font-medium">{offering.valueProp}</p>
                <ul className="mb-2 flex flex-col gap-2 text-foreground/90 text-sm pl-2">
                  {offering.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-primary/60 shrink-0"></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {offering.tech && (
                  <div className="mt-2 text-xs font-medium text-primary">{offering.tech}</div>
                )}
                {offering.note && (
                  <div className="mt-2 text-xs font-medium text-accent-foreground">{offering.note}</div>
                )}
                {/* "Learn More" button at the bottom */}
                <div className="flex-grow" />
                <div className="mt-6 flex">
                  <Link to={offering.link} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full bg-primary/90 text-white rounded-full py-2 font-bold tracking-wide flex items-center justify-center group hover:bg-primary transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
