"use client";
import React, { useEffect } from "react";

interface Props {
  name: string;
  price: string;
  eventID?: string;
}

export default function Event({ name, price, eventID }: Props) {
  var exampleCallback = function () {
    console.log("Order complete!");
  };
  useEffect(() => {
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId: "52766401728",
      iframeContainerId: "example-widget-trigger",
      iframeContainerHeight: 425,
      onOrderComplete: exampleCallback,
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 max-w-md">
      <p>{name}</p>
      <p>{price}</p>
      <div id="example-widget-trigger"></div>

      {/* <Button eventID={eventID}>Buy now</Button> */}
      {/* <Button eventID={"429544066867"}>Buy now</Button> */}
      {/* <button onClick={exampleCallback}>Test buy</button> */}
    </div>
  );
}
