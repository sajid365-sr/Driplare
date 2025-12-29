import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings, ShieldCheck, Terminal, Workflow } from "lucide-react";

const PROCESS = [
  {
    title: "01. Discovery & Audit",
    desc: "We analyze your current manual workflows and map out every data touchpoint.",
    icon: Terminal,
  },
  {
    title: "02. Architecture Design",
    desc: "We build a blueprint using the MERN stack or automation tools like n8n.",
    icon: Settings,
  },
  {
    title: "03. Stress Testing",
    desc: "Every agent and automation is pushed to its limit to ensure 99.9% uptime.",
    icon: ShieldCheck,
  },
  {
    title: "04. Deployment & Scale",
    desc: "Seamless rollout with zero downtime for your existing operations.",
    icon: Workflow,
  },
];

export function LogicAccordion() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
          THE <span className="text-primary">METHOD</span>
        </h2>
        <p className="text-muted-foreground">
          How we ensure consistent results across every project.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {PROCESS.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-border/50 bg-background rounded-2xl px-6"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <item.icon className="text-primary" size={24} />
                <span className="text-lg font-bold tracking-tight">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
              {item.desc}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
