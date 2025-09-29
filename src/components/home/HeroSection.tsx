import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-orange-600"> Empower Your Brand with</h1>

          <h1 className="text-yellow-600">AI-Driven Digital Excellence</h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in slide-up">
            Cutting-edge solutions that transform how businesses connect with
            their audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in slide-up">
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
                Let's Connect
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="h-12 px-8 text-lg group">
                <span>Check Our Works</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Abstract graphic elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
