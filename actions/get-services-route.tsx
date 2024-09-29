import { client } from "@/sanity/lib/client";

export const getServicesRoute = async () => {
  const servicesRouteQuery = '*[_type=="servicesRoute"] | order(serial asc)';
  try {
    const servicesRoute = await client.fetch(servicesRouteQuery);
    return servicesRoute;
  } catch (error) {
    console.log(error);
  }
};
