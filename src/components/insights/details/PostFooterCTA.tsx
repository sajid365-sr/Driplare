import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Database, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blog-utils";

interface PostFooterCTAProps {
  post: BlogPost;
}

export function PostFooterCTA({ post }: PostFooterCTAProps) {
  // Determine CTA based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai_agents':
      case 'ai':
        return <Zap className="w-6 h-6 text-[#FF6B00]" />;
      case 'workflow_engineering':
      case 'automation':
        return <Workflow className="w-6 h-6 text-[#FF6B00]" />;
      case 'data_strategy':
      case 'data':
        return <Database className="w-6 h-6 text-[#FF6B00]" />;
      default:
        return <Zap className="w-6 h-6 text-[#FF6B00]" />;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai_agents':
      case 'ai':
        return 'AI agent logic';
      case 'workflow_engineering':
      case 'automation':
        return 'workflow automation';
      case 'data_strategy':
      case 'data':
        return 'data intelligence';
      case 'mern_scaling':
      case 'mern':
        return 'MERN architecture';
      default:
        return `${category.toLowerCase()} logic`;
    }
  };

  return (
    <section className="py-16 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Blueprint Card Design */}
          <div className="relative bg-white text-[#0A0A0A] p-8 md:p-12 rounded-none border border-[#0A0A0A] shadow-2xl">
            {/* Corner brackets for blueprint effect */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-[#FF6B00]"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-[#FF6B00]"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-[#FF6B00]"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-[#FF6B00]"></div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-none border border-[#FF6B00] flex items-center justify-center">
                {getCategoryIcon(post.category)}
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-6 font-montserrat">
              Interested in implementing this {getCategoryText(post.category)} in your business?
            </h2>

            {/* Description */}
            <p className="text-[#0A0A0A]/70 font-inter text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Get a detailed technical brief with implementation roadmap, code samples, and deployment guidance tailored to your specific use case.
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact">
                <Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-4 text-lg font-bold rounded-none shadow-lg">
                  Request a Technical Brief
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Technical Details */}
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="font-mono text-sm text-[#0A0A0A]/60 mb-1">DELIVERABLE</div>
                  <div className="font-montserrat font-bold text-[#0A0A0A]">Technical Brief</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-[#0A0A0A]/60 mb-1">TIMELINE</div>
                  <div className="font-montserrat font-bold text-[#0A0A0A]">24-48 Hours</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm text-[#0A0A0A]/60 mb-1">FORMAT</div>
                  <div className="font-montserrat font-bold text-[#0A0A0A]">PDF + Code</div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-[#0A0A0A]/60">READY_FOR_IMPLEMENTATION | EXPERT_AVAILABLE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
