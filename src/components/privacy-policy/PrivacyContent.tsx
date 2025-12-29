import { motion } from "framer-motion";
import { Shield, Database, Eye, Clock, ArrowRight } from "lucide-react";

const sections = [
  {
    id: "overview",
    title: "Privacy Policy",
    subtitle: "Data Protection & Transparency Framework",
    icon: Shield,
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-[#FF6B00]" />
              <div className="font-mono text-sm font-bold text-[#0A0A0A]">STATUS</div>
            </div>
            <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">[ COMPLIANT ]</div>
            <div className="text-sm text-[#0A0A0A]/60 font-inter mt-2">All systems verified</div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-[#FF6B00]" />
              <div className="font-mono text-sm font-bold text-[#0A0A0A]">LAST_UPDATED</div>
            </div>
            <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">December 2025</div>
            <div className="text-sm text-[#0A0A0A]/60 font-inter mt-2">Continuous monitoring</div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-6 h-6 text-[#FF6B00]" />
              <div className="font-mono text-sm font-bold text-[#0A0A0A]">ENCRYPTION</div>
            </div>
            <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">AES-256</div>
            <div className="text-sm text-[#0A0A0A]/60 font-inter mt-2">Military-grade security</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
          <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
            This Privacy Policy outlines how Driplare collects, uses, and protects your information when you use our services. We are committed to transparency and data protection as part of our engineering-first approach to technology solutions.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "collection",
    title: "01.0 Data Collection & Intent",
    subtitle: "Strictly Necessary Information Only",
    icon: Database,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          We collect information strictly necessary to engineer your systems. This includes:
        </p>

        <div className="space-y-4">
          <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FF6B00]">
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Identification Data</h4>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
              Name, email, and company details provided via our Intake Suite.
            </p>
            <div className="font-mono text-xs text-[#0A0A0A]/50 mt-2">[ PURPOSE: CONTACT_VERIFICATION ]</div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FF6B00]">
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Technical Data</h4>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
              API keys or database credentials provided by you for integration purposes (Stored via AES-256 encryption).
            </p>
            <div className="font-mono text-xs text-[#0A0A0A]/50 mt-2">[ PURPOSE: SYSTEM_INTEGRATION | SECURITY: ENCRYPTED ]</div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FF6B00]">
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Usage Data</h4>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
              How you interact with our AI agents to improve model response accuracy.
            </p>
            <div className="font-mono text-xs text-[#0A0A0A]/50 mt-2">[ PURPOSE: MODEL_OPTIMIZATION | STORAGE: ANONYMIZED ]</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "sovereignty",
    title: "02.0 Data Sovereignty (The AI Clause)",
    subtitle: "Your Data Stays Yours",
    icon: Shield,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          Unlike many "wrapper" services, Driplare prioritizes your data privacy:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border-2 border-[#E5E5E5] hover:border-[#FF6B00] transition-colors">
            <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-3">No Model Training</h4>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-3">
              We do not use your proprietary business data to train public LLMs (OpenAI, Anthropic, etc.).
            </p>
            <div className="font-mono text-xs text-[#22C55E] font-bold">[ STATUS: GUARANTEED ]</div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-[#E5E5E5] hover:border-[#FF6B00] transition-colors">
            <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-3">RAG Isolation</h4>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-3">
              Your private knowledge base is stored in isolated vector databases.
            </p>
            <div className="font-mono text-xs text-[#22C55E] font-bold">[ STATUS: ISOLATED ]</div>
          </div>
        </div>

        <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-[#FF6B00] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Data Flow Transparency</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                Every piece of your data is tracked through our systems with full audit trails. You can request a complete data flow diagram at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "integrations",
    title: "03.0 Third-Party Integrations",
    subtitle: "Engineering the Bridge",
    icon: ArrowRight,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          Our services often involve n8n, MongoDB, and OpenAI. While we engineer the "bridge," your data is subject to the privacy policies of these providers once it leaves the Driplare ecosystem.
        </p>

        <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
          <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-4">Integration Partners</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-[#F9F9F9] rounded-lg">
              <div className="font-mono font-bold text-[#0A0A0A] text-sm mb-2">N8N</div>
              <div className="text-xs text-[#0A0A0A]/60">Workflow Automation</div>
            </div>
            <div className="text-center p-4 bg-[#F9F9F9] rounded-lg">
              <div className="font-mono font-bold text-[#0A0A0A] text-sm mb-2">MONGODB</div>
              <div className="text-xs text-[#0A0A0A]/60">Database Storage</div>
            </div>
            <div className="text-center p-4 bg-[#F9F9F9] rounded-lg">
              <div className="font-mono font-bold text-[#0A0A0A] text-sm mb-2">OPENAI</div>
              <div className="text-xs text-[#0A0A0A]/60">AI Processing</div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF3E0] p-6 rounded-lg border border-[#FF6B00]/20">
          <div className="flex items-start gap-3">
            <ArrowRight className="w-5 h-5 text-[#FF6B00] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Important Notice</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                While we maintain the highest security standards within our systems, data transferred to third-party services falls under their respective privacy policies. We recommend reviewing these policies before data transmission.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "retention",
    title: "04.0 Data Retention",
    subtitle: "Minimal & Purpose-Driven",
    icon: Clock,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          We retain project-related data only for the duration of the contract plus 90 days for emergency recovery, unless otherwise requested in writing.
        </p>

        <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
          <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-4">Retention Timeline</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-lg">
              <div>
                <div className="font-montserrat font-bold text-[#0A0A0A]">Active Contract</div>
                <div className="text-sm text-[#0A0A0A]/60 font-inter">During project execution</div>
              </div>
              <div className="font-mono font-bold text-[#FF6B00] text-lg">RETAINED</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-lg">
              <div>
                <div className="font-montserrat font-bold text-[#0A0A0A]">Post-Contract</div>
                <div className="text-sm text-[#0A0A0A]/60 font-inter">90 days for recovery</div>
              </div>
              <div className="font-mono font-bold text-[#FF6B00] text-lg">90_DAYS</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-lg">
              <div>
                <div className="font-montserrat font-bold text-[#0A0A0A]">Data Deletion</div>
                <div className="text-sm text-[#0A0A0A]/60 font-inter">Upon written request</div>
              </div>
              <div className="font-mono font-bold text-[#22C55E] text-lg">IMMEDIATE</div>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F9F0] p-6 rounded-lg border border-[#22C55E]/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Your Control</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                You maintain full control over your data retention preferences. Contact us at any time to modify retention settings or request complete data deletion.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

interface PrivacyContentProps {
  activeSection: string;
}

export function PrivacyContent({ activeSection }: PrivacyContentProps) {
  const activeSectionData = sections.find(section => section.id === activeSection) || sections[0];

  return (
    <div className="max-w-[800px] mx-auto">
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#E5E5E5]">
          <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
            <activeSectionData.icon className="w-6 h-6 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="font-montserrat font-bold text-2xl text-[#0A0A0A]">{activeSectionData.title}</h2>
            <p className="text-[#0A0A0A]/60 font-inter text-sm">{activeSectionData.subtitle}</p>
          </div>
        </div>

        {/* Section Content */}
        <div className="leading-[1.8]">
          {activeSectionData.content}
        </div>

        {/* Contact Footer */}
        {activeSection !== 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]"
          >
            <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-3">Questions About Your Privacy?</h5>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-4">
              Our privacy team is available to address any concerns or provide additional information about how we handle your data.
            </p>
            <div className="font-mono text-sm text-[#0A0A0A]/60">
              [ SUPPORT_CHANNEL: privacy@driplare.com | RESPONSE_TIME: &lt;24HRS&gt; ]
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
