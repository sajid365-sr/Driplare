import type { Metadata } from 'next'
import { Hero } from '@/components/services/b2b-consulting/Hero';
import { ProblemSection } from '@/components/services/b2b-consulting/ProblemSection';
import { WhatIsConsulting } from '@/components/services/b2b-consulting/WhatIsConsulting';
import { WhatWeCoverSection } from '@/components/services/b2b-consulting/WhatWeCoverSection';
import { HowItWorksSection } from '@/components/services/b2b-consulting/HowItWorksSection';
import { PricingSection } from '@/components/services/b2b-consulting/PricingSection';
import { WhoIsThisForSection } from '@/components/services/b2b-consulting/WhoIsThisForSection';
import { FAQSection } from '@/components/services/b2b-consulting/FAQSection';
import { SimpleCTA } from '@/components/services/b2b-consulting/SimpleCTA';


export const metadata: Metadata = {
  title: 'B2B Consulting Services - Strategic Business Solutions',
  description: 'Expert B2B consulting services for business strategy, digital transformation, and technology implementation. Strategic advisory for enterprise-level challenges.',
}

export default function B2BConsulting() {
  return (
    <div className="min-h-screen bg-white relative dark:bg-[#0d0d14] selection:text-white">
      <Hero />
      <ProblemSection />
      <WhatIsConsulting />
      <WhatWeCoverSection />
      <HowItWorksSection />
      <PricingSection />
      <WhoIsThisForSection />
      <FAQSection />
      <SimpleCTA />

    </div>
  );
}
