import { type SchemaTypeDefinition } from "sanity";
import { teams } from "./teams";
import { servicesRoute } from "./services-route";
import { portfolio } from "./potfolio";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teams, servicesRoute, portfolio],
};
