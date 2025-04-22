
import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We start by understanding your business, goals, and audience to create a tailored strategy."
  },
  {
    number: "02",
    title: "Design",
    description: "Our creative team develops visually stunning and user-friendly designs that align with your brand."
  },
  {
    number: "03",
    title: "Develop",
    description: "We bring designs to life with clean code and cutting-edge technologies for optimal performance."
  },
  {
    number: "04",
    title: "Deploy & Optimize",
    description: "We launch your solution and provide ongoing optimization to ensure continuous improvement."
  }
];

export function HowWeWorkSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">How We Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Our proven process ensures successful project delivery every time.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/30 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative fade-in slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="bg-card p-8 rounded-xl relative shadow-sm hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-extrabold text-primary/20">{step.number}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
