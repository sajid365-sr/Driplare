import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FooterTop() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/\s/g, '_').toUpperCase();

  return (
    <div className="border-t border-b border-[#0A0A0A] py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left - Logo */}
          <div className="text-left">
            <Link to="/" className="font-montserrat font-bold text-2xl text-[#0A0A0A] tracking-wider">
              DRIPLARE
            </Link>
          </div>

          {/* Middle - Status */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 border border-[#0A0A0A] rounded-none">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
              <span className="font-mono text-sm text-[#0A0A0A] font-bold">
                [ SYSTEM_STATUS: OPERATIONAL_24/7 ]
              </span>
            </div>
            <div className="mt-2 font-mono text-xs text-[#0A0A0A]/60">
              [ LAST_SCAN: {currentDate} ]
            </div>
          </div>

          {/* Right - CTA */}
          <div className="text-right">
            <Link to="/contact">
              <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-6 py-3 rounded-none font-mono text-sm font-bold border border-[#0A0A0A]">
                [ INITIATE_PROJECT ]
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
