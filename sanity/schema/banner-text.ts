import { defineType, defineField } from "sanity";

export const bannerText = defineType({
  name: "bannerText",
  title: "Banner Text",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
  ],
});
