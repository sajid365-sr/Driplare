import Banner from "@/components/ui/banner";
import Banner2 from "@/components/ui/banner2";
import UnderConstruction from "@/components/under-construction/under-construction";

import React from "react";

const Homepage = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  return (
    <section>
      {environment === "development" && <UnderConstruction />}

      {environment === "production" && (
        <div>
          {/* <Banner /> */}
          <Banner2 />
        </div>
      )}
    </section>
  );
};

export default Homepage;
