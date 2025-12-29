import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-orange-100/20 px-4 py-2 rounded-full text-orange-500 mb-6">
            <span className="text-sm font-medium">DISCOVER ENGINEERED EFFICIENCY</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-black">
            Hire Digital Workers <span className="block text-orange-500">That Never Sleep.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            We architect autonomous AI Agents tailored to your unique business logic. Eliminate manual bottlenecks and drive 24/7 productivity without increasing your headcount.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <Link to="/contact">
                Book an Automation Audit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100" asChild>
              <Link to="/portfolio">See Use Cases</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
