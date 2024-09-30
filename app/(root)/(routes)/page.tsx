"use client";

import UnderConstruction from "@/components/under-construction/under-construction";
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

import React from "react";

const Homepage = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  function handleNewEvent(event: EventHandlerPayload<"onNewEvent">) {
    console.log("LiveChatWidget.onNewEvent", event);
  }

  return (
    <section>
      {environment === "development" && <UnderConstruction />}

      {environment === "production" && (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          eligendi aspernatur at asperiores saepe placeat unde porro, sed
          accusamus doloremque temporibus perspiciatis commodi dolores ex.
          Facere excepturi aliquid corporis voluptas?
          <LiveChatWidget
            license="12345678"
            visibility="maximized"
            onNewEvent={handleNewEvent}
          />
        </div>
      )}
    </section>
  );
};

export default Homepage;
