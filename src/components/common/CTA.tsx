
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <motion.div 
      className="text-center py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Let's build brilliance.
      </h2>
      <Link to="/contact">
        <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
          Contact Us
        </Button>
      </Link>
    </motion.div>
  );
};

export default CTA;
