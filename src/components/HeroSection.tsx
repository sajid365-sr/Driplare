
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Digital Solutions That <br className="hidden md:block" />
            <span className="text-primary">Drive Results</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We turn your digital vision into reality with cutting-edge design, development, and marketing strategies.
          </p>
          <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
            Get Started
          </Button>
        </div>
      </div>
      
      {/* Abstract graphic elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
