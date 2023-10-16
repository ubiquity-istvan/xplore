import Image from "next/image";
import { getegid } from "process";
import Button from "./Button";

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

const getTickets = async (event: string) => {
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

const getEvents = async () => {
  const organisation = await getOrganisation();
  const organisationID = organisation.organizations[0].id;

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
  const organisation = await getOrganisation();
  const organisationID = organisation.organizations[0].id;

  const events = await getEvents();

  // console.log(events.events[0]);

  // console.log("Org");
  // console.log(organisationID);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold">Fetching events</h1>
        <p>JSX should be working now.</p>
        {/* Events */}
        <div className="grid grid-cols-2 gap-8">
          {events.events.map(async (event: any) => {
            const name = event.name.text;
            const eventID = event.id;
            const ticketsDetails = await getTickets(eventID);
            const tickets = ticketsDetails.ticket_classes;
            console.log(`Tickets for: ${name}`);
            return (
              <div className="flex flex-col gap-4 items-start">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div>
                  Tickets
                  {tickets.map((ticket: any) => {
                    console.log(ticket.name);
                    return (
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p>{ticket.name}:</p>
                        </div>
                        <div>
                          <p>{ticket.cost.display}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button eventID={eventID}>Buy tickets</Button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
