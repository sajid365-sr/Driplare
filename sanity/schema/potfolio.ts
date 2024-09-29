import { defineField, defineType } from "sanity";

export const portfolio = defineType({
  name: "portfolio",
  type: "document",
  title: "Our Portfolio",
  fields: [
    defineField({
      name: "liveSiteUrl",
      type: "url",
      title: "Live Site URL",
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Portfolio Name",
    }),
    defineField({
      name: "cover",
      type: "image",
      title: "Portfolio Cover",
    }),
  ],
});
