import { motion } from "framer-motion";
import { Briefcase, Target, Lightbulb, Users, CheckCircle, ArrowRight, Brain, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const consultingAreas = [
  {
    icon: Brain,
    title: "AI Strategy Development",
    description: "Identify the right AI solutions for your business challenges and create an implementation roadmap."
  },
  {
    icon: Workflow,
    title: "Process Optimization",
    description: "Analyze existing workflows and recommend automation opportunities for maximum ROI."
  },
  {
    icon: Target,
    title: "Technology Assessment",
    description: "Evaluate your current tech stack and recommend AI integrations that fit your infrastructure."
  },
  {
    icon: Lightbulb,
    title: "Innovation Workshops",
    description: "Hands-on sessions to explore AI possibilities and generate actionable implementation plans."
  }
];

const benefits = [
  "Objective third-party perspective on AI opportunities",
  "Access to deep AI expertise without hiring full-time",
  "Faster time-to-value with proven methodologies",
  "Risk mitigation through experienced guidance",
  "Knowledge transfer to your internal teams",
  "Ongoing support and optimization recommendations"
];

const engagementModels = [
  {
    title: "Strategy Session",
    duration: "1-2 Days",
    description: "Intensive workshop to assess AI opportunities and create a prioritized action plan.",
    ideal: "Businesses exploring AI for the first time"
  },
  {
    title: "Discovery & Roadmap",
    duration: "2-4 Weeks",
    description: "Deep-dive analysis of your operations with detailed AI implementation roadmap.",
    ideal: "Companies ready to invest in AI transformation"
  },
  {
    title: "Embedded Consulting",
    duration: "3-6 Months",
    description: "Ongoing strategic support during AI implementation with hands-on guidance.",
    ideal: "Organizations executing major AI initiatives"
  }
];

const industries = [
  "Financial Services",
  "Healthcare",
  "E-commerce",
  "Manufacturing",
  "Professional Services",
  "Real Estate",
  "Logistics",
  "Education"
];

export default function B2BConsulting() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-6">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm font-medium">B2B Technical Consulting</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Implementation
              <span className="block text-primary">Expertise On Demand</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Strategic consulting to help businesses identify, plan, and execute
              AI initiatives that deliver measurable business value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Book Consultation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">Client Success Stories</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consulting Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert guidance at every stage of your AI journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultingAreas.map((area, idx) => (
              <motion.div
                key={area.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <area.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                <p className="text-muted-foreground text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Work With a Consultant?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4">Industries We Serve</h3>
                <div className="flex flex-wrap gap-3">
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      className="bg-background px-4 py-2 rounded-full text-sm border border-border"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Engagement Models
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible consulting options to match your needs and timeline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model, idx) => (
              <motion.div
                key={model.title}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm mb-4">
                  {model.duration}
                </div>
                <h3 className="text-2xl font-bold mb-3">{model.title}</h3>
                <p className="text-muted-foreground mb-4">{model.description}</p>
                <p className="text-sm">
                  <span className="font-medium">Ideal for:</span>{" "}
                  <span className="text-muted-foreground">{model.ideal}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Discuss Your AI Strategy
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Book a free 30-minute consultation to explore how AI can
              transform your business operations.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/contact">
                Schedule Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
