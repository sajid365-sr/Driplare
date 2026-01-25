"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MarketplaceCTA() {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-br from-driplare via-driplare-600 to-driplare-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Can't Find the Perfect Solution?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Let us build a custom AI agent tailored specifically for your business needs. 
            Our experts will handle everything from design to deployment.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              "Custom AI Training",
              "Free Consultation",
              "30-Day Support"
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span className="font-semibold">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/contact")}
              className="bg-white text-driplare hover:bg-gray-100 font-bold px-10 py-6 text-lg shadow-2xl"
            >
              Request Custom Solution
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-driplare font-bold px-10 py-6 text-lg backdrop-blur-sm bg-white/10"
              onClick={() => router.push("/contact")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with Expert
            </Button>
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-white/70 text-sm">
            💬 Average response time: Under 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}