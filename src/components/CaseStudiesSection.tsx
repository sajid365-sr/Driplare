
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "TechVision Rebrand",
    description: "Complete digital transformation for a leading tech company, increasing conversions by 42%.",
    link: "#"
  },
  {
    id: 2,
    title: "FinanceFlow Platform",
    description: "Custom financial dashboard with real-time analytics that improved client efficiency by 35%.",
    link: "#"
  },
  {
    id: 3,
    title: "EcoSmart App",
    description: "Mobile application for sustainability tracking that helped reduce carbon footprint by 28%.",
    link: "#"
  },
  {
    id: 4,
    title: "MediConnect Portal",
    description: "Healthcare platform connecting patients and providers, reducing wait times by 60%.",
    link: "#"
  }
];

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % caseStudies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how we've helped our clients achieve extraordinary results.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg">
          <div 
            className="transition-transform duration-500 ease-in-out flex"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {caseStudies.map((study) => (
              <div 
                key={study.id} 
                className="min-w-full p-12 md:p-16 flex flex-col justify-center"
              >
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{study.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{study.description}</p>
                  <Button asChild variant="outline" className="group">
                    <a href={study.link}>
                      View Case Study
                      <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-primary w-6" 
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
