
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Driplare transformed our outdated website into a modern, user-friendly platform that's dramatically increased our conversion rates. Their AI integration was seamless.",
    name: "Sarah Johnson",
    title: "Marketing Director, TechInnovate",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "The AI chatbot that Driplare implemented has reduced our customer service response time by 70% while maintaining high satisfaction scores. A game-changer for our business.",
    name: "Michael Chen",
    title: "Operations Manager, Quantum Solutions",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    quote: "Our digital marketing campaigns have seen a 300% ROI since partnering with Driplare. Their data-driven approach and strategic insights are unparalleled.",
    name: "Alexis Rivera",
    title: "CEO, GrowthSpectrum",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">Client Success</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Hear what our clients say about their experience working with us.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none bg-transparent">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-8">
                          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"></div>
                          <Avatar className="h-24 w-24 border-4 border-background relative z-10">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </div>
                        <blockquote className="text-xl text-center mb-6 relative">
                          <span className="absolute -top-8 -left-4 text-6xl text-primary/20">"</span>
                          {testimonial.quote}
                          <span className="absolute -bottom-8 -right-4 text-6xl text-primary/20">"</span>
                        </blockquote>
                        <div className="text-center">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <div className="flex space-x-4">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
