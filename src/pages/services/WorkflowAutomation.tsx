import { motion } from "framer-motion";
import { Workflow, Zap, Settings, Clock, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Clock,
    title: "Save 20+ Hours Weekly",
    description: "Eliminate repetitive manual tasks and free your team to focus on high-value work."
  },
  {
    icon: TrendingUp,
    title: "Reduce Errors by 95%",
    description: "Automated processes execute flawlessly every time, eliminating human error."
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Workflows trigger automatically based on events, conditions, or schedules."
  },
  {
    icon: Settings,
    title: "Easy Customization",
    description: "Modify workflows as your business evolves without technical expertise."
  }
];

const automationTypes = [
  {
    title: "Data Processing Pipelines",
    items: ["Automated data extraction", "Format conversion", "Database synchronization", "Report generation"]
  },
  {
    title: "Communication Workflows",
    items: ["Email sequences", "Notification routing", "Slack/Teams integration", "Customer follow-ups"]
  },
  {
    title: "Business Operations",
    items: ["Invoice processing", "Inventory management", "Order fulfillment", "HR onboarding"]
  },
  {
    title: "Marketing Automation",
    items: ["Lead nurturing", "Social media posting", "Campaign analytics", "CRM updates"]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We analyze your current processes to identify automation opportunities."
  },
  {
    step: "02",
    title: "Design",
    description: "Custom workflow architecture tailored to your specific business needs."
  },
  {
    step: "03",
    title: "Development",
    description: "Build and test automation using industry-leading platforms and tools."
  },
  {
    step: "04",
    title: "Deployment",
    description: "Launch your automated workflows with monitoring and support."
  }
];

export default function WorkflowAutomation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-accent-foreground mb-6">
              <Workflow className="h-5 w-5" />
              <span className="text-sm font-medium">Workflow Automation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              End-to-End Process
              <span className="block text-primary">Streamlining</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform manual, time-consuming tasks into automated workflows that
              run 24/7 without human intervention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Automate Your Business
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">See Examples</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                className="bg-card rounded-xl p-6 text-center border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Automate
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From simple task automation to complex multi-system integrations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationTypes.map((type, idx) => (
              <motion.div
                key={type.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-4">{type.title}</h3>
                <ul className="space-y-2">
                  {type.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Automation Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology to transform your operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {idx < processSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-primary/30" />
                )}
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
              Stop Wasting Time on Manual Tasks
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Let's identify your biggest automation opportunities and build
              workflows that transform your productivity.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/contact">
                Get Free Automation Audit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
