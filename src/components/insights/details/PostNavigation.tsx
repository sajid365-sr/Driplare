import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PostNavigationProps {
  previousPost?: { id: string; title: string };
  nextPost?: { id: string; title: string };
}

export function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  return (
    <section className="py-12 bg-[#F9F9F9] border-t border-[#E5E5E5]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-montserrat font-bold text-xl text-[#0A0A0A] mb-8 text-center uppercase tracking-wide">
            The Logic Loop
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Post */}
            {previousPost && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/insights/${previousPost.id}`}>
                  <div className="bg-white border border-[#0A0A0A] p-6 rounded-none hover:border-[#FF6B00] transition-colors cursor-pointer group-hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <ArrowLeft className="w-5 h-5 text-[#FF6B00] group-hover:-translate-x-1 transition-transform" />
                      <span className="font-mono text-sm text-[#0A0A0A]/60">STEP_BACK</span>
                    </div>
                    <h4 className="font-montserrat font-bold text-[#0A0A0A] line-clamp-2 leading-tight">
                      {previousPost.title}
                    </h4>
                    <div className="mt-3 font-mono text-xs text-[#0A0A0A]/50">
                      [ PREVIOUS_ARTICLE ]
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Next Post */}
            {nextPost && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/insights/${nextPost.id}`}>
                  <div className="bg-white border border-[#0A0A0A] p-6 rounded-none hover:border-[#FF6B00] transition-colors cursor-pointer group-hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-sm text-[#0A0A0A]/60">STEP_FORWARD</span>
                          <ArrowRight className="w-5 h-5 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h4 className="font-montserrat font-bold text-[#0A0A0A] line-clamp-2 leading-tight">
                          {nextPost.title}
                        </h4>
                        <div className="mt-3 font-mono text-xs text-[#0A0A0A]/50">
                          [ NEXT_ARTICLE ]
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Back to Hub */}
          <div className="text-center mt-8">
            <Link to="/insights">
              <Button variant="outline" className="border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white rounded-none">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Intelligence Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
