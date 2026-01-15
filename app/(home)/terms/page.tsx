import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Driplare',
  description: 'Terms of service and usage agreement for Driplare AI solutions and software development services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-[#0A0A0A] mb-8 text-center">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#0A0A0A]/70 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                By accessing and using Driplare's services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">2. Service Description</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                Driplare provides AI-powered automation and software development services. We specialize in building autonomous AI agents, workflow automation, and MERN stack applications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">3. Intellectual Property</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                All content, features, and functionality of our services are owned by Driplare and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">4. Limitation of Liability</h2>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-6">
                Driplare shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.
              </p>
            </section>

            <div className="mt-12 p-6 bg-[#F9F9F9] rounded-xl border border-[#E5E5E5]">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Contact Information</h3>
              <p className="text-[#0A0A0A]/70">
                For questions about these terms, please contact us at legal@driplare.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
