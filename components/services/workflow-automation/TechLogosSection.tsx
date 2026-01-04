import { motion } from "framer-motion";

export const TechLogosSection = () => (
  <section className="py-20 bg-white border-y border-border/40">
    <div className="container text-center">
      <p className="font-mono text-[10px] font-black text-[#0A0A0A]/30 tracking-[0.4em] uppercase mb-12">
        Supported_Integrations
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
        {["n8n", "Zapier", "Slack", "Stripe", "HubSpot", "Shopify"].map(
          (logo) => (
            <span
              key={logo}
              className="text-2xl font-black uppercase tracking-tighter text-[#0A0A0A]"
            >
              {logo}
            </span>
          )
        )}
      </div>
    </div>
  </section>
);
