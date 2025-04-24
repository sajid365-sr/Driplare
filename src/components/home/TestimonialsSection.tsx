
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";

const testimonials = [
  {
    quote: "I thought it was very smooth, it was done within a day and all I hit was like 5 buttons.",
    name: "Alex Lieberman",
    title: "Founder of Storyarb",
    image: "/lovable-uploads/43d837d2-fc39-4744-8c73-24b22e1d016c.png",
    fullReview: "The entire process was incredibly smooth and efficient. Their platform simplified everything, and the results exceeded our expectations. The team's expertise and dedication to our success were evident throughout the project."
  },
  {
    quote: "The seamless integration and robust features transformed our workflow completely.",
    name: "Sarah Chen",
    title: "CEO, TechFlow",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    fullReview: "We were amazed by how quickly and effectively they understood our needs. The integration was flawless, and the features they implemented have significantly improved our daily operations. Their support throughout the process was outstanding."
  },
  {
    quote: "Their attention to detail and technical expertise exceeded our expectations.",
    name: "Michael Rodriguez",
    title: "CTO, InnovateNow",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    fullReview: "The level of technical expertise and attention to detail was remarkable. They not only delivered what we asked for but also provided valuable insights that helped us improve our product. The results have been transformative for our business."
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">
            Built for Founders. Loved by Founders.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            See what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
