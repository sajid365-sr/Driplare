
import { CheckCircle, Code, Users } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Verified Talent",
    description:
      "We work with only the best verified professionals in the industry to deliver exceptional results for your project."
  },
  {
    icon: Code,
    title: "AI Accuracy",
    description:
      "Our AI-powered solutions ensure precision, efficiency and cutting-edge technology for your business needs."
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We prioritize building lasting relationships and fostering a collaborative environment with our clients and partners."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Driplare</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine expertise, technology, and a client-centered approach to deliver exceptional digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
