import { defineField, defineType } from "sanity";

export const teams = defineType({
  name: "teams",
  type: "document",
  title: "Team Member",
  fields: [
    defineField({
      title: "Avatar",
      name: "image",
      type: "image",
    }),

    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Skills",
      name: "skills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Mobile Number",
      name: "phone",
      type: "number",
    }),
    defineField({
      title: "Email Address",
      name: "email",
      type: "string",
    }),

    defineField({
      type: "object",
      name: "socialMedia",
      fieldsets: [{ name: "social", title: "Social media handles" }],
      fields: [
        {
          title: "Twitter",
          name: "twitter",
          type: "url",
          fieldset: "social",
        },
        {
          title: "LinkedIn",
          name: "linkedin",
          type: "url",
          fieldset: "social",
        },
        {
          title: "Facebook",
          name: "facebook",
          type: "url",
          fieldset: "social",
        },
      ],
    }),
  ],
});
