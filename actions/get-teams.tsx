import { client } from "@/sanity/lib/client";

export const getTeams = async () => {
  const teamsQuery = '*[_type=="teams"]';
  try {
    const teams = await client.fetch(teamsQuery);
    return teams;
  } catch (error) {
    console.log(error);
  }
};
