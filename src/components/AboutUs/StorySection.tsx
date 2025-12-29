import { motion } from "framer-motion";
import { Code, Brain, Zap } from "lucide-react";

const timeline = [
  {
    year: "2020",
    title: "The MERN Foundation",
    description: "Started building high-performance web applications using MongoDB, Express, React, and Node.js.",
    icon: Code,
    color: "#0A0A0A"
  },
  {
    year: "2023",
    title: "Pattern Recognition",
    description: "Identified that businesses weren't just struggling with websites—they were struggling with processes.",
    icon: Brain,
    color: "#FF6B00"
  },
  {
    year: "2024",
    title: "The Intelligence Pivot",
    description: "Combined architectural expertise with AI power. Launched Driplare to turn manual bottlenecks into autonomous assets.",
    icon: Zap,
    color: "#FF6B00"
  }
];

export function StorySection() {
  return (
    <section className="py-20 bg-[#F9F9F9] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(#E5E5E5 1px, transparent 1px),
            linear-gradient(90deg, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
            The Evolution of Our Logic
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Timeline */}
          <div className="relative">
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: item.color }}
                    />
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-[#E5E5E5] mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="text-[#0A0A0A]/60 font-mono text-sm">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                    <p className="text-[#0A0A0A]/70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Narrative */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-[#0A0A0A]/80 leading-relaxed mb-6 font-serif">
                For years, we built high-performance web applications using the MERN stack. But we noticed a pattern: businesses weren't just struggling with their websites; they were struggling with their <em className="text-[#FF6B00] font-semibold">processes</em>.
              </p>

              <p className="text-lg text-[#0A0A0A]/80 leading-relaxed mb-6 font-serif">
                In 2024, we pivoted. We combined our deep architectural roots in full-stack development with the cutting-edge power of AI. Today, Driplare exists to turn manual bottlenecks into autonomous assets.
              </p>

              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5] shadow-sm">
                <blockquote className="text-[#0A0A0A] font-serif italic text-lg">
                  "Every line of code should either save a business time or make it money."
                </blockquote>
                <cite className="text-[#0A0A0A]/60 font-mono text-sm mt-2 block">
                  — Driplare Mission Statement
                </cite>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Connecting Elements */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#0A0A0A]" />
              <span className="text-[#0A0A0A] font-mono text-sm">MERN_STACK</span>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#0A0A0A] to-[#FF6B00]"></div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#FF6B00]" />
              <span className="text-[#FF6B00] font-mono text-sm">AI_INTELLIGENCE</span>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#FF6B00] to-[#0A0A0A]"></div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#0A0A0A]" />
              <span className="text-[#0A0A0A] font-mono text-sm">AUTOMATION</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
