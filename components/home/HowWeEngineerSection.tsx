"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export function HowWeEngineerSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // steps array with translated values
  const steps = [
    {
      number: "01",
      title: t("engineer.steps.audit.title"),
      description: t("engineer.steps.audit.desc"),
      tags: t("engineer.steps.audit.tags", { returnObjects: true }) as string[],
    },
    {
      number: "02",
      title: t("engineer.steps.architect.title"),
      description: t("engineer.steps.architect.desc"),
      tags: t("engineer.steps.architect.tags", {
        returnObjects: true,
      }) as string[],
    },
    {
      number: "03",
      title: t("engineer.steps.integrate.title"),
      description: t("engineer.steps.integrate.desc"),
      tags: t("engineer.steps.integrate.tags", {
        returnObjects: true,
      }) as string[],
    },
    {
      number: "04",
      title: t("engineer.steps.scale.title"),
      description: t("engineer.steps.scale.desc"),
      tags: t("engineer.steps.scale.tags", { returnObjects: true }) as string[],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            {t("engineer.title")}
          </h2>
          <p className="text-lg text-[#0A0A0A]/70 max-w-2xl mx-auto">
            {t("engineer.subtitle")}
          </p>
        </motion.div>

        {/* Circuit board layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#E5E5E5] -translate-x-1/2"></div>

          {/* Animated pulse */}
          <motion.div
            className="absolute left-1/2 top-0 w-4 h-4 bg-[#FF6B00] rounded-full -translate-x-1/2 z-10"
            style={{ y: pulseY }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 107, 0, 0.7)",
                "0 0 0 20px rgba(255, 107, 0, 0)",
                "0 0 0 0 rgba(255, 107, 0, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 shadow-lg">
                    <div
                      className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                    >
                      <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold font-mono shrink-0">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-[#0A0A0A]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[#0A0A0A]/70 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Technical details (Tags) */}
                    <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                      <div
                        className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                      >
                        {step.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] font-mono rounded uppercase tracking-wider border border-[#E5E5E5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection node (Central circle) */}
                <div className="relative hidden md:block">
                  <div className="w-6 h-6 bg-[#FF6B00] rounded-full border-4 border-white shadow-lg z-20 relative"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-[#FF6B00] rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Empty space for balance on desktop */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
