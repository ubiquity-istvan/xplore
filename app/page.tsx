import Image from "next/image";
import { getegid } from "process";
import { useEffect } from "react";
import Button from "./Button";
import Link from "next/link";

const getOrganisation = async () => {
  const url = "https://www.eventbriteapi.com/v3/users/me/organizations/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer UMT4EZZJC53JGSMGCHKG ",
    },
    // cache: "no-store",
    next: { revalidate: 10 },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    // Error
    throw new Error("Failed to fetch data.");
  }

  return res.json();
};

export const getTickets = async (event: string) => {
  // const url = `https://www.eventbriteapi.com/v3/events/737236653677/ticket_classes/for_sale/`;
  const url = `https://www.eventbriteapi.com/v3/events/${event}/ticket_classes/for_sale/`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer UMT4EZZJC53JGSMGCHKG",
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
};

export const getEvents = async () => {
  const organisation = await getOrganisation();
  const organisationID = organisation.organizations[0].id;
  // Org ID: 1835802819703

  const url = `https://www.eventbriteapi.com/v3/organizations/${organisationID}/events/?expand=ticket_availability`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer UMT4EZZJC53JGSMGCHKG",
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
};

export const getEvent = async (eventID: string) => {
  const organisation = await getOrganisation();
  const organisationID = organisation.organizations[0].id;
  // Org ID: 1835802819703

  const url = `https://www.eventbriteapi.com/v3/organizations/${organisationID}/events/?expand=ticket_availability`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Bearer UMT4EZZJC53JGSMGCHKG",
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
};

export default async function Home() {
  const events = await getEvents();
  const org = await getOrganisation();

  // console.log(org);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button>Test</Button>
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold">Fetching events</h1>
        {/* Events */}
        <div className="grid grid-cols-2 gap-8">
          {events.events.map((event: any) => {
            const name = event.name.text;
            const ticketInfo = event.ticket_availability;
            const hasAvailableTickets = ticketInfo.has_available_tickets;
            const availableText = "Tickets available";
            const runOutText = "Nor more tickets left";
            const ticketsFrom = ticketInfo.minimum_ticket_price.display;
            const ticketsTo = ticketInfo.minimum_ticket_price.display;

            console.log(event.id);

            return (
              <div className="flex flex-col prose">
                <h1>{name}</h1>
                {hasAvailableTickets ? (
                  <p>{availableText}</p>
                ) : (
                  <p>{runOutText}</p>
                )}
                <div className="flex gap-2">
                  <p>Tickets from: {ticketsFrom}</p>
                  <p>-</p>
                  <p>Tickets to: {ticketsTo}</p>
                </div>
                <Link href={`/${event.id}`}>But tickets</Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
