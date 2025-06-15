
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
            <Card
              key={offering.title}
              className="bg-card hover-scale overflow-hidden border-primary/10 transition-shadow shadow-xl relative"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <offering.icon className="h-10 w-10 text-primary" />
                  {offering.badge && (
                    <span className="ml-2 inline-block bg-primary/10 text-primary text-xs font-bold rounded-full px-3 py-1">
                      {offering.badge}
                    </span>
                  )}
                </div>
                <CardTitle>{offering.title}</CardTitle>
                <CardDescription className="mb-2">{offering.valueProp}</CardDescription>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 mt-2">
                  {offering.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
                {offering.tech && (
                  <div className="mt-3 text-xs font-medium text-muted-foreground">{offering.tech}</div>
                )}
                {offering.note && (
                  <div className="mt-3 text-xs font-medium text-muted-foreground">{offering.note}</div>
                )}
              </CardHeader>
              <CardFooter>
                <Link to={offering.link}>
                  <Button
                    variant="link"
                    className="p-0 group flex items-center text-primary"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
