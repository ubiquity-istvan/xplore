export async function GET(request: Request) {
  const getOrganization = async () => {
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

  const getEvents = async (orgIDs: any) => {
    // const organisation = await getOrganisation();
    // const organisationID = organisation.organizations[0].id;

    orgIDs.map((org: any) => {
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
    });
  };

  const organization = await getOrganization();
  const organizations = organization.organizations;

  const events = await getEvents();

  console.log(organizations);

  return Response.json({ organization });
}
