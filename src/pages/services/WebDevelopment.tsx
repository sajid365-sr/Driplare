import { motion } from "framer-motion";
import { Code2, Database, Server, Globe, Smartphone, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const techStack = [
  { name: "MongoDB", category: "Database" },
  { name: "Express.js", category: "Backend" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Runtime" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js", category: "Framework" },
  { name: "PostgreSQL", category: "Database" },
  { name: "GraphQL", category: "API" }
];

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description: "Custom web apps built with modern frameworks for optimal performance and user experience."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Pixel-perfect interfaces that work flawlessly across all devices and screen sizes."
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Robust server-side solutions with RESTful APIs and real-time capabilities."
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "Scalable database design optimized for your application's data requirements."
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security practices including authentication, encryption, and auditing."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast load times through code optimization, caching, and CDN integration."
  }
];

const processSteps = [
  {
    phase: "Planning",
    description: "Requirements gathering, architecture design, and project roadmap creation."
  },
  {
    phase: "Development",
    description: "Agile sprints with regular demos and iterative feedback integration."
  },
  {
    phase: "Testing",
    description: "Comprehensive QA including unit tests, integration tests, and UAT."
  },
  {
    phase: "Deployment",
    description: "CI/CD pipeline setup, cloud deployment, and performance monitoring."
  }
];

export default function WebDevelopment() {
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
              <Code2 className="h-5 w-5" />
              <span className="text-sm font-medium">Full-Stack Development</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              MERN Stack
              <span className="block text-primary">Specialization</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build scalable, modern web applications with our expert team of
              full-stack developers specializing in the MERN ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-2">Our Tech Stack</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                className="bg-card px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Build
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end development services for businesses of all sizes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <service.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Development Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Agile methodology with transparent communication at every stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.phase}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.phase}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
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
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss your project requirements and create a custom
              solution that drives results for your business.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/contact">
                Get Project Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
