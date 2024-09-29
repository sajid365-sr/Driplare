import { getTeams } from "@/actions/get-teams";
import UnderConstruction from "@/components/under-construction/under-construction";

import React from "react";

const Homepage = async () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const teams = await getTeams();

  return (
    <section>
      {environment === "development" && <UnderConstruction />}

      {environment === "production" && (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          eligendi aspernatur at asperiores saepe placeat unde porro, sed
          accusamus doloremque temporibus perspiciatis commodi dolores ex.
          Facere excepturi aliquid corporis voluptas?
        </div>
      )}
    </section>
  );
};

export default Homepage;
