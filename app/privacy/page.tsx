'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  // Handle scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'collection', 'sovereignty', 'integrations', 'retention'];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm font-bold text-primary uppercase tracking-widest">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0A0A0A] mb-6">
            Data Sovereignty & Privacy
          </h1>
          <p className="text-lg text-[#0A0A0A]/70 max-w-3xl mx-auto">
            Your data security and privacy are paramount. We implement enterprise-grade protection measures for all client information.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">1. Overview</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                Driplare is committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data.
              </p>
            </section>

            <section id="collection" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">2. Information Collection</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                We collect information necessary to provide our AI and automation services, including contact information, project requirements, and usage data to improve our services.
              </p>
            </section>

            <section id="sovereignty" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">3. Data Sovereignty</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                Your data remains yours. We implement strict access controls and encryption to ensure your information is never shared without explicit consent.
              </p>
            </section>

            <section id="integrations" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">4. Third-Party Integrations</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                When connecting to your existing systems, we only access the minimum data required for automation and never store sensitive information unnecessarily.
              </p>
            </section>

            <section id="retention" className="mb-12">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">5. Data Retention</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                We retain data only as long as necessary to provide our services and comply with legal requirements. You can request data deletion at any time.
              </p>
            </section>

            <div className="mt-12 p-6 bg-[#F9F9F9] rounded-xl border border-[#E5E5E5]">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Contact Us</h3>
              <p className="text-[#0A0A0A]/70">
                If you have any questions about this privacy policy, please contact us at privacy@driplare.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
