import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Let's build brilliance.
      </h2>
      <Link to="/contact">
        <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
          Contact Us
        </Button>
      </Link>
    </div>
  );
};

export default CTA;
