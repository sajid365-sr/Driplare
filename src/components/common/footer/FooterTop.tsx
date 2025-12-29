import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FooterTop() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/\s/g, '_').toUpperCase();

  return (
    <div className="border-b border-[#0A0A0A]/5 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-3xl font-black tracking-tighter text-[#0A0A0A]">
              DRIPLARE<span className="text-primary">.</span>
            </Link>
            <p className="text-[10px] font-mono font-bold text-[#0A0A0A]/40 mt-1 uppercase tracking-widest">
              Architecting Autonomy
            </p>
          </div>

          {/* Status Monitoring */}
          <div className="flex flex-col items-center group">
            <div className="inline-flex items-center gap-3 bg-[#0A0A0A]/5 border border-transparent group-hover:border-primary/20 px-6 py-2.5 rounded-2xl transition-all">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-mono text-xs text-[#0A0A0A] font-black tracking-wider uppercase">
                SYSTEM_STATUS: OPERATIONAL
              </span>
            </div>
            <div className="mt-2 font-mono text-[9px] text-[#0A0A0A]/40 font-bold uppercase tracking-widest">
              LST_SYNC: {currentDate} // 0-LATENCY
            </div>
          </div>

          {/* CTA Section */}
          <div>
            <Button asChild className="bg-[#0A0A0A] hover:bg-primary text-white px-8 py-7 rounded-2xl font-bold text-lg shadow-xl shadow-[#0A0A0A]/10 transition-all active:scale-95 group">
              <Link to="/contact">
                Initiate Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}