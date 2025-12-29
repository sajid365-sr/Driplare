import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const StickyCTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to stop the manual grind?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let’s build a business that runs itself.
          </p>
          <Button size="lg" variant="secondary" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white" asChild>
            <Link to="/contact">
              Request Your Free Workflow Audit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
