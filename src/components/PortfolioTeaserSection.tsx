
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    title: "TechStart SaaS Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    link: "/portfolio/techstart"
  },
  {
    title: "GreenLife E-commerce",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=2074&auto=format&fit=crop",
    link: "/portfolio/greenlife"
  },
  {
    title: "IntelliAssist AI Bot",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1677442135136-760c813dfc5c?q=80&w=2232&auto=format&fit=crop",
    link: "/portfolio/intelliassist"
  }
];

export function PortfolioTeaserSection() {
  return (
    <section className="py-20 bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Explore our recent work that delivers exceptional results for our clients.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {portfolioItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative group overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-primary text-sm font-medium">{item.category}</span>
                      <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                      <Link to={item.link}>
                        <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white">
                          View Project
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center mt-8">
              <div className="flex space-x-4">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </div>
          </Carousel>
          
          <div className="text-center mt-10">
            <Link to="/portfolio">
              <Button variant="outline" className="group">
                <span>View All Projects</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
