import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Code2, ShieldAlert, Cpu } from "lucide-react";

const faqs = [
  {
    icon: <Code2 size={16} />,
    tag: "TECH_STACK",
    question: "Why choose MERN over No-Code or WordPress?",
    answer:
      "No-code and WordPress are for templates; MERN is for products. If your business requires complex logic, custom AI integrations, or high-concurrency data processing, off-the-shelf solutions will eventually become a bottleneck. MERN offers total intellectual property ownership and infinite scalability.",
  },
  {
    icon: <ShieldAlert size={16} />,
    tag: "SECURITY",
    question: "How do you ensure enterprise-grade data security?",
    answer:
      "We implement a multi-layer security protocol: industry-standard JWT (JSON Web Tokens) for authentication, Bcrypt for password hashing, and CORS/Helmet for server-side protection. Furthermore, we architect our databases with Row-Level Security (RLS) and conduct rigorous penetration testing before every deployment.",
  },
  {
    icon: <Cpu size={16} />,
    tag: "INTEGRATION",
    question: "Can these systems communicate with my existing legacy software?",
    answer:
      "Yes. Our specialty is building 'Headless' backends. We develop custom API wrappers and middleware that allow your modern MERN system to pull data from—and push data to—legacy databases, ERPs, or CRMs, effectively modernizing your stack without a complete teardown.",
  },
  {
    icon: <HelpCircle size={16} />,
    tag: "OWNERSHIP",
    question: "Who owns the code once the project is complete?",
    answer:
      "You do. Unlike SaaS platforms that charge you per user forever, we provide a full handover of the source code and documentation. You own the intellectual property (IP), giving you the freedom to maintain it internally or scale it as an independent asset.",
  },
];

export const AccordionFAQ = () => {
  return (
    <section className="py-24 bg-white text-[#0A0A0A]">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column: Context */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs font-bold text-primary tracking-[0.3em] uppercase block mb-4">
              Knowledge_Base
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Critical <br /> Questions. <br />{" "}
              <span className="text-primary italic">Expert Answers.</span>
            </h2>
            <p className="text-[#0A0A0A]/50 text-sm font-medium leading-relaxed">
              Transparent insights into our engineering philosophy and the
              technical foundations of your future digital ecosystem.
            </p>
          </motion.div>

          {/* Right Column: FAQ */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${idx}`}
                    className="border border-border/60 bg-[#F9F9F9] px-6 rounded-2xl overflow-hidden data-[state=open]:border-primary/40 transition-all shadow-sm"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                          {faq.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[9px] font-black text-primary/40 tracking-widest uppercase block mb-1">
                            {faq.tag}
                          </span>
                          <span className="text-base font-black uppercase tracking-tight text-[#0A0A0A]">
                            {faq.question}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#0A0A0A]/60 text-sm leading-relaxed pb-6 pl-12">
                      <div className="max-w-2xl border-l-2 border-primary/20 pl-6 py-2 italic font-medium">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
