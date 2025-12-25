import { motion } from "framer-motion";
import { Database, Search, Bell, TrendingUp, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Search,
    title: "Intelligent Extraction",
    description: "AI-powered scraping that adapts to website changes and extracts structured data accurately."
  },
  {
    icon: Bell,
    title: "Real-Time Monitoring",
    description: "Track competitor prices, product availability, and market changes as they happen."
  },
  {
    icon: TrendingUp,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with automated analysis and reporting."
  },
  {
    icon: Shield,
    title: "Compliant Scraping",
    description: "Ethical data collection that respects robots.txt and rate limits."
  },
  {
    icon: Clock,
    title: "Scheduled Jobs",
    description: "Automated data collection on your schedule—hourly, daily, or real-time."
  },
  {
    icon: Database,
    title: "Data Warehousing",
    description: "Clean, normalized data delivered to your preferred database or format."
  }
];

const useCases = [
  {
    title: "Competitive Intelligence",
    items: ["Price monitoring", "Product catalog tracking", "Promotional analysis", "Market positioning"]
  },
  {
    title: "Lead Generation",
    items: ["Business directory scraping", "Contact information extraction", "Social media profiling", "Industry research"]
  },
  {
    title: "Market Research",
    items: ["Sentiment analysis", "Review aggregation", "Trend identification", "Consumer behavior insights"]
  },
  {
    title: "Financial Data",
    items: ["Stock price monitoring", "News aggregation", "SEC filing extraction", "Cryptocurrency tracking"]
  }
];

const stats = [
  { value: "10M+", label: "Records Processed Monthly" },
  { value: "99.9%", label: "Accuracy Rate" },
  { value: "50+", label: "Data Sources Supported" },
  { value: "24/7", label: "Monitoring Capability" }
];

export default function DataScraping() {
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
              <Database className="h-5 w-5" />
              <span className="text-sm font-medium">Data Scraping & Monitoring</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automated Data
              <span className="block text-primary">Collection at Scale</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Extract, monitor, and analyze data from any source with our
              intelligent scraping solutions and real-time monitoring systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  Start Collecting Data
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade Data Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reliable, scalable, and compliant data extraction services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Data Solutions for Every Industry
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Custom scraping solutions tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={useCase.title}
                className="bg-card rounded-xl p-6 border border-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-4">{useCase.title}</h3>
                <ul className="space-y-2">
                  {useCase.items.map((item) => (
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
              Unlock Data-Driven Decisions
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Tell us what data you need, and we'll build a custom solution
              to collect and deliver it automatically.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/contact">
                Discuss Your Data Needs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
