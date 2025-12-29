import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function FooterLegalTicker() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-[#0A0A0A] py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          {/* Left - Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <span className="font-mono text-sm text-[#0A0A0A]/60">
              © {currentYear} DRIPLARE_LABS. ALL_RIGHTS_RESERVED.
            </span>
          </motion.div>

          {/* Middle - Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-center items-center">
              <Link
                to="/privacy-policy"
                className="font-mono text-sm text-[#0A0A0A]/60 hover:text-[#FF6B00] transition-colors"
              >
                [ PRIVACY_POLICY ]
              </Link>
              <span className="hidden md:inline text-[#0A0A0A]/30">|</span>
              <Link
                to="/terms-of-service"
                className="font-mono text-sm text-[#0A0A0A]/60 hover:text-[#FF6B00] transition-colors"
              >
                [ TERMS_OF_SERVICE ]
              </Link>
              <span className="hidden md:inline text-[#0A0A0A]/30">|</span>
              <span className="font-mono text-sm text-[#0A0A0A]/60">
                [ COOKIE_LOGS ]
              </span>
            </div>
          </motion.div>

          {/* Right - Attribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1 md:text-right"
          >
            <span className="font-mono text-sm text-[#0A0A0A]/60">
              ARCHITECTED_BY: DRIPLARE
            </span>
          </motion.div>
        </div>

        {/* System Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-[#F9F9F9] px-4 py-2 border border-[#0A0A0A] rounded-none">
            <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-[#0A0A0A]">
              FOOTER_SYSTEM: ACTIVE | INTEGRITY: VERIFIED | LAST_MAINTENANCE: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '_').toUpperCase()}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
