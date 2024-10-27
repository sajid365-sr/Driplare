import { defineField, defineType } from "sanity";

export const servicesRoute = defineType({
  name: "servicesRoute",
  title: "Services Route",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "Route URL",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "serial",
      title: "Serial Number",
      type: "number",
    }),
  ],
});
