import { motion } from "framer-motion";
import { Code, Shield, FileText } from "lucide-react";

export function PhilosophySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - Code Snippet Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#0A0A0A] p-8 rounded-none border border-[#0A0A0A]">
              {/* Code Snippet Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#FF6B00] rounded-full"></div>
                <span className="font-mono text-sm text-white">transparency.js</span>
              </div>

              {/* Code Content */}
              <div className="font-mono text-sm text-white/90 space-y-2">
                <div><span className="text-[#FF6B00]">const</span> transparency = {"{"}</div>
                <div className="ml-4">fullOwnership: <span className="text-green-400">true</span>,</div>
                <div className="ml-4">noBlackBox: <span className="text-green-400">true</span>,</div>
                <div className="ml-4">directAccess: <span className="text-green-400">true</span>,</div>
                <div className="ml-4">documentation: <span className="text-green-400">"complete"</span></div>
                <div>{"}"};</div>
                <div className="mt-4 text-white/60">// You own every line of code</div>
                <div className="text-white/60">// No vendor lock-in</div>
                <div className="text-white/60">// Full system visibility</div>
              </div>

              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-[#FF6B00]"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-[#FF6B00]"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-[#FF6B00]"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-[#FF6B00]"></div>
            </div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-[#F9F9F9] px-4 py-2 border border-[#0A0A0A] rounded-none">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                <span className="font-mono text-xs text-[#0A0A0A]">CODE_TRANSPARENT | OWNERSHIP_COMPLETE</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-6 font-montserrat">
                Transparency is Our Default
              </h3>
              <p className="text-lg text-[#0A0A0A]/70 font-inter font-light leading-relaxed mb-8">
                Many agencies hide their logic. We believe you should own your intelligence.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#22C55E]/10 rounded-none border border-[#22C55E] flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Full IP Ownership</h4>
                  <p className="text-[#0A0A0A]/70 font-inter font-light leading-relaxed">
                    You own every line of code we write.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#FF6B00]/10 rounded-none border border-[#FF6B00] flex items-center justify-center flex-shrink-0 mt-1">
                  <Code className="w-4 h-4 text-[#FF6B00]" />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Direct Access</h4>
                  <p className="text-[#0A0A0A]/70 font-inter font-light leading-relaxed">
                    We build on your infrastructure (AWS, MongoDB, n8n) so you are never locked into a proprietary vendor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0A0A0A]/10 rounded-none border border-[#0A0A0A] flex items-center justify-center flex-shrink-0 mt-1">
                  <FileText className="w-4 h-4 text-[#0A0A0A]" />
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-[#0A0A0A] mb-2">Documentation First</h4>
                  <p className="text-[#0A0A0A]/70 font-inter font-light leading-relaxed">
                    Every system comes with a "Manual of Logic."
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy Statement */}
            <div className="bg-[#F9F9F9] p-6 border border-[#E5E5E5] rounded-none">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#0A0A0A]/80 font-inter font-light leading-relaxed italic">
                  "We don't build black boxes. We build transparent systems that you understand, own, and can maintain long after we're gone."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
