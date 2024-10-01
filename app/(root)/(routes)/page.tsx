import Banner from "@/components/ui/banner";
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
        </div>
      )}
    </section>
  );
};

export default Homepage;
