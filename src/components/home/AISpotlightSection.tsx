
import { MessageSquareCode, UserRound, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const aiServices = [
  {
    icon: MessageSquareCode,
    title: "Chatbot Integration",
    description: "Enhance customer service with intelligent, 24/7 AI chatbots",
    link: "/ai-services#chatbot"
  },
  {
    icon: UserRound,
    title: "Custom AI Agents",
    description: "Specialized virtual assistants designed for your unique business needs",
    link: "/ai-services#agents"
  },
  {
    icon: SlidersHorizontal,
    title: "AI Automation",
    description: "Streamline processes and workflows with intelligent automation",
    link: "/ai-services#automation"
  }
];

export function AISpotlightSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in slide-up">AI-Powered Excellence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto fade-in slide-up">
            Cutting-edge AI solutions that keep your business ahead of the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {aiServices.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              className="group"
            >
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-md">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <service.icon className="h-16 w-16 text-primary relative z-10 transform group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
