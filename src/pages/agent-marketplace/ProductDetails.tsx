import { useParams, Link } from "react-router-dom";
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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Mock product data - in a real app this would come from an API
  const productData: Record<string, ProductData> = {
    'fb-concierge': {
      breadcrumb: '> MARKETPLACE / SOCIAL_PIPELINES / FB_MESSENGER_AUTOMATION',
      title: 'Facebook Messenger Automation',
      povVideo: '/api/placeholder/video',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      capabilities: [
        {
          title: 'Semantic Understanding',
          description: 'The AI understands "intent," not just keywords. It recognizes when someone is asking about pricing vs. when they\'re ready to buy.'
        },
        {
          title: 'Lead Triage',
          description: 'Automatically labels "Hot Leads" vs "General Inquiries" based on conversation context and engagement signals.'
        },
        {
          title: 'Human-Handoff',
          description: 'Alerts you instantly when a customer needs a real person. Seamlessly transfers the conversation with full context.'
        },
        {
          title: 'Seamless Integration',
          description: 'We connect it to your current CRM or Google Sheets. Leads automatically populate your existing workflow.'
        }
      ],
      conciergeSteps: [
        {
          title: 'Strategy Kickoff',
          description: 'After purchase, we jump on a 15-minute call to understand your brand\'s voice and goals.'
        },
        {
          title: 'Engineering Phase',
          description: 'Our team handles all API connections, n8n logic, and prompt engineering. You provide feedback on the AI\'s responses.'
        },
        {
          title: 'Quality Assurance',
          description: 'We stress-test the system and push it live once it\'s 100% accurate for your specific use case.'
        }
      ]
    },
    'gmail-triage': {
      breadcrumb: '> MARKETPLACE / INBOX_MANAGEMENT / GMAIL_INBOX_TRIAGE',
      title: 'Gmail Inbox Triage',
      povVideo: '/api/placeholder/video',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      capabilities: [
        {
          title: 'Intelligent Categorization',
          description: 'Automatically sorts emails by intent, urgency, and sender relationship. No more digging through hundreds of messages.'
        },
        {
          title: 'Smart Drafting',
          description: 'Generates context-aware response drafts based on the email content and your communication style.'
        },
        {
          title: 'Sentiment Analysis',
          description: 'Detects frustrated customers, urgent requests, and positive feedback to prioritize your responses.'
        },
        {
          title: 'CRM Integration',
          description: 'Automatically updates your CRM with lead information, meeting requests, and customer interactions.'
        }
      ],
      conciergeSteps: [
        {
          title: 'Strategy Kickoff',
          description: 'After purchase, we jump on a 15-minute call to understand your brand\'s voice and goals.'
        },
        {
          title: 'Engineering Phase',
          description: 'Our team handles all API connections, n8n logic, and prompt engineering. You provide feedback on the AI\'s responses.'
        },
        {
          title: 'Quality Assurance',
          description: 'We stress-test the system and push it live once it\'s 100% accurate for your specific use case.'
        }
      ]
    },
    'web-core': {
      breadcrumb: '> MARKETPLACE / DATA_MINING / WEB_INTELLIGENCE_CORE',
      title: 'Web Intelligence Core',
      povVideo: '/api/placeholder/video',
      beforeImage: '/api/placeholder/400/300',
      afterImage: '/api/placeholder/400/300',
      capabilities: [
        {
          title: 'Automated Data Collection',
          description: 'Continuously gathers data from your website, forms, and user interactions without manual intervention.'
        },
        {
          title: 'Intelligent Processing',
          description: 'AI analyzes patterns, identifies opportunities, and generates actionable insights from your data.'
        },
        {
          title: 'Workflow Automation',
          description: 'Automatically triggers actions based on data conditions - from email alerts to CRM updates.'
        },
        {
          title: 'Real-time Dashboards',
          description: 'Beautiful, automated dashboards that update in real-time with your key business metrics.'
        }
      ],
      conciergeSteps: [
        {
          title: 'Strategy Kickoff',
          description: 'After purchase, we jump on a 15-minute call to understand your brand\'s voice and goals.'
        },
        {
          title: 'Engineering Phase',
          description: 'Our team handles all API connections, n8n logic, and prompt engineering. You provide feedback on the AI\'s responses.'
        },
        {
          title: 'Quality Assurance',
          description: 'We stress-test the system and push it live once it\'s 100% accurate for your specific use case.'
        }
      ]
    }
  };

  const product = id ? productData[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Montserrat'] font-bold text-2xl mb-4">Product Not Found</h1>
          <p className="text-gray-600">The requested product could not be found.</p>
          <Link
            to="/agent-marketplace"
            className="inline-block mt-4 font-['JetBrains_Mono'] text-[#FF6B00] hover:underline"
          >
            [ RETURN_TO_MARKETPLACE ]
          </Link>
        </div>
      </div>
    );
  }

  const handleInitiateSetup = () => {
    // Handle setup conference logic here
    console.log('Initiate setup conference clicked');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header: System Identifier */}
      <section className="py-8 px-4 bg-[#F9F9F9] border-b border-black">
        <div className="max-w-6xl mx-auto">
          <div className="font-['JetBrains_Mono'] text-sm text-gray-600">
            {product.breadcrumb}
          </div>
        </div>
      </section>

      {/* Zero Technical Knowledge Required */}
      <section className="py-12 px-4 bg-white border-b border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-['Montserrat'] font-bold text-3xl mb-6 text-[#FF6B00]">
            Zero Technical Knowledge Required
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We handle Meta Developer tokens, OpenAI API balancing, n8n hosting, and all technical setup.
            You just tell us your goals, and we make it happen.
          </p>
        </div>
      </section>

      {/* The Proof Suite */}
      <ProofSuite
        povVideo={product.povVideo}
        beforeImage={product.beforeImage}
        afterImage={product.afterImage}
      />

      {/* System Capabilities */}
      <SystemCapabilities capabilities={product.capabilities} />

      {/* The Concierge Roadmap */}
      <ConciergeRoadmap steps={product.conciergeSteps} />

      {/* Final Action */}
      <FinalAction
        headline="Ready to Automate your Inbox?"
        subText="Average deployment time: 48–72 hours after kickoff."
        onInitiateSetup={handleInitiateSetup}
      />
    </div>
  );
};

export default ProductDetails;
