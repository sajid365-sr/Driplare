"use client";

import Link from "next/link";
import ProofSuite from "@/components/agent-marketplace/ProofSuite";
import SystemCapabilities from "@/components/agent-marketplace/SystemCapabilities";
import ConciergeRoadmap from "@/components/agent-marketplace/ConciergeRoadmap";
import FinalAction from "@/components/agent-marketplace/FinalAction";

interface ProductData {
  breadcrumb: string;
  title: string;
  povVideo: string;
  beforeImage: string;
  afterImage: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  conciergeSteps: {
    title: string;
    description: string;
  }[];
}

export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;

  // Mock product data - in a real app this would come from an API
  const productData: Record<string, ProductData> = {
    "fb-concierge": {
      breadcrumb: "> MARKETPLACE / SOCIAL_PIPELINES / FB_MESSENGER_AUTOMATION",
      title: "Facebook Messenger Automation",
      povVideo: "/api/placeholder/video",
      beforeImage: "/api/placeholder/400/300",
      afterImage: "/api/placeholder/400/300",
      capabilities: [
        {
          title: "Semantic Understanding",
          description:
            'The AI understands "intent," not just keywords. It recognizes when someone is asking about pricing vs. when they\'re ready to buy.',
        },
        {
          title: "Lead Triage",
          description:
            'Automatically labels "Hot Leads" vs "General Inquiries" based on conversation context and engagement signals.',
        },
        {
          title: "Human-Handoff",
          description:
            "Alerts you instantly when a customer needs a real person. Seamlessly transfers the conversation with full context.",
        },
        {
          title: "Seamless Integration",
          description:
            "We connect it to your current CRM or Google Sheets. Leads automatically populate your existing workflow.",
        },
      ],
      conciergeSteps: [
        {
          title: "Initial Setup & Integration",
          description:
            "Connect your Facebook Business account and define your lead qualification criteria.",
        },
        {
          title: "AI Training & Customization",
          description:
            "Train the AI on your specific products, pricing, and conversation style.",
        },
        {
          title: "Testing & Optimization",
          description:
            "Test the system with real conversations and fine-tune responses.",
        },
        {
          title: "Go-Live & Monitoring",
          description:
            "Launch the system and continuously monitor performance.",
        },
      ],
    },
    "gmail-triage": {
      breadcrumb: "> MARKETPLACE / COMMUNICATION / GMAIL_INBOX_TRIAGE",
      title: "Gmail Inbox Triage",
      povVideo: "/api/placeholder/video",
      beforeImage: "/api/placeholder/400/300",
      afterImage: "/api/placeholder/400/300",
      capabilities: [
        {
          title: "Intelligent Categorization",
          description:
            "Automatically sorts emails by priority, topic, and required action.",
        },
        {
          title: "Smart Drafting",
          description:
            "Creates personalized response drafts based on email content and context.",
        },
        {
          title: "Priority Scoring",
          description:
            "Assigns urgency levels to ensure important emails get immediate attention.",
        },
      ],
      conciergeSteps: [
        {
          title: "Email Analysis Setup",
          description:
            "Configure inbox access and define categorization rules.",
        },
        {
          title: "Response Template Creation",
          description:
            "Develop personalized response templates for different scenarios.",
        },
        {
          title: "Priority Rules Definition",
          description: "Set up rules for email prioritization and routing.",
        },
      ],
    },
    "web-core": {
      breadcrumb: "> MARKETPLACE / INTELLIGENCE / WEB_INTELLIGENCE_CORE",
      title: "Web Intelligence Core",
      povVideo: "/api/placeholder/video",
      beforeImage: "/api/placeholder/400/300",
      afterImage: "/api/placeholder/400/300",
      capabilities: [
        {
          title: "Data Collection Automation",
          description:
            "Automatically gathers and processes data from multiple sources.",
        },
        {
          title: "Real-time Processing",
          description:
            "Processes and analyzes data in real-time for immediate insights.",
        },
        {
          title: "Intelligent Insights",
          description: "Generates actionable insights from collected data.",
        },
      ],
      conciergeSteps: [
        {
          title: "Data Source Integration",
          description: "Connect and configure data sources for collection.",
        },
        {
          title: "Processing Pipeline Setup",
          description: "Configure data processing and analysis workflows.",
        },
        {
          title: "Dashboard Configuration",
          description: "Set up real-time dashboards and reporting.",
        },
      ],
    },
  };

  const product = productData[productId];

  console.log("Product: ========================", productId, product);

  // if (!product) {
  //   return (
  //     <div className="min-h-screen bg-white pt-24">
  //       <div className="container mx-auto px-4 text-center">
  //         <h1 className="text-4xl font-bold text-[#0A0A0A] mb-4">Product Not Found</h1>
  //         <Link href="/agent-marketplace" className="text-[#FF6B00] hover:underline">
  //           Back to Marketplace
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#F9F9F9] border-b border-[#E5E5E5] py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#0A0A0A]/60 hover:text-[#FF6B00]">
              HOME
            </Link>
            <span className="text-[#0A0A0A]/40">/</span>
            <Link
              href="/agent-marketplace"
              className="text-[#0A0A0A]/60 hover:text-[#FF6B00]"
            >
              MARKETPLACE
            </Link>
            <span className="text-[#0A0A0A]/40">/</span>
            <span className="text-[#0A0A0A] font-mono text-xs">
              {product.breadcrumb}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Title */}
      <div className="bg-[#0A0A0A] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            {product.title}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Enterprise-grade automation solution with full concierge setup and
            ongoing optimization.
          </p>
        </div>
      </div>

      {/* Proof Suite */}
      <ProofSuite
        povVideo={product.povVideo}
        beforeImage={product.beforeImage}
        afterImage={product.afterImage}
      />

      {/* System Capabilities */}
      <SystemCapabilities capabilities={product.capabilities} />

      {/* Concierge Roadmap */}
      <ConciergeRoadmap steps={product.conciergeSteps} />

      {/* Final Action */}
      <FinalAction productId={productId} />
    </div>
  );
}
