import { type SchemaTypeDefinition } from "sanity";
import { teams } from "./teams";
import { servicesRoute } from "./services-route";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teams, servicesRoute],
};
