import type { Metadata } from 'next'
import { Shield, Lock, Eye, Server } from "lucide-react";

export const metadata: Metadata = {
  title: 'Security - Enterprise-Grade Protection',
  description: 'Learn about Driplare\'s security measures, data protection, and compliance standards for AI solutions and software development.',
}

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard protocols."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Secure Infrastructure",
      description: "Hosted on enterprise-grade cloud platforms with 99.9% uptime guarantees."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Access Control",
      description: "Role-based access control and multi-factor authentication for all systems."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance Ready",
      description: "GDPR, SOC 2, and industry-specific compliance frameworks implemented."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm font-bold text-primary uppercase tracking-widest">
              Security First
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0A0A0A] mb-6">
            Enterprise-Grade Security
          </h1>
          <p className="text-xl text-[#0A0A0A]/70 max-w-3xl mx-auto">
            Your data security is our top priority. We implement comprehensive security measures to protect your information and ensure compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="p-8 bg-[#F9F9F9] rounded-xl border border-[#E5E5E5] hover:border-primary/50 transition-colors">
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#0A0A0A]/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 bg-[#0A0A0A] text-white rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Security Assessment</h2>
            <p className="text-white/80 mb-6">
              Ready to evaluate your current security posture? Let's conduct a comprehensive security audit.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Request Security Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
