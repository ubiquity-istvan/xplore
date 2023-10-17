import { useEffect } from "react";
import Button from "../Button";
import { getEvent, getTickets } from "../page";
import Event from "../components/Event";
import useEventbrite from "react-eventbrite-popup-checkout";
import React from "react";

interface Cost {
  display: string;
}
interface Ticket {
  name: string;
  cost: Cost;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const eventID = params.slug;
  const event = await getEvent(eventID);
  const ticketInfo = await getTickets(eventID);
  const tickets = ticketInfo.ticket_classes;
  const eventName = event.events[0].name.text;

  // const handleOrderCompleted = React.useCallback(() => {
  //   console.log("Order was completed successfully");
  // }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">{eventName}</h1>
        <div className="flex flex-col gap-1">
          <h2 className="font-bold">Tickets</h2>
          <div>
            {tickets.map((ticket: Ticket) => {
              const name = ticket.name;
              const price = ticket.cost.display;
              return (
                <div className="grid grid-cols-2 gap-2 max-w-md">
                  <p>{name}</p>
                  <p>{price}</p>
                  {/* <Button eventID={eventID}>Buy now</Button> */}
                  {/* <Button eventID={"429544066867"}>Buy now</Button> */}
                  {/* <button onClick={exampleCallback}>Test buy</button> */}
                </div>
                // <Event name={name} price={price} />
              );
            })}
          </div>
        </div>
      </div>

      <Button eventID={eventID}>Buy now</Button>
    </div>
  );
}
