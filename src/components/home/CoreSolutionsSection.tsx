import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, BarChart2, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedGridBg from "../common/AnimatedGridBg";

const solutions = [
  {
    icon: Code,
    title: "Web Design & Development",
    description:
      "Beautiful, responsive websites that convert visitors to customers.",
    link: "/web-design",
  },
  {
    icon: BarChart2,
    title: "Digital Marketing",
    description:
      "Strategic campaigns that drive growth and increase visibility.",
    link: "/digital-marketing",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description:
      "Leverage cutting-edge AI technology to transform your business capabilities.",
    link: "/ai-services",
  },
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
            Core Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Our comprehensive suite of services designed to elevate your digital
            presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="bg-card hover-scale overflow-hidden">
              <CardHeader>
                <solution.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={solution.link}>
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
