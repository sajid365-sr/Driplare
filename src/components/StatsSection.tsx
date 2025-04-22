
import { useEffect, useRef } from "react";

const stats = [
  {
    percentage: 95,
    description: "Client satisfaction rate"
  },
  {
    percentage: 230,
    description: "Projects completed"
  },
  {
    percentage: 48,
    description: "Average conversion increase"
  }
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".fade-in, .slide-up");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section 
      id="stats" 
      className="py-24 relative bg-primary/5"
      ref={sectionRef}
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 slide-up">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto slide-up">
            Numbers speak louder than words. Here's what we've achieved.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-8 text-center fade-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-4 inline-block">
                <svg className="w-40 h-40">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                    style={{
                      strokeDasharray: 440,
                      strokeDashoffset: 440 - (440 * Math.min(stat.percentage, 100)) / 100
                    }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {typeof stat.percentage === 'number' && stat.percentage <= 100 ? (
                    <span className="text-4xl font-bold">{stat.percentage}%</span>
                  ) : (
                    <span className="text-4xl font-bold">{stat.percentage}</span>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground text-lg">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
