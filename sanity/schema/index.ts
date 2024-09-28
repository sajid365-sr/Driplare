import { type SchemaTypeDefinition } from "sanity";
import { teams } from "./teams";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teams],
};
