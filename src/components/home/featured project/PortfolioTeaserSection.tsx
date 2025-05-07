import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InfiniteProjectCarousel } from "./InfiniteProjectCarousel";

const portfolioItems = [
  {
    title: "TechStart SaaS Platform",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    link: "/portfolio/techstart",
  },
  {
    title: "GreenLife E-commerce",
    category: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
    link: "/portfolio/greenlife",
  },
  {
    title: "IntelliAssist AI Bot",
    category: "AI Solutions",
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop",
    link: "/portfolio/intelliassist",
  },
  {
    title: "HealthTech Analytics",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    link: "/portfolio/healthtech",
  },
  {
    title: "EcoTrade Platform",
    category: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    link: "/portfolio/ecotrade",
  },
];

export function PortfolioTeaserSection() {
  return (
    <section className="py-20 bg-secondary/50 dark:bg-secondary/20 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">
          Featured Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
          Explore our recent work that delivers exceptional results for our
          clients.
        </p>
      </div>

      <InfiniteProjectCarousel projects={portfolioItems} />

      <div className="text-center mt-10">
        <Link to="/portfolio">
          <Button variant="outline" className="group">
            <span>View All Projects</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
