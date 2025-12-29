import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Code,
  HardDrive,
  DollarSign,
  Clock,
  BarChart,
  GitFork,
  Target,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock Data - This should eventually come from your backend or a structured data source
const CASE_STUDIES = [
  {
    id: "ecommerce-ai-agent",
    title: "24/7 Autonomous Sales & Support AI Agent",
    context: "High-Growth E-commerce Brand (FB/IG Shop)",
    problem:
      "The store owner was losing 30%+ of potential sales due to response delays. Scaling with human moderators was becoming too expensive ($1,500+/mo), and they couldn't provide 24/7 coverage.",
    solution:
      "Built a custom AI Agent trained on the store's full product catalog, FAQs, and delivery policies. Integrated with Meta API via n8n to provide instant replies and capture customer delivery details for automated order confirmation.",
    result:
      "100% Automated Inquiries; 70% Reduction in Operational Costs; Zero Sales lost to response lag.",
    roiMetrics: [
      { label: "Response Time", value: "Instant", icon: Clock },
      {
        label: "Operational Savings",
        value: "70% Monthly",
        icon: DollarSign,
      },
      {
        label: "Sales Conversion",
        value: "+25% Increase",
        icon: BarChart,
      },
    ],
    techStack: [
      "OpenAI GPT-4o",
      "n8n Workflow",
      "Meta Messenger API",
      "Vector Database (Pinecone)",
      "Node.js",
      "PostgreSQL",
    ],
    imageUrl:
      "https://hellosprout.ai/wp-content/uploads/2024/06/Group-1-copy-8.jpg",
    workflowDiagram:
      "https://img.freepik.com/free-vector/five-steps-process-chart-slide-template-business-data-flowchart-diagram_1262-12940.jpg?semt=ais_hybrid&w=740&q=80",
    keyQuote:
      "My AI agent handles the chaos while I sleep. I wake up to confirmed orders, not an overflowing inbox.",
    // I am adding a specific code snippet for this case study to be used in the "Code Insight" section
    codeSnippet: `// n8n AI Agent Logic: Processing Order Intent
async function processOrder(message, customerData) {
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: "Extract name, phone, and address to confirm order." },
      { role: "user", content: message }
    ]
  });

  if (aiResponse.isOrderReady) {
    return await db.orders.create({
      status: 'pending',
      ...customerData
    });
  }
}`,
  },
  {
    id: "pricing-monitor",
    title: "Real-time Competitor Pricing & Market Intelligence System",
    context: "Large E-commerce Enterprise (5,000+ SKUs)",
    problem:
      "Manual price monitoring across 15 competitor websites consumed 40+ hours/week, leading to delayed price adjustments and missed sales opportunities.",
    solution:
      "Developed an autonomous, serverless Node.js scraper (Puppeteer) integrated with n8n for workflow orchestration. An OpenAI agent analyzes market trends and competitor strategies, feeding real-time data into a custom React dashboard.",
    result:
      "98% Reduction in Manual Labor; Instant Price-Adjustment Alerts; 15% Increase in Competitive Sales Win Rate.",
    roiMetrics: [
      { label: "Manual Hours Saved", value: "40+ hours/week", icon: Clock },
      {
        label: "Price Update Latency",
        value: "Reduced from 24h to 1h",
        icon: Lightbulb,
      },
      {
        label: "Competitive Win Rate",
        value: "Increased by 15%",
        icon: BarChart,
      },
    ],
    techStack: [
      "Node.js",
      "Puppeteer",
      "n8n",
      "OpenAI GPT-4",
      "MongoDB Atlas",
      "React.js",
      "AWS Lambda",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1517292271810-dc3241517743?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    workflowDiagram: "/case-studies/pricing-workflow-diagram.png", // Path to a diagram image
    keyQuote:
      "Driplare didn't just automate; they gave us a strategic advantage in a cutthroat market.",
  },
  {
    id: "workflow-automation",
    title: "Multi-Platform Business Workflow Automation Suite",
    context: "Growing SaaS Company (500+ Daily Transactions)",
    problem:
      "Disjointed data across HubSpot CRM, QuickBooks, and ClickUp led to manual data entry, reconciliation errors, and delayed project initiations.",
    solution:
      "Implemented robust n8n workflows that listen to webhooks from HubSpot, automatically create invoices in QuickBooks, update client statuses in ClickUp, and send automated notifications. Custom Node.js scripts handle complex data transformations.",
    result:
      "85% Faster Processing; Zero Manual Data Entry Errors; Improved Client Onboarding Time by 50%.",
    roiMetrics: [
      { label: "Processing Speed", value: "85% Faster", icon: Clock },
      { label: "Data Entry Errors", value: "Eliminated", icon: XCircle },
      { label: "Onboarding Time", value: "50% Reduction", icon: Lightbulb },
    ],
    techStack: [
      "n8n",
      "Node.js",
      "HubSpot API",
      "QuickBooks API",
      "ClickUp API",
      "PostgreSQL",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1589938167825-7034c2299a9a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    workflowDiagram: "/case-studies/workflow-automation-diagram.png",
    keyQuote:
      "Our team can finally focus on strategy instead of tedious data entry.",
  },
  // Add other case studies here
];

export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const caseStudy = useMemo(
    () => CASE_STUDIES.find((cs) => cs.id === id),
    [id]
  );

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <h1 className="text-3xl font-bold text-muted-foreground">
          Case study not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to all Case Studies
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative h-64 md:h-96">
            <img
              src={caseStudy.imageUrl}
              alt={caseStudy.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
              <Badge
                variant="outline"
                className="text-primary border-primary/30 uppercase tracking-widest px-3 py-1 mb-3"
              >
                {caseStudy.context}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl leading-tight">
                {caseStudy.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-card">
            <p className="text-xl text-muted-foreground leading-relaxed italic mb-8">
              "{caseStudy.keyQuote}"
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <XCircle size={14} className="text-red-500" /> The Business
                  Bottleneck
                </div>
                <p className="leading-relaxed font-medium">
                  {caseStudy.problem}
                </p>
              </div>
              <div className="space-y-4 border-t border-border/50 pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Lightbulb size={14} className="text-primary" /> The Driplare
                  Solution
                </div>
                <p className="leading-relaxed font-medium">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROI Metrics Section */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <h2 className="text-center text-3xl md:text-5xl font-black tracking-tighter mb-12">
            Verifiable <span className="text-primary">Impact.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudy.roiMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.5 }}
                className="bg-accent/20 p-8 rounded-2xl border border-border/50 flex flex-col items-center text-center space-y-3 shadow-sm"
              >
                <metric.icon size={36} className="text-primary" />
                <h3 className="text-4xl font-black tracking-tighter text-primary">
                  {metric.value}
                </h3>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Diagram & Code */}
            <div className="space-y-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
                Logic <span className="text-primary">Breakdown</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Dive into the core engineering that powers this solution. We
                build robust, scalable, and observable systems.
              </p>

              {caseStudy.workflowDiagram && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                    <GitFork size={20} className="text-primary" /> Workflow
                    Visualization
                  </h3>
                  <div className="bg-card border border-border/50 p-6 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={caseStudy.workflowDiagram}
                      alt="Workflow Diagram"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center italic">
                    Simplified data flow and automation triggers.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                  <Code size={20} className="text-primary" /> Key Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.techStack.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="px-4 py-2 border-primary/30 text-primary bg-primary/10 text-sm font-bold rounded-full"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Code Snippet / Technical Insight */}
            <div className="bg-card border border-border/50 rounded-3xl p-8 lg:p-10 shadow-xl space-y-6 sticky top-32 h-fit">
              <h3 className="flex items-center gap-3 text-2xl font-black tracking-tight">
                <HardDrive size={24} className="text-primary" /> Code Insight
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A glimpse into the core logic of the data scraping module that
                drives the pricing intelligence:
              </p>
              <pre className="bg-black text-green-400 p-6 rounded-xl overflow-x-auto text-xs font-mono border border-border/50">
                <code className="whitespace-pre-wrap">
                  {`// Node.js Puppeteer Scraper Snippet
async function scrapeCompetitorPrices(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    const prices = Array.from(document.querySelectorAll('.price-element')).map(el => el.textContent.trim());
    const products = Array.from(document.querySelectorAll('.product-name')).map(el => el.textContent.trim());
    return { prices, products };
  });

  await browser.close();
  return data;
}`}
                </code>
              </pre>
              <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest pt-4">
                [DRIPLARE_OBSERVABILITY_LOG: Function extractPrices(url)]
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA - Reused from CaseStudies page */}
        <section className="py-16 md:py-24">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 text-[10rem] font-black opacity-5 pointer-events-none -translate-x-1/4 -translate-y-1/4">
              SOLUTION
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Ready for your own <br /> Engineering Solution?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto text-lg font-medium">
              Let's identify the manual labor in your business and replace it
              with intelligent, autonomous infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-8 text-xl font-bold shadow-2xl"
              >
                <Link to="/contact">
                  Book Architecture Call{" "}
                  <ArrowRight size={24} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
