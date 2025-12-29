import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "overview", label: "01.0 OVERVIEW", title: "Overview" },
  { id: "collection", label: "02.0 DATA_COLLECTION", title: "Data Collection & Intent" },
  { id: "sovereignty", label: "03.0 DATA_SOVEREIGNTY", title: "Data Sovereignty" },
  { id: "integrations", label: "04.0 THIRD_PARTY", title: "Third-Party Integrations" },
  { id: "retention", label: "05.0 DATA_RETENTION", title: "Data Retention" },
];

interface PrivacySidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function PrivacySidebar({ activeSection, onSectionChange }: PrivacySidebarProps) {
  return (
    <div className="sticky top-8 h-fit">
      <div className="space-y-2">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
              activeSection === section.id
                ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-lg"
                : "bg-white text-[#0A0A0A] border-[#E5E5E5] hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/5"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-mono text-sm font-bold tracking-wider mb-1">
              {section.label}
            </div>
            <div className={`text-sm font-inter font-regular ${
              activeSection === section.id ? "text-white/90" : "text-[#0A0A0A]/70"
            }`}>
              {section.title}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg"
      >
        <div className="text-center">
          <div className="w-3 h-3 bg-[#22C55E] rounded-full mx-auto mb-2 animate-pulse"></div>
          <div className="font-mono text-xs text-[#0A0A0A]/60">
            NAVIGATION_ACTIVE
          </div>
        </div>
      </motion.div>
    </div>
  );
}
