import { defineField, defineType } from "sanity";

export const services = defineType({
  name: "services",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "serviceTitle",
      type: "string",
      title: "Service Title",
    }),
  ],
});
