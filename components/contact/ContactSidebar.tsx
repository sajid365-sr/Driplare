import { motion } from "framer-motion";
import { Mail, Linkedin, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSidebar() {
  const contactMethods = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "OFFICE@DRIPLARE.COM",
      description: "Direct technical inquiries",
      action: "mailto:office@driplare.com",
      color: "#FF6B00"
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "LINKEDIN.COM/IN/DRIPLARE",
      description: "Professional networking",
      action: "https://linkedin.com/in/driplare",
      color: "#0077B5"
    }
  ];

  return (
    <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #FF6B00 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, #FF6B00 1px, transparent 1px)
          `,
          backgroundSize: '150px 150px'
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-full font-mono text-sm mb-4">
              <MessageCircle className="w-4 h-4" />
              ALTERNATIVE_CHANNELS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
              Alternative Channels
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-montserrat">
              Multiple ways to connect with our technical team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    <method.icon className="w-6 h-6" style={{ color: method.color }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-white/60">{method.label}:</span>
                      <ExternalLink className="w-3 h-3 text-white/40" />
                    </div>

                    <a
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white font-bold hover:text-[#FF6B00] transition-colors mb-2"
                    >
                      {method.value}
                    </a>

                    <p className="text-white/60 text-sm">{method.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#FF6B00]" />
                <span className="font-mono text-sm text-white">SYSTEMS_STATUS:</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-green-400 font-bold">ONLINE_24/7</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">15min</div>
                  <div className="text-white/60 text-sm">Average Response Time</div>
                </div>

                <div>
                  <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">24/7</div>
                  <div className="text-white/60 text-sm">System Availability</div>
                </div>

                <div>
                  <div className="text-2xl font-mono font-bold text-[#FF6B00] mb-1">EN</div>
                  <div className="text-white/60 text-sm">Primary Language</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/40 text-sm font-mono text-center">
                  LAST_UPDATED: {new Date().toLocaleString()} | VERSION: 2.1.0 | UPTIME: 99.9%
                </p>
              </div>
            </div>
          </motion.div>

          {/* Emergency Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="inline-block bg-[#FF6B00] text-white px-8 py-4 rounded-2xl">
              <h3 className="font-bold mb-2">Need Immediate Assistance?</h3>
              <p className="text-sm text-white/90 mb-4">
                For urgent technical matters or system emergencies
              </p>
              <Button className="bg-white text-[#FF6B00] hover:bg-white/90 font-bold">
                Emergency Support Line
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
