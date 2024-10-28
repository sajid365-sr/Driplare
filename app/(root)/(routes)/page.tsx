import RevealAnimation from "@/components/motion/RevealAnimation";
import Banner from "@/components/ui/banner";
import Services from "@/components/ui/services";
import UnderConstruction from "@/components/under-construction/under-construction";

import React from "react";

const Homepage = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  return (
    <section className="">
      {environment === "development" && <UnderConstruction />}

      {environment === "production" && (
        <div>
          <Banner />
          <Services />
          <div className="mt-20">
            <RevealAnimation />
          </div>
        </div>
      )}
    </section>
  );
};

export default Homepage;
