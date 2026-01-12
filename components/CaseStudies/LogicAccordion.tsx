"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings, ShieldCheck, Terminal, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";

// আইকনগুলো স্ট্যাটিক থাকবে
const ICONS = [Terminal, Settings, ShieldCheck, Workflow];

export function LogicAccordion() {
  const { t } = useTranslation();

  // JSON থেকে ডাটা আনা
  const steps = t("case_studies.logic_accordion.steps", {
    returnObjects: true,
  });
  const isStepsValid = Array.isArray(steps);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
          {t("case_studies.logic_accordion.heading_main")}{" "}
          <span className="text-primary">
            {t("case_studies.logic_accordion.heading_accent")}
          </span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {t("case_studies.logic_accordion.subheading")}
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {isStepsValid ? (
          steps.map((item: any, idx: number) => {
            const IconComponent = ICONS[idx] || Terminal;
            return (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-border/50 bg-card/30 backdrop-blur-sm rounded-2xl px-6 transition-all hover:border-primary/20"
              >
                <AccordionTrigger className="hover:no-underline py-6 group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-lg font-bold tracking-tight dark:text-white/90">
                      {item.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed text-base md:pl-[52px]">
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground italic">
            [ Loading logic steps... ]
          </p>
        )}
      </Accordion>
    </div>
  );
}
