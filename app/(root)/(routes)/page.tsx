import AnimatedTextWord from "@/components/motion/AnimatedTextWord";
import Banner from "@/components/ui/banner";
import LargeText from "@/components/ui/largeText";
import UnderConstruction from "@/components/under-construction/under-construction";

import React from "react";

const Homepage = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  return (
    <section>
      {environment === "development" && <UnderConstruction />}

      {environment === "production" && (
        <div>
          <Banner />

          <AnimatedTextWord
            text="At Driplare, we are committed to pushing the boundaries of what's possible."
            className="lg:container px-5 my-20 text-4xl lg:text-7xl"
          />
        </div>
      )}
    </section>
  );
};

export default Homepage;
