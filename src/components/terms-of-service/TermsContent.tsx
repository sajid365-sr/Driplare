import { motion } from "framer-motion";
import { FileText, Code, User, AlertTriangle, Calendar, X } from "lucide-react";

const sections = [
  {
    id: "overview",
    title: "Terms of Service",
    subtitle: "Digital Engineering & Consulting Services",
    icon: FileText,
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-[#FF6B00]" />
              <div className="font-mono text-sm font-bold text-[#0A0A0A]">SUBJECT</div>
            </div>
            <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">Digital Engineering</div>
            <div className="text-sm text-[#0A0A0A]/60 font-inter mt-2">& Consulting Services</div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-3 mb-3">
              <Code className="w-6 h-6 text-[#FF6B00]" />
              <div className="font-mono text-sm font-bold text-[#0A0A0A]">APPROACH</div>
            </div>
            <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">MERN + AI</div>
            <div className="text-sm text-[#0A0A0A]/60 font-inter mt-2">Modern Tech Stack</div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-[#FF6B00]" />
              <div className="font-mono text-sm font-bold text-[#0A0A0A]">LAST_UPDATED</div>
            </div>
            <div className="font-montserrat font-bold text-lg text-[#0A0A0A]">December 2025</div>
            <div className="text-sm text-[#0A0A0A]/60 font-inter mt-2">Continuous review</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
          <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
            These terms govern the relationship between Driplare and our clients for digital engineering and AI consulting services. We believe in clear communication and mutual success.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "scope",
    title: "01.0 Scope of Work",
    subtitle: "What We Deliver",
    icon: Code,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          Driplare provides custom software engineering and AI consulting. The specific deliverables are defined in the "Technical Specification" document provided before project commencement.
        </p>

        <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
          <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-4">Project Definition</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span className="text-[#0A0A0A]/70 font-inter">Custom MERN stack applications</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span className="text-[#0A0A0A]/70 font-inter">AI agent development and integration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span className="text-[#0A0A0A]/70 font-inter">Workflow automation with n8n</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span className="text-[#0A0A0A]/70 font-inter">Technical architecture consulting</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#FF6B00] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Technical Specification</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                Every project begins with a detailed technical specification that outlines deliverables, timelines, and success criteria. This document serves as our mutual agreement on project scope and objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "ownership",
    title: "02.0 Intellectual Property Ownership",
    subtitle: "Code Rights & Licensing",
    icon: Code,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-[#22C55E]/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Custom Code Ownership</h4>
                <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-2">
                  Upon final payment, full ownership of custom MERN code and n8n workflows is transferred to the Client.
                </p>
                <div className="font-mono text-xs text-[#22C55E] font-bold">[ TRANSFER: COMPLETE | TIMING: FINAL_PAYMENT ]</div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Internal Tools License</h4>
                <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-2">
                  Driplare retains ownership of proprietary "boilerplate" logic used to accelerate development, but grants the Client a perpetual, non-exclusive license to use it.
                </p>
                <div className="font-mono text-xs text-[#FF6B00] font-bold">[ LICENSE: PERPETUAL | SCOPE: NON_EXCLUSIVE | USAGE: UNLIMITED ]</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF3E0] p-6 rounded-lg border border-[#FF6B00]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#FF6B00] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Clear Ownership Rights</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                We believe in complete transparency about code ownership. What you pay for becomes completely yours, while our internal tools remain available to accelerate future development.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "responsibilities",
    title: "03.0 Client Responsibilities",
    subtitle: "Working Together Effectively",
    icon: User,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          The Client must provide timely access to necessary APIs and documentation. Delays in access may result in a shift in the "Project Roadmap" timeline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-3">Required Access</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                <span className="text-sm text-[#0A0A0A]/70 font-inter">API credentials and documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                <span className="text-sm text-[#0A0A0A]/70 font-inter">System access and permissions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                <span className="text-sm text-[#0A0A0A]/70 font-inter">Business requirements and context</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
            <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-3">Timeline Impact</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#0A0A0A]/70 font-inter">Access Delay</span>
                <span className="font-mono text-sm text-[#FF6B00] font-bold">TIMELINE_SHIFT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#0A0A0A]/70 font-inter">Project Roadmap</span>
                <span className="font-mono text-sm text-[#FF6B00] font-bold">ADJUSTED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F9F0] p-6 rounded-lg border border-[#22C55E]/20">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Partnership Approach</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                We work as partners, not vendors. Your timely collaboration ensures we deliver the best possible results within the agreed timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "liability",
    title: "04.0 Liability & Performance",
    subtitle: "Managing Expectations Realistically",
    icon: AlertTriangle,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">AI Hallucinations Disclaimer</h4>
                <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-2">
                  While we implement RAG and rigorous prompt engineering, Driplare is not liable for autonomous AI outputs. Human oversight is recommended for customer-facing agents.
                </p>
                <div className="font-mono text-xs text-[#0A0A0A]/50">[ RECOMMENDATION: HUMAN_OVERSIGHT | LIABILITY: LIMITED ]</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">99.9%</span>
                </div>
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Service Uptime Commitment</h4>
                <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-2">
                  We architect for 99.9% uptime, but we are not responsible for outages caused by third-party providers (AWS, OpenAI, n8n).
                </p>
                <div className="font-mono text-xs text-[#0A0A0A]/50">[ TARGET_UPTIME: 99.9% | THIRD_PARTY_EXEMPTION: APPLIES ]</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF3E0] p-6 rounded-lg border border-[#FF6B00]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#FF6B00] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Realistic Expectations</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                We set clear expectations about AI limitations and uptime dependencies. Our goal is to build reliable systems while being transparent about the realities of modern technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "termination",
    title: "05.0 Termination",
    subtitle: "Ending Our Agreement",
    icon: X,
    content: (
      <div className="space-y-6">
        <p className="text-[#0A0A0A]/80 font-inter leading-relaxed">
          Either party may terminate the agreement with 14 days' written notice. The Client will be billed for all "milestones" completed up to the date of termination.
        </p>

        <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
          <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-4">Termination Process</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-lg">
              <div>
                <div className="font-montserrat font-bold text-[#0A0A0A]">Notice Period</div>
                <div className="text-sm text-[#0A0A0A]/60 font-inter">Required for termination</div>
              </div>
              <div className="font-mono font-bold text-[#FF6B00] text-lg">14_DAYS</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-lg">
              <div>
                <div className="font-montserrat font-bold text-[#0A0A0A]">Billing Basis</div>
                <div className="text-sm text-[#0A0A0A]/60 font-inter">Work completed</div>
              </div>
              <div className="font-mono font-bold text-[#FF6B00] text-lg">COMPLETED_MILESTONES</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F9F9F9] rounded-lg">
              <div>
                <div className="font-montserrat font-bold text-[#0A0A0A]">Notice Method</div>
                <div className="text-sm text-[#0A0A0A]/60 font-inter">Formal communication</div>
              </div>
              <div className="font-mono font-bold text-[#FF6B00] text-lg">WRITTEN_NOTICE</div>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F9F0] p-6 rounded-lg border border-[#22C55E]/20">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Fair & Transparent</h5>
              <p className="text-[#0A0A0A]/70 font-inter leading-relaxed">
                We believe in fair termination terms that protect both parties. You'll only pay for work that's been completed and delivered.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

interface TermsContentProps {
  activeSection: string;
}

export function TermsContent({ activeSection }: TermsContentProps) {
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
            <h5 className="font-montserrat font-bold text-[#0A0A0A] mb-3">Questions About These Terms?</h5>
            <p className="text-[#0A0A0A]/70 font-inter leading-relaxed mb-4">
              We're here to clarify any aspect of our agreement. Clear communication ensures successful partnerships.
            </p>
            <div className="font-mono text-sm text-[#0A0A0A]/60">
                [ SUPPORT_CHANNEL: legal@driplare.com | RESPONSE_TIME: &lt;24HRS&gt; ]
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
