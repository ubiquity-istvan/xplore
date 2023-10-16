"use client";
import { networkInterfaces } from "os";
import React, { ReactNode } from "react";
import { useEffect } from "react";

interface Props {
  children: ReactNode;
  eventID: any;
}

declare global {
  interface Window {
    EBWidgets: any;
  }
}

export default function Button({ children, eventID }: Props) {
  var exampleCallback = function () {
    console.log("Order complete!");
  };

  useEffect(() => {
    // Access the window object here
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      //   eventId: "52766401728",
      eventId: eventID,
      modal: true,
      modalTriggerElementId: "example-widget-trigger",
      onOrderComplete: exampleCallback,
    });
  }, []);
  return (
    <button
      className="bg-black py-2 px-4 rounded-md text-white hover:bg-slate-700 transition-colors duration-200"
      id="example-widget-trigger"
      type="button"
    >
      {children}
      {/* {eventID} */}
    </button>
  );
}
