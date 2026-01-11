"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function ConsultingCTA() {
  const { t } = useTranslation();

  // ডাটা টাইপ নিশ্চিত করতে এবং এরর এড়াতে fallback array ব্যবহার করা হয়েছে
  const tags = t("services.consulting.consulting_cta.tags", {
    returnObjects: true,
  });
  const finalTags = Array.isArray(tags) ? tags : [];

  return (
    <section className="py-32 bg-[#0A0A0B] text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-10">
            <Terminal className="w-5 h-5 text-[#FF6B00]" />
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-white/60">
              {t("services.consulting.consulting_cta.badge")}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black font-montserrat tracking-tighter uppercase mb-10 leading-[1.05]">
            {t("services.consulting.consulting_cta.title_main")}{" "}
            <span className="text-[#FF6B00]">
              {t("services.consulting.consulting_cta.title_span")}
            </span>{" "}
            {t("services.consulting.consulting_cta.title_end")}
          </h2>

          <p className="text-xl text-white/50 font-inter mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("services.consulting.consulting_cta.desc")}
          </p>

          <Button
            size="lg"
            className="bg-[#FF6B00] hover:bg-white hover:text-black text-white px-12 h-20 rounded-2xl font-black text-xl shadow-2xl shadow-[#FF6B00]/20 transition-all group"
            asChild
          >
            <Link href="/contact" className="flex items-center">
              {t("services.consulting.consulting_cta.btn")}
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/5 pt-12">
            {finalTags.map((text: string, i: number) => (
              <div
                key={i}
                className="font-mono text-[9px] font-bold text-white/30 tracking-[0.4em]"
              >
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
